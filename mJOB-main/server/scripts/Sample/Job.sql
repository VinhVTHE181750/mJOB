USE mJOB;
GO

INSERT INTO job(user_id, job_title, job_work_location, job_tags, job_max_applications, job_approval_method, job_description, job_contact_info)
VALUES
-- job_work_type: 0 = office, 1 = remote
-- method: 0 = auto, 1 = manual
(1, 'Phiên dịch', 'Online', 'abstudio studio online english translate commission', 100, 0, 'AB Studio cần tuyển 3 bạn phiên dịch tài liệu sang tiếng Anh, không dịch máy.', 'nguyenan1999@abstudio.vn hoặc 0357924816'),
(1, 'Người mẫu', 'AB Studio, số 123, 69 Luis St., Quận XX, Hà Nội', 'model fashion abstudio studio office', 100, 1, 'AB Studio tuyển 1 người mẫu ảnh nữ.', 'nguyenan1999@abstudio.vn hoặc 0357924816'),
(2, 'Nhà quảng cáo', 'Online', 'marketing DeNhatQuocSu advertisement', 100, 1, 'Đệ Nhất Quốc Sư tuyển gấp 1 nhà quảng cáo.', 'tigertran@xmail.com')
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added samples for table: job');
GO

INSERT INTO job_recruitment (job_id, job_recruitment_number, job_recruitment_deadline)
VALUES
(1, 3, '20240731'),
(2, 1, '20240731'),
(3, 1, '20241231');
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added samples for table: job_recruitment');
GO

INSERT INTO compensation_type (compensation_type)
VALUES
('HOURLY'),
('MONTHLY'),
('ONETIME');
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added samples for table: compensation_type');
GO