const express = require("express");
const router = express.Router();

// Import route handlers
const { getAllPosts, getPostById, getPostOfUser, getPostViewById } = require("./post/Get");
const { put } = require("./post/Put");
const { deleteById } = require("./post/Delete");
const { post } = require("./post/Post");

// Define routes
router.get("/", getAllPosts); // Route to get all posts
router.get("/:id", getPostById); // Route to get a post by ID
router.get("/user/:id", getPostOfUser); // Route to get posts of a user
router.get("/views/:id", getPostViewById); // Route to get views of a post
router.put("/", put);
router.delete("/", deleteById);
router.post("/", post);

module.exports = router;
