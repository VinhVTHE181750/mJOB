const express = require("express");
const config = require("../../../config.json");
const { log } = require("../../utils/Logger");
const router = express.Router();
const Balance = require("../../models/payment/Balance");
const { logPayment } = require("../../utils/PaymentLogger");
const User = require("../../models/user/User");
const { isEmail } = require("../../validators/StringValidator");

const PAYPAL_CLIENT_ID = config.payment.paypal.client_id;
const PAYPAL_CLIENT_SECRET = config.payment.paypal.client_secret;
const base = "https://api-m.sandbox.paypal.com";

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    log(error, "ERROR", "PayPal");
  }
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  // log("shopping cart information passed from the frontend createOrder() callback:", cart);

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: cart[0].amount.value, // Use the amount from the cart
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only).
      // Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

// createOrder route
router.post("/orders", async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;
    // if (!amount) {
    //   return res.status(400).json({ error: "Amount is required" });
    // }
    // if (isNaN(amount) || amount <= 0) {
    //   return res.status(400).json({ error: "Invalid amount" });
    // }
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    log(error, "ERROR", "PayPal");
    res.status(500).json({ error: "Failed to create order." });
  }
});

// Define the captureOrder function
const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    method: "POST",
  });

  return handleResponse(response);
};

// Create the capture route
router.post("/orders/:orderID/capture", async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

    if (httpStatusCode === 201) {
      // Assuming 201 is the success status code
      const amount = jsonResponse.purchase_units[0].payments.captures[0].amount.value;
      const userId = req.userId; // Assuming req.userId contains the user's ID

      const userBalance = await Balance.findOne({ where: { UserId: userId } });
      if (userBalance) {
        await userBalance.update({ balance: userBalance.balance + parseFloat(amount) });
      } else {
        await Balance.create({ UserId: userId, balance: parseFloat(amount) });
      }
      await logPayment(userId, "DEPOSIT", amount, null, userId, "SUCCESS");
    }

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    log(error, "ERROR", "PayPal");
    await logPayment(req.userId, "DEPOSIT", amount, null, req.userId, "FAILED");
    res.status(500).json({ error: "Failed to capture order." });
  }
});

async function withdrawMoney(amount, email) {
 try {
    const accessToken = await generateAccessToken();
    const url = `${base}/v1/payments/payouts`;

    const payload = {
      sender_batch_header: {
        sender_batch_id: Date.now(),
        recipient_type: "EMAIL",
        email_subject: "You have money!",
        email_message: "You received a payment. Thanks for using our service!",
      },
      items: [
        {
          amount: {
            value: amount.toFixed(2),
            currency: "USD",
          },
          sender_item_id: Date.now(),
          recipient_wallet: "PAYPAL",
          receiver: email, // Replace with actual receiver email
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const { jsonResponse, httpStatusCode } = await handleResponse(response);
    if (httpStatusCode === 201) {
      return jsonResponse;
    } else return null;
  } catch (error) {
    log(error, "ERROR", "PayPal");
    return null;
  }
}

router.post("/payout", async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const balance = await Balance.findOne({ where: { UserId: userId } });
    if (!balance || balance.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance." });
    }

    const email = user.email;

    if (!email) {
      return res.status(400).json({ error: "User email not found." });
    }

    const response = await withdrawMoney(amount, email);
    if (response) {
      balance.balance -= amount;
      await balance.save();
      // may need to change SUCCESS -> PENDING
      await logPayment(userId, "WITHDRAW", amount, userId, null, "SUCCESS");
      res.status(201).json({ message: "Withdrawal queued successfully." });
    } else {
      await logPayment(userId, "WITHDRAW", amount, userId, null, "FAILED");
      res.status(500).json({ error: "Failed to withdraw money due to our PayPal integration issue." });
    }
  } catch (error) {
    log(error, "ERROR", "PayPal");
    res.status(500).json({ error: "Failed to withdraw money." });
  }
});

module.exports = router;
