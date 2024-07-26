const express = require("express");
const db = require("../models/DBContext");
const router = express.Router();

// Select user balance by user id
const SELECT_CURRENT_USER_BALANCE = `select u.user_id,u.username,b.balance from user_balance b join [user] u on b.user_id=u.user_id where b.user_id= @userId`;

const UPDATE_USER_BALANCE = `Update user_balance
SET balance = @balance
WHERE user_id = @userId;`;

const UPDATE_USER_TRANFER_TO = `Update user_balance`;

const INSERT_PAYMENT_HISTORY = `
        INSERT INTO payment_histories (
          [from],
          [to],
          amount,
          onPlatform,
          action,
          status,
          createdAt,
          UserId
        ) VALUES (
          @from,
          @to,
          @amount,
          @onPlatform,
          @action,
          @status,
          @createdAt,
          @userId
        )
      ;`;

const CHECK_USER_BALANCE_EXISTS = `select u.user_id,u.username from user_balance b 
join [user] u on b.user_id=u.user_id where b.user_id= @userId`;

const { JwtMiddleware } = require("../utils/JWT");

const balanceRoute = require("./payment/Balance");
router.use("/balance", balanceRoute);

const withdrawRoute = require("./payment/Withdraw");
router.use("/withdraw", withdrawRoute);

const depositRoute = require("./payment/Deposit");
router.use("/deposit", depositRoute);

const transferRoute = require("./payment/Transfer");
const Balance = require("../models/payment/Balance");
const { sendMailOTP } = require("../helper/sendmail");
const User = require("../models/user/User");
const Auth = require("../models/user/Auth");
const Hasher = require("../utils/Hasher");
const PaymentHistory = require("../models/payment/PaymentHistory");
router.use("/transfer", transferRoute);

//Get user balance
router.get("/balance/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const balance = await Balance.findOne({ where: { userId } });
    return res.status(200).json({ data: balance });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

//Check user tranfer
router.get("/tranferuser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("userId", db.sql.Int, userId)
      .query(CHECK_USER_BALANCE_EXISTS);
    if (result.recordset.length === 0) {
      res.status(404).json({ message: "Data not found" });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

router.put("/update-balance", async (req, res) => {
  try {
    const { userId, balance } = req.body;
    console.log(userId, balance);
    if (userId == null || balance == null) {
      return res.status(400).json({ error: "userId and balance are required" });
    }

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("balance", db.sql.Decimal(10, 2), balance)
      .input("userId", db.sql.Int, userId)
      .query(UPDATE_USER_BALANCE);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Balance updated successfully" });
  } catch (error) {
    console.error("Error updating balance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/send-otp", async (req, res) => {
  try {
    function generateRandomSixDigitNumber() {
      let randomNumber = Math.floor(Math.random() * 1000000);
      let randomSixDigitNumber = String(randomNumber).padStart(6, "0");
      return randomSixDigitNumber;
    }

    const { username, password } = req.body;

    const randNumber = generateRandomSixDigitNumber();
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const auth = await Auth.findOne({ where: { UserId: user.id } });
    const hash = await Hasher.getHash(password, auth.salt);
    const isValidPassword = hash === auth.hash;
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    if (user) {
      await sendMailOTP(user.email, randNumber);
      const auth = await Auth.findOne({ where: { UserId: user.id } });
      auth.code = randNumber;
      await auth.save();
      return res
        .status(200)
        .json({ message: "Send mail successfully! Check code in your email" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/check-validate-otp", async (req, res) => {
  try {
    const { userId, otp, amount, reason, accountNumber, currentBalance } =
      req.body;

    if (currentBalance < amount) {
      return res.status(203).json({ message: "Insufficient balance" });
    }

    const user = await User.findOne({ where: { id: userId } });
    const auth = await Auth.findOne({ where: { UserId: user.id } });

    if (auth.code === otp) {
      const balance = await Balance.findOne({ where: { userId } });
      balance.balance = parseFloat(currentBalance) - parseFloat(amount);
      await balance.save();
      auth.code = null;
      await auth.save();
      await PaymentHistory.create({
        from: "System",
        to: accountNumber,
        amount: parseFloat(amount),
        onPlatform: 1,
        action: "WITHDRAW",
        status: "SUCCESS",
        reason,
      });
      return res
        .status(200)
        .json({ message: "Wait a second to receive your money!" });
    } else {
      return res.status(203).json({ message: "OTP wrong" });
    }
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/insert-payment-history", async (req, res) => {
  try {
    const { from, to, amount, onPlatform, action, status, createdAt, userId } =
      req.body;

    // if (!from || !to || amount == null || onPlatform == null || !action || !status || !createdAt || !userId) {
    //   return res.status(400).json({ error: 'All fields are required' });
    // }

    // return req.body;

    if (!from) {
      return res.status(400).json(req.body.from);
    }

    if (!to) {
      return res.status(400).json({ error: "To user is required" });
    }

    if (amount == null) {
      return res.status(400).json({ error: "Amount is required" });
    }

    if (onPlatform == null) {
      return res.status(400).json({ error: "On platform status is required" });
    }

    if (!action) {
      return res.status(400).json({ error: "Action is required" });
    }

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    if (!createdAt) {
      return res.status(400).json({ error: "Created at date is required" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const pool = await db.poolPromise;
    const result = await pool
      .request()
      .input("from", db.sql.VarChar(255), from)
      .input("to", db.sql.VarChar(255), to)
      .input("amount", db.sql.Decimal(10, 2), amount)
      .input("onPlatform", db.sql.Bit, onPlatform)
      .input("action", db.sql.VarChar(255), action)
      .input("status", db.sql.VarChar(255), status)
      .input("createdAt", db.sql.DateTime, createdAt)
      .input("userId", db.sql.Int, userId)
      .query(INSERT_PAYMENT_HISTORY);

    res
      .status(201)
      .json({ message: "Payment history inserted successfully", result });
  } catch (error) {
    console.error("Error inserting payment history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
