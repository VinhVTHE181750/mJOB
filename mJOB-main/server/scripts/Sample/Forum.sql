USE mJOB;
GO
INSERT INTO
    post (
        post_title,
        post_content,
        user_id,
        post_created_time,
        post_updated_time
    )
VALUES
    (
        'Need Help to Write CV for Software Engineer',
        'Data analysts play a crucial role in helping organizations make informed business decisions by analyzing and interpreting complex data.',
        1,
        '20220211 07:34:11 PM',
        '20220218 02:50:09 AM'
    ),
    (
        'Hiring Waitress for Busy Restaurant',
        'Software engineers design, develop, and test software programs to meet the needs of businesses and individuals.',
        1,
        '20220410 10:20:33 AM',
        '20220410 06:32:15 PM'
    ),
    (
        'Become a Marketing Manager and Boost Your Career',
        'Marketing managers develop and implement marketing strategies to reach target audiences and drive business growth.',
        2,
        '20220612 11:30:55 AM',
        '20220805 02:44:02 AM'
    ),
    (
        'Nurse Practitioner Job Opportunities Available',
        'Nurse practitioners provide primary and specialty healthcare services to patients, often working independently or in collaboration with physicians.',
        2,
        '20221120 08:22:09 AM',
        '20230102 10:59:29 AM'
    ),
    (
        'Graphic Designer Wanted for Creative Agency',
        'Graphic designers create visual communications and designs to convey messages and express ideas.',
        3,
        '20221230 05:30:11 AM',
        '20230105 11:07:03 AM'
    ),
    (
        'Sales Representative Needed for Tech Startup',
        'Sales representatives work with customers to understand their needs and provide solutions through products or services.',
        3,
        '20230111 08:14:09 AM',
        '20230621 10:04:22 AM'
    ),
    (
        'Web Developer Job Opening at Leading Company',
        'Web developers design and build websites, applications, and other online platforms to meet the needs of businesses and individuals.',
        4,
        '20230319 11:31:11 AM',
        '20230628 02:04:33 AM'
    ),
    (
        'Human Resources Manager Position Available',
        'Human resources managers oversee the recruitment, training, and development of employees, as well as benefits and compensation.',
        5,
        '20230602 01:13:15 PM',
        '20230607 09:30:39 AM'
    ),
    (
        'Financial Advisor Career Opportunities',
        'Financial advisors provide guidance and advice to individuals and businesses on investment and financial planning.',
        6,
        '20230818 05:06:17 AM',
        '20230904 07:33:29 AM'
    ),
    (
        'Teaching Jobs Available for Passionate Educators',
        'Teachers educate and inspire students, helping them to develop knowledge, skills, and values.',
        7,
        '20231118 10:30:22 AM',
        '20231118 02:37:00 PM'
    ),
    (
        'Customer Service Representative Wanted',
        'Customer service representatives provide assistance and support to customers, resolving issues and improving customer satisfaction.',
        1,
        '20240118 04:22:40 PM',
        '20240210 02:04:01 PM'
    ),
    (
        'Operations Manager Job Opening at Manufacturing Company',
        'Operations managers oversee the day-to-day activities of businesses, ensuring efficiency, productivity, and quality.',
        2,
        '20240123 11:38:20 PM',
        '20240310 00:45:47 AM'
    ),
    (
        'IT Project Manager Position Available at Tech Firm',
        'IT project managers plan, coordinate, and execute technology projects, ensuring they are completed on time and within budget.',
        3,
        '20240222 09:11:33 AM',
        '20240301 02:22:22 AM'
    ),
    (
        'Accountant Job Opportunities in Finance Industry',
        'Accountants prepare and examine financial records, ensuring accuracy and compliance with laws and regulations.',
        5,
        '20240218 02:06:11 PM',
        '20240322 05:20:11 PM'
    ),
    (
        'Digital Marketing Specialist Wanted for E-commerce Company',
        'Digital marketing specialists develop and implement online marketing campaigns to reach target audiences and drive business growth.',
        7,
        '20240314 04:21:16 PM',
        '20240422 04:29:30 AM'
    ),
    (
        'Network Administrator Job Opening at IT Company',
        'Network administrators install, configure, and maintain computer networks, ensuring they are secure and running smoothly.',
        1,
        '20240315 02:27:36 AM',
        '20240316 04:17:40 AM'
    ),
    (
        'Recruiter Position Available at Staffing Agency',
        'Recruiters identify, attract, and select top talent to fill job openings, often working with hiring managers and HR teams.',
        1,
        '20240430 08:16:32 AM',
        '20240504 04:08:16 PM'
    ),
    (
        'UX Designer Job Opportunities in Tech Industry',
        'UX designers create user-centered designs for products and services, focusing on usability, accessibility, and user experience.',
        2,
        '20240502 01:11:16 PM',
        '20240511 01:19:16 AM'
    ),
    (
        'Business Analyst Position Available at Consulting Firm',
        'Business analysts work with stakeholders to identify business needs and develop solutions to improve operations and performance.',
        5,
        '20240515 03:19:16 PM',
        '20240612 03:25:10 PM'
    ),
    (
        'Cybersecurity Specialist Job Opening at Security Firm',
        'Cybersecurity specialists protect computer systems and networks from cyber threats, developing and implementing security protocols.',
        7,
        '20240518 03:40:04 AM',
        '20240522 03:45:04 AM'
    ),
    (
        'Event Planner Wanted for Wedding Planning Company',
        'Event planners coordinate and execute events, such as conferences, weddings, and parties, ensuring they are successful and memorable.',
        1,
        '20240521 06:42:04 PM',
        '20240601 06:48:22 AM'
    ),
    (
        'Content Writer Job Opportunities in Publishing Industry',
        'Content writers create engaging and informative content for various mediums, including websites, blogs, and social media.',
        3,
        '20240528 11:40:30 AM',
        '20240605 11:45:30 AM'
    ),
    (
        'Database Administrator Job Opening at Data Company',
        'Database administrators design, implement, and maintain databases, ensuring data is secure and easily accessible.',
        2,
        '20240530 08:20:33 PM',
        '20240611 08:29:37 AM'
    ),
    (
        'HR Generalist Position Available at Non-profit Organization',
        'HR generalists handle a range of HR tasks, including recruitment, benefits, and employee relations.',
        1,
        '20240531 05:10:34 AM',
        '20240610 05:02:58 PM'
    ),
    (
        'Webmaster Job Opening at Digital Agency',
        'Webmasters maintain and update websites, ensuring they are running smoothly and efficiently.',
        9,
        '20240605 01:32:31 PM',
        '20240614 01:25:42 PM'
    );
