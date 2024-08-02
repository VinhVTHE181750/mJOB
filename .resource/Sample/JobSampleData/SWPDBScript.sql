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

USE mJOB;
GO

CREATE TABLE auth (
	user_id INT IDENTITY(1,1) PRIMARY KEY,
	username VARCHAR(50) UNIQUE,
	hash CHAR(64) NOT NULL,
	salt CHAR(32) NOT NULL,
	is_active BIT NOT NULL DEFAULT 0,
);
GO

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

USE mJOB;
GO

CREATE TABLE post (
	post_id INT IDENTITY(1,1) PRIMARY KEY,
	post_title NVARCHAR(255) NOT NULL,
	post_content NVARCHAR(MAX) NOT NULL,
	user_id INT NOT NULL FOREIGN KEY REFERENCES auth(user_id),
	post_status VARCHAR(16) NOT NULL
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: post');
GO

CREATE TABLE comment (
	comment_id INT IDENTITY(1, 1) PRIMARY KEY,
	post_id INT NOT NULL FOREIGN KEY REFERENCES post(post_id),
	comment_content NVARCHAR(MAX),
	comment_status VARCHAR(16) NOT NULL
)

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: comment');
GO

CREATE TABLE content_history (
	content_history_id INT IDENTITY(1,1) PRIMARY KEY,
	content_type BIT NOT NULL, -- 0 if Post, 1 if Comment
	content_id INT NOT NULL,
	content NVARCHAR(MAX) NOT NULL,
	content_updated_time DATETIME NOT NULL DEFAULT GETDATE()
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: content_history');
GO

CREATE TABLE forum_log (
	forum_log_id INT IDENTITY(1,1) PRIMARY KEY,
	content_id INT NOT NULL,
	content_history_id INT NOT NULL FOREIGN KEY REFERENCES content_history(content_history_id),
	forum_log_type VARCHAR(16) NOT NULL, -- create, edit, delete, archive, ...
	forum_log_time DATETIME DEFAULT GETDATE()
);
GO



INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: forum_log');
GO


INSERT INTO post (post_title, post_content, user_id, post_status)
VALUES
('Need Help to Write CV for Software Engineer', 'Data analysts play a crucial role in helping organizations make informed business decisions by analyzing and interpreting complex data.', 1, 'PUBLISHED'),
('Hiring Waitress for Busy Restaurant', 'Software engineers design, develop, and test software programs to meet the needs of businesses and individuals.', 1, 'PUBLISHED'),
('Become a Marketing Manager and Boost Your Career', 'Marketing managers develop and implement marketing strategies to reach target audiences and drive business growth.', 2, 'PUBLISHED'),
('Nurse Practitioner Job Opportunities Available', 'Nurse practitioners provide primary and specialty healthcare services to patients, often working independently or in collaboration with physicians.', 2, 'PUBLISHED'),
('Graphic Designer Wanted for Creative Agency', 'Graphic designers create visual communications and designs to convey messages and express ideas.', 3, 'PUBLISHED'),
('Sales Representative Needed for Tech Startup', 'Sales representatives work with customers to understand their needs and provide solutions through products or services.', 3, 'PUBLISHED'),
('Web Developer Job Opening at Leading Company', 'Web developers design and build websites, applications, and other online platforms to meet the needs of businesses and individuals.', 4, 'PUBLISHED'),
('Human Resources Manager Position Available', 'Human resources managers oversee the recruitment, training, and development of employees, as well as benefits and compensation.', 5, 'PUBLISHED'),
('Financial Advisor Career Opportunities', 'Financial advisors provide guidance and advice to individuals and businesses on investment and financial planning.', 6, 'PUBLISHED'),
('Teaching Jobs Available for Passionate Educators', 'Teachers educate and inspire students, helping them to develop knowledge, skills, and values.', 7, 'PUBLISHED'),
('Customer Service Representative Wanted', 'Customer service representatives provide assistance and support to customers, resolving issues and improving customer satisfaction.', 1, 'PUBLISHED'),
('Operations Manager Job Opening at Manufacturing Company', 'Operations managers oversee the day-to-day activities of businesses, ensuring efficiency, productivity, and quality.', 2, 'PUBLISHED'),
('IT Project Manager Position Available at Tech Firm', 'IT project managers plan, coordinate, and execute technology projects, ensuring they are completed on time and within budget.', 3, 'PUBLISHED'),
('Accountant Job Opportunities in Finance Industry', 'Accountants prepare and examine financial records, ensuring accuracy and compliance with laws and regulations.', 5, 'PUBLISHED'),
('Digital Marketing Specialist Wanted for E-commerce Company', 'Digital marketing specialists develop and implement online marketing campaigns to reach target audiences and drive business growth.', 7, 'PUBLISHED'),
('Network Administrator Job Opening at IT Company', 'Network administrators install, configure, and maintain computer networks, ensuring they are secure and running smoothly.', 1, 'PUBLISHED'),
('Recruiter Position Available at Staffing Agency', 'Recruiters identify, attract, and select top talent to fill job openings, often working with hiring managers and HR teams.', 1, 'PUBLISHED'),
('UX Designer Job Opportunities in Tech Industry', 'UX designers create user-centered designs for products and services, focusing on usability, accessibility, and user experience.', 2, 'PUBLISHED'),
('Business Analyst Position Available at Consulting Firm', 'Business analysts work with stakeholders to identify business needs and develop solutions to improve operations and performance.', 5, 'PUBLISHED'),
('Cybersecurity Specialist Job Opening at Security Firm', 'Cybersecurity specialists protect computer systems and networks from cyber threats, developing and implementing security protocols.', 7, 'PUBLISHED'),
('Event Planner Wanted for Wedding Planning Company', 'Event planners coordinate and execute events, such as conferences, weddings, and parties, ensuring they are successful and memorable.', 1, 'PUBLISHED'),
('Content Writer Job Opportunities in Publishing Industry', 'Content writers create engaging and informative content for various mediums, including websites, blogs, and social media.', 3, 'PUBLISHED'),
('Database Administrator Job Opening at Data Company', 'Database administrators design, implement, and maintain databases, ensuring data is secure and easily accessible.', 2, 'PUBLISHED'),
('HR Generalist Position Available at Non-profit Organization', 'HR generalists handle a range of HR tasks, including recruitment, benefits, and employee relations.', 1, 'PUBLISHED'),
('Webmaster Job Opening at Digital Agency', 'Webmasters maintain and update websites, ensuring they are running smoothly and efficiently.', 9, 'PUBLISHED');
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added samples for table: post');
GO

USE mJOB;
GO

CREATE TABLE job (
	job_id INT IDENTITY(1,1) PRIMARY KEY,
	user_id INT NOT NULL FOREIGN KEY REFERENCES auth(user_id),
	job_title NVARCHAR(MAX) NOT NULL,
	job_work_location NVARCHAR(MAX),
	job_tags VARCHAR(MAX),
	job_max_applications INT DEFAULT 0,
	job_approval_method BIT NOT NULL DEFAULT 1,
	job_description NVARCHAR(MAX) NOT NULL,
	job_contact_info NVARCHAR(MAX)
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
	job_compensation_type VARCHAR(12),
	job_compensation_amount DECIMAL(10, 2),
	job_compensation_currency VARCHAR(4),
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
	user_id INT NOT NULL FOREIGN KEY REFERENCES auth(user_id),
	job_requirement_data NVARCHAR(MAX) -- JSON
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: job_application');
GO

drop table job_history

CREATE TABLE job_history (
	user_id INT NOT NULL FOREIGN KEY REFERENCES auth(user_id),
	job_id INT NOT NULL FOREIGN KEY REFERENCES job(job_id),
	job_status CHAR(12) NOT NULL, -- ongoing, done, pending, cancelled
	PRIMARY KEY (user_id, job_id)
);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Created table: job_history');
GO

Create table Marketing(
	id INT PRIMARY KEY,
	topic text,
	content text
);

INSERT INTO Marketing (id, topic, content) VALUES
(1, 'Social Media Strategy', 'Developing a comprehensive strategy for managing our social media presence, including content scheduling, audience engagement, and performance analysis.'),
(2, 'Email Campaigns', 'Designing and executing targeted email campaigns to promote new products and services, re-engage existing customers, and increase overall brand awareness.'),
(3, 'SEO Optimization', 'Improving our websites search engine ranking through keyword research, content creation, and technical optimization techniques.');

USE mJOB;
GO

-- Add 10 random users
INSERT INTO auth (username, hash, salt)
VALUES 
('andz1207', 'a6f63a5fb10b3bba180a79f2fc565b1db2101040ce71ea80692d671857fe2117', ''),
-- andz1207 | passWord
('DeNhatQuocSu', 'ea6cecea0bafcc1b93a80230e42cde46710c4212787453beced211ebbd342326', ''),
-- passWord2
('trannam29', '97b9f0055e1e2ddde718eb79d5ba18c2cc4af174c29ff2a49869dfce4b334342', ''),
-- passWord3
('__OwO__', '4cde37e3789f19ed189b1f81f8cd36ba8420ebe505d79ebc9803ae579073de7a', ''),
-- passWord4
('TheRealAdmin', 'b912027fd35321538ec00c1a3e7a1d7e565d9a05af17697179f3ebff238fb581', ''),
-- passWord5
('admin01', 'b20e740845579ac8b50edb08f61dea0f0a573f3f5f2a3d6337c824193a59627f', ''),
-- passWord6
('he250178', 'd12d9f42c6caf07537a1fb0c43ccab990f4883d73d05c7612de9bb93d8e33f3f', ''),
-- passWord7
('hoang_tuna', '3f36c04a18c1d77e273404ca9ccfbeb508611cecc514ac0961b46f0fb28d2bf1', ''),
-- passWord8
('NguyenKhanh', '6e038144402f05839a8e2491ee89a455bed0acec6379a622a6b0ad3c2c4e1108', ''),
-- passWord9
('TrumBacKi', 'a70cc00b99169c648c41762aa456f89099eb7236dfb8cf6b5c1f57c946b19d5d', '');
-- passWord10
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added samples for table: auth');

INSERT INTO auth_log (user_id, auth_action, auth_time)
VALUES
(1, 'REGISTER', '20190618 11:34:09 AM'),
(2, 'REGISTER', '20170317 09:34:09 AM'),
(3, 'REGISTER', '20150715 02:34:09 PM'),
(4, 'REGISTER', '20110811 04:34:09 PM'),
(5, 'REGISTER', '20080922 06:34:09 PM'),
(6, 'REGISTER', '20201127 07:34:09 PM'),
(7, 'REGISTER', '20221231 10:34:09 PM'),
(8, 'REGISTER', '20210218 05:34:09 PM'),
(9, 'REGISTER', '20230115 06:34:09 AM'),
(10, 'REGISTER', '20190911 09:34:09 AM'),
(1, 'LOGIN', '20190618 11:39:09 AM'),
(2, 'LOGIN', '20170317 09:39:09 AM'),
(3, 'LOGIN', '20150715 02:44:09 PM'),
(4, 'LOGIN', '20110811 04:44:09 PM'),
(5, 'LOGIN', '20080922 06:54:09 PM'),
(6, 'LOGIN', '20201127 07:44:09 PM'),
(7, 'LOGIN', '20221231 10:54:09 PM'),
(8, 'LOGIN', '20210218 05:44:09 PM'),
(9, 'LOGIN', '20230115 06:44:09 AM'),
(10, 'LOGIN', '20190911 09:54:09 AM'),
(1, 'LOGOUT', '20190618 11:42:09 AM'),
(2, 'LOGOUT', '20170317 09:49:09 AM'),
(3, 'LOGOUT', '20150715 02:54:09 PM'),
(4, 'LOGOUT', '20110811 04:54:09 PM'),
(5, 'LOGOUT', '20080922 07:54:09 PM'),
(6, 'LOGOUT', '20201127 08:44:09 PM'),
(7, 'LOGOUT', '20221231 11:54:09 PM'),
(8, 'LOGOUT', '20210218 06:44:09 PM'),
(9, 'LOGOUT', '20230115 08:44:09 AM'),
(10, 'LOGOUT', '20190911 11:54:09 AM');
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added samples for table: auth_log');
GO

Create table job_view(
	job_id INT NOT NULL FOREIGN KEY REFERENCES job(job_id),
	job_view Int not null
);


INSERT INTO job (user_id, job_title, job_work_location, job_tags, job_max_applications, job_approval_method, job_description, job_contact_info) 
VALUES 
(1, 'Software Developer', 'New York', 'IT, Software', 10, 1, 'Develop software applications', 'contact@company.com'),
(2, 'Marketing Specialist', 'Los Angeles', 'Marketing, SEO', 5, 1, 'Manage marketing campaigns', 'contact@company.com'),
(3, 'Data Analyst', 'Chicago', 'Data, Analytics', 8, 1, 'Analyze data trends', 'contact@company.com'),
(4, 'Project Manager', 'San Francisco', 'Management, Projects', 3, 1, 'Manage projects', 'contact@company.com'),
(5, 'Graphic Designer', 'Miami', 'Design, Creative', 7, 1, 'Create visual content', 'contact@company.com'),
(6, 'HR Specialist', 'Houston', 'HR, Recruiting', 4, 1, 'Handle HR tasks', 'contact@company.com'),
(7, 'Content Writer', 'Seattle', 'Writing, Content', 6, 1, 'Write content for various platforms', 'contact@company.com'),
(8, 'Sales Manager', 'Boston', 'Sales, Management', 5, 1, 'Manage sales team', 'contact@company.com'),
(9, 'Customer Support', 'Denver', 'Support, Customer Service', 10, 1, 'Provide customer support', 'contact@company.com'),
(10, 'IT Support', 'Austin', 'IT, Support', 8, 1, 'Provide IT support', 'contact@company.com');

-- Add compensation details for the jobs
INSERT INTO job_compensation (job_id, job_compensation_platform, job_compensation_type, job_compensation_amount, job_compensation_currency, job_compensation_period, job_custom_iteration, job_hours_per_day)
VALUES 
(1, 0, 'HOURLY', 40.00, 'USD', 'WEEKLY', '', 8),
(2, 0, 'MONTHLY', 4000.00, 'USD', 'MONTHLY', '', 8),
(3, 0, 'HOURLY', 35.00, 'USD', 'WEEKLY', '', 8),
(4, 0, 'MONTHLY', 5000.00, 'USD', 'MONTHLY', '', 8),
(5, 0, 'ONETIME', 1500.00, 'USD', '', '', 8),
(6, 0, 'MONTHLY', 3500.00, 'USD', 'MONTHLY', '', 8),
(7, 0, 'ONETIME', 2000.00, 'USD', '', '', 8),
(8, 0, 'MONTHLY', 4500.00, 'USD', 'MONTHLY', '', 8),
(9, 0, 'HOURLY', 20.00, 'USD', 'WEEKLY', '', 8),
(10, 0, 'HOURLY', 25.00, 'USD', 'WEEKLY', '', 8);

-- Add recruitment details for the jobs
INSERT INTO job_recruitment (job_id, job_recruitment_number, job_recruitment_deadline, job_recruitment_status)
VALUES 
(1, 3, '2024-12-31', 1),
(2, 2, '2024-11-30', 1),
(3, 4, '2024-10-31', 1),
(4, 1, '2024-09-30', 1),
(5, 2, '2024-09-11', 1),
(6, 1, '2024-08-31', 1),
(7, 2, '2024-08-30', 1),
(8, 3, '2024-08-11', 1),
(9, 4, '2024-07-30', 1),
(10, 2, '2024-07-21', 1);


-- Add requirements for the jobs
INSERT INTO job_requirement (job_id, job_requirement)
VALUES 
(1, '{"experience": "3 years", "skills": ["C#", "ASP.NET", "SQL"]}'),
(2, '{"experience": "2 years", "skills": ["SEO", "Google Analytics", "Content Creation"]}'),
(3, '{"experience": "2 years", "skills": ["Excel", "SQL", "Data Visualization"]}'),
(4, '{"experience": "5 years", "skills": ["Project Management", "Agile", "Scrum"]}'),
(5, '{"experience": "1 year", "skills": ["Adobe Photoshop", "Illustrator", "Creativity"]}'),
(6, '{"experience": "3 years", "skills": ["Recruitment", "HR Policies", "Communication"]}'),
(7, '{"experience": "2 years", "skills": ["Writing", "SEO", "Research"]}'),
(8, '{"experience": "4 years", "skills": ["Sales Strategies", "Team Management", "Negotiation"]}'),
(9, '{"experience": "1 year", "skills": ["Customer Service", "Communication", "Problem Solving"]}'),
(10, '{"experience": "2 years", "skills": ["Technical Support", "Networking", "Troubleshooting"]}');



-- Confirm system log entries
INSERT INTO system_log (system_log_type, system_log_data)
VALUES 
('INFO', 'Inserted 10 users into auth table'),
('INFO', 'Inserted 10 jobs into job table along with related compensation, recruitment, and requirement details');
GO


--Insert data for view table
-- Insert 10 data into job_view table
INSERT INTO job_view (job_id, job_view)
VALUES 
(1, 150),
(2, 200),
(3, 175),
(4, 250),
(5, 120),
(6, 90),
(7, 300),
(8, 210),
(9, 50),
(10, 180);

Create table filtertype(
	filter_id INT IDENTITY(1,1) PRIMARY KEY,
	filter_content text
)


-- Define a base date and time for random generation
DECLARE @base_date DATETIME = '2023-06-06'; -- Adjust this as needed

-- Loop to insert 10 records with distinct timestamps
DECLARE @counter INT = 0;
WHILE @counter < 10
BEGIN
  -- Generate a random datetime within a year, retry if duplicate
  DECLARE @random_time DATETIME = DATEADD(SECOND, FLOOR(RAND() * 31536000), @base_date);

  -- Check for existing timestamps (optional, improves performance)
  IF NOT EXISTS (SELECT 1 FROM job_log WHERE job_log_time = @random_time)
  BEGIN
    INSERT INTO job_log (job_id, job_log_type, job_log_time)
    SELECT TOP 1 job_id, 'create', @random_time
    FROM job
    ORDER BY NEWID();  -- Random selection of job_id

    SET @counter = @counter + 1;
  END;
END;

select * from job_log;

select j.job_id,u.username,j.job_title,j.job_description,j.job_tags,j.job_work_location,j.job_description,jv.job_view from job j join auth u on j.user_id=u.user_id join job_view jv on j.job_id=jv.job_id;

select j.job_id,j.job_title,j.job_description,j.job_work_location,j.job_contact_info from job j;

select j.job_id,u.username,j.job_title,j.job_description,j.job_tags,j.job_work_location,j.job_description,jv.job_view,jl.job_log_time from 
job j join auth u on j.user_id=u.user_id 
join job_view jv on j.job_id=jv.job_id
join job_log jl on j.job_id=jl.job_id
where jl.job_log_type='create';


--Order by jobid
SELECT j.job_id,u.username,j.job_title,j.job_description,j.job_tags,j.job_work_location,jc.job_compensation_amount,jc.job_compensation_currency,jc.job_compensation_type,jv.job_view,jl.job_log_time,jr.job_recruitment_deadline
FROM job j
INNER JOIN auth u ON j.user_id = u.user_id  -- Use INNER JOIN for required data
INNER JOIN job_view jv ON j.job_id = jv.job_id
INNER JOIN job_log jl ON j.job_id = jl.job_id
INNER JOIN job_compensation jc on j.job_id=jc.job_id
INNER JOIN job_recruitment jr on j.job_id=jr.job_id
where jl.job_log_type='create'
ORDER BY j.job_id;



--Order by view
SELECT j.job_id,u.username,j.job_title,j.job_description,j.job_tags,j.job_work_location,j.job_description,jv.job_view,jl.job_log_time
FROM job j
INNER JOIN auth u ON j.user_id = u.user_id  -- Use INNER JOIN for required data
INNER JOIN job_view jv ON j.job_id = jv.job_id
INNER JOIN job_log jl ON j.job_id = jl.job_id
ORDER BY jv.job_view DESC;

--Order by time
SELECT j.job_id,u.username,j.job_title,j.job_description,j.job_tags,j.job_work_location,j.job_description,jv.job_view,jl.job_log_time
FROM job j
INNER JOIN auth u ON j.user_id = u.user_id  -- Use INNER JOIN for required data
INNER JOIN job_view jv ON j.job_id = jv.job_id
INNER JOIN job_log jl ON j.job_id = jl.job_id
ORDER BY jl.job_log_time DESC;

select * from job_log;

drop table job_log



CREATE TABLE job_log (
  job_log_id INT IDENTITY(1,1) PRIMARY KEY,
  job_id INT NOT NULL FOREIGN KEY REFERENCES job(job_id),  -- Foreign key constraint
  job_log_type VARCHAR(16) NOT NULL, -- create, edit, delete, status
  job_log_time DATETIME DEFAULT GETDATE()
);

INSERT INTO job_log (job_id, job_log_type, job_log_time)
VALUES 
(1, 'create', '2023-06-01 10:00:00'),
(2, 'create', '2023-06-02 11:00:00'),
(3, 'create', '2023-06-03 12:00:00'),
(4, 'create', '2023-06-04 13:00:00'),
(5, 'create', '2023-06-05 14:00:00'),
(6, 'create', '2023-06-06 15:00:00'),
(7, 'create', '2023-06-07 16:00:00'),
(8, 'create', '2023-06-08 17:00:00'),
(9, 'create', '2023-06-09 18:00:00'),
(10, 'create', '2023-06-10 19:00:00');


SELECT 
    j.job_id,
    u.username,
    j.job_title,
    j.job_description,
    j.job_tags,
    j.job_work_location,
    jc.job_compensation_amount,
    jc.job_compensation_currency,
    jc.job_compensation_type,
    jv.job_view,
    DATEDIFF(DAY, GETDATE(), jr.job_recruitment_deadline) AS timeleft
FROM 
    job j
INNER JOIN 
    auth u ON j.user_id = u.user_id  -- Use INNER JOIN for required data
INNER JOIN 
    job_view jv ON j.job_id = jv.job_id
INNER JOIN 
    job_log jl ON j.job_id = jl.job_id
INNER JOIN 
    job_compensation jc ON j.job_id = jc.job_id
INNER JOIN 
    job_recruitment jr ON j.job_id = jr.job_id
WHERE 
    jl.job_log_type = 'create'
ORDER BY 
    j.job_id;


--Order by view
SELECT 
    j.job_id,
    u.username,
    j.job_title,
    j.job_tags,
    j.job_work_location,
    jc.job_compensation_amount,
    jc.job_compensation_currency,
    jc.job_compensation_type,
    DATEDIFF(DAY, GETDATE(), jr.job_recruitment_deadline) AS timeleft
FROM 
    job j
INNER JOIN 
    auth u ON j.user_id = u.user_id  -- Use INNER JOIN for required data
INNER JOIN 
    job_view jv ON j.job_id = jv.job_id
INNER JOIN 
    job_log jl ON j.job_id = jl.job_id
INNER JOIN 
    job_compensation jc ON j.job_id = jc.job_id
INNER JOIN 
    job_recruitment jr ON j.job_id = jr.job_id
WHERE 
    jl.job_log_type = 'create'
ORDER BY jv.job_view DESC;


--Order by time
SELECT 
    j.job_id,
    u.username,
    j.job_title,
    j.job_tags,
    j.job_work_location,
    jc.job_compensation_amount,
    jc.job_compensation_currency,
    jc.job_compensation_type,
    DATEDIFF(DAY, GETDATE(), jr.job_recruitment_deadline) AS timeleft
FROM 
    job j
INNER JOIN 
    auth u ON j.user_id = u.user_id  -- Use INNER JOIN for required data
INNER JOIN 
    job_view jv ON j.job_id = jv.job_id
INNER JOIN 
    job_log jl ON j.job_id = jl.job_id
INNER JOIN 
    job_compensation jc ON j.job_id = jc.job_id
INNER JOIN 
    job_recruitment jr ON j.job_id = jr.job_id
WHERE 
    jl.job_log_type = 'create'
ORDER BY jl.job_log_time DESC;

Select * from job_history jh where jh.user_id='4' and jh.job_status='done';

select * from job;

select * from job_recruitment;

select * from job_application;

select * from job_history;

drop table job_history

