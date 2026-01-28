#!/bin/bash

echo "Starting CredBud Application..."
echo ""

echo "[1/2] Starting Backend Server..."
cd backend
python simple_main.py &
BACKEND_PID=$!

echo "[2/2] Starting Frontend Server..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "CredBud Application is starting..."
echo ""
echo "Frontend: http://localhost:8080"
echo "Backend:  http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo ""

# Wait a moment for servers to start
sleep 3

# Open browser (works on macOS and Linux)
if command -v open &> /dev/null; then
    open http://localhost:8080
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:8080
fi

echo "Both services are running."
echo "Press Ctrl+C to stop all services."

# Wait for interrupt
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
