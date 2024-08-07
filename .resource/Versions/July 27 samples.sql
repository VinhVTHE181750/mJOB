-- Delete all data from the table
DELETE FROM [mJOB].[dbo].[Users];
DELETE FROM [mJOB].[dbo].[Jobs];
DELETE FROM [mJOB].[dbo].[Applications];
DELETE FROM [mJOB].[dbo].[JobMetrics];
DELETE FROM [mJOB].[dbo].[Marketings];
DELETE FROM [mJOB].[dbo].[Posts];
DELETE FROM [mJOB].[dbo].[PostCategories];
DELETE FROM [mJOB].[dbo].[PostMetrics];
DELETE FROM [mJOB].[dbo].[Balances];






-- Reset identity seed to 1
DBCC CHECKIDENT ('[mJOB].[dbo].[Users]', RESEED, 0);
DBCC CHECKIDENT ('[mJOB].[dbo].[Jobs]', RESEED, 0);
DBCC CHECKIDENT ('[mJOB].[dbo].[Applications]', RESEED, 0);
DBCC CHECKIDENT ('[mJOB].[dbo].[JobMetrics]', RESEED, 0);
DBCC CHECKIDENT ('[mJOB].[dbo].[Marketings]', RESEED, 0);
DBCC CHECKIDENT ('[mJOB].[dbo].[Posts]', RESEED, 0);
DBCC CHECKIDENT ('[mJOB].[dbo].[PostCategories]', RESEED, 0);
DBCC CHECKIDENT ('[mJOB].[dbo].[Balances]', RESEED, 0);






INSERT INTO [mJOB].[dbo].[Users] 
([username], [email], [phone], [citizenId], [firstName], [lastName], [dob], [address], [avatar], [bio], [isStudent], [isMuted], [createdAt], [updatedAt])
VALUES
('alice_smith', 'alice.smith@example.com', '555-0101', 'CIT000001', 'Alice', 'Smith', '1985-01-15', '101 First Ave', 'alice_avatar.png', 'Alice is a software engineer.', 0, 0, GETDATE(), GETDATE()),
('bob_johnson', 'bob.johnson@example.com', '555-0102', 'CIT000002', 'Bob', 'Johnson', '1986-02-20', '102 Second Blvd', 'bob_avatar.png', 'Bob is a graphic designer.', 1, 0, GETDATE(), GETDATE()),
('carol_williams', 'carol.williams@example.com', '555-0103', 'CIT000003', 'Carol', 'Williams', '1987-03-25', '103 Third St', 'carol_avatar.png', 'Carol is a project manager.', 0, 1, GETDATE(), GETDATE()),
('david_brown', 'david.brown@example.com', '555-0104', 'CIT000004', 'David', 'Brown', '1988-04-30', '104 Fourth Rd', 'david_avatar.png', 'David is a data analyst.', 1, 0, GETDATE(), GETDATE()),
('emma_jones', 'emma.jones@example.com', '555-0105', 'CIT000005', 'Emma', 'Jones', '1989-05-15', '105 Fifth Ave', 'emma_avatar.png', 'Emma is a marketing specialist.', 0, 0, GETDATE(), GETDATE()),
('frank_garcia', 'frank.garcia@example.com', '555-0106', 'CIT000006', 'Frank', 'Garcia', '1990-06-20', '106 Sixth Blvd', 'frank_avatar.png', 'Frank is a UX designer.', 1, 1, GETDATE(), GETDATE()),
('grace_martinez', 'grace.martinez@example.com', '555-0107', 'CIT000007', 'Grace', 'Martinez', '1991-07-25', '107 Seventh St', 'grace_avatar.png', 'Grace is a web developer.', 0, 0, GETDATE(), GETDATE()),
('henry_rodriguez', 'henry.rodriguez@example.com', '555-0108', 'CIT000008', 'Henry', 'Rodriguez', '1992-08-30', '108 Eighth Ave', 'henry_avatar.png', 'Henry is a system administrator.', 1, 1, GETDATE(), GETDATE()),
('isabel_hernandez', 'isabel.hernandez@example.com', '555-0109', 'CIT000009', 'Isabel', 'Hernandez', '1993-09-15', '109 Ninth Rd', 'isabel_avatar.png', 'Isabel is an HR manager.', 0, 0, GETDATE(), GETDATE()),
('jack_lopez', 'jack.lopez@example.com', '555-0110', 'CIT000010', 'Jack', 'Lopez', '1994-10-20', '110 Tenth Blvd', 'jack_avatar.png', 'Jack is a content creator.', 1, 0, GETDATE(), GETDATE());
GO

