const express = require("express");
const router = express.Router();

// Import route handlers
const { getComments } = require("./comment/Get");
const { insertComment } = require("./comment/Post");
const { put } = require("./comment/Put");
const { deleteById } = require("./comment/Delete");
// Define routes
router.get("/:id", getComments);
router.post("/", insertComment);
router.put("/", put);
router.delete("/:id", deleteById);

module.exports = router;
