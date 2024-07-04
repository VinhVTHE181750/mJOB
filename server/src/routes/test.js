// This is a template for creating a new route.
const express = require("express");
const router = express.Router();

// GET without parameter
router.get("/", async (req, res) => {
  const { input } = req.body;
  const { passBlacklist } = require("../validators/StringBlacklist");
  res.json({ message: "Hello, World!", passBlacklist: passBlacklist(input) });
});

module.exports = router;
