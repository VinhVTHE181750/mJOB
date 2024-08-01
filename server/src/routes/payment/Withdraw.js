const express = require("express");
const Balance = require("../../models/payment/Balance");
const { logPayment } = require("../../utils/PaymentLogger"); // Adjust the path as necessary
const { log } = require("../../utils/Logger");
const router = express.Router();

const withdraw = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
  if (!req.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

  try {
    const amount = parseFloat(req.body.amount);
    if (isNaN(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const balance = await Balance.findOne({
      where: { UserId: req.userId },
    });

    if (!balance) {
      await Balance.create({ UserId: req.userId, balance: 0 });
      await logPayment(req.userId, "OPEN", 0, null, null, "SUCCESS");
      return res.json({ message: "Insufficient balance", balance: 0 });
    } else {
      if (balance.balance < amount) {
        await logPayment(req.userId, "WITHDRAW", amount, null, null, "FAILED");
        return res.status(400).json({
          message: "Insufficient balance",
          balance: balance.balance,
        });
      }
      const tx = await withdrawBal
      balance.balance -= amount;
      await logPayment(req.userId, "WITHDRAW", amount, null, null, "SUCCESS");
      await balance.save();
    }

    return res.json({
      message: "Withdraw successful",
      balance: balance.balance,
    });
  } catch (error) {
    log(error, "ERROR", "sequelize");
    return res
      .status(500)
      .json({ message: "Unexpected error while withdrawing" });
  }
};

router.post("/", withdraw);

module.exports = router;
