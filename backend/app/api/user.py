from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.dependencies import get_current_user
from app.db.session import get_db
from app.db.models import User, FinancialBehavior
from app.schemas.user import UserResponse
from app.schemas.transaction import FinancialBehaviorResponse

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/financial-behavior/{id}", response_model=FinancialBehaviorResponse)
async def get_financial_behavior(id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Ensure user can only see their own behavior unless admin (not specified, assuming isolation)
    if str(current_user.id) != id:
        raise HTTPException(status_code=403, detail="Not authorized to view this data")

    result = await db.execute(select(FinancialBehavior).where(FinancialBehavior.user_id == id))
    behavior = result.scalars().first()
    
    if not behavior:
        # Return empty/default if not found or 404
        raise HTTPException(status_code=404, detail="Financial behavior not found")
        
    return behavior
