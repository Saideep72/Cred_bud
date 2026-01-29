from .auth import router as auth_router
from .loan import router as loan_router

__all__ = ["auth_router", "loan_router"]
