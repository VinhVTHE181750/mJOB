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
const { sendMail } = require("../helper/sendmail");
const User = require("../models/user/User");
const Auth = require("../models/user/Auth");
router.use("/transfer", transferRoute);

//Get user balance
router.get("/balance", async (req, res) => {
  try {
    const { userId } = 1;
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

    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      return res.status(200).json({ data: user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

router.put("/update-balance", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    if (userId == null || amount == null) {
      return res.status(400).json({ error: "userId and balance are required" });
    }
    const balance = await Balance.findOne({ where: { userId } });
    if (!balance) {
      return res.status(404).json({ error: "Balance not found" });
    }
    const newBalance = balance.balance + amount;
    await balance.update({ balance: newBalance });

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

    const { userId } = req.body;

    const randNumber = generateRandomSixDigitNumber();
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      await sendMail(user.email, randNumber);
      const auth = await Auth.findOne({ where: { UserId: user.id } });
      auth.code = randNumber;
      await auth.save();
      return res
        .status(200)
        .json({ message: "Send mail successfully! Check code in your email" });
    }
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/check-validate-otp", async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findOne({ where: { id: userId } });
    const auth = await Auth.findOne({ where: { UserId: user.id } });
    if (auth.code === otp) {
      const balance = await Balance.findOne({ where: { userId } });
      balance.balance = 0;
      await balance.save();
      auth.code = null;
      await auth.save();
      return res
        .status(200)
        .json({ message: "Wait a second to receive your money!" });
    } else {
       return res
         .status(203)
         .json({ message: "OTP wrong" });
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
