const express = require("express");
const Balance = require("../../models/payment/Balance");
const { log } = require("../../utils/Logger");
const { logPayment } = require("../../utils/PaymentLogger"); // Adjust the path as necessary
const router = express.Router();

const deposit = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
  if (!req.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

  try {
    const amount = parseFloat(req.body.amount);
    if (isNaN(amount) || amount <= 0) return res.status(400).json({ message: "Invalid amount" });

    const balance = await Balance.findOne({
      where: { UserId: req.userId },
    });

    if (!balance) {
      try {
        const bal = await Balance.create({
          UserId: req.userId,
          balance: amount,
        });
        // Use logPayment for logging "OPEN" action
        await logPayment(req.userId, "OPEN", amount, null, null, "SUCCESS");
      } catch (error) {
        log(error, "ERROR", "sequelize - 1");
        // Use logPayment for logging failed "OPEN" action
        await logPayment(req.userId, "OPEN", amount, null, null, "FAILED");
        return res.status(400).json({ message: "Failed to open account" });
      }
    } else {
      balance.balance += amount;
      // Use logPayment for logging "DEPOSIT" action
      await logPayment(req.userId, "DEPOSIT", amount, req.userId, req.userId, "SUCCESS");
      await balance.save();
    }

    return res.json({
      message: "Deposit successful",
      balance: balance ? balance.balance : amount, // Ensure balance is correctly reported for new accounts
    });
  } catch (error) {
    log(error, "ERROR", "sequelize");
    return res.status(500).json({ message: "Unexpected error while depositing" });
  }
};

router.post("/", deposit);

module.exports = router;
