from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.db.models import User
from app.core.supabase_client import get_supabase_client
from gotrue.errors import AuthApiError

security = HTTPBearer()

async def get_current_user_supabase(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Verify Supabase JWT token and return current user from database
    """
    supabase = get_supabase_client()
    
    try:
        # Verify token with Supabase
        user_response = supabase.auth.get_user(credentials.credentials)
        
        if not user_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Get user from our database
        result = await db.execute(
            select(User).where(User.email == user_response.user.email)
        )
        db_user = result.scalars().first()
        
        if not db_user:
            # Create user if doesn't exist (in case they registered directly in Supabase)
            db_user = User(
                id=user_response.user.id,
                email=user_response.user.email,
                full_name=user_response.user.user_metadata.get("full_name", ""),
                phone=user_response.user.user_metadata.get("phone", ""),
                city_tier=user_response.user.user_metadata.get("city_tier", 1)
            )
            db.add(db_user)
            await db.commit()
            await db.refresh(db_user)
        
        return db_user
        
    except AuthApiError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication error: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Keep the old dependency for backward compatibility during transition
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """Alias for get_current_user_supabase"""
    return await get_current_user_supabase(credentials, db)
