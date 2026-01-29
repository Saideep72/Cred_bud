@echo off
title FinV2 Backend
cd /d "%~dp0"
cd backend
echo 🚀 Starting Backend...
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
pause
