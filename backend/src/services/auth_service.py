from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status
from typing import Optional
from uuid import UUID

from ..models.user import User
from ..schemas.auth import UserCreate, UserLogin
from ..utils.security import verify_password, get_password_hash, create_access_token, create_refresh_token
from ..utils.tokens import generate_email_verification_token, verify_email_verification_token
from ..services.email_service import email_service


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
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
        db_user = User(
            email=user_data.email,
            hashed_password=hashed_password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            phone=user_data.phone,
            date_of_birth=user_data.date_of_birth,
            address=user_data.address,
            city=user_data.city,
            state=user_data.state,
            zip_code=user_data.zip_code,
            is_verified=False,  # Require email verification
        )
        
        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)
        
        # Send verification email
        verification_token = generate_email_verification_token(user_data.email)
        await email_service.send_verification_email(user_data.email, verification_token)
        
        return db_user
    
    async def login_user(self, login_data: UserLogin) -> dict:
        """Authenticate user and return tokens"""
        # Find user by email
        result = await self.db.execute(
            select(User).where(User.email == login_data.email)
        )
        user = result.scalar_one_or_none()
        
        if not user or not verify_password(login_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        if not user.is_verified:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email not verified. Please check your email for verification link."
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Account is deactivated"
            )
        
        # Create tokens
        access_token = create_access_token(data={"sub": user.email})
        refresh_token = create_refresh_token(data={"sub": user.email})
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": user
        }
    
    async def verify_email(self, token: str) -> User:
        """Verify user email with token"""
        email = verify_email_verification_token(token)
        
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired verification token"
            )
        
        # Find user by email
        result = await self.db.execute(
            select(User).where(User.email == email)
        )
        user = result.scalar_one_or_none()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        if user.is_verified:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already verified"
            )
        
        # Mark user as verified
        user.is_verified = True
        await self.db.commit()
        await self.db.refresh(user)
        
        return user
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        result = await self.db.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()
    
    async def get_user_by_id(self, user_id: UUID) -> Optional[User]:
        """Get user by ID"""
        result = await self.db.execute(
            select(User).where(User.id == user_id)
        )
        return result.scalar_one_or_none()
    
    async def resend_verification_email(self, email: str) -> bool:
        """Resend verification email"""
        user = await self.get_user_by_email(email)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        if user.is_verified:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already verified"
            )
        
        # Send new verification email
        verification_token = generate_email_verification_token(email)
        return await email_service.send_verification_email(email, verification_token)
