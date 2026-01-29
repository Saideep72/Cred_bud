from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from .base import BaseModel
import uuid


class User(BaseModel):
    __tablename__ = "users"
    
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    
    # Profile information
    first_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    date_of_birth = Column(DateTime(timezone=True), nullable=True)
    address = Column(String(500), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    zip_code = Column(String(20), nullable=True)
    
    # Employment information
    employment_status = Column(String(50), nullable=True)
    employer = Column(String(200), nullable=True)
    job_title = Column(String(200), nullable=True)
    monthly_income = Column(String(20), nullable=True)
    employment_duration = Column(String(50), nullable=True)
    
    # Relationships
    loan_applications = relationship("LoanApplication", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User(email={self.email}, is_verified={self.is_verified})>"
