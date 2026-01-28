from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

from .config import settings
from .db import engine, Base
from .routes import auth_router, loan_router

# Create FastAPI app
app = FastAPI(
    title="CredBud API",
    description="Backend API for CredBud loan application system",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api")
app.include_router(loan_router, prefix="/api")

# Serve uploaded files
if os.path.exists("uploads"):
    app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.on_event("startup")
async def startup_event():
    """Create database tables on startup"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "CredBud API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


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
