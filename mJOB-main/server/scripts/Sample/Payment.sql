USE mJOB;
GO

INSERT INTO user_balance (user_id, balance)
VALUES
(1, 1200000),
(2, 500000),
(3, 1000000),
(4, 2000000),
(5, 3000000),
(6, 4000000),
(7, 5000000),
(8, 6000000),
(9, 7000000),
(10, 8000000);
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added sample for table: user_balance');

INSERT INTO payment_method (payment_method_name, payment_method_type)
VALUES
-- Local (VN) payment methods
('VN Pay', 'vnpay'),                -- 1
('Momo', 'momo'),                   -- 2
('Zalo Pay', 'zalopay'),            -- 3
('Bank Transfer', 'bank_transfer'), -- 4
-- International payment methods
('PayPal', 'paypal'),               -- 5
('Credit Card', 'credit_card'),     -- 6
('Debit Card', 'debit_card');       -- 7
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added samples for table: payment_method');
GO

-- User payment methods are currently unavailable as "payout" is not implemented yet

INSERT INTO payment_history(user_id, tx_action, tx_action_value, tx_action_target)
VALUES
(1, 'deposit', 200000, 'mJOB'), -- user 1 deposited 200k to mJOB
(2, 'deposit', 100000, 'mJOB'),
(3, 'deposit', 300000, 'mJOB'),
(4, 'deposit', 400000, 'mJOB'),
(5, 'deposit', 500000, 'mJOB'),
(6, 'deposit', 600000, 'mJOB'),
(7, 'deposit', 700000, 'mJOB'),
(8, 'deposit', 800000, 'mJOB'),
(9, 'deposit', 900000, 'mJOB'),
(10, 'deposit', 1000000, 'mJOB');
GO

INSERT INTO system_log (system_log_type, system_log_data)
VALUES ('INFO', 'Added samples for table: payment_history');
GO