from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from ..db import get_db
from ..schemas.auth import (
    UserCreate, UserLogin, UserResponse, Token, 
    EmailVerificationRequest, EmailVerificationConfirm
)
from ..services.auth_service import AuthService
from ..dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user"""
    auth_service = AuthService(db)
    user = await auth_service.register_user(user_data)
    return user


@router.post("/login", response_model=Token)
async def login(
    login_data: UserLogin,
    db: AsyncSession = Depends(get_db)
):
    """Authenticate user and return tokens"""
    auth_service = AuthService(db)
    result = await auth_service.login_user(login_data)
    
    return {
        "access_token": result["access_token"],
        "refresh_token": result["refresh_token"],
        "token_type": result["token_type"]
    }


@router.post("/verify-email", response_model=dict)
async def verify_email(
    verification_data: EmailVerificationConfirm,
    db: AsyncSession = Depends(get_db)
):
    """Verify email address"""
    auth_service = AuthService(db)
    user = await auth_service.verify_email(verification_data.token)
    
    return {
        "message": "Email verified successfully",
        "email": user.email
    }


@router.post("/resend-verification")
async def resend_verification(
    request: EmailVerificationRequest,
    db: AsyncSession = Depends(get_db)
):
    """Resend verification email"""
    auth_service = AuthService(db)
    success = await auth_service.resend_verification_email(request.email)
    
    if success:
        return {"message": "Verification email sent"}
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send verification email"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user = Depends(get_current_user)
):
    """Get current user information"""
    return current_user


@router.post("/refresh", response_model=Token)
async def refresh_token(
    credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer()),
    db: AsyncSession = Depends(get_db)
):
    """Refresh access token"""
    auth_service = AuthService(db)
    
    # Verify refresh token
    payload = verify_token(credentials.credentials, "refresh")
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    # Get user
    user = await auth_service.get_user_by_email(email)
    if not user or not user.is_verified or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    
    # Create new tokens
    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }
