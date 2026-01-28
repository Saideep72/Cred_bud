# CredBud - Credit Decision Platform

A modern, containerized credit decision platform with authentication, PostgreSQL database, and React frontend.

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed on your system
- Git

### One-Command Deployment

```bash
# Clone and run
git clone <your-repo-url>
cd credbud
docker-compose up -d
```

That's it! The application will be available at:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📋 Services Included

### 🌐 Frontend (React + TypeScript)
- Modern React 18 with TypeScript
- Tailwind CSS for styling
- Authentication with JWT tokens
- Protected routes and user management
- Responsive design

### 🔧 Backend (FastAPI + PostgreSQL)
- FastAPI with async support
- PostgreSQL database with SQLAlchemy ORM
- JWT authentication
- RESTful API with OpenAPI documentation
- Health checks and error handling

### 🗄️ Database (PostgreSQL)
- PostgreSQL 15 with UUID support
- Persistent data storage
- Automatic initialization

## 🛠️ Development Setup

### Local Development

```bash
# Frontend
npm install
npm run dev

# Backend (in separate terminal)
cd backend
pip install -r requirements.txt
python -m src.main
```

### Docker Development

```bash
# Build and run with hot reload
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📁 Project Structure

```
credbud/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── contexts/          # React contexts (Auth)
│   ├── pages/             # Page components
│   └── types/             # TypeScript types
├── backend/               # Backend source code
│   ├── src/
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── schemas/       # Pydantic schemas
│   │   └── services/      # Business logic
│   ├── migrations/        # Database migrations
│   └── requirements.txt   # Python dependencies
├── docker-compose.yml     # Docker orchestration
├── Dockerfile            # Frontend Dockerfile
├── backend/Dockerfile    # Backend Dockerfile
└── nginx.conf            # Nginx configuration
```

## 🔐 Authentication

The application includes a complete authentication system:

- **Registration**: User signup with email verification
- **Login**: JWT-based authentication
- **Protected Routes**: Only authenticated users can access certain pages
- **Token Management**: Automatic token refresh and storage

### API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `GET /api/health` - Health check

## 🌍 Environment Variables

Create a `.env` file based on `.env.docker`:

```bash
cp .env.docker .env
```

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT secret key
- `DEBUG` - Enable debug mode

## 📊 Monitoring & Health Checks

All services include health checks:

```bash
# Check service status
docker-compose ps

# View health status
curl http://localhost/api/health
```

## 🚀 Deployment

### Production Deployment

1. **Update Environment Variables**
   ```bash
   # Set strong secrets
   SECRET_KEY=your-very-strong-secret-key
   DATABASE_URL=your-production-database-url
   ```

2. **Deploy with Docker Compose**
   ```bash
   docker-compose -f docker-compose.yml up -d
   ```

3. **Setup Reverse Proxy** (optional)
   Configure Nginx or your preferred reverse proxy to point to the frontend container.

### Docker Hub Deployment

```bash
# Build and push images
docker build -t your-username/credbud-frontend .
docker build -f backend/Dockerfile -t your-username/credbud-backend .

# Push to registry
docker push your-username/credbud-frontend
docker push your-username/credbud-backend
```

## 🧪 Testing

```bash
# Frontend tests
npm test

# Backend tests
cd backend
pytest

# Integration tests
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 📝 Logging

```bash
# View all logs
docker-compose logs

# Follow logs
docker-compose logs -f

# Specific service logs
docker-compose logs -f backend
```

## 🔧 Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Ensure ports 80, 8000, and 5432 are available
   - Modify ports in `docker-compose.yml` if needed

2. **Database Connection**
   - Wait for PostgreSQL to fully start
   - Check database logs: `docker-compose logs postgres`

3. **Build Failures**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild: `docker-compose build --no-cache`

### Reset Everything

```bash
# Stop and remove all containers
docker-compose down -v

# Remove all images
docker system prune -a

# Rebuild from scratch
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Create an issue in the repository
- Check the logs for error messages
- Ensure all prerequisites are met