INSERT INTO [Auths] (UserId, role, hash, salt, createdAt, updatedAt)
VALUES 
(1, 'USER', 'de543027df074d21838b28a0920c4475081ac8c126bafd627abf771314b5e65cd18a467a3cd04a9a6af95784a00bae6b608958768c2154799ca2fdf4d3969b95', '85e12bdefc7b8902dcd27c69f24c9c49d62fc95977858f35ee44c17103b17f52', GETDATE(), GETDATE()),
(2, 'USER', 'de543027df074d21838b28a0920c4475081ac8c126bafd627abf771314b5e65cd18a467a3cd04a9a6af95784a00bae6b608958768c2154799ca2fdf4d3969b95', '85e12bdefc7b8902dcd27c69f24c9c49d62fc95977858f35ee44c17103b17f52', GETDATE(), GETDATE()),
(3, 'USER', 'de543027df074d21838b28a0920c4475081ac8c126bafd627abf771314b5e65cd18a467a3cd04a9a6af95784a00bae6b608958768c2154799ca2fdf4d3969b95', '85e12bdefc7b8902dcd27c69f24c9c49d62fc95977858f35ee44c17103b17f52', GETDATE(), GETDATE()),
(4, 'USER', 'de543027df074d21838b28a0920c4475081ac8c126bafd627abf771314b5e65cd18a467a3cd04a9a6af95784a00bae6b608958768c2154799ca2fdf4d3969b95', '85e12bdefc7b8902dcd27c69f24c9c49d62fc95977858f35ee44c17103b17f52', GETDATE(), GETDATE()),
(5, 'USER', 'de543027df074d21838b28a0920c4475081ac8c126bafd627abf771314b5e65cd18a467a3cd04a9a6af95784a00bae6b608958768c2154799ca2fdf4d3969b95', '85e12bdefc7b8902dcd27c69f24c9c49d62fc95977858f35ee44c17103b17f52', GETDATE(), GETDATE()),
(6, 'SUPPORT', 'de543027df074d21838b28a0920c4475081ac8c126bafd627abf771314b5e65cd18a467a3cd04a9a6af95784a00bae6b608958768c2154799ca2fdf4d3969b95', '85e12bdefc7b8902dcd27c69f24c9c49d62fc95977858f35ee44c17103b17f52', GETDATE(), GETDATE()),
(7, 'SUPPORT', 'de543027df074d21838b28a0920c4475081ac8c126bafd627abf771314b5e65cd18a467a3cd04a9a6af95784a00bae6b608958768c2154799ca2fdf4d3969b95', '85e12bdefc7b8902dcd27c69f24c9c49d62fc95977858f35ee44c17103b17f52', GETDATE(), GETDATE()),
(8, 'MOD', 'de543027df074d21838b28a0920c4475081ac8c126bafd627abf771314b5e65cd18a467a3cd04a9a6af95784a00bae6b608958768c2154799ca2fdf4d3969b95', '85e12bdefc7b8902dcd27c69f24c9c49d62fc95977858f35ee44c17103b17f52', GETDATE(), GETDATE()),
(9, 'MOD', 'de543027df074d21838b28a0920c4475081ac8c126bafd627abf771314b5e65cd18a467a3cd04a9a6af95784a00bae6b608958768c2154799ca2fdf4d3969b95', '85e12bdefc7b8902dcd27c69f24c9c49d62fc95977858f35ee44c17103b17f52', GETDATE(), GETDATE()),
(10, 'ADMIN', 'de543027df074d21838b28a0920c4475081ac8c126bafd627abf771314b5e65cd18a467a3cd04a9a6af95784a00bae6b608958768c2154799ca2fdf4d3969b95', '85e12bdefc7b8902dcd27c69f24c9c49d62fc95977858f35ee44c17103b17f52', GETDATE(), GETDATE());
GO

INSERT INTO [mJOB].[dbo].[Jobs]
           ([title]
           ,[description]
           ,[location]
           ,[tags]
           ,[maxApplicants]
           ,[recruitments]
           ,[approvalMethod]
           ,[contact]
           ,[startDate]
           ,[endDate]
           ,[salary]
           ,[salaryType]
           ,[salaryCurrency]
           ,[status]
           ,[createdAt]
           ,[updatedAt]
           ,[deletedAt]
           ,[UserId])
