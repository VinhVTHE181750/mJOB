IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'mJOB')
BEGIN
    CREATE DATABASE mJOB;
END;
GO

USE mJOB;
GO

CREATE TABLE system_log (
	system_log_id INT IDENTITY(1,1) PRIMARY KEY,
	system_log_type VARCHAR(16), -- info, error, ...
	system_log_data NVARCHAR(MAX), 
	system_log_time DATETIME DEFAULT GETDATE()
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created database.');
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: system_log');
GO