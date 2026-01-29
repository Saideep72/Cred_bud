from typing import Optional, Dict, Any, List
from pydantic import BaseModel
from uuid import UUID

class TransactionBase(BaseModel):
    file_name: str

class TransactionCreate(TransactionBase):
    transaction_data: List[Dict[str, Any]] # Raw JSON data from file

class TransactionResponse(TransactionBase):
    id: UUID
    user_id: UUID
    analysis_result: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

class FinancialBehaviorResponse(BaseModel):
    id: UUID
    user_id: UUID
    total_score: Optional[float]
    behavior_rating: Optional[str]
    category_scores: Optional[Dict[str, Any]]
    liquidity_resilience_days: Optional[int]

    class Config:
        from_attributes = True
