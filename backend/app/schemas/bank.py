from pydantic import BaseModel
from typing import List

class BankBase(BaseModel):
    id: int
    name: str
    interest_rate: float
    max_loan_amount: float
    min_credit_score: float
    trust_score: float
    # New fields for UI
    processing_fee: float = 0.0
    tenure: str = "1-5 Years"
    rating: float = 0.0
    reviews: int = 0
    approval_time: str = "24 Hours"
    logo_url: str = None

class BankResponse(BankBase):
    pass

class BankList(BaseModel):
    banks: List[BankResponse]
