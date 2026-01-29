from typing import Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: str
    city_tier: int

class UserCreate(UserBase):
    password: str
    id: Optional[UUID] = None

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    city_tier: Optional[int] = None
    # Password update handled specifically if needed

class UserResponse(UserBase):
    id: UUID
    created_at: datetime
    
    class Config:
        from_attributes = True
