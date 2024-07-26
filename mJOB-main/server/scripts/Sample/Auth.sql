USE mJOB;
GO

-- Auth flow
---- register:
------ 1. Insert user
------ 2. Insert auth
------ 3. Insert auth_log
---- login:
------ 1. join user - auth
------ 2. compare input1 with email or username AND input2 with hash, if any fail -> display: username/email or password is incorrect (never display username does not exist)
------ 3. if auth.status = ONLINE -> deny login: already logged in elsewhere
------ 4. if auth.status = LOCKED -> deny login: account locked
------ 5. insert session
------ 6. send session data to client
------ 7. now client can use session data to access platform
---- logout: on /logout or session timeout
------ 1. delete session
------ 2. set auth.status = OFFLINE
---- reset password:
------ 1. user input email
------ 2. generate a code and send to that email
------ 3. if (2) success, check if user with that mail exist
------ 3. if (3) true, insert code as auth.auth_code
------    else navigate user to register page
------ 
------ 
------ Mindset 1: notify user if account does not exist -> potential security risk as they can scan user list, but more convenient for users
------ Mindset 2: don't notify user if account does not exist -> better security but need extra implementations (e.g: send to unregistered email "there is no account associated with this email, but someone tried resetting their password of that..." and also have to send first login credentials to email, since user cannot register if account is exist or not is unknown, plus usually users have to change password at first login attempt

-- Add 10 random user
INSERT INTO [user] (username)
VALUES
('andz1207'),
('DeNhatQuocSu'),
('trannam29'),
('__OwO__'),
('TheRealAdmin'),
('admin01'),
('he250178'),
('hoang_tuna'),
('NguyenKhanh'),
('TrumBacKi');
GO

-- Add 10 random user credentials
INSERT INTO auth (user_id, hash, salt)
VALUES 
(1, 'a6f63a5fb10b3bba180a79f2fc565b1db2101040ce71ea80692d671857fe2117', ''),
-- andz1207 | passWord
(2, 'ea6cecea0bafcc1b93a80230e42cde46710c4212787453beced211ebbd342326', ''),
-- passWord2
(3, '97b9f0055e1e2ddde718eb79d5ba18c2cc4af174c29ff2a49869dfce4b334342', ''),
-- passWord3
(4, '4cde37e3789f19ed189b1f81f8cd36ba8420ebe505d79ebc9803ae579073de7a', ''),
-- passWord4
(5, 'b912027fd35321538ec00c1a3e7a1d7e565d9a05af17697179f3ebff238fb581', ''),
-- passWord5
(6, 'b20e740845579ac8b50edb08f61dea0f0a573f3f5f2a3d6337c824193a59627f', ''),
-- passWord6
(7, 'd12d9f42c6caf07537a1fb0c43ccab990f4883d73d05c7612de9bb93d8e33f3f', ''),
-- passWord7
(8, '3f36c04a18c1d77e273404ca9ccfbeb508611cecc514ac0961b46f0fb28d2bf1', ''),
-- passWord8
(9, '6e038144402f05839a8e2491ee89a455bed0acec6379a622a6b0ad3c2c4e1108', ''),
-- passWord9
(10, 'a70cc00b99169c648c41762aa456f89099eb7236dfb8cf6b5c1f57c946b19d5d', '');
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