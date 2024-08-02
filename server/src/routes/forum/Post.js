const express = require("express");
const router = express.Router();

// Import route handlers
const { getAllPosts, getPostById, getPostOfUser } = require("./post/Get");
const { put } = require("./post/Put");
const { deleteById } = require("./post/Delete");
const { post } = require("./post/Post");

// Define routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/user/:id", getPostOfUser);
router.put("/", put);
router.delete("/:id", deleteById);
router.post("/", post);

module.exports = router;
