const CryptoJS = require("crypto-js");
const express = require("express");
const router = express.Router();
const sql = require("mssql");

const SQL_CREATE_TICKET = `
  INSERT INTO ticket (user_id, ticket_category, ticket_title, ticket_content)
  VALUES (@user_id, @ticket_category, @ticket_title, @ticket_content);
`;

router.post("/create", async (req, res) => {
  const { user_id, ticket_category, ticket_title, ticket_content } = req.body;
  const transaction = new sql.Transaction();
  try {
    await transaction.begin();

    const ticketRequest = new sql.Request(transaction);
    const ticketResult = await ticketRequest
      .input("user_id", sql.Int, user_id)
      .input("ticket_category", sql.VarChar(16), ticket_category)
      .input("ticket_title", sql.NVarChar(sql.MAX), ticket_title)
      .input("ticket_content", sql.NVarChar(sql.MAX), ticket_content)
      .query(`INSERT INTO ticket (user_id, ticket_category, ticket_title, ticket_content)
              VALUES (@user_id, @ticket_category, @ticket_title, @ticket_content);
              SELECT SCOPE_IDENTITY() AS ticket_id;`);

    const newTicketID = ticketResult.recordset[0].ticket_id;

    const logRequest = new sql.Request(transaction);
    await logRequest
      .input("ticket_id", sql.Int, newTicketID)
      .input("ticket_log_type", sql.VarChar(16), "create")
      .query(`INSERT INTO ticket_log (ticket_id, ticket_log_type)
              VALUES (@ticket_id, @ticket_log_type);`);

    await transaction.commit();
    res.status(201).send({ message: "Ticket created successfully!" });
  } catch (err) {
    console.error("Error inserting ticket:", err);
    res.status(500).send({ message: "Failed to create ticket." });
  }
});

module.exports = router;
