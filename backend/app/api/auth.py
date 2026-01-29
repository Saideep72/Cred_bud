from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.supabase_client import get_supabase_client
from app.db.session import get_db
from app.db.models import User
from app.schemas.auth import Login
from app.schemas.user import UserCreate, UserResponse
from app.core.dependencies import get_current_user_supabase
from gotrue.errors import AuthApiError

router = APIRouter()

@router.post("/register", response_model=dict)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    """Register a new user using Supabase Auth"""
    supabase = get_supabase_client()
    
    try:
    # Note: Frontend handles Supabase Auth. We just create the local profile.
    
    try:
        if not user_in.id:
            # If for some reason ID isn't passed (legacy logic?), fail or try signup?
            # For now, require ID from frontend to avoid double-signup rate limits.
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User ID is required"
            )

        # Create user profile in our database
        result = await db.execute(select(User).where(User.email == user_in.email))
        existing_user = result.scalars().first()
        
        if not existing_user:
            db_user = User(
                id=user_in.id,  # Use ID provided by frontend (from Supabase)
                email=user_in.email,
                full_name=user_in.full_name,
                phone=user_in.phone,
                city_tier=user_in.city_tier
            )
            db.add(db_user)
            await db.commit()
            await db.refresh(db_user)
        
        return {
            "id": str(user_in.id),
            "email": user_in.email,
            "message": "Registration successful"
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration error: {str(e)}"
        )

@router.post("/login", response_model=dict)
async def login(login_data: Login):
    """Login using Supabase Auth"""
    supabase = get_supabase_client()
    
    try:
        auth_response = supabase.auth.sign_in_with_password({
            "email": login_data.email,
            "password": login_data.password
        })
        
        if not auth_response.session:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        return {
            "access_token": auth_response.session.access_token,
            "refresh_token": auth_response.session.refresh_token,
            "token_type": "bearer",
            "user": {
                "id": str(auth_response.user.id),
                "email": auth_response.user.email
            }
        }
        
    except AuthApiError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

@router.get("/verify", response_model=UserResponse)
async def verify(current_user: User = Depends(get_current_user_supabase)):
    """Verify Supabase token and return user"""
    return current_user

@router.post("/logout")
async def logout():
    """Logout user from Supabase"""
    supabase = get_supabase_client()
    try:
        supabase.auth.sign_out()
        return {"message": "Logged out successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
