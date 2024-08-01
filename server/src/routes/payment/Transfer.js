const express = require("express");
const Balance = require("../../models/payment/Balance");
const User = require("../../models/user/User");
const { log } = require("../../utils/Logger");
const { logPayment } = require("../../utils/PaymentLogger"); // Adjust the path as necessary
const router = express.Router();

const transfer = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const userTo = await User.findOne({
      where: { username: req.body.to },
    });

    if (!userTo) return res.status(400).json({ message: "User not found" });

    const amount = parseFloat(req.body.amount);
    if (isNaN(amount) || amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    let balanceFrom = await Balance.findOne({
      where: { UserId: req.userId },
    });

    if (!balanceFrom) {
      balanceFrom = await Balance.create({ UserId: req.userId, balance: 0 });
      await logPayment(req.userId, "OPEN", 0, null, null, "SUCCESS");
      await logPayment(
        req.userId,
        "TRANSFER",
        amount,
        req.userId,
        userTo.id,
        "FAILED"
      );
      return res
        .status(400)
        .json({ message: "Insufficient balance", balance: 0 });
    } else if (balanceFrom.balance < amount) {
      await logPayment(
        req.userId,
        "TRANSFER",
        amount,
        req.userId,
        userTo.id,
        "FAILED"
      );
      return res.status(400).json({
        message: "Insufficient balance",
        balance: balanceFrom.balance,
      });
    }

    let balanceTo = await Balance.findByPk(userTo.id);
    if (!balanceTo) {
      balanceTo = await Balance.create({ UserId: userTo.id, balance: amount });
      await logPayment(userTo.id, "OPEN", amount, null, null, "SUCCESS");
    } else {
      balanceTo.balance += amount;
    }

    balanceFrom.balance -= amount;
    await Promise.all([balanceTo.save(), balanceFrom.save()]);

    await logPayment(
      req.userId,
      "TRANSFER",
      amount,
      req.userId,
      userTo.id,
      "SUCCESS"
    );
    await logPayment(
      userTo.id,
      "TRANSFER",
      amount,
      req.userId,
      userTo.id,
      "SUCCESS"
    );

    return res.json({
      message: "Transfer successful",
      balance: balanceFrom.balance,
    });
  } catch (error) {
    log(error, "ERROR", "sequelize");
    return res
      .status(500)
      .json({ message: "Unexpected error while transferring" });
  }
};

router.post("/", transfer);

module.exports = router;
