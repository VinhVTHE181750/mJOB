const express = require("express");
const router = express.Router();
const { JwtMiddleware } = require("../utils/JWT");

const jobRoutes = require("./job/Jobs");
router.use("/", jobRoutes);

module.exports = router;