const express = require("express");
const Balance = require("../../models/payment/Balance");
const User = require("../../models/user/User");
const { log } = require("../../utils/Logger");
const { logPayment } = require("../../utils/PaymentLogger"); // Adjust the path as necessary
const { getIo } = require("../../../io");
const router = express.Router();

const transfer = async (from, to, amount, message = null) => {
  const userFrom = await User.findOne({
    where: { id: from },
  });

  const userTo = await User.findOne({
    where: { id: to },
  });

  const balanceFrom = await Balance.findOne({
    where: { UserId: from },
  });

  const balanceTo = await Balance.findOne({
    where: { UserId: to },
  });

  if (!balanceFrom) {
    logPayment(from, "OPEN", 0, null, null, "SUCCESS");
    logPayment(from, "SEND", amount, from, to, "FAILED", "Insufficient balance");
    return false;
  }

  if (!balanceTo) {
    balanceTo = await Balance.create({ UserId: to, balance: amount });
    logPayment(to, "OPEN", amount, null, null, "SUCCESS");
  } else if (balanceFrom.balance < amount) {
    logPayment(from, "SEND", amount, from, to, "FAILED", "Insufficient balance");
    return false;
  }

  balanceFrom.balance -= amount;
  await balanceFrom.save();
  balanceTo.balance += amount;
  await balanceTo.save();

  logPayment(from, "SEND", amount, from, to, "SUCCESS", message);
  logPayment(to, "RECEIVE", amount, from, to, "SUCCESS", message);

  getIo().emit(`payment/${from}`, { balance: balanceFrom.balance });

  return true;
};

const transferRoute = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const userTo = await User.findOne({
      where: { username: req.body.to },
    });

    if (!userTo) return res.status(400).json({ message: "User not found" });

    const amount = parseFloat(req.body.amount);
    const message = req.body.message;
    if (isNaN(amount) || amount <= 0) return res.status(400).json({ message: "Invalid amount" });

    const transferResult = await transfer(req.userId, userTo.id, amount, message);
    if (!transferResult) return res.status(400).json({ message: "Transfer failed." });
    return res.status(201).json({
      message: "Transfer successful",
    });
  } catch (error) {
    log(error, "ERROR", "sequelize");
    return res.status(500).json({ message: "Unexpected error while transferring" });
  }
};

router.post("/", transferRoute);

module.exports = {
  router,
  transfer,
};
