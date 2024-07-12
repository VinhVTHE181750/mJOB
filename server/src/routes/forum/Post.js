const express = require("express");
const router = express.Router();

// Import route handlers
const { getAllPosts, getPostById, getPostOfUser } = require("./post/Get");
const { put } = require("./post/Put");
const { deleteById } = require("./post/Delete");
const { post } = require("./post/Post");
const { JwtMiddleware } = require("../../utils/JWT");

// Define routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/user/:id", JwtMiddleware, getPostOfUser);
router.put("/", JwtMiddleware, put);
router.delete("/:id", JwtMiddleware, deleteById);
router.post("/", JwtMiddleware, post);

module.exports = router;