GO
INSERT INTO
    post_history (
        post_id,
        post_title,
        post_content,
        post_history_time
    )
VALUES
    (
        1,
        'Need Help to Write CV for Software Engineer',
        'Data analysts play a crucial role in helping organizations make informed business decisions by analyzing and interpreting complex data.',
        '20220218 02:50:09 AM'
    ),
    (
        2,
        'Hiring Waitress for Busy Restaurant',
        'Software engineers design, develop, and test software programs to meet the needs of businesses and individuals.',
        '20220410 06:32:15 PM'
    ),
    (
        3,
        'Become a Marketing Manager and Boost Your Career',
        'Marketing managers develop and implement marketing strategies to reach target audiences and drive business growth.',
        '20220805 02:44:02 AM'
    ),
    (
        4,
        'Nurse Practitioner Job Opportunities Available',
        'Nurse practitioners provide primary and specialty healthcare services to patients, often working independently or in collaboration with physicians.',
        '20230102 10:59:29 AM'
    ),
    (
        5,
        'Graphic Designer Wanted for Creative Agency',
        'Graphic designers create visual communications and designs to convey messages and express ideas.',
        '20230105 11:07:03 AM'
    ),
    (
        6,
        'Sales Representative Needed for Tech Startup',
        'Sales representatives work with customers to understand their needs and provide solutions through products or services.',
        '20230621 10:04:22 AM'
    ),
    (
        7,
        'Web Developer Job Opening at Leading Company',
        'Web developers design and build websites, applications, and other online platforms to meet the needs of businesses and individuals.',
        '20230628 02:04:33 AM'
    ),
    (
        8,
        'Human Resources Manager Position Available',
        'Human resources managers oversee the recruitment, training, and development of employees, as well as benefits and compensation.',
        '20230607 09:30:39 AM'
    ),
    (
        9,
        'Financial Advisor Career Opportunities',
        'Financial advisors provide guidance and advice to individuals and businesses on investment and financial planning.',
        '20230904 07:33:29 AM'
    ),
    (
        10,
        'Teaching Jobs Available for Passionate Educators',
        'Teachers educate and inspire students, helping them to develop knowledge, skills, and values.',
        '20231118 02:37:00 PM'
    ),
    (
        11,
        'Customer Service Representative Wanted',
        'Customer service representatives provide assistance and support to customers, resolving issues and improving customer satisfaction.',
        '20240210 02:04:01 PM'
    ),
    (
        12,
        'Operations Manager Job Opening at Manufacturing Company',
        'Operations managers oversee the day-to-day activities of businesses, ensuring efficiency, productivity, and quality.',
        '20240310 00:45:47 AM'
    ),
    (
        13,
        'IT Project Manager Position Available at Tech Firm',
        'IT project managers plan, coordinate, and execute technology projects, ensuring they are completed on time and within budget.',
        '20240301 02:22:22 AM'
    ),
    (
        14,
        'Accountant Job Opportunities in Finance Industry',
        'Accountants prepare and examine financial records, ensuring accuracy and compliance with laws and regulations.',
        '20240322 05:20:11 PM'
    ),
    (
        15,
        'Digital Marketing Specialist Wanted for E-commerce Company',
        'Digital marketing specialists develop and implement online marketing campaigns to reach target audiences and drive business growth.',
        '20240422 04:29:30 AM'
    ),
    (
        16,
        'Network Administrator Job Opening at IT Company',
        'Network administrators install, configure, and maintain computer networks, ensuring they are secure and running smoothly.',
        '20240316 04:17:40 AM'
    ),
    (
        17,
        'Recruiter Position Available at Staffing Agency',
        'Recruiters identify, attract, and select top talent to fill job openings, often working with hiring managers and HR teams.',
        '20240504 04:08:16 PM'
    ),
    (
        18,
        'UX Designer Job Opportunities in Tech Industry',
        'UX designers create user-centered designs for products and services, focusing on usability, accessibility, and user experience.',
        '20240511 01:19:16 AM'
    ),
    (
        19,
        'Business Analyst Position Available at Consulting Firm',
        'Business analysts work with stakeholders to identify business needs and develop solutions to improve operations and performance.',
        '20240612 03:25:10 PM'
    ),
    (
        20,
        'Cybersecurity Specialist Job Opening at Security Firm',
        'Cybersecurity specialists protect computer systems and networks from cyber threats, developing and implementing security protocols.',
        '20240522 03:45:04 AM'
    ),
    (
        21,
        'Event Planner Wanted for Wedding Planning Company',
        'Event planners coordinate and execute events, such as conferences, weddings, and parties, ensuring they are successful and memorable.',
        '20240601 06:48:22 AM'
    ),
    (
        22,
        'Content Writer Job Opportunities in Publishing Industry',
        'Content writers create engaging and informative content for various mediums, including websites, blogs, and social media.',
        '20240605 11:45:30 AM'
    ),
    (
        23,
        'Database Administrator Job Opening at Data Company',
        'Database administrators design, implement, and maintain databases, ensuring data is secure and easily accessible.',
        '20240611 08:29:37 AM'
    ),
    (
        24,
        'HR Generalist Position Available at Non-profit Organization',
        'HR generalists handle a range of HR tasks, including recruitment, benefits, and employee relations.',
        '20240610 05:02:58 PM'
    ),
    (
        25,
        'Webmaster Job Opening at Digital Agency',
        'Webmasters maintain and update websites, ensuring they are running smoothly and efficiently.',
        '20240614 01:25:42 PM'
    );
