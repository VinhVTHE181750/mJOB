const express = require("express");
const router = express.Router();
const { JwtMiddleware } = require("../../utils/JWT");

// Import route handlers
const { getComments } = require("./comment/Get");
const { insertComment } = require("./comment/Post");
const { put } = require("./comment/Put");
const { deleteById } = require("./comment/Delete");
const { getCommentById } = require("./comment/Get");
// Define routes

router.get("/", getComments); 
router.get("/:id", getCommentById); 
router.post("/", insertComment); 
router.put("/", put);
router.delete("/:id", deleteById);

module.exports = router;