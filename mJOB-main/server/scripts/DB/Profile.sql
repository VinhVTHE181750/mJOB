USE mJOB;
GO

CREATE TABLE profile (
	user_id INT PRIMARY KEY FOREIGN KEY REFERENCES [user](user_id),
	user_avatar NVARCHAR(MAX), -- URL or Base64 encoded image
	user_bio NVARCHAR(256),
	user_dob DATE,
	user_address NVARCHAR(MAX),
	user_citizen_id VARCHAR(32) NOT NULL,
	user_email VARCHAR(320),
	user_phone_number VARCHAR(16)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: profile');
GO

CREATE TABLE profile_log (
	profile_log_id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT FOREIGN KEY REFERENCES [user](user_id),
	profile_log_time DATETIME DEFAULT GETDATE(),
	profile_log NVARCHAR(MAX)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: profile_log');
GO

CREATE TABLE linked_profile (
	user_id INT FOREIGN KEY REFERENCES [user](user_id),
	linked_profile_url VARCHAR(MAX),
	linked_profile_type BIT NOT NULL -- 0 for social, 1 for professional
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: linked_profile');
GO

CREATE TABLE work_xp (
	user_id INT FOREIGN KEY REFERENCES [user](user_id),
	work_job_title NVARCHAR(255) NOT NULL,
	work_job_description NVARCHAR(MAX),
	work_company NVARCHAR(255),
	work_start_date DATE,
	work_end_date DATE,
	work_other_info NVARCHAR(MAX)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: work_xp');
GO

CREATE TABLE title (
	title_id INT IDENTITY(1,1) PRIMARY KEY,
	title NVARCHAR(50)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: title');
GO

CREATE TABLE user_title (
	user_id INT FOREIGN KEY REFERENCES [user](user_id),
	title_id INT FOREIGN KEY REFERENCES title(title_id),
	PRIMARY KEY (user_id, title_id)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: user_title');
GO

CREATE TABLE accomplishment (
	user_id INT FOREIGN KEY REFERENCES [user](user_id),
	accomplishment_id INT IDENTITY(1,1) PRIMARY KEY,
	accomplishment_url VARCHAR(MAX) NOT NULL,
	accomplishment_content NVARCHAR(MAX),
	accomplishment_year INT NOT NULL
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: accomplishment');
GO

CREATE TABLE skill (
	skill_id INT IDENTITY(1,1) PRIMARY KEY,
	skill_name NVARCHAR(100)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: skill');
GO

CREATE TABLE user_skill (
	user_id INT NOT NULL FOREIGN KEY REFERENCES [user](user_id),
	skill_id INT NOT NULL FOREIGN KEY REFERENCES skill(skill_id),
	skill_level INT NOT NULL,
	PRIMARY KEY (user_id, skill_id)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: user_skill');
GO

CREATE TABLE job_preference (
	user_id INT PRIMARY KEY FOREIGN KEY REFERENCES [user](user_id),
	job_interest NVARCHAR(MAX),
	preferred_location NVARCHAR(MAX),
	salary_expectation DECIMAL(10, 2),
	job_availability CHAR(16) -- NONE, SEEKING, WORKING
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: job_preference');
GO