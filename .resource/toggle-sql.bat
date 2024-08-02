@echo off
REM Check if the service is running
sc query MSSQLSERVER | findstr /i "RUNNING"
IF %ERRORLEVEL% EQU 0 (
    REM echo The service "ABC" is already running.
    REM PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('Stopping...', 'SQL Server', 'OK', 'Exclamation')"
	sc stop MSSQLSERVER
    PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('Stopping...', 'SQL Server')"
) ELSE (
    REM echo The service "ABC" is not running. Starting the service...
	
    sc start MSSQLSERVER
	PowerShell -Command "Add-Type -AssemblyName PresentationFramework;[System.Windows.MessageBox]::Show('Starting...', 'SQL Server')"
	
    IF %ERRORLEVEL% EQU 0 (
        REM echo The service "ABC" has been started successfully.
    ) ELSE (
        REM echo Failed to start the service "ABC".
    )
)