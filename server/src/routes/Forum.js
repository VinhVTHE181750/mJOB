const express = require("express");
const router = express.Router();

const postRoutes = require("./forum/Post");
router.use("/posts", postRoutes);

const commentRoutes = require("./forum/Comment");
router.use("/comments", commentRoutes);

module.exports = router;