INSERT INTO
    system_log (
        system_log_type,
        system_log_data
    )
VALUES
    (
        'INFO',
        'Added samples for table: post'
    );
GO
INSERT INTO
    comment (
        post_id,
        user_id,
        comment_content
    )
VALUES
    (
        1,
        2,
        'Wow, this looks great!'
    ),
    (1, 3, 'Damn'),
    (
        2,
        4,
        'I am interested in this position.'
    ),
    (
        2,
        5,
        'Great opportunity!'
    ),
    (
        3,
        6,
        'I have always wanted to be a marketing manager.'
    ),
    (
        3,
        7,
        'This is my dream job!'
    ),
    (
        4,
        8,
        'I am a nurse practitioner and I love my job.'
    ),
    (
        4,
        9,
        'Nurse practitioners are amazing!'
    ),
    (
        5,
        10,
        'I am a graphic designer and I am interested in this position.'
    ),
    (
        5,
        1,
        'I love graphic design!'
    ),
    (
        6,
        2,
        'I am a sales representative and I am excited about this opportunity.'
    ),
    (
        6,
        3,
        'Sales is my passion!'
    ),
    (
        7,
        4,
        'I am a web developer and I am interested in this job.'
    ),
    (
        7,
        5,
        'Web development is my passion!'
    ),
    (
        8,
        6,
        'I am a human resources manager and I am looking for a new opportunity.'
    ),
    (
        8,
        7,
        'HR is my calling!'
    ),
    (
        9,
        8,
        'I am a financial advisor and I am interested in this position.'
    ),
    (
        9,
        9,
        'Finance is my expertise!'
    ),
    (
        10,
        10,
        'I am a teacher and I am passionate about education.'
    ),
    (
        10,
        1,
        'Teaching is my life!'
    ),
    (
        11,
        2,
        'I am a customer service representative and I am interested in this job.'
    ),
    (
        11,
        3,
        'Customer service is my specialty!'
    ),
    (
        12,
        4,
        'I am an operations manager and I am excited about this opportunity.'
    ),
    (
        12,
        5,
        'Operations is my forte!'
    ),
    (
        13,
        6,
        'I am an IT project manager and I am looking for a new challenge.'
    ),
    (
        13,
        7,
        'IT projects are my passion!'
    );
GO
INSERT INTO
    system_log (
        system_log_type,
        system_log_data
    )
VALUES
    (
        'INFO',
        'Added samples for table: comment'
    );
GO
INSERT INTO
    comment_history (comment_id, comment_content)
VALUES
    (
        1,
        'Wow, this looks great!'
    ),
    (2, 'Damn'),
    (
        3,
        'I am interested in this position.'
    ),
    (
        4,
        'Great opportunity!'
    ),
    (
        5,
        'I have always wanted to be a marketing manager.'
    ),
    (
        6,
        'This is my dream job!'
    ),
    (
        7,
        'I am a nurse practitioner and I love my job.'
    ),
    (
        8,
        'Nurse practitioners are amazing!'
    ),
    (
        9,
        'I am a graphic designer and I am interested in this position.'
    ),
    (
        10,
        'I love graphic design!'
    ),
    (
        11,
        'I am a sales representative and I am excited about this opportunity.'
    ),
    (
        12,
        'Sales is my passion!'
    ),
    (
        13,
        'I am a web developer and I am interested in this job.'
    ),
    (
        14,
        'Web development is my passion!'
    ),
    (
        15,
        'I am a human resources manager and I am looking for a new opportunity.'
    ),
    (
        16,
        'HR is my calling!'
    ),
    (
        17,
        'I am a financial advisor and I am interested in this position.'
    ),
    (
        18,
        'Finance is my expertise!'
    ),
    (
        19,
        'I am a teacher and I am passionate about education.'
    ),
    (
        20,
        'Teaching is my life!'
    ),
    (
        21,
        'I am a customer service representative and I am interested in this job.'
    ),
    (
        22,
        'Customer service is my specialty!'
    ),
    (
        23,
        'I am an operations manager and I am excited about this opportunity.'
    ),
    (
        24,
        'Operations is my forte!'
    ),
    (
        25,
        'I am an IT project manager and I am looking for a new challenge.'
    ),
    (
        26,
        'IT projects are my passion!'
    );
GO
INSERT INTO
    system_log (
        system_log_type,
        system_log_data
    )
VALUES
    (
        'INFO',
        'Added samples for table: content_history'
    );
GO
INSERT INTO
    system_log (
        system_log_type,
        system_log_data
    )
VALUES
    (
        'INFO',
        'Added samples for table: forum_log'
    );
GO