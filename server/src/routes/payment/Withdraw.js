const express = require("express");
const Balance = require("../../models/payment/Balance");
const router = express.Router();

const withdraw = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const amount = parseFloat(req.body.amount);
    if (isNaN(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const balance = await Balance.findOne({
      where: { UserId: req.userId },
    });

    if (!balance) {
      await Balance.create({ UserId: req.userId, balance: amount });
      return res.json({ message: "Insufficient balance", balance: 0 });
    } else {
      if (balance.balance < amount)
        return res.status(400).json({
          message: "Insufficient balance",
          balance: balance.balance,
        });
      balance.balance -= amount;
      await balance.save();
    }

    return res.json({
      message: "Withdraw successful",
      balance: balance.balance,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error while withdrawing" });
  }
};

router.post("/", withdraw);

module.exports = router;
