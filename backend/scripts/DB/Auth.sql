USE mJOB;
GO


-- old table: SHA-256
CREATE TABLE auth (
	user_id INT IDENTITY(1,1) PRIMARY KEY,
	username VARCHAR(50) UNIQUE,
	hash CHAR(64) NOT NULL,
	salt CHAR(32) NOT NULL,
	is_active BIT NOT NULL DEFAULT 0,
);
GO

-- new table: bcrypt; if implemented should also modify the sample data
-- CREATE TABLE auth (
-- 	user_id INT IDENTITY(1,1) PRIMARY KEY,
-- 	username VARCHAR(50) UNIQUE,
-- 	hash VARBINARY(60) NOT NULL, -- Adjust length based on hash algorithm
-- 	salt VARBINARY(16) NOT NULL, -- Adjust length based on salt length used
-- 	is_active BIT NOT NULL DEFAULT 0
-- );

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: auth');
GO


CREATE TABLE auth_log (
	auth_log_id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT FOREIGN KEY REFERENCES auth(user_id),
	auth_action VARCHAR(16) NOT NULL, -- register, login, logout
	auth_time DATETIME NOT NULL DEFAULT GETDATE()
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: auth_log');
GO

CREATE TABLE session (
	session_id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT FOREIGN KEY REFERENCES auth(user_id),
	session_token VARCHAR(255) NOT NULL,
	session_expiration DATETIME NOT NULL DEFAULT DATEADD(day, 1, GETDATE()),
	session_data NVARCHAR(MAX) -- NVARCHAR(MAX) data
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: session');
GO

CREATE TABLE auth_code (
    user_id INT FOREIGN KEY REFERENCES auth(user_id),
    code CHAR(8) NOT NULL
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: auth_code');
GO