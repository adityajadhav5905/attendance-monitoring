@echo off
title Run Attendance Web Project
set BACKEND_DIR=%~dp0attendance-web
set FRONTEND_DIR=%~dp0attendance-frontend\frontend
echo Starting Spring Boot backend...
start cmd /k "cd /d %BACKEND_DIR% && mvnw spring-boot:run"
timeout /t 10 > nul
echo Starting React frontend...
start cmd /k "cd /d %FRONTEND_DIR% && npm run dev"
timeout /t 5 > nul
start http://localhost:3000

echo Project started successfully!
pause
