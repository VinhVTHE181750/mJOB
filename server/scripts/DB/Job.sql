USE mJOB;
GO

CREATE TABLE job (
	job_id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT NOT NULL FOREIGN KEY REFERENCES [user](user_id),
	job_title NVARCHAR(MAX) NOT NULL,
	job_work_location NVARCHAR(MAX),
	job_tags VARCHAR(MAX),
	job_max_applications INT DEFAULT 0,
	job_approval_method BIT NOT NULL DEFAULT 1,
	job_description NVARCHAR(MAX) NOT NULL,
	job_contact_info NVARCHAR(MAX),
	job_start_date DATE,
    job_end_date DATE,
    job_number_of_recruits INT DEFAULT 0,
	job_requirements NVARCHAR(MAX),
	job_compensation_type NVARCHAR(50),
    job_compensation_amounts DECIMAL(10, 2) ,
	job_compensation_currencies NVARCHAR(MAX),
    job_compensation_periods NVARCHAR(MAX),
    job_custom_iterations NVARCHAR(MAX)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: job');
GO

-- Job payment type: HOURLY MONTHLY ONETIME
CREATE TABLE compensation_type (
	compensation_id INT IDENTITY(1,1) PRIMARY KEY,
	compensation_type VARCHAR(16)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: compensation_type');
GO

CREATE TABLE job_compensation (
	job_id INT FOREIGN KEY REFERENCES job(job_id) PRIMARY KEY,
	job_compensation_platform BIT NOT NULL DEFAULT 0,
	job_compensation_type NVARCHAR(50),
	job_compensation_amount DECIMAL(10, 2),
	job_compensation_currency VARCHAR(100),
	job_compensation_period VARCHAR(8),
	job_custom_iteration VARCHAR(24),
	job_hours_per_day INT
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: job_compensation');
GO

CREATE TABLE job_recruitment (
	job_id INT FOREIGN KEY REFERENCES job(job_id) PRIMARY KEY,
	job_recruitment_number INT NOT NULL,
	job_recruitment_deadline DATE,
	job_recruitment_status BIT NOT NULL DEFAULT 1
	-- 1: still hire; 0: done hiring
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: job_recruitment');
GO

CREATE TABLE job_log (
	job_log_id INT IDENTITY(1,1) PRIMARY KEY,
	job_id INT NOT NULL FOREIGN KEY REFERENCES job(job_id),
	job_log_type VARCHAR(16) NOT NULL, -- create, edit, delete, status
	job_log_time DATETIME DEFAULT GETDATE()
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: job_log');
GO

CREATE TABLE job_requirement (
	requirement_id INT IDENTITY(1,1) PRIMARY KEY,
	job_id INT NOT NULL FOREIGN KEY REFERENCES job(job_id),
	job_requirement NVARCHAR(MAX) -- JSON
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: job_requirement');
GO

CREATE TABLE job_application (
	job_id INT NOT NULL FOREIGN KEY REFERENCES job(job_id),
	user_id INT NOT NULL FOREIGN KEY REFERENCES [user](user_id),
	job_requirement_data NVARCHAR(MAX) -- JSON
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: job_application');
GO

CREATE TABLE job_history (
	user_id INT NOT NULL FOREIGN KEY REFERENCES [user](user_id),
	job_id INT NOT NULL FOREIGN KEY REFERENCES job(job_id),
	job_status CHAR(12) NOT NULL, -- ongoing, done, pending, cancelled
	PRIMARY KEY (user_id, job_id)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: job_history');
GO