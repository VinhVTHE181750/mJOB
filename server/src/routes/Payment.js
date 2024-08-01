const express = require("express");
const router = express.Router();

// admin routes to add/remove balance
const withdrawRoute = require("./payment/Withdraw");
router.use("/withdraw", withdrawRoute);
const depositRoute = require("./payment/Deposit");
router.use("/deposit", depositRoute);

// user routes
const balanceRoute = require("./payment/Balance");
router.use("/balance", balanceRoute);
const paypalRoute = require("./payment/PayPal");
router.use("/paypal", paypalRoute);
const { router: transferRoute } = require("./payment/Transfer");
router.use("/transfer", transferRoute);

module.exports = router;
