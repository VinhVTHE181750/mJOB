const PaymentHistory = require("../models/payment/PaymentHistory"); // Adjust the path as necessary
const { log } = require("./Logger");

/**
 * Logs a payment action to the payment history.
 *
 * @param {number} userId The ID of the user to store the record (not the one commited this transaction).
 * @param {string} action The type of action being logged (e.g., "OPEN", "TRANSFER", "DEPOSIT", "WITHDRAW", "CLOSE").
 * @param {number} amount The amount of the transaction.
 * @param {number} from The ID of the user who initiated the transaction.
 * @param {number} to The ID of the user who received the transaction.
 * @param {string} status The status of the action (e.g., "SUCCESS", "FAILED").
 * @returns {Promise<void>}
 */
async function logPayment(userId, action, amount = 0, from, to, status = "PENDING", reason = null) {
  try {
    await PaymentHistory.create({
      UserId: userId,
      action,
      amount,
      from,
      to,
      status,
      reason
    });
  } catch (error) {
    log(error, "ERROR", "PaymentLogger");
  }
}

module.exports = { logPayment };
