from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.db.session import get_db
from app.db.models import LoanApplication, User
from app.schemas.loan import LoanApplicationCreate, LoanApplicationResponse
from app.core.dependencies import get_current_user
from app.ml.credit_model import credit_model

router = APIRouter()

@router.post("/apply", response_model=LoanApplicationResponse)
async def apply_for_loan(
    application: LoanApplicationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Calculate ML Score
    input_data = [
        application.monthly_income * 12,
        application.total_assets,
        application.total_debt_amount,
        application.num_debts,
        application.monthly_emis,
        application.amount_requested
    ]
    
    score = credit_model.predict(input_data)
    
    # Simple logic for status and acceptance based on score
    # Score is 0-1
    status_str = "pending"
    acceptance = score * 100 # percentage
    
    if score > 0.7:
        status_str = "approved"
    elif score < 0.3:
        status_str = "rejected"
        
    db_loan = LoanApplication(
        user_id=current_user.id,
        amount_requested=application.amount_requested,
        num_debts=application.num_debts,
        total_debt_amount=application.total_debt_amount,
        monthly_emis=application.monthly_emis,
        total_assets=application.total_assets,
        monthly_income=application.monthly_income,
        ml_score=score,
        acceptance_rate=acceptance,
        status=status_str,
        feedback={"note": "Automated scoring applied"}
    )
    
    db.add(db_loan)
    await db.commit()
    await db.refresh(db_loan)
    return db_loan

@router.get("/user/{id}", response_model=List[LoanApplicationResponse])
async def get_user_loans(
    id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if str(current_user.id) != id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    result = await db.execute(select(LoanApplication).where(LoanApplication.user_id == id))
    return result.scalars().all()

@router.get("/{loan_id}", response_model=LoanApplicationResponse)
async def get_loan(
    loan_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(LoanApplication).where(LoanApplication.id == loan_id))
    loan = result.scalars().first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
        
    if str(loan.user_id) != str(current_user.id):
         raise HTTPException(status_code=403, detail="Not authorized")
         
    return loan
