@echo off
if "%1"=="" goto help

powershell -ExecutionPolicy Bypass -File manage.ps1 %1
goto end

:help
powershell -ExecutionPolicy Bypass -File manage.ps1 help

:end
