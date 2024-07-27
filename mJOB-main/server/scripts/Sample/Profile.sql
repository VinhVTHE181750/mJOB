USE mJOB;
GO

INSERT INTO profile (user_id, user_bio, user_dob, user_address, user_citizen_id, user_email, user_phone_number)
VALUES
(1, '5 năm cống hiến tại AB Studio', '20000215', '25 ABC, FE DAB, BAREY', '001199xxxxxx', 'nguyenan1999@abstudio', '03457924816'),
(2, 'Cố vấn Tổng thống tối cao', '19870130', '25 ABC, FE DAB, BAREY', '001199xxxxxx', 'nguyenan1999@abstudio', '03457924816'),
(3, 'bio', '20000215', '2 DEF, WX YZ, HURON', '065100', 'trannam29@gmailx.com', '0346171416'),
(4, 'bio', '20000215', '39 MNO, MN OPQ, FAROA', '079100', '__OwO__@hotxmail.com', '0342366328'),
(5, 'bio', '20000215', '82 JKL, MN OPQ, FAROA', '068100', 'TheRealAdmin@gmailx.com', '0345281869'),
(6, 'bio', '20000215', '71 ABC, MN OPQ, HURON', '026100', 'admin01@yahoox.com', '0348517508'),
(7, 'bio', '20000215', '53 DEF, RS TUV, FAROA', '086100', 'he250178@yahoox.com', '0345520352'),
(8, 'bio', '20000215', '95 ABC, XY ZAB, BAREY', '042100', 'hoang_tuna@yahoox.com', '0344500911'),
(9, 'bio', '20000215', '48 JKL, MN OPQ, FAROA', '083100', 'NguyenKhanh@gmailx.com', '0345034158'),
(10, 'bio', '20000215', '88 GHI, XY ZAB, BAREY', '087100', 'TrumBacKi@hotmailx.com', '0341511921');
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added samples for table: profile');
GO