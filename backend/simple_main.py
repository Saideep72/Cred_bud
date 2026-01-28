from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI(title="CredBud API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "CredBud API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "CredBud Backend"}

# Mock auth endpoints
@app.post("/api/auth/register")
async def register():
    return {"message": "Registration endpoint", "status": "mock"}

@app.post("/api/auth/login")
async def login():
    return {"message": "Login endpoint", "status": "mock"}

# Mock loan endpoints
@app.get("/api/loan/applications")
async def get_applications():
    return {"applications": [], "status": "mock"}

@app.post("/api/loan/applications")
async def create_application():
    return {"message": "Application created", "status": "mock"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
