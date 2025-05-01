@echo off
title Start All Servers

REM Start MongoDB
start "MongoDB Server" mongod

REM Wait for MongoDB to initialize
timeout /t 5

REM Start Backend Server (assuming it's a Node.js app)
cd backend
start "Backend Server" cmd /k "npm run dev"

REM Start Frontend Server
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"
