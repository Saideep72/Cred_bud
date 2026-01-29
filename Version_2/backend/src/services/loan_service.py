from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status, UploadFile
from typing import List, Optional
from uuid import UUID
import os
import csv
import io
from datetime import datetime

from ..models.loan import LoanApplication, TransactionRecord
from ..schemas.loan import LoanApplicationCreate, LoanApplicationUpdate, TransactionRecordCreate


class LoanService:
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def create_application(self, application_data: LoanApplicationCreate) -> LoanApplication:
        """Create a new loan application"""
        db_application = LoanApplication(**application_data.dict())
        
        self.db.add(db_application)
        await self.db.commit()
        await self.db.refresh(db_application)
        
        return db_application
    
    async def get_user_applications(self, email: str) -> List[LoanApplication]:
        """Get all loan applications for a user by email"""
        result = await self.db.execute(
            select(LoanApplication)
            .where(LoanApplication.email == email)
            .order_by(LoanApplication.created_at.desc())
        )
        return result.scalars().all()
    
    async def get_application_by_id(self, application_id: UUID) -> Optional[LoanApplication]:
        """Get a single loan application by ID"""
        result = await self.db.execute(
            select(LoanApplication)
            .options(selectinload(LoanApplication.transaction_records))
            .where(LoanApplication.id == application_id)
        )
        return result.scalar_one_or_none()
    
    async def update_application(
        self, 
        application_id: UUID, 
        update_data: LoanApplicationUpdate
    ) -> Optional[LoanApplication]:
        """Update a loan application"""
        result = await self.db.execute(
            select(LoanApplication).where(LoanApplication.id == application_id)
        )
        application = result.scalar_one_or_none()
        
        if not application:
            return None
        
        # Update fields
        update_dict = update_data.dict(exclude_unset=True)
        for field, value in update_dict.items():
            setattr(application, field, value)
        
        await self.db.commit()
        await self.db.refresh(application)
        
        return application
    
    async def update_application_with_file(
        self, 
        application_id: UUID, 
        file_url: str, 
        file_name: str
    ) -> Optional[LoanApplication]:
        """Update application with file reference"""
        return await self.update_application(
            application_id,
            LoanApplicationUpdate(
                transaction_file_url=file_url,
                transaction_file_name=file_name
            )
        )
    
    async def delete_application(self, application_id: UUID) -> bool:
        """Delete a loan application"""
        result = await self.db.execute(
            select(LoanApplication).where(LoanApplication.id == application_id)
        )
        application = result.scalar_one_or_none()
        
        if not application:
            return False
        
        await self.db.delete(application)
        await self.db.commit()
        
        return True
    
    async def get_all_applications(
        self, 
        skip: int = 0, 
        limit: int = 100,
        status_filter: Optional[str] = None
    ) -> List[LoanApplication]:
        """Get all loan applications with optional filtering"""
        query = select(LoanApplication)
        
        if status_filter:
            query = query.where(LoanApplication.status == status_filter)
        
        query = query.order_by(LoanApplication.created_at.desc()).offset(skip).limit(limit)
        
        result = await self.db.execute(query)
        return result.scalars().all()
    
    async def store_transaction_records(
        self, 
        application_id: UUID, 
        transactions: List[TransactionRecordCreate]
    ) -> List[TransactionRecord]:
        """Store multiple transaction records"""
        db_transactions = []
        
        for transaction in transactions:
            db_transaction = TransactionRecord(
                application_id=application_id,
                **transaction.dict(exclude={"application_id"})
            )
            db_transactions.append(db_transaction)
        
        self.db.add_all(db_transactions)
        await self.db.commit()
        
        # Refresh to get generated IDs
        for transaction in db_transactions:
            await self.db.refresh(transaction)
        
        return db_transactions
    
    async def parse_csv_transactions(self, file: UploadFile) -> List[TransactionRecordCreate]:
        """Parse CSV file and extract transaction records"""
        if not file.filename.endswith('.csv'):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File must be a CSV"
            )
        
        # Read file content
        content = await file.read()
        csv_content = content.decode('utf-8')
        
        # Parse CSV
        csv_reader = csv.DictReader(io.StringIO(csv_content))
        transactions = []
        
        for row in csv_reader:
            # Try to parse common CSV formats
            transaction = TransactionRecordCreate(
                application_id=UUID('00000000-0000-0000-0000-000000000000'),  # Placeholder
                transaction_date=self._parse_date(row.get('Date', row.get('Transaction Date', ''))),
                description=row.get('Description', row.get('Particulars', row.get('Narration', ''))),
                amount=self._parse_amount(row.get('Amount', row.get('Debit', row.get('Credit', '')))),
                transaction_type=self._determine_transaction_type(row),
                balance=self._parse_amount(row.get('Balance', '')),
                category=row.get('Category', '')
            )
            transactions.append(transaction)
        
        return transactions
    
    def _parse_date(self, date_str: str) -> Optional[datetime]:
        """Parse date from various formats"""
        if not date_str:
            return None
        
        # Common date formats
        formats = [
            '%Y-%m-%d',
            '%d-%m-%Y',
            '%m/%d/%Y',
            '%d/%m/%Y',
            '%Y/%m/%d',
            '%d %b %Y',
            '%d %B %Y',
        ]
        
        for fmt in formats:
            try:
                return datetime.strptime(date_str.strip(), fmt)
            except ValueError:
                continue
        
        return None
    
    def _parse_amount(self, amount_str: str) -> Optional[float]:
        """Parse amount from string"""
        if not amount_str:
            return None
        
        try:
            # Remove currency symbols, commas, and spaces
            clean_amount = amount_str.replace(',', '').replace('$', '').replace('₹', '').strip()
            
            # Handle parentheses for negative amounts
            if clean_amount.startswith('(') and clean_amount.endswith(')'):
                clean_amount = '-' + clean_amount[1:-1]
            
            return float(clean_amount)
        except ValueError:
            return None
    
    def _determine_transaction_type(self, row: dict) -> Optional[str]:
        """Determine transaction type from CSV row"""
        # Check for explicit type
        if 'Type' in row:
            return row['Type'].lower()
        
        # Check for debit/credit columns
        debit = row.get('Debit', '').strip()
        credit = row.get('Credit', '').strip()
        
        if debit and debit != '':
            return 'debit'
        elif credit and credit != '':
            return 'credit'
        
        # Try to infer from amount
        amount = row.get('Amount', '').strip()
        if amount.startswith('-'):
            return 'debit'
        elif amount and not amount.startswith('-'):
            return 'credit'
        
        return None
    
    async def get_application_statistics(self) -> dict:
        """Get application statistics"""
        total_result = await self.db.execute(
            select(LoanApplication)
        )
        total_applications = len(total_result.scalars().all())
        
        pending_result = await self.db.execute(
            select(LoanApplication).where(LoanApplication.status == 'pending')
        )
        pending_applications = len(pending_result.scalars().all())
        
        approved_result = await self.db.execute(
            select(LoanApplication).where(LoanApplication.status == 'approved')
        )
        approved_applications = len(approved_result.scalars().all())
        
        rejected_result = await self.db.execute(
            select(LoanApplication).where(LoanApplication.status == 'rejected')
        )
        rejected_applications = len(rejected_result.scalars().all())
        
        return {
            "total_applications": total_applications,
            "pending_applications": pending_applications,
            "approved_applications": approved_applications,
            "rejected_applications": rejected_applications,
            "approval_rate": (approved_applications / total_applications * 100) if total_applications > 0 else 0
        }
