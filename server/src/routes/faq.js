const express = require("express");
const router = express.Router();
const FAQ = require("../models/support/FAQ");

router.get("/", async (req, res) => {
  try {
    const ticket = await FAQ.findAll(); //
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

router.post("/create", async (req, res) => {
  try {
    const ticket = await FAQ.create(req.body); //
    if (ticket) {
      return res.status(201).json({ message: "create new Faq Success" });
    } else {
      return res.status(400).send({ message: "Failed to create faq" });
    }
  } catch (error) {
    console.error("Error creating", error);
    return res.status(500).send({ message: "Server error." });
  }
});

module.exports = router;
