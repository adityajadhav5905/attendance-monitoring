@echo off
title Run Full-Stack Project

REM ==========================================
REM Start Spring Boot Backend
REM ==========================================
echo Starting Spring Boot backend...
start cmd /k "cd /d %~dp0backend && mvn spring-boot:run"

REM ==========================================
REM Wait a few seconds for backend to start
REM ==========================================
timeout /t 10 > nul

REM ==========================================
REM Start React Frontend
REM ==========================================
echo Starting React frontend...
start cmd /k "cd /d %~dp0frontend && npm run dev"

REM ==========================================
REM Open website in default browser
REM ==========================================
timeout /t 5 > nul
start http://localhost:3000

echo Project started successfully!
pause
