const express = require("express");
const router = express.Router();
const { JwtMiddleware } = require("../utils/JWT");

const balanceRoute = require("./payment/Balance");
router.use("/balance", JwtMiddleware, balanceRoute);

const withdrawRoute = require("./payment/Withdraw");
router.use("/withdraw", JwtMiddleware, withdrawRoute);

const depositRoute = require("./payment/Deposit");
router.use("/deposit", JwtMiddleware, depositRoute);

const transferRoute = require("./payment/Transfer");
router.use("/transfer", JwtMiddleware, transferRoute);

module.exports = router;