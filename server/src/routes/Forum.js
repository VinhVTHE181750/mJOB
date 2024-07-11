const express = require("express");
const router = express.Router();

const postRoutes = require("./forum/Post");
router.use("/posts", postRoutes);

const commentRoutes = require("./forum/Comment");
router.use("/comments", commentRoutes);

const likeRoutes = require("./forum/Like");
router.use("/likes", likeRoutes);

const categoryRoutes = require("./forum/Category.js");
router.use("/categories", categoryRoutes);

const metricsRoutes = require("./forum/Metrics.js")
router.use("/metrics", metricsRoutes);

const historyRoutes = require("./forum/History.js");
router.use("/history", historyRoutes);

// tagRoutes

// metric routes

module.exports = router;