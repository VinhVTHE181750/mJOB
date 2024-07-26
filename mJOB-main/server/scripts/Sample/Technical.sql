USE mJOB;
GO

INSERT INTO daily_activity (activity_date, total_user, max_active_user, new_user, unique_visitor, post_created)
VALUES
(20240609, 4, 4, 1, 15, 2),
(20240608, 11, 7, 2, 25, 3),
(20240607, 16, 5, 0, 30, 1),
(20240606, 22, 6, 1, 20, 2),
(20240605, 25, 3, 0, 10, 1),
(20240604, 29, 4, 1, 15, 2),
(20240603, 36, 7, 2, 25, 3),
(20240602, 41, 5, 0, 30, 1),
(20240601, 47, 6, 1, 20, 2),
(20240531, 50, 3, 0, 10, 1);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added samples for table: daily_activity');
GO

