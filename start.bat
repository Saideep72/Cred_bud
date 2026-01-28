@echo off
echo Starting CredBud Application...
echo.

echo [1/2] Starting Backend Server...
cd /d "%~dp0backend"
start "CredBud Backend" cmd /k "python simple_main.py"

echo [2/2] Starting Frontend Server...
cd /d "%~dp0"
start "CredBud Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo CredBud Application is starting...
echo.
echo Frontend: http://localhost:8080
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to open the application in browser...
pause > nul
start http://localhost:8080

echo Both services are running in separate windows.
echo Close this window or press Ctrl+C to exit.
