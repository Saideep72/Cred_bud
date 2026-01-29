from typing import Optional, Dict, Any
from pydantic import BaseModel
from uuid import UUID

class LoanApplicationBase(BaseModel):
    amount_requested: float
    num_debts: int
    total_debt_amount: float
    monthly_emis: float
    total_assets: float
    monthly_income: float

class LoanApplicationCreate(LoanApplicationBase):
    pass

class LoanApplicationResponse(LoanApplicationBase):
    id: UUID
    user_id: UUID
    ml_score: Optional[float] = None
    acceptance_rate: Optional[float] = None
    status: str
    feedback: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True
