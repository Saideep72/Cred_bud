from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID

from ..db import get_db
from ..schemas.loan import (
    LoanApplicationCreate, LoanApplicationResponse, 
    TransactionRecordCreate, TransactionRecordResponse,
    FileUploadResponse
)
from ..services.loan_service import LoanService
from ..utils.file_upload import file_upload_service
from ..dependencies import get_current_user, get_current_user_optional
from ..models.user import User

router = APIRouter(prefix="/loan", tags=["loan applications"])


@router.post("/applications", response_model=LoanApplicationResponse, status_code=status.HTTP_201_CREATED)
async def create_application(
    application_data: LoanApplicationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Create a new loan application"""
    loan_service = LoanService(db)
    
    # If user is authenticated, associate with user
    if current_user:
        application_data.email = current_user.email
    
    application = await loan_service.create_application(application_data)
    return application


@router.get("/applications", response_model=List[LoanApplicationResponse])
async def get_user_applications(
    email: str = Query(..., description="User email to fetch applications for"),
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get loan applications for a user by email"""
    loan_service = LoanService(db)
    
    # If user is authenticated, they can only access their own applications
    if current_user and current_user.email != email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only access your own applications"
        )
    
    applications = await loan_service.get_user_applications(email)
    return applications


@router.get("/applications/{application_id}", response_model=LoanApplicationResponse)
async def get_application(
    application_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get a specific loan application"""
    loan_service = LoanService(db)
    application = await loan_service.get_application_by_id(application_id)
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # If user is authenticated, they can only access their own applications
    if current_user and current_user.email != application.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only access your own applications"
        )
    
    return application


@router.put("/applications/{application_id}", response_model=LoanApplicationResponse)
async def update_application(
    application_id: UUID,
    update_data: dict,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Update a loan application"""
    loan_service = LoanService(db)
    
    # First get the application to check ownership
    application = await loan_service.get_application_by_id(application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # If user is authenticated, they can only update their own applications
    if current_user and current_user.email != application.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only update your own applications"
        )
    
    # Update application
    from ..schemas.loan import LoanApplicationUpdate
    update_obj = LoanApplicationUpdate(**update_data)
    updated_application = await loan_service.update_application(application_id, update_obj)
    
    return updated_application


@router.delete("/applications/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_application(
    application_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Delete a loan application"""
    loan_service = LoanService(db)
    
    # First get the application to check ownership
    application = await loan_service.get_application_by_id(application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # If user is authenticated, they can only delete their own applications
    if current_user and current_user.email != application.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only delete your own applications"
        )
    
    success = await loan_service.delete_application(application_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete application"
        )


@router.post("/applications/{application_id}/upload", response_model=FileUploadResponse)
async def upload_transaction_file(
    application_id: UUID,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Upload transaction file for a loan application"""
    loan_service = LoanService(db)
    
    # Check if application exists and user has access
    application = await loan_service.get_application_by_id(application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # If user is authenticated, they can only upload to their own applications
    if current_user and current_user.email != application.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only upload files to your own applications"
        )
    
    # Upload file
    file_info = await file_upload_service.upload_transaction_file(file, application_id)
    
    # Update application with file reference
    await loan_service.update_application_with_file(
        application_id,
        file_info["publicUrl"],
        file_info["fileName"]
    )
    
    return FileUploadResponse(**file_info)


@router.post("/applications/{application_id}/transactions", response_model=List[TransactionRecordResponse])
async def store_transaction_records(
    application_id: UUID,
    transactions: List[TransactionRecordCreate],
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Store transaction records for a loan application"""
    loan_service = LoanService(db)
    
    # Check if application exists and user has access
    application = await loan_service.get_application_by_id(application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # If user is authenticated, they can only add transactions to their own applications
    if current_user and current_user.email != application.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only add transactions to your own applications"
        )
    
    # Store transaction records
    stored_transactions = await loan_service.store_transaction_records(application_id, transactions)
    return stored_transactions


@router.post("/applications/{application_id}/parse-csv", response_model=List[TransactionRecordResponse])
async def parse_and_store_csv(
    application_id: UUID,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Parse CSV file and store transaction records"""
    loan_service = LoanService(db)
    
    # Check if application exists and user has access
    application = await loan_service.get_application_by_id(application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # If user is authenticated, they can only upload to their own applications
    if current_user and current_user.email != application.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only upload files to your own applications"
        )
    
    # Parse CSV
    transactions = await loan_service.parse_csv_transactions(file)
    
    # Store transaction records
    stored_transactions = await loan_service.store_transaction_records(application_id, transactions)
    return stored_transactions


@router.get("/applications/{application_id}/transactions", response_model=List[TransactionRecordResponse])
async def get_transaction_records(
    application_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get transaction records for a loan application"""
    loan_service = LoanService(db)
    
    # Check if application exists and user has access
    application = await loan_service.get_application_by_id(application_id)
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # If user is authenticated, they can only access their own applications
    if current_user and current_user.email != application.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only access your own applications"
        )
    
    return application.transaction_records


@router.get("/statistics")
async def get_application_statistics(
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    """Get loan application statistics (admin only for now)"""
    loan_service = LoanService(db)
    statistics = await loan_service.get_application_statistics()
    return statistics
