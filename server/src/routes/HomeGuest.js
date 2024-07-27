const express = require("express");
const db = require("../models/DBContext");
const {getMarketing, getHotJobs, getHotPosts} = require("./home/HomeGuest");
const { route } = require("./Auth");

const router = express.Router();

router.get("/marketing", getMarketing);
router.get("/hotjobs", getHotJobs);
router.get("/hotposts", getHotPosts);

module.exports = router;