const express = require("express");
const router = express.Router();

// Import route handlers
const { getComments } = require("./comment/Get");
const { insertComment } = require("./comment/Post");

// Define routes
// router.get("/:postId", getCommentsByPostId); // Route to get all posts
router.get("/", getComments); // Route to get all posts
router.post("/", insertComment); // Route to insert a new post

module.exports = router;
