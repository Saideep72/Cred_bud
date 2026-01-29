import os
from typing import List
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    """Application settings loaded from environment variables"""
    
    PROJECT_NAME: str = "FinV2 Backend"
    API_V1_STR: str = "/api"
    
    # Database - from .env
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    
    # Supabase - from .env
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    
    # CORS - from .env
    CORS_ORIGINS: List[str] = [
        origin.strip() 
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")
    ]

settings = Settings()
