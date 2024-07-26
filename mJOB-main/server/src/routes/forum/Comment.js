const express = require("express");
const router = express.Router();

// Import route handlers
const { getComments, getCommentCount} = require("./comment/Get");
const { insertComment } = require("./comment/Post");
const { put } = require("./comment/Put");
const { deleteById } = require("./comment/Delete");
// Define routes
// router.get("/:postId", getCommentsByPostId); // Route to get all posts
router.get("/", getComments); // Route to get all posts
router.get("/count/:id", getCommentCount); // Route to get a comment by ID
router.post("/", insertComment); // Route to insert a new post
router.put("/", put);
router.delete("/", deleteById);

module.exports = router;
