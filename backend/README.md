# CredBud Backend API

FastAPI backend for the CredBud loan application system, built with PostgreSQL and async SQLAlchemy.

## Features

- **FastAPI** with async support
- **PostgreSQL** database with async SQLAlchemy
- **JWT Authentication** with access/refresh tokens
- **Email Verification** using SMTP
- **File Upload** for transaction CSV files
- **Loan Application** CRUD operations
- **Transaction Record** parsing and storage
- **Alembic** migrations
- **Comprehensive Tests** with pytest

## Frontend API Analysis Summary

The backend is designed to match the exact API contracts used by the CredBud frontend:

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/resend-verification` - Resend verification email
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

#### Loan Applications
- `POST /api/loan/applications` - Create loan application
- `GET /api/loan/applications?email={email}` - Get user applications
- `GET /api/loan/applications/{id}` - Get specific application
- `PUT /api/loan/applications/{id}` - Update application
- `DELETE /api/loan/applications/{id}` - Delete application
- `POST /api/loan/applications/{id}/upload` - Upload transaction file
- `POST /api/loan/applications/{id}/transactions` - Store transaction records
- `POST /api/loan/applications/{id}/parse-csv` - Parse and store CSV
- `GET /api/loan/applications/{id}/transactions` - Get transaction records
- `GET /api/loan/statistics` - Get application statistics

### Database Models

#### Users Table
- UUID primary key
- Email authentication
- Profile information (name, phone, address)
- Employment information
- Email verification status

#### Loan Applications Table
- UUID primary key
- Personal information (matches frontend form)
- Employment details
- Loan details (amount, purpose, term)
- Financial information (assets, debts, EMI)
- Application status tracking
- File upload references

#### Transaction Records Table
- UUID primary key
- Linked to loan applications
- Transaction details (date, description, amount, type)
- CSV parsing support

## Quick Start

### Prerequisites

- Python 3.8+
- PostgreSQL 12+
- Redis (optional, for caching)

### Installation

1. **Clone and setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Environment setup**
```bash
cp .env.example .env
# Edit .env with your database and email configuration
```

3. **Database setup**
```bash
# Create PostgreSQL database
createdb credbud

# Run migrations
alembic upgrade head
```

4. **Start the server**
```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### Environment Variables

```env
# Database
DATABASE_URL=postgresql+asyncpg://username:password@localhost:5432/credbud

# JWT
SECRET_KEY=your-super-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Testing

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=src

# Run specific test file
pytest tests/test_auth.py
```

## Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Downgrade migration
alembic downgrade -1

# View migration history
alembic history

# View current revision
alembic current
```

## Project Structure

```
backend/
├── src/
│   ├── main.py              # FastAPI app entry point
│   ├── config.py            # Configuration settings
│   ├── db.py                # Database setup
│   ├── dependencies.py      # FastAPI dependencies
│   ├── models/              # SQLAlchemy models
│   │   ├── base.py          # Base model
│   │   ├── user.py          # User model
│   │   └── loan.py          # Loan models
│   ├── schemas/             # Pydantic schemas
│   │   ├── auth.py          # Auth schemas
│   │   └── loan.py          # Loan schemas
│   ├── routes/              # API routes
│   │   ├── auth.py          # Auth endpoints
│   │   └── loan.py          # Loan endpoints
│   ├── services/            # Business logic
│   │   ├── auth_service.py  # Auth service
│   │   ├── email_service.py # Email service
│   │   └── loan_service.py  # Loan service
│   └── utils/               # Utilities
│       ├── security.py      # JWT/password utils
│       ├── tokens.py        # Token generation
│       └── file_upload.py   # File handling
├── migrations/              # Alembic migrations
├── tests/                   # Test suite
├── uploads/                 # File upload directory
├── requirements.txt         # Python dependencies
├── alembic.ini             # Alembic config
└── .env.example            # Environment template
```

## Development Notes

### Frontend Compatibility

This backend is specifically designed to work with the existing CredBud frontend without any modifications:

- **Supabase Compatibility**: The API endpoints match the frontend's Supabase calls
- **Data Formats**: Request/response schemas match frontend expectations
- **File Upload**: CSV upload and parsing matches frontend implementation
- **Authentication**: Optional auth system (frontend currently has no auth)

### Security Features

- **JWT Tokens**: Access and refresh tokens with proper expiration
- **Password Hashing**: bcrypt with passlib
- **Email Verification**: Required before login
- **CORS**: Properly configured for localhost development
- **Input Validation**: Pydantic schemas for all endpoints

### Async Architecture

- **Database**: Fully async SQLAlchemy with asyncpg
- **Email**: Async SMTP with aiosmtplib
- **File I/O**: Async file operations
- **API**: FastAPI async endpoints

## Production Deployment

1. **Environment Setup**
   - Use production database URL
   - Set strong SECRET_KEY
   - Configure production SMTP
   - Set DEBUG=False

2. **Database**
   - Use connection pooling
   - Enable SSL
   - Set up read replicas if needed

3. **Security**
   - Use HTTPS
   - Set up reverse proxy (nginx)
   - Configure rate limiting
   - Enable request logging

4. **Monitoring**
   - Add health checks
   - Set up error tracking
   - Monitor database performance
   - Log authentication events

## License

MIT License
