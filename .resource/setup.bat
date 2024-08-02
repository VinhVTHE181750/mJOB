@echo off
setlocal

:: Check if sqlcmd is installed
where sqlcmd >nul 2>nul
if %errorlevel% neq 0 (
    echo sqlcmd is not installed. Please install Microsoft SQL Server Command Line Utilities and try again.
    exit /b 1
)

:: Prompt the user for MSSQL username
set /p MSSQL_USER=Enter MSSQL username: 

:: Prompt the user for MSSQL password
set /p MSSQL_PASS=Enter MSSQL password: 

:: Define the database name
set DB_NAME=mJob

:: Create a SQL script to create the database XYZ
echo CREATE DATABASE %DB_NAME%; > create_database.sql

:: Attempt to login and create the database
sqlcmd -U %MSSQL_USER% -P %MSSQL_PASS% -i create_database.sql

:: Check if the command was successful
if %errorlevel% neq 0 (
    echo Failed to create the database %DB_NAME%.
    del create_database.sql
    exit /b %errorlevel%
)

echo Database %DB_NAME% created successfully.

:: Clean up
del create_database.sql
endlocal

:: Navigate to the client directory and run npm install and npm run dev in a new command prompt window
start "Client Setup" cmd /c "cd /d %~dp0client && npm install && npm run dev"

:: Navigate to the server directory and run npm install and npm start in a new command prompt window
start "Server Setup" cmd /c "cd /d %~dp0server && npm install && npm start"

pause