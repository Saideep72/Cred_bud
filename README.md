# 💰 Cred Bud (FinV2)

A comprehensive financial management and loan prediction platform designed to help users track transactions, analyze spending behavior, and apply for loans with AI-powered approval odds.

## 🚀 Features

- **🔐 Secure Authentication**: Integrated Supabase Auth with email verification and Row Level Security (RLS).
- **🤖 AI Loan Prediction**: Machine Learning models to calculate loan approval probabilities based on financial behavior.
- **📊 Interactive Dashboard**: Real-time tracking of active loans, financial scores, and pending tasks.
- **🏦 Bank Integration**: Live statistics and interest rates from partner banks (Placeholder integration).
- **📂 Document Management**: Upload and analyze transaction files securely.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (via Vite)
- **Styling**: TailwindCSS, Lucide React
- **State Management**: React Context (Auth/Loan)
- **HTTP Client**: Axios/Fetch

### Backend
- **Framework**: FastAPI (Python)
- **Database ORM**: SQLAlchemy (Async)
- **Database**: PostgreSQL (Supabase)
- **ML**: Scikit-learn (Credit Scoring Model)

## ⚡ Quick Start Guide

### 1. Prerequisites
- Python 3.12+
- Node.js (v18+) & npm
- Supabase Project

### 2. Environment Configuration

You need two `.env` files.

**1️⃣ Frontend (`.env` in root folder):**
```env
VITE_API_URL=http://localhost:8000/api
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=ey... (Your Supabase Anon/Public Key)
```

**2️⃣ Backend (`backend/.env`):**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=ey... (Your Supabase Anon/Public Key)
DATABASE_URL=postgresql://postgres.user:password@host:5432/postgres
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

> **⚠️ Important:** Ensure `SUPABASE_KEY` is the **Anon Key** (starting with `ey...`), NOT the service role or publishable token string.

### 3. Usage (Management Scripts)

We have created a unified management system for Windows to handle both servers easily.

**Start Application:**
```powershell
.\manage.bat start
```
*Launches Backend (Port 8000) and Frontend (Port 5173) in new windows.*

**Restart Application:**
```powershell
.\manage.bat restart
```
*Stops running services and restarts them. Useful after code changes.*

**Stop Application:**
```powershell
.\manage.bat stop
```
*Kills all associated node and python processes.*

## 🛡️ Security & Supabase Setup

1.  **Redirect URLs**: Go to Supabase Dashboard -> Auth -> URL Configuration. Add:
    - `http://localhost:5173`
    - `http://localhost:5173/dashboard`
2.  **Row Level Security (RLS)**: RLS is enabled on all tables (`users`, `loans`, `transactions`).
    - Policies allow users to `SELECT` only their own data.
    - Backend uses the Postgres Role to manage data insertion.
3.  **Email Verification**: Enabled. Configure your SMTP provider in Supabase for production use.

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Frontend "Failed to Connect"** | Check if Port 5173 is blocked. Run `.\manage.bat stop` to clear zombie processes. The script uses `--strictPort` to prevent confusion. |
| **"Page Failed to Acknowledge"** | Verify your **Redirect URLs** in Supabase match exactly `http://localhost:5173/dashboard`. |
| **Backend 500 Error on Register** | Ensure your `backend/.env` Key is correct. The registration flow avoids double-signup by trusting the Frontend-provided ID. |

---
**Developed by Saideep**
