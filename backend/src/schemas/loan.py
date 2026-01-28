from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class LoanApplicationBase(BaseModel):
    # Personal Information
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    date_of_birth: Optional[datetime] = None
    address: Optional[str] = Field(None, max_length=500)
    city: Optional[str] = Field(None, max_length=100)
    state: Optional[str] = Field(None, max_length=100)
    zip_code: Optional[str] = Field(None, max_length=20)
    
    # Employment Information
    employment_status: Optional[str] = Field(None, max_length=50)
    employer: Optional[str] = Field(None, max_length=200)
    job_title: Optional[str] = Field(None, max_length=200)
    monthly_income: Optional[float] = Field(None, ge=0)
    employment_duration: Optional[str] = Field(None, max_length=50)
    
    # Loan Details
    loan_amount: float = Field(..., gt=0)
    loan_purpose: Optional[str] = Field(None, max_length=1000)
    loan_term: int = Field(..., gt=0, le=360)  # max 30 years
    
    # Financial Information
    total_assets: Optional[float] = Field(None, ge=0)
    has_past_debts: Optional[bool] = None
    number_of_debts: Optional[int] = Field(None, ge=0)
    has_emi: Optional[bool] = None
    emi_amount: Optional[float] = Field(None, ge=0)
    
    # Metadata
    user_ip: Optional[str] = Field(None, max_length=45)
    user_agent: Optional[str] = None


class LoanApplicationCreate(LoanApplicationBase):
    pass


class LoanApplicationUpdate(BaseModel):
    # Personal Information
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, max_length=20)
    date_of_birth: Optional[datetime] = None
    address: Optional[str] = Field(None, max_length=500)
    city: Optional[str] = Field(None, max_length=100)
    state: Optional[str] = Field(None, max_length=100)
    zip_code: Optional[str] = Field(None, max_length=20)
    
    # Employment Information
    employment_status: Optional[str] = Field(None, max_length=50)
    employer: Optional[str] = Field(None, max_length=200)
    job_title: Optional[str] = Field(None, max_length=200)
    monthly_income: Optional[float] = Field(None, ge=0)
    employment_duration: Optional[str] = Field(None, max_length=50)
    
    # Loan Details
    loan_amount: Optional[float] = Field(None, gt=0)
    loan_purpose: Optional[str] = Field(None, max_length=1000)
    loan_term: Optional[int] = Field(None, gt=0, le=360)
    
    # Financial Information
    total_assets: Optional[float] = Field(None, ge=0)
    has_past_debts: Optional[bool] = None
    number_of_debts: Optional[int] = Field(None, ge=0)
    has_emi: Optional[bool] = None
    emi_amount: Optional[float] = Field(None, ge=0)
    
    # Application Status
    status: Optional[str] = Field(None, pattern="^(pending|approved|rejected|under_review)$")
    
    # File upload
    transaction_file_url: Optional[str] = Field(None, max_length=1000)
    transaction_file_name: Optional[str] = Field(None, max_length=500)


class LoanApplicationResponse(LoanApplicationBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    status: str
    transaction_file_url: Optional[str] = None
    transaction_file_name: Optional[str] = None
    
    class Config:
        from_attributes = True


class TransactionRecordBase(BaseModel):
    transaction_date: Optional[datetime] = None
    description: Optional[str] = None
    amount: Optional[float] = None
    transaction_type: Optional[str] = Field(None, pattern="^(credit|debit)$")
    balance: Optional[float] = None
    category: Optional[str] = Field(None, max_length=100)


class TransactionRecordCreate(TransactionRecordBase):
    application_id: UUID


class TransactionRecordResponse(TransactionRecordBase):
    id: UUID
    created_at: datetime
    application_id: UUID
    
    class Config:
        from_attributes = True


class FileUploadResponse(BaseModel):
    path: str
    publicUrl: str
    fileName: str