VALUES
('HR Specialist', 'Handle recruitment and employee relations.', 'Philadelphia', 'HR, Management', 3, 1, 1, 'hr@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 40.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 1),
('Finance Manager', 'Manage company finances and reporting.', 'San Diego', 'Finance, Management', 4, 1, 1, 'finance@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 4000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 2),
('Network Administrator', 'Maintain and secure company network.', 'Denver', 'IT, Networking', 6, 1, 1, 'network@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 50.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 3),
('Graphic Designer', 'Create graphics for marketing materials.', 'San Jose', 'Design, Marketing', 3, 1, 1, 'graphics@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 3500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 4),
('SEO Specialist', 'Optimize website for search engines.', 'Columbus', 'SEO, Marketing', 5, 1, 1, 'seo@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 60.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 5),
('Mobile Developer', 'Develop and maintain mobile applications.', 'Charlotte', 'IT, Developer', 8, 1, 1, 'mobile@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 5000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 6),
('Systems Analyst', 'Analyze and improve IT systems.', 'Fort Worth', 'IT, Analytics', 7, 1, 1, 'systems@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 55.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 7),
('IT Support', 'Provide IT support to employees.', 'Indianapolis', 'Support, IT', 10, 1, 1, 'itsupport@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 4500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 8),
('Business Analyst', 'Analyze business processes and recommend improvements.', 'San Francisco', 'Analytics, Business', 6, 1, 1, 'business@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 70.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 9),
('QA Tester', 'Test software applications for bugs and issues.', 'Seattle', 'QA, IT', 5, 1, 1, 'qa@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 3800.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 10),
('Operations Manager', 'Oversee daily operations of the company.', 'New York', 'Management, Operations', 4, 1, 1, 'operations@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 75.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 1),
('Security Analyst', 'Monitor and improve IT security.', 'Los Angeles', 'Security, IT', 7, 1, 1, 'security@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 5500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 2),
('Database Administrator', 'Maintain and optimize company databases.', 'Chicago', 'IT, Database', 3, 1, 1, 'dba@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 80.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 3),
('Full Stack Developer', 'Develop and maintain full stack applications.', 'San Francisco', 'IT, Developer', 6, 1, 1, 'fullstack@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 6000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 4),
('Social Media Manager', 'Manage social media accounts and strategy.', 'Austin', 'Marketing, Social Media', 5, 1, 1, 'socialmedia@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 85.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 5),
('Technical Writer', 'Create technical documentation.', 'Boston', 'Writing, IT', 4, 1, 1, 'techwriter@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 4200.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 6),
('Event Coordinator', 'Plan and coordinate events.', 'Dallas', 'Events, Marketing', 3, 1, 1, 'events@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 90.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 7),
('Legal Advisor', 'Provide legal advice and services.', 'Houston', 'Legal', 2, 1, 1, 'legal@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 5000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 8),
('IT Manager', 'Manage IT team and projects.', 'Phoenix', 'IT, Management', 5, 1, 1, 'itmanager@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 95.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 9),
('Customer Success Manager', 'Ensure customer satisfaction and success.', 'Philadelphia', 'Support, Management', 6, 1, 1, 'customersuccess@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 5500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 10),
('Recruiter', 'Handle recruitment and hiring process.', 'San Diego', 'HR, Recruitment', 4, 1, 1, 'recruitment@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 100.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 1),
('Digital Marketing Specialist', 'Develop and implement digital marketing strategies.', 'San Francisco', 'Marketing, Digital', 5, 1, 1, 'digitalmarketing@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 6000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 2),
('Software Engineer', 'Design and develop software applications.', 'Seattle', 'IT, Developer', 8, 1, 1, 'softwareengineer@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 105.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 3),
('Content Writer', 'Write engaging content for various platforms.', 'New York', 'Writing, Content', 6, 1, 1, 'contentwriter@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 5500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 4),
('Project Manager', 'Manage projects and teams.', 'Chicago', 'Management, Projects', 7, 1, 1, 'projectmanager@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 110.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 5),
('Sales Representative', 'Sell company products or services.', 'Los Angeles', 'Sales, Marketing', 5, 1, 1, 'sales@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 6500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 6),
('UI/UX Designer', 'Design user interfaces and user experiences.', 'Dallas', 'Design, UX/UI', 4, 1, 1, 'uiux@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 115.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 7),
('Customer Support Specialist', 'Provide support to customers.', 'San Jose', 'Support, Customer Service', 3, 1, 1, 'customersupport@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 6000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 8),
('DevOps Engineer', 'Implement and manage DevOps processes.', 'Houston', 'IT, DevOps', 6, 1, 1, 'devops@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 120.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 9),
('Content Marketing Manager', 'Develop and manage content marketing strategies.', 'Phoenix', 'Marketing, Content', 7, 1, 1, 'contentmarketing@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 7000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 10),
('HR Coordinator', 'Support HR department with administrative tasks.', 'Philadelphia', 'HR, Administration', 3, 1, 1, 'hrcoordinator@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 125.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 1),
('Financial Analyst', 'Analyze financial data and provide insights.', 'San Diego', 'Finance, Analytics', 4, 1, 1, 'financialanalyst@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 6500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 2),
('Network Engineer', 'Design and maintain network infrastructure.', 'Denver', 'IT, Networking', 6, 1, 1, 'networkengineer@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 130.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 3),
('Marketing Coordinator', 'Support marketing campaigns and initiatives.', 'San Jose', 'Marketing, Administration', 5, 1, 1, 'marketingcoordinator@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 7000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 4),
('UX/UI Designer', 'Design user experiences and interfaces.', 'Columbus', 'Design, UX/UI', 7, 1, 1, 'uxuidesigner@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 135.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 5),
('Software Developer', 'Develop software solutions.', 'Charlotte', 'IT, Developer', 8, 1, 1, 'softwaredeveloper@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 7500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 6),
('Business Intelligence Analyst', 'Analyze data and provide business insights.', 'Fort Worth', 'Analytics, Business', 6, 1, 1, 'bi@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 140.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 7),
('Technical Support Specialist', 'Provide technical support to users.', 'Indianapolis', 'Support, IT', 10, 1, 1, 'techsupport@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 8000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 8),
('Marketing Manager', 'Oversee marketing strategies and campaigns.', 'San Francisco', 'Marketing, Management', 5, 1, 1, 'marketingmanager@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 145.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 9),
('Quality Assurance Analyst', 'Test and ensure quality of software applications.', 'Seattle', 'QA, IT', 5, 1, 1, 'qaanalyst@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 8500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 10),
('Operations Coordinator', 'Coordinate daily operations and logistics.', 'New York', 'Operations, Administration', 4, 1, 1, 'operationscoordinator@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 150.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 1),
('Cybersecurity Analyst', 'Monitor and protect company systems from cyber threats.', 'Los Angeles', 'Security, IT', 7, 1, 1, 'cybersecurity@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 9000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 2),
('Database Developer', 'Develop and maintain databases.', 'Chicago', 'IT, Database', 3, 1, 1, 'dbdeveloper@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 155.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 3),
('Front End Developer', 'Develop and implement front end applications.', 'San Francisco', 'IT, Developer', 6, 1, 1, 'frontenddeveloper@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 9500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 4),
('Social Media Coordinator', 'Manage social media platforms and content.', 'Austin', 'Marketing, Social Media', 5, 1, 1, 'socialmediacoordinator@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 160.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 5),
('Technical Documentation Specialist', 'Create technical documentation and manuals.', 'Boston', 'Writing, IT', 4, 1, 1, 'techdocs@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 10000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 6),
('Event Manager', 'Plan and execute events and conferences.', 'Dallas', 'Events, Management', 3, 1, 1, 'eventmanager@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 165.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 7),
('Legal Consultant', 'Provide legal advice and consultation.', 'Houston', 'Legal, Consulting', 2, 1, 1, 'legalconsultant@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 10500.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 8),
('IT Director', 'Oversee IT operations and strategy.', 'Phoenix', 'IT, Management', 5, 1, 1, 'itdirector@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 170.00, 'HOURLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 9),
('Customer Service Manager', 'Manage customer service team and operations.', 'Philadelphia', 'Customer Service, Management', 6, 1, 1, 'customerservice@company.com', SYSDATETIMEOFFSET(), DATEADD(day, 30, SYSDATETIMEOFFSET()), 11000.00, 'MONTHLY', 'USD', 'ACTIVE', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), NULL, 10);

UPDATE [mJOB].[dbo].[Jobs]
   SET [startDate] = DATEADD(day, -(id % 10), [startDate])
      ,[createdAt] = DATEADD(day, -(id % 10), [createdAt])
 WHERE [status] = 'active'

select * from [mJOB].[dbo].[Jobs]

-- Generate 50 entries for the [Applications] table with UserIds within the range of 1 to 10
INSERT INTO [mJOB].[dbo].[Applications]
       ([status]
       ,[createdAt]
       ,[updatedAt]
       ,[JobId]
       ,[UserId])
VALUES
('PENDING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 1, 3),
('ACCEPTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 2, 4),
('REJECTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 3, 5),
('ONGOING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 4, 6),
('COMPLETED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 5, 7),
('PENDING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 6, 8),
('ACCEPTED',  SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 7, 9),
('REJECTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 8, 10),
('ONGOING',  SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 9, 1),
('COMPLETED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 10, 2),
('PENDING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 11, 3),
('ACCEPTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 12, 4),
('REJECTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 13, 5),
('ONGOING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 14, 6),
('COMPLETED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 15, 7),
('PENDING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 16, 8),
('ACCEPTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 17, 9),
('REJECTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 18, 10),
('ONGOING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 19, 1),
('COMPLETED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 20, 2),
('PENDING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 21, 3),
('ACCEPTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 22, 4),
('REJECTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 23, 5),
('ONGOING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 24, 6),
('COMPLETED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 25, 7),
('PENDING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 26, 8),
('ACCEPTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 27, 9),
('REJECTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 28, 10),
('ONGOING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 29, 1),
('COMPLETED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 30, 2),
('PENDING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 31, 3),
('ACCEPTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 32, 4),
('REJECTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 33, 5),
('ONGOING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 34, 6),
('COMPLETED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 35, 7),
('PENDING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 36, 8),
('ACCEPTED',SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 37, 9),
('REJECTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 38, 10),
('ONGOING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 39, 1),
('COMPLETED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 40, 2),
('PENDING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 41, 3),
('ACCEPTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 42, 4),
('REJECTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 43, 5),
('ONGOING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 44, 6),
('COMPLETED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 45, 7),
('PENDING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 46, 8),
('ACCEPTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 47, 9),
('REJECTED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 48, 10),
('ONGOING', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 49, 1),
('COMPLETED', SYSDATETIMEOFFSET(), SYSDATETIMEOFFSET(), 50, 2);
GO


INSERT INTO [mJOB].[dbo].[JobMetrics]
           ([view]
           ,[createdAt]
           ,[updatedAt]
           ,[deletedAt]
           ,[JobId])
     VALUES
(100, GETDATE(), GETDATE(), NULL, 1),
(200, GETDATE(), GETDATE(), NULL, 2),
(150, GETDATE(), GETDATE(), NULL, 3),
(250, GETDATE(), GETDATE(), NULL, 4),
(300, GETDATE(), GETDATE(), NULL, 5),
(120, GETDATE(), GETDATE(), NULL, 6),
(180, GETDATE(), GETDATE(), NULL, 7),
(210, GETDATE(), GETDATE(), NULL, 8),
(160, GETDATE(), GETDATE(), NULL, 9),
(220, GETDATE(), GETDATE(), NULL, 10),
(190, GETDATE(), GETDATE(), NULL, 11),
(230, GETDATE(), GETDATE(), NULL, 12),
(140, GETDATE(), GETDATE(), NULL, 13),
(110, GETDATE(), GETDATE(), NULL, 14),
(240, GETDATE(), GETDATE(), NULL, 15),
(260, GETDATE(), GETDATE(), NULL, 16),
(270, GETDATE(), GETDATE(), NULL, 17),
(280, GETDATE(), GETDATE(), NULL, 18),
(130, GETDATE(), GETDATE(), NULL, 19),
(290, GETDATE(), GETDATE(), NULL, 20),
(300, GETDATE(), GETDATE(), NULL, 21),
(310, GETDATE(), GETDATE(), NULL, 22),
(320, GETDATE(), GETDATE(), NULL, 23),
(330, GETDATE(), GETDATE(), NULL, 24),
(340, GETDATE(), GETDATE(), NULL, 25),
(350, GETDATE(), GETDATE(), NULL, 26),
(360, GETDATE(), GETDATE(), NULL, 27),
(370, GETDATE(), GETDATE(), NULL, 28),
(380, GETDATE(), GETDATE(), NULL, 29),
(390, GETDATE(), GETDATE(), NULL, 30),
(400, GETDATE(), GETDATE(), NULL, 31),
(410, GETDATE(), GETDATE(), NULL, 32),
(220, GETDATE(), GETDATE(), NULL, 33),
(430, GETDATE(), GETDATE(), NULL, 34),
(40, GETDATE(), GETDATE(), NULL, 35),
(750, GETDATE(), GETDATE(), NULL, 36),
(462, GETDATE(), GETDATE(), NULL, 37),
(170, GETDATE(), GETDATE(), NULL, 38),
(380, GETDATE(), GETDATE(), NULL, 39),
(490, GETDATE(), GETDATE(), NULL, 40),
(500, GETDATE(), GETDATE(), NULL, 41),
(510, GETDATE(), GETDATE(), NULL, 42),
(220, GETDATE(), GETDATE(), NULL, 43),
(530, GETDATE(), GETDATE(), NULL, 44),
(540, GETDATE(), GETDATE(), NULL, 45),
(650, GETDATE(), GETDATE(), NULL, 46),
(560, GETDATE(), GETDATE(), NULL, 47),
(871, GETDATE(), GETDATE(), NULL, 48),
(480, GETDATE(), GETDATE(), NULL, 49),
(200, GETDATE(), GETDATE(), NULL, 50);

INSERT INTO [mJOB].[dbo].[Marketings]
           ([title]
           ,[description]
           ,[banner]
           ,[active]
           ,[createdAt]
           ,[updatedAt]
           ,[deletedAt])
     VALUES
           ('Summer Sale',
            'Get up to 50% off on all summer collections!',
            'https://example.com/banners/summer_sale.jpg',
            1,
            GETDATE(),
            GETDATE(),
            NULL),
           ('Back to School',
            'Exclusive deals for students on back-to-school essentials.',
            'https://example.com/banners/back_to_school.jpg',
            1,
            GETDATE(),
            GETDATE(),
            NULL),
           ('Holiday Specials',
            'Unwrap amazing discounts this holiday season.',
            'https://example.com/banners/holiday_specials.jpg',
            1,
            GETDATE(),
            GETDATE(),
            NULL);

INSERT INTO [mJOB].[dbo].[PostCategories]
           ([name]
           ,[fgColor]
           ,[bgColor]
           ,[enabled]
           ,[createdAt]
           ,[updatedAt])
     VALUES
           ('Technology', 'FFFFFF', '0000FF', 1, '2024-07-25 12:00:00 +00:00', '2024-07-25 12:00:00 +00:00'),
           ('Health & Wellness', 'FFFFFF', '00FF00', 1, '2024-07-25 13:00:00 +00:00', '2024-07-25 13:00:00 +00:00'),
           ('Travel', 'FFFFFF', 'FF00FF', 1, '2024-07-25 14:00:00 +00:00', '2024-07-25 14:00:00 +00:00'),
           ('Finance', 'FFFFFF', 'FFFF00', 1, '2024-07-25 15:00:00 +00:00', '2024-07-25 15:00:00 +00:00'),
           ('Lifestyle', 'FFFFFF', 'FFA500', 1, '2024-07-25 16:00:00 +00:00', '2024-07-25 16:00:00 +00:00')
GO

INSERT INTO [mJOB].[dbo].[Posts]
           ([title]
           ,[content]
           ,[tags]
           ,[status]
           ,[createdAt]
           ,[updatedAt]
           ,[deletedAt]
           ,[PostCategoryId]
           ,[UserId])
VALUES
           ('The Future of AI', 'Exploring the advancements and implications of artificial intelligence in the modern world.', 'AI,technology,future', 'PUBLISHED', '2024-07-25 12:00:00 +00:00', '2024-07-25 12:00:00 +00:00', NULL, 1, 1),  -- Technology
           ('Healthy Living Tips', 'A comprehensive guide to maintaining a healthy lifestyle through diet and exercise.', 'health,wellness,fitness', 'PUBLISHED', '2024-07-25 13:00:00 +00:00', '2024-07-25 13:00:00 +00:00', NULL, 2, 2),  -- Health & Wellness
           ('Travel Destinations 2024', 'Top travel destinations to explore in 2024 for an unforgettable experience.', 'travel,adventure,2024', 'PUBLISHED', '2024-07-25 14:00:00 +00:00', '2024-07-25 14:00:00 +00:00', NULL, 3, 3),  -- Travel
           ('The Rise of Remote Work', 'Analyzing the shift towards remote work and its impact on productivity and work-life balance.', 'remote work,productivity,work-life balance', 'PUBLISHED', '2024-07-25 15:00:00 +00:00', '2024-07-25 15:00:00 +00:00', NULL, 1, 4),  -- Technology
           ('Investing in Cryptocurrencies', 'A beginner�s guide to investing in cryptocurrencies and understanding the market trends.', 'cryptocurrency,investment,finance', 'PUBLISHED', '2024-07-25 16:00:00 +00:00', '2024-07-25 16:00:00 +00:00', NULL, 4, 5),  -- Finance
           ('Sustainable Living', 'Tips and strategies for adopting a sustainable lifestyle and reducing your carbon footprint.', 'sustainability,environment,green living', 'PUBLISHED', '2024-07-25 17:00:00 +00:00', '2024-07-25 17:00:00 +00:00', NULL, 2, 6),  -- Health & Wellness
           ('Latest Tech Gadgets', 'A review of the latest tech gadgets that are making waves in the market.', 'technology,gadgets,review', 'PUBLISHED', '2024-07-25 18:00:00 +00:00', '2024-07-25 18:00:00 +00:00', NULL, 1, 7),  -- Technology
           ('Cooking Recipes for Beginners', 'Simple and delicious recipes for those who are new to cooking.', 'cooking,recipes,beginner', 'PUBLISHED', '2024-07-25 19:00:00 +00:00', '2024-07-25 19:00:00 +00:00', NULL, 5, 8),  -- Lifestyle
           ('Understanding Mental Health', 'An insightful look into mental health issues and how to manage them.', 'mental health,well-being,self-care', 'PUBLISHED', '2024-07-25 20:00:00 +00:00', '2024-07-25 20:00:00 +00:00', NULL, 2, 9),  -- Health & Wellness
           ('The Art of Photography', 'Tips and techniques for capturing stunning photographs.', 'photography,art,techniques', 'PUBLISHED', '2024-07-25 21:00:00 +00:00', '2024-07-25 21:00:00 +00:00', NULL, 5, 10)  -- Lifestyle
GO
select * from Posts

INSERT INTO [mJOB].[dbo].[PostMetrics]
           ([PostId]
           ,[day]
           ,[likes]
           ,[dislikes]
           ,[comments]
           ,[views])
     VALUES
           (1, '2024-07-25', 150, 10, 25, 1000),  -- Metrics for "The Future of AI"
           (2, '2024-07-25', 120, 5, 15, 800),   -- Metrics for "Healthy Living Tips"
           (3, '2024-07-25', 200, 20, 30, 1500), -- Metrics for "Travel Destinations 2024"
           (4, '2024-07-25', 180, 15, 20, 1200), -- Metrics for "The Rise of Remote Work"
           (5, '2024-07-25', 130, 8, 18, 900),   -- Metrics for "Investing in Cryptocurrencies"
           (6, '2024-07-25', 110, 6, 12, 750),   -- Metrics for "Sustainable Living"
           (7, '2024-07-25', 160, 12, 22, 1100), -- Metrics for "Latest Tech Gadgets"
           (8, '2024-07-25', 90, 3, 10, 600),    -- Metrics for "Cooking Recipes for Beginners"
           (9, '2024-07-25', 140, 7, 16, 850),   -- Metrics for "Understanding Mental Health"
           (10, '2024-07-25', 170, 9, 24, 1300)  -- Metrics for "The Art of Photography"
GO

DECLARE @balance DECIMAL(10,2);
DECLARE @createdAt DATETIMEOFFSET(7);
DECLARE @updatedAt DATETIMEOFFSET(7);
DECLARE @UserId INT;

SET @createdAt = SYSDATETIMEOFFSET(); -- Current timestamp for createdAt
SET @updatedAt = SYSDATETIMEOFFSET(); -- Current timestamp for updatedAt

SET @UserId = 1; -- Start UserId from 1

WHILE @UserId <= 10
BEGIN
    SET @balance = ROUND(RAND() * 10000, 2); -- Generate a random balance between 0 and 10000

    INSERT INTO [mJob].[dbo].[Balances]
           ([balance]
           ,[createdAt]
           ,[updatedAt]
           ,[UserId])
     VALUES
           (@balance
           ,@createdAt
           ,@updatedAt
           ,@UserId);

    SET @UserId = @UserId + 1;
END