const CryptoJS = require("crypto-js");
const express = require("express");
const router = express.Router();
const sql = require("mssql");
const Ticket = require("../models/support/Ticket");
const { log } = require("../utils/Logger");

router.post("/create", async (req, res) => {
  try {
    const params = req.body;
    const ticket = await Ticket.create(params); //
    if (ticket) {
      return res.status(201).json({ message: "Create Ticket Successfully" });
    } else {
      return res.status(400).send({ message: "Failed to create" });
    }
  } catch (error) {
    console.error("Error creating", error);
    return res.status(500).send({ message: "Server error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const ticket = await Ticket.findAll({ where: { by: userId } }); //
    if (ticket) {
      return res.status(200).json({ data: ticket });
    } else {
      return res.status(400).send({ message: "Failed to fetch" });
    }
  } catch (error) {
    console.error("Error creating", error);
    return res.status(500).send({ message: "Server error." });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { ticketId } = req.query;
    const updateTicket = await Ticket.update(req.body, {
      where: { id: ticketId },
    });
    if (updateTicket) {
      return res.status(200).send({ message: "Updated ticket." });
    } else {
      return res.status(203).send({ message: "Update ticket failed." });
    }
  } catch (error) {
    console.error("Error creating", error);
    return res.status(500).send({ message: "Server error." });
  }
});

router.delete("/delete", async function (req, res) {
  try {
    const { ticketId } = req.query;
    const ticket = await Ticket.destroy({ where: { id: ticketId } }); //
    if (ticket) {
      return res.status(200).json({ message: "Delete Report Success" });
    } else {
      return res.status(400).send({ message: "Failed to delete report" });
    }
  } catch (error) {
    console.error("Error creating", error);
    return res.status(500).send({ message: "Server error." });
  }
});

module.exports = router;
