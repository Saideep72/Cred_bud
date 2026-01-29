import sys
import asyncio

# Fix for Windows ProactorEventLoop issue with psycopg on Python 3.13
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import auth, user, loans, transactions, banks
from app.db.session import engine, Base

# Create tables logic usually goes into alembic migrations for production, 
# but for this standalone task without alembic explicitly req, we can init here or assume existing.
# However, async requires specific init. 
# We'll skip auto-create on start to adhere to 'production-ready' usually implying migrations,
# but since I need to make it RUNNABLE without external migration steps from the user (zero setup implicit),
# I will include a startup event to create tables if they don't exist for convenience in this specific "generate backend" task.

app = FastAPI(title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json")

# CORS
if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Routes
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(user.router, prefix=f"{settings.API_V1_STR}/user", tags=["user"])
app.include_router(loans.router, prefix=f"{settings.API_V1_STR}/loans", tags=["loans"])
app.include_router(transactions.router, prefix=f"{settings.API_V1_STR}/transactions", tags=["transactions"])
app.include_router(banks.router, prefix=f"{settings.API_V1_STR}/banks", tags=["banks"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.on_event("startup")
async def init_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
