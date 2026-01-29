from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from ..config import settings
import secrets


def generate_email_verification_token(email: str) -> str:
    """Generate email verification token"""
    expiry = datetime.utcnow() + timedelta(hours=24)  # 24 hour expiry
    payload = {
        "email": email,
        "exp": expiry,
        "type": "email_verification",
        "jti": secrets.token_urlsafe(32)  # Unique identifier
    }
    return jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)


def verify_email_verification_token(token: str) -> Optional[str]:
    """Verify email verification token and return email"""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        if payload.get("type") != "email_verification":
            return None
        return payload.get("email")
    except JWTError:
        return None


def generate_password_reset_token(email: str) -> str:
    """Generate password reset token"""
    expiry = datetime.utcnow() + timedelta(hours=1)  # 1 hour expiry
    payload = {
        "email": email,
        "exp": expiry,
        "type": "password_reset",
        "jti": secrets.token_urlsafe(32)  # Unique identifier
    }
    return jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)


def verify_password_reset_token(token: str) -> Optional[str]:
    """Verify password reset token and return email"""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        if payload.get("type") != "password_reset":
            return None
        return payload.get("email")
    except JWTError:
        return None
