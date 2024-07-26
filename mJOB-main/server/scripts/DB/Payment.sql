USE mJOB;
GO

CREATE TABLE user_balance (
	user_id INT PRIMARY KEY FOREIGN KEY REFERENCES [user](user_id),
	balance DECIMAL(10, 2)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: user_balance');
GO

CREATE TABLE payment_method (
	payment_method_id INT IDENTITY(1,1) PRIMARY KEY,
	payment_method_name VARCHAR(50) NOT NULL,
	payment_method_type VARCHAR(20) NOT NULL -- e.g. credit_card, paypal, etc.
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: payment_method');
GO

CREATE TABLE user_payment_method (
	user_id INT NOT NULL FOREIGN KEY REFERENCES [user](user_id),
	payment_method_id INT NOT NULL FOREIGN KEY REFERENCES payment_method(payment_method_id),
	payment_method_details VARCHAR(320) NOT NULL, -- e.g. credit card number, paypal email, etc.
	is_default BIT NOT NULL DEFAULT 0,
	PRIMARY KEY (user_id, payment_method_id)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: user_payment_method');
GO

CREATE TABLE payment_method_log (
	log_id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT NOT NULL FOREIGN KEY REFERENCES [user](user_id),
	payment_method_log_type VARCHAR(16), -- add, edit, remove
	payment_method_log_time DATETIME DEFAULT GETDATE()
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: payment_method_log');
GO

CREATE TABLE payment_history (
	tx_id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT NOT NULL FOREIGN KEY REFERENCES [user](user_id),
	tx_action VARCHAR(16), -- deposit, withdraw
	tx_action_value DECIMAL(10, 2), -- sync data type with user_balance(balance)
	tx_action_target NVARCHAR(32) -- destination or source
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: payment_history');
GO