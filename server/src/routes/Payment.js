const express = require("express");
const router = express.Router();
const { JwtMiddleware } = require("../utils/JWT");

const balanceRoute = require("./payment/Balance");
router.use("/balance", balanceRoute);

const withdrawRoute = require("./payment/Withdraw");
router.use("/withdraw", withdrawRoute);

const depositRoute = require("./payment/Deposit");
router.use("/deposit", depositRoute);

const transferRoute = require("./payment/Transfer");
router.use("/transfer", transferRoute);

module.exports = router;