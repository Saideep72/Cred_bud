import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import uuid4

from src.models.loan import LoanApplication


class TestLoanApplication:
    """Test loan application endpoints"""
    
    async def test_create_application(self, client: AsyncClient):
        """Test creating a loan application"""
        application_data = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "loan_amount": 10000.0,
            "loan_term": 12,
            "loan_purpose": "Home renovation",
            "monthly_income": 5000.0,
            "employment_status": "employed",
        }
        
        response = await client.post("/api/loan/applications", json=application_data)
        
        assert response.status_code == 201
        data = response.json()
        assert data["first_name"] == application_data["first_name"]
        assert data["email"] == application_data["email"]
        assert data["loan_amount"] == application_data["loan_amount"]
        assert data["status"] == "pending"
        assert "id" in data
    
    async def test_get_user_applications(self, client: AsyncClient, test_loan_application: LoanApplication):
        """Test getting applications for a user"""
        response = await client.get(
            f"/api/loan/applications?email={test_loan_application.email}"
        )
        
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        assert any(app["id"] == str(test_loan_application.id) for app in data)
    
    async def test_get_application_by_id(self, client: AsyncClient, test_loan_application: LoanApplication):
        """Test getting a specific application"""
        response = await client.get(f"/api/loan/applications/{test_loan_application.id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == str(test_loan_application.id)
        assert data["email"] == test_loan_application.email
    
    async def test_get_nonexistent_application(self, client: AsyncClient):
        """Test getting a non-existent application"""
        fake_id = uuid4()
        response = await client.get(f"/api/loan/applications/{fake_id}")
        
        assert response.status_code == 404
        assert "Application not found" in response.json()["detail"]
    
    async def test_update_application(self, client: AsyncClient, test_loan_application: LoanApplication):
        """Test updating an application"""
        update_data = {
            "status": "under_review",
            "loan_purpose": "Updated purpose"
        }
        
        response = await client.put(
            f"/api/loan/applications/{test_loan_application.id}",
            json=update_data
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "under_review"
        assert data["loan_purpose"] == "Updated purpose"
    
    async def test_delete_application(self, client: AsyncClient, db_session: AsyncSession):
        """Test deleting an application"""
        # Create an application to delete
        application = LoanApplication(
            first_name="Delete",
            last_name="Me",
            email="delete@example.com",
            loan_amount=5000.0,
            loan_term=6,
        )
        db_session.add(application)
        await db_session.commit()
        
        response = await client.delete(f"/api/loan/applications/{application.id}")
        
        assert response.status_code == 204
        
        # Verify it's deleted
        get_response = await client.get(f"/api/loan/applications/{application.id}")
        assert get_response.status_code == 404
    
    async def test_upload_transaction_file(self, client: AsyncClient, test_loan_application: LoanApplication):
        """Test uploading a transaction file"""
        # Create a simple CSV file
        csv_content = """Date,Description,Amount,Type,Balance
2024-01-01,Salary Deposit,5000,Credit,5000
2024-01-02,Grocery Store,-50,Debit,4950
2024-01-03,Restaurant,-25,Debit,4925"""
        
        files = {"file": ("transactions.csv", csv_content, "text/csv")}
        response = await client.post(
            f"/api/loan/applications/{test_loan_application.id}/upload",
            files=files
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "path" in data
        assert "publicUrl" in data
        assert "fileName" in data
        assert data["fileName"] == "transactions.csv"
    
    async def test_upload_invalid_file_type(self, client: AsyncClient, test_loan_application: LoanApplication):
        """Test uploading an invalid file type"""
        files = {"file": ("document.txt", "This is not a CSV", "text/plain")}
        response = await client.post(
            f"/api/loan/applications/{test_loan_application.id}/upload",
            files=files
        )
        
        assert response.status_code == 400
        assert "Only CSV files are allowed" in response.json()["detail"]
    
    async def test_get_statistics(self, client: AsyncClient):
        """Test getting application statistics"""
        response = await client.get("/api/loan/statistics")
        
        assert response.status_code == 200
        data = response.json()
        assert "total_applications" in data
        assert "pending_applications" in data
        assert "approved_applications" in data
        assert "rejected_applications" in data
        assert "approval_rate" in data
        assert isinstance(data["total_applications"], int)
        assert isinstance(data["approval_rate"], (int, float))
