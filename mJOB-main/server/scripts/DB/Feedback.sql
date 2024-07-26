USE mJOB;
GO

CREATE TABLE ticket (
	ticket_id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT FOREIGN KEY REFERENCES [user](user_id), -- nullable (anonymous ticket)
	ticket_category VARCHAR(16) NOT NULL,
	ticket_title NVARCHAR(255) NOT NULL,
	ticket_content NVARCHAR(MAX) NOT NULL,
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: ticket');
GO

CREATE TABLE ticket_log (
	ticket_log_id INT IDENTITY(1,1) PRIMARY KEY,
	ticket_id INT NOT NULL FOREIGN KEY REFERENCES ticket(ticket_id),
	ticket_log_type VARCHAR(16) NOT NULL,
	ticket_log_time DATETIME DEFAULT GETDATE(),
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: ticket_log');
GO