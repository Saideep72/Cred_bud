import pytest
from httpx import AsyncClient
from app.main import app
import pytest_asyncio

@pytest_asyncio.fixture(scope="module")
async def client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.mark.asyncio
async def test_health_check(client):
    """Test the health check endpoint"""
    response = await client.get("/health")
    # Health endpoint might return 200 or 503 depending on DB, but for now we expect 200
    # based on verify_backend.py output
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

@pytest.mark.asyncio
async def test_openapi_docs(client):
    """Test that OpenAPI docs are accessible"""
    response = await client.get("/docs")
    assert response.status_code == 200
