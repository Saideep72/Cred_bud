import os
import uuid
from typing import Optional
from fastapi import UploadFile, HTTPException, status
from ..config import settings


class FileUploadService:
    def __init__(self):
        # Create uploads directory if it doesn't exist
        self.upload_dir = "uploads"
        self.transaction_files_dir = os.path.join(self.upload_dir, "transaction_files")
        os.makedirs(self.transaction_files_dir, exist_ok=True)
    
    async def upload_transaction_file(self, file: UploadFile, application_id: uuid.UUID) -> dict:
        """Upload transaction file and return file info"""
        if not file.filename:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No file provided"
            )
        
        # Validate file type
        if not file.filename.endswith('.csv'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only CSV files are allowed"
            )
        
        # Generate unique filename
        file_ext = file.filename.split('.')[-1]
        unique_filename = f"{application_id}/transaction_{uuid.uuid4().hex}.{file_ext}"
        file_path = os.path.join(self.transaction_files_dir, unique_filename)
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        # Save file
        try:
            with open(file_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to save file: {str(e)}"
            )
        
        # Generate public URL (in production, this would be a CDN URL)
        public_url = f"http://localhost:8000/uploads/transaction_files/{unique_filename}"
        
        return {
            "path": file_path,
            "publicUrl": public_url,
            "fileName": file.filename
        }
    
    def get_file_path(self, application_id: uuid.UUID, filename: str) -> str:
        """Get file path for serving"""
        file_path = os.path.join(self.transaction_files_dir, str(application_id), filename)
        
        if not os.path.exists(file_path):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="File not found"
            )
        
        return file_path


# Create singleton instance
file_upload_service = FileUploadService()
