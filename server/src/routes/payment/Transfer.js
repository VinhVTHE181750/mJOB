const express = require("express");
const Balance = require("../../models/payment/Balance");
const User = require("../../models/User");
const router = express.Router();

const transfer = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const userTo = await User.findOne({
      where: { username: req.body.to },
    });

    if (!userTo) return res.status(400).json({ message: "User not found" });

    // now sender and receiver is available

    const amount = parseFloat(req.body.amount);
    if (isNaN(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const balanceFrom = await Balance.findOne({
      where: { UserId: req.userId },
    });

    if (!balanceFrom) {
      await Balance.create({ UserId: req.userId, balance: 0 });
      return res
        .status(400)
        .json({ message: "Insufficient balance", balance: 0 });
    } else {
      if (balanceFrom.balance < amount)
        return res
          .status(400)
          .json({
            message: "Insufficient balance",
            balance: balanceFrom.balance,
          });
    }

    const balanceTo = await Balance.findByPk(userTo.id);
    if (!balanceTo) {
      await Balance.create({ UserId: userTo.id, balance: amount });
    } else {
      balanceTo.balance += amount;
      balanceFrom.balance -= amount;
      Promise.all([balanceTo.save(), balanceFrom.save()]);
      return res.json({
        message: "Transfer successful",
        balance: balanceFrom.balance,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error while depositing" });
  }
};

router.post("/", transfer);

module.exports = router;
