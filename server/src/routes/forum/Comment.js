const express = require("express");
const router = express.Router();
const { JwtMiddleware } = require("../../utils/JWT");

// Import route handlers
const { getComments, getCommentCount } = require("./comment/Get");
const { insertComment } = require("./comment/Post");
const { put } = require("./comment/Put");
const { deleteById } = require("./comment/Delete");
const { getCommentById } = require("./comment/Get");
// Define routes

router.get("/", getComments); 
router.get("/:id", getCommentById); 
router.get("/count/:id", getCommentCount); 
router.post("/", JwtMiddleware, insertComment); 
router.put("/", JwtMiddleware, put);
router.delete("/", JwtMiddleware, deleteById);

module.exports = router;
