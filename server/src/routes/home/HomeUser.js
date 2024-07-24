const express = require("express");
const router = express.Router();
const { log } = require("../../utils/Logger");
const User = require("../../models/user/User");
const Post = require("../../models/forum/post/Post");
const Job = require("../../models/job/Job");

module.exports = router;
