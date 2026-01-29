from fastapi import APIRouter
from typing import List
from app.schemas.bank import BankResponse

router = APIRouter()

# Mock Data
MOCK_BANKS = [
    {
        "id": 1, 
        "name": "HDFC Bank", 
        "interest_rate": 10.5, 
        "max_loan_amount": 1500000, 
        "min_credit_score": 750, 
        "trust_score": 9.8,
        "processing_fee": 2.0,
        "tenure": "1-5 Years",
        "rating": 4.8,
        "reviews": 1250,
        "approval_time": "24 Hours",
        "logo_url": "https://placehold.co/100x100/003366/FFFFFF/png?text=HDFC"
    },
    {
        "id": 2, 
        "name": "ICICI Bank", 
        "interest_rate": 10.75, 
        "max_loan_amount": 1200000, 
        "min_credit_score": 720, 
        "trust_score": 9.5,
        "processing_fee": 1.5,
        "tenure": "1-4 Years",
        "rating": 4.6,
        "reviews": 980,
        "approval_time": "48 Hours",
        "logo_url": "https://placehold.co/100x100/F37E20/FFFFFF/png?text=ICICI"
    },
    {
        "id": 3, 
        "name": "SBI", 
        "interest_rate": 9.8, 
        "max_loan_amount": 2000000, 
        "min_credit_score": 700, 
        "trust_score": 9.9,
        "processing_fee": 1.0,
        "tenure": "1-7 Years",
        "rating": 4.9,
        "reviews": 2100,
        "approval_time": "72 Hours",
        "logo_url": "https://placehold.co/100x100/280071/FFFFFF/png?text=SBI"
    },
    {
        "id": 4, 
        "name": "Axis Bank", 
        "interest_rate": 11.0, 
        "max_loan_amount": 1000000, 
        "min_credit_score": 700, 
        "trust_score": 9.2,
        "processing_fee": 1.0,
        "tenure": "2-5 Years",
        "rating": 4.5,
        "reviews": 670,
        "approval_time": "36 Hours",
        "logo_url": "https://placehold.co/100x100/97144D/FFFFFF/png?text=Axis"
    },
    {
        "id": 5, 
        "name": "Kotak Mahindra", 
        "interest_rate": 11.5, 
        "max_loan_amount": 800000, 
        "min_credit_score": 680, 
        "trust_score": 9.0,
        "processing_fee": 2.0,
        "tenure": "1-3 Years",
        "rating": 4.2,
        "reviews": 450,
        "approval_time": "12 Hours",
        "logo_url": "https://placehold.co/100x100/ED1C24/FFFFFF/png?text=Kotak"
    },
    {
        "id": 6, 
        "name": "Bajaj Finserv", 
        "interest_rate": 14.0, 
        "max_loan_amount": 500000, 
        "min_credit_score": 650, 
        "trust_score": 8.5,
        "processing_fee": 2.5,
        "tenure": "1-2 Years",
        "rating": 4.0,
        "reviews": 320,
        "approval_time": "6 Hours",
        "logo_url": "https://placehold.co/100x100/0072BC/FFFFFF/png?text=Bajaj"
    }
]

@router.get("/", response_model=List[BankResponse])
async def get_banks():
    return MOCK_BANKS

@router.get("/top", response_model=List[BankResponse])
async def get_top_banks():
    return sorted(MOCK_BANKS, key=lambda x: x['interest_rate'])[:2]

@router.get("/trusted", response_model=List[BankResponse])
async def get_trusted_banks():
    return [b for b in MOCK_BANKS if b['trust_score'] > 9.5]
