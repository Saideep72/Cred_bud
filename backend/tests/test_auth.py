import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from src.models.user import User
from src.utils.security import verify_password


class TestAuth:
    """Test authentication endpoints"""
    
    async def test_register_user(self, client: AsyncClient, db_session: AsyncSession):
        """Test user registration"""
        user_data = {
            "email": "newuser@example.com",
            "password": "password123",
            "first_name": "New",
            "last_name": "User",
        }
        
        response = await client.post("/api/auth/register", json=user_data)
        
        assert response.status_code == 201
        data = response.json()
        assert data["email"] == user_data["email"]
        assert data["first_name"] == user_data["first_name"]
        assert data["is_verified"] is False
        
        # Verify user was created in database
        result = await db_session.execute(
            "SELECT * FROM users WHERE email = :email",
            {"email": user_data["email"]}
        )
        user = result.fetchone()
        assert user is not None
        assert verify_password(user_data["password"], user["hashed_password"])
    
    async def test_register_duplicate_email(self, client: AsyncClient, test_user: User):
        """Test registration with duplicate email"""
        user_data = {
            "email": test_user.email,
            "password": "password123",
            "first_name": "Duplicate",
            "last_name": "User",
        }
        
        response = await client.post("/api/auth/register", json=user_data)
        
        assert response.status_code == 400
        assert "Email already registered" in response.json()["detail"]
    
    async def test_login_success(self, client: AsyncClient, test_user: User):
        """Test successful login"""
        login_data = {
            "email": test_user.email,
            "password": "password123",  # This matches the hashed password in fixture
        }
        
        response = await client.post("/api/auth/login", json=login_data)
        
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["token_type"] == "bearer"
    
    async def test_login_invalid_credentials(self, client: AsyncClient):
        """Test login with invalid credentials"""
        login_data = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword",
        }
        
        response = await client.post("/api/auth/login", json=login_data)
        
        assert response.status_code == 401
        assert "Invalid email or password" in response.json()["detail"]
    
    async def test_login_unverified_user(self, client: AsyncClient, db_session: AsyncSession):
        """Test login with unverified user"""
        # Create unverified user
        unverified_user = User(
            email="unverified@example.com",
            hashed_password="$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LFvO6",
            first_name="Unverified",
            last_name="User",
            is_verified=False,
            is_active=True,
        )
        db_session.add(unverified_user)
        await db_session.commit()
        
        login_data = {
            "email": unverified_user.email,
            "password": "password123",
        }
        
        response = await client.post("/api/auth/login", json=login_data)
        
        assert response.status_code == 400
        assert "Email not verified" in response.json()["detail"]
    
    async def test_get_current_user(self, client: AsyncClient, test_user: User):
        """Test getting current user info"""
        # Login to get token
        login_data = {
            "email": test_user.email,
            "password": "password123",
        }
        login_response = await client.post("/api/auth/login", json=login_data)
        token = login_response.json()["access_token"]
        
        # Get current user
        headers = {"Authorization": f"Bearer {token}"}
        response = await client.get("/api/auth/me", headers=headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == test_user.email
        assert data["first_name"] == test_user.first_name
    
    async def test_get_current_user_invalid_token(self, client: AsyncClient):
        """Test getting current user with invalid token"""
        headers = {"Authorization": "Bearer invalid_token"}
        response = await client.get("/api/auth/me", headers=headers)
        
        assert response.status_code == 401
