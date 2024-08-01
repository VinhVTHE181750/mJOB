const express = require("express");
const router = express.Router();
const Balance = require("../../models/payment/Balance");
const { log } = require("../../utils/Logger");
const { logPayment } = require("../../utils/PaymentLogger"); // Adjust the path as necessary
const PaymentHistory = require("../../models/payment/PaymentHistory");
const User = require("../../models/user/User");

const getBalance = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
  try {
    const balance = await Balance.findOne({
      where: { UserId: req.userId },
    });
    if (!balance) {
      await Balance.create({ UserId: req.userId, balance: 0 });
      // Log the OPEN action using logPayment
      await logPayment(req.userId, "OPEN", 0, null, null, "SUCCESS");
      return res.json({ balance: 0, message: "Balance created" });
    } else return res.json({ balance: balance.balance });
  } catch (error) {
    log(error, "ERROR", "sequelize");
    return res.status(500).json({ message: "Unexpected error while fetching balance" });
  }
};

const getHistory = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
  try {
    const history = await PaymentHistory.findAll({
      where: { UserId: req.userId },
      order: [["createdAt", "DESC"]],
    });

    // replace UserId field by actual username
    for (let i = 0; i < history.length; i++) {
      const { from, to } = history[i];
      if (Number(from) === req.userId) {
        history[i].from = "You";
      } else {
        if (!from) {
          history[i].from = "external";
        } else if (!isNaN(from)) {
          const user = await User.findByPk(from);
          if (user) history[i].from = user.username;
        }
      }

      if (Number(to) === req.userId) {
        history[i].to = "You";
      } else {
        if (!to) {
          history[i].to = "external";
        } else if (!isNaN(to)) {
          const user = await User.findByPk(to);
          if (user) history[i].to = user.username;
        }
      }
    }

    return res.json(history);
  } catch (error) {
    log(error, "ERROR", "sequelize");
    return res.status(500).json({ message: "Unexpected error while fetching history" });
  }
};

const getStats = async (req, res) => {
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
  try {
    const history = await PaymentHistory.findAll({
      where: { UserId: req.userId },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    // replace UserId field by actual username
    for (let i = 0; i < history.length; i++) {
      const { from, to } = history[i];
      if (Number(from) === req.userId) {
        history[i].from = "You";
      } else {
        if (!from) {
          history[i].from = "external";
        } else if (!isNaN(from)) {
          const user = await User.findByPk(from);
          if (user) history[i].from = user.username;
        }
      }

      if (Number(to) === req.userId) {
        history[i].to = "You";
      } else {
        if (!to) {
          history[i].to = "external";
        } else if (!isNaN(to)) {
          const user = await User.findByPk(to);
          if (user) history[i].to = user.username;
        }
      }
    }

    return res.status(200).json({ recent: history });
  } catch (error) {
    log(error, "ERROR", "sequelize");
    return res.status(500).json({ message: "Unexpected error while fetching history" });
  }
};

router.get("/", getBalance);
router.get("/history", getHistory);
router.get("/stats", getStats);

module.exports = router;
