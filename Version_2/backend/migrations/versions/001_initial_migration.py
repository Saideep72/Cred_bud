"""Initial migration - create users, loan_applications, and transaction_records tables

Revision ID: 001
Revises: 
Create Date: 2024-01-28 12:43:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create users table
    op.create_table('users',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('is_verified', sa.Boolean(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('first_name', sa.String(length=100), nullable=True),
        sa.Column('last_name', sa.String(length=100), nullable=True),
        sa.Column('phone', sa.String(length=20), nullable=True),
        sa.Column('date_of_birth', sa.DateTime(timezone=True), nullable=True),
        sa.Column('address', sa.String(length=500), nullable=True),
        sa.Column('city', sa.String(length=100), nullable=True),
        sa.Column('state', sa.String(length=100), nullable=True),
        sa.Column('zip_code', sa.String(length=20), nullable=True),
        sa.Column('employment_status', sa.String(length=50), nullable=True),
        sa.Column('employer', sa.String(length=200), nullable=True),
        sa.Column('job_title', sa.String(length=200), nullable=True),
        sa.Column('monthly_income', sa.String(length=20), nullable=True),
        sa.Column('employment_duration', sa.String(length=50), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    
    # Create loan_applications table
    op.create_table('loan_applications',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('first_name', sa.String(length=100), nullable=False),
        sa.Column('last_name', sa.String(length=100), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('phone', sa.String(length=20), nullable=True),
        sa.Column('date_of_birth', sa.DateTime(timezone=True), nullable=True),
        sa.Column('address', sa.String(length=500), nullable=True),
        sa.Column('city', sa.String(length=100), nullable=True),
        sa.Column('state', sa.String(length=100), nullable=True),
        sa.Column('zip_code', sa.String(length=20), nullable=True),
        sa.Column('employment_status', sa.String(length=50), nullable=True),
        sa.Column('employer', sa.String(length=200), nullable=True),
        sa.Column('job_title', sa.String(length=200), nullable=True),
        sa.Column('monthly_income', sa.Float(), nullable=True),
        sa.Column('employment_duration', sa.String(length=50), nullable=True),
        sa.Column('loan_amount', sa.Float(), nullable=False),
        sa.Column('loan_purpose', sa.Text(), nullable=True),
        sa.Column('loan_term', sa.Integer(), nullable=False),
        sa.Column('total_assets', sa.Float(), nullable=True),
        sa.Column('has_past_debts', sa.Boolean(), nullable=True),
        sa.Column('number_of_debts', sa.Integer(), nullable=True),
        sa.Column('has_emi', sa.Boolean(), nullable=True),
        sa.Column('emi_amount', sa.Float(), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('transaction_file_url', sa.String(length=1000), nullable=True),
        sa.Column('transaction_file_name', sa.String(length=500), nullable=True),
        sa.Column('user_ip', sa.String(length=45), nullable=True),
        sa.Column('user_agent', sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_loan_applications_email'), 'loan_applications', ['email'], unique=False)
    
    # Create transaction_records table
    op.create_table('transaction_records',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('application_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('transaction_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('amount', sa.Float(), nullable=True),
        sa.Column('transaction_type', sa.String(length=10), nullable=True),
        sa.Column('balance', sa.Float(), nullable=True),
        sa.Column('category', sa.String(length=100), nullable=True),
        sa.ForeignKeyConstraint(['application_id'], ['loan_applications.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    op.drop_table('transaction_records')
    op.drop_index(op.f('ix_loan_applications_email'), table_name='loan_applications')
    op.drop_table('loan_applications')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
