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

// 1. Taoj route
// router.get("/test", async (req, res) => {
//   try {
//     // create ticket
//     const ticket = await Ticket.create({
//       type: "REPORT",
//       title: "Title",
//       category: "test",
//       description: "Description",
//     });
//     return res.status(200).json({ message: "", ticket });
//   } catch (err) {
//     log(err, "ERROR");
//     res.status(500).send({ message: "Failed to create ticket" });
//   }
// });

module.exports = router;
