from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import os

from ..db import get_db
from ..models.user import User
from ..schemas.auth import UserLogin, UserCreate, UserResponse, Token
from ..config import settings

# JWT Configuration
SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security
security = HTTPBearer()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    # Truncate password to 72 characters for bcrypt compatibility
    return pwd_context.hash(password[:72])

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    return user

async def authenticate_user(db: AsyncSession, email: str, password: str):
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_user_response(user: User) -> dict:
    return {
        "user": {
            "id": str(user.id),
            "email": user.email,
            "name": f"{user.first_name or ''} {user.last_name or ''}".strip() or user.email,
            "role": "user",
            "created_at": user.created_at.isoformat()
        },
        "token": create_access_token(data={"sub": user.email}),
        "message": "Registration successful"
    }

# AuthService class
class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    def create_access_token(self, data: dict):
        """Create access token"""
        return create_access_token(data=data)
    
    def create_refresh_token(self, data: dict):
        """Create refresh token"""
        return create_refresh_token(data=data)
    
    async def register_user(self, user_data: UserCreate) -> User:
        """Register a new user"""
        # Check if user already exists
        result = await self.db.execute(
            select(User).where(User.email == user_data.email)
        )
        existing_user = result.scalar_one_or_none()
        
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        
        # Split name into first_name and last_name
        name_parts = user_data.name.split(" ", 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else None
        
        db_user = User(
            email=user_data.email,
            first_name=first_name,
            last_name=last_name,
            hashed_password=hashed_password,
            is_active=True,
            is_verified=True  # Auto-verify for simplicity
        )
        
        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)
        
        return db_user
    
    async def login_user(self, login_data: UserLogin) -> dict:
        """Authenticate user and return tokens"""
        user = await authenticate_user(self.db, login_data.email, login_data.password)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Inactive user"
            )
        
        return {
            "user": {
                "id": str(user.id),
                "email": user.email,
                "name": f"{user.first_name or ''} {user.last_name or ''}".strip() or user.email,
                "role": "user",
                "created_at": user.created_at.isoformat()
            },
            "token": self.create_access_token(data={"sub": user.email}),
            "message": "Login successful"
        }
