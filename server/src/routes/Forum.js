const express = require("express");
const router = express.Router();

const postRoutes = require("./forum/Post");
router.use("/posts", postRoutes);

const commentRoutes = require("./forum/Comment");
router.use("/comments", commentRoutes);

const likeRoutes = require("./forum/Like");
router.use("/likes", likeRoutes);

module.exports = router;