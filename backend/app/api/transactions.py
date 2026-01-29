from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.db.models import Transaction, FinancialBehavior, User
from app.schemas.transaction import TransactionResponse, FinancialBehaviorResponse
from app.core.dependencies import get_current_user
from app.utils.file_parser import parse_transaction_file
from app.ml.behavior_scoring import analyze_behavior
import json

router = APIRouter()

@router.post("/upload", response_model=TransactionResponse)
async def upload_transactions(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # 1. Parse File
    df = await parse_transaction_file(file)
    
    # 2. Convert to JSON for storage
    records = df.to_dict(orient='records')
    
    # 3. Analyze
    analysis = analyze_behavior(df)
    
    # 4. Save Transaction Record
    db_transaction = Transaction(
        user_id=current_user.id,
        file_name=file.filename,
        transaction_data=records, # Storing raw data might be heavy, but requested
        analysis_result=analysis
    )
    db.add(db_transaction)
    
    # 5. Update/Create Financial Behavior
    # Check if exists
    result = await db.execute(select(FinancialBehavior).where(FinancialBehavior.user_id == current_user.id))
    behavior = result.scalars().first()
    
    if not behavior:
        behavior = FinancialBehavior(user_id=current_user.id)
        db.add(behavior)
    
    behavior.total_score = analysis['total_score']
    behavior.behavior_rating = analysis['behavior_rating']
    behavior.category_scores = analysis['category_scores']
    behavior.liquidity_resilience_days = analysis['liquidity_resilience_days']
    
    await db.commit()
    await db.refresh(db_transaction)
    
    return db_transaction

@router.get("/analyze/{id}", response_model=TransactionResponse)
async def get_analysis(
    id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(Transaction).where(Transaction.id == id))
    transaction = result.scalars().first()
    
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    if str(transaction.user_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized")
        
    return transaction
