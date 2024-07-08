USE mJOB;
GO

CREATE TABLE daily_activity (
	activity_date DATE PRIMARY KEY,
	total_user INT NOT NULL DEFAULT 0,
	max_active_user INT NOT NULL DEFAULT 0,
	new_user INT NOT NULL DEFAULT 0,
	unique_visitor INT NOT NULL DEFAULT 0,
	post_created INT NOT NULL DEFAULT 0,
	comment_created INT NOT NULL DEFAULT 0,
	like_added INT NOT NULL DEFAULT 0
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: daily_activity');
GO

