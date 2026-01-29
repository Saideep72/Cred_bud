from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from .base import BaseModel
import uuid


class LoanApplication(BaseModel):
    __tablename__ = "loan_applications"
    
    # Foreign key to user (optional for now since frontend doesn't have auth)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    
    # Personal Information
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(20), nullable=True)
    date_of_birth = Column(DateTime(timezone=True), nullable=True)
    address = Column(String(500), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    zip_code = Column(String(20), nullable=True)
    
    # Employment Information
    employment_status = Column(String(50), nullable=True)
    employer = Column(String(200), nullable=True)
    job_title = Column(String(200), nullable=True)
    monthly_income = Column(Float, nullable=True)
    employment_duration = Column(String(50), nullable=True)
    
    # Loan Details
    loan_amount = Column(Float, nullable=False)
    loan_purpose = Column(Text, nullable=True)
    loan_term = Column(Integer, nullable=False)  # in months
    
    # Financial Information
    total_assets = Column(Float, nullable=True)
    has_past_debts = Column(Boolean, nullable=True)
    number_of_debts = Column(Integer, nullable=True)
    has_emi = Column(Boolean, nullable=True)
    emi_amount = Column(Float, nullable=True)
    
    # Application Status
    status = Column(String(20), default="pending", nullable=False)  # pending, approved, rejected, under_review
    
    # File upload
    transaction_file_url = Column(String(1000), nullable=True)
    transaction_file_name = Column(String(500), nullable=True)
    
    # Metadata
    user_ip = Column(String(45), nullable=True)
    user_agent = Column(Text, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="loan_applications")
    transaction_records = relationship("TransactionRecord", back_populates="application", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<LoanApplication(id={self.id}, email={self.email}, amount={self.loan_amount}, status={self.status})>"


class TransactionRecord(BaseModel):
    __tablename__ = "transaction_records"
    
    # Foreign key to loan application
    application_id = Column(UUID(as_uuid=True), ForeignKey("loan_applications.id"), nullable=False)
    
    # Transaction details
    transaction_date = Column(DateTime(timezone=True), nullable=True)
    description = Column(Text, nullable=True)
    amount = Column(Float, nullable=True)
    transaction_type = Column(String(10), nullable=True)  # credit, debit
    balance = Column(Float, nullable=True)
    category = Column(String(100), nullable=True)
    
    # Relationships
    application = relationship("LoanApplication", back_populates="transaction_records")
    
    def __repr__(self):
        return f"<TransactionRecord(id={self.id}, application_id={self.application_id}, amount={self.amount})>"
