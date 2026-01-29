param (
    [ValidateSet("start", "stop", "restart", "help")]
    [string]$action = "help"
)

function Get-ProcessIdByPort {
    param([int]$port)
    $tcp = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($tcp) {
        return $tcp.OwningProcess
    }
    return $null
}

function Stop-Services {
    Write-Host "🛑 Stopping services..." -ForegroundColor Yellow
    
    # Backend (Port 8000)
    $backendPid = Get-ProcessIdByPort 8000
    if ($backendPid) {
        Write-Host "   Killing Backend (PID: $backendPid)..."
        Stop-Process -Id $backendPid -Force -ErrorAction SilentlyContinue
    }
    else {
        Write-Host "   Backend not running." -ForegroundColor DarkGray
    }

    # Frontend (Port 5173)
    $frontendPid = Get-ProcessIdByPort 5173
    if ($frontendPid) {
        Write-Host "   Killing Frontend (PID: $frontendPid)..."
        Stop-Process -Id $frontendPid -Force -ErrorAction SilentlyContinue
    }
    else {
        Write-Host "   Frontend not running." -ForegroundColor DarkGray
    }
    
    Write-Host "✅ Services Stopped." -ForegroundColor Green
}

function Start-Services {
    Write-Host "🚀 Starting services..." -ForegroundColor Cyan
    
    # Start Backend
    Write-Host "   Starting Backend (Port 8000)..."
    Start-Process "$PSScriptRoot\start_backend.bat" -WindowStyle Normal
    
    # Start Frontend
    Write-Host "   Starting Frontend (Port 5173)..."
    Start-Process "$PSScriptRoot\start_frontend.bat" -WindowStyle Normal
    
    Write-Host "✅ Application Started!" -ForegroundColor Green
    Write-Host "   Frontend: http://127.0.0.1:5173"
    Write-Host "   Backend:  http://127.0.0.1:8000"
}

if ($action -eq "stop") {
    Stop-Services
}
elseif ($action -eq "start") {
    Start-Services
}
elseif ($action -eq "restart") {
    Stop-Services
    Start-Sleep -Seconds 2
    Start-Services
}
else {
    Write-Host "Usage: .\manage.ps1 [start|stop|restart]" -ForegroundColor White
    Write-Host "Examples:"
    Write-Host "  .\manage.ps1 start    - Start both servers in new windows"
    Write-Host "  .\manage.ps1 stop     - Kill processes on ports 8000 & 5173"
    Write-Host "  .\manage.ps1 restart  - Stop and then Start"
}
