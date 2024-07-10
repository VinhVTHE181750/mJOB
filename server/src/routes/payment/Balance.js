const express = require("express");
const router = express.Router();
const Balance = require("../../models/payment/Balance");

const getBalance = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
  try {
    const balance = await Balance.findOne({
      where: { UserId: req.userId },
    });
    if (!balance) {
      await Balance.create({ UserId: req.userId, balance: 0 });
      return res.json({ balance: 0, message: "Balance created" });
    } else return res.json({ balance: balance.balance });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unexpected error while fetching balance" });
  }
};

router.get("/", getBalance);

module.exports = router;
