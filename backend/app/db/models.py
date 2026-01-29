from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    city_tier = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    loans = relationship("LoanApplication", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")
    financial_behavior = relationship("FinancialBehavior", back_populates="user", uselist=False)

class LoanApplication(Base):
    __tablename__ = "loan_applications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    amount_requested = Column(Float, nullable=False)
    num_debts = Column(Integer, nullable=False)
    total_debt_amount = Column(Float, nullable=False)
    monthly_emis = Column(Float, nullable=False)
    total_assets = Column(Float, nullable=False)
    monthly_income = Column(Float, nullable=False)
    
    ml_score = Column(Float, nullable=True)
    acceptance_rate = Column(Float, nullable=True)
    status = Column(String, default="pending")
    feedback = Column(JSONB, nullable=True)

    user = relationship("User", back_populates="loans")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    file_name = Column(String, nullable=False)
    transaction_data = Column(JSONB, nullable=False)
    analysis_result = Column(JSONB, nullable=True)

    user = relationship("User", back_populates="transactions")

class FinancialBehavior(Base):
    __tablename__ = "financial_behavior"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    total_score = Column(Float, nullable=True) # 0-10
    behavior_rating = Column(String, nullable=True) # good/average/bad
    category_scores = Column(JSONB, nullable=True)
    liquidity_resilience_days = Column(Integer, nullable=True)

    user = relationship("User", back_populates="financial_behavior")
