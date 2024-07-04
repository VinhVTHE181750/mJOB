// This is a template for creating a new route.
const express = require("express");
const router = express.Router();

// GET without parameter
router.get("/", async (req, res) => {
  res.status(200).send("Hello, world! 123");
});

module.exports = router;
