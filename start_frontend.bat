@echo off
title FinV2 Frontend
cd /d "%~dp0"
echo 🚀 Starting Frontend...
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
pause
