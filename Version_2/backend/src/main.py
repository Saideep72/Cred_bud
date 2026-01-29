from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

from .config import settings
from .db import engine, Base, get_db
from .models.user import User
from .models.loan import LoanApplication
from .schemas.auth import UserCreate, UserLogin, UserResponse, Token
from .routes import auth_router
from .services.auth import get_current_user

# Create FastAPI app
app = FastAPI(
    title="CredBud API",
    description="Backend API for CredBud loan application system",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS - Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# JWT Configuration
SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "CredBud API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "CredBud Backend"}

# Get current user endpoint
@app.get("/api/auth/me")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "name": f"{current_user.first_name or ''} {current_user.last_name or ''}".strip() or current_user.email,
        "role": "user",
        "created_at": current_user.created_at.isoformat()
    }

# Include routers (auth only for now)
app.include_router(auth_router)
# app.include_router(loan_router)  # Temporarily disabled

# Simple loan endpoints for testing
@app.get("/api/loan/applications")
async def get_applications(db: AsyncSession = Depends(get_db)):
    """Get all loan applications"""
    try:
        result = await db.execute(select(LoanApplication))
        applications = result.scalars().all()
        
        return {
            "applications": [
                {
                    "id": str(app.id),
                    "user_id": str(app.user_id),
                    "loan_amount": app.loan_amount,
                    "loan_purpose": app.loan_purpose,
                    "status": app.status,
                    "created_at": app.created_at.isoformat()
                }
                for app in applications
            ],
            "count": len(applications)
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch applications: {str(e)}"
        )

@app.post("/api/loan/applications")
async def create_application(
    application_data: dict,
    db: AsyncSession = Depends(get_db)
):
    """Create a new loan application"""
    try:
        # Create loan application with required fields
        db_application = LoanApplication(
            user_id=application_data.get("user_id"),
            first_name=application_data.get("first_name", "Test"),
            last_name=application_data.get("last_name", "User"),
            email=application_data.get("email", "test@example.com"),
            loan_amount=application_data.get("loan_amount"),
            loan_purpose=application_data.get("loan_purpose"),
            loan_term=application_data.get("loan_term", 12),  # Default 12 months
            status="pending",
            created_at=datetime.utcnow()
        )
        
        db.add(db_application)
        await db.commit()
        await db.refresh(db_application)
        
        return {
            "id": str(db_application.id),
            "user_id": str(db_application.user_id) if db_application.user_id else None,
            "loan_amount": db_application.loan_amount,
            "loan_purpose": db_application.loan_purpose,
            "status": db_application.status,
            "created_at": db_application.created_at.isoformat(),
            "message": "Application created successfully"
        }
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create application: {str(e)}"
        )

# Serve uploaded files
if os.path.exists("uploads"):
    app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
async def startup_event():
    """Create database tables on startup"""
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("✅ Database tables created successfully")
    except Exception as e:
        print(f"❌ Failed to create database tables: {e}")

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Global HTTP exception handler"""
    return {
        "error": {
            "status_code": exc.status_code,
            "detail": exc.detail,
            "type": "http_exception"
        }
    }

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """Global exception handler for unexpected errors"""
    return {
        "error": {
            "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "detail": "Internal server error",
            "type": "general_exception"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug,
        log_level="debug" if settings.debug else "info"
    )
