const express = require("express");
const db = require("../models/DBContext");
const {getMarketing} = require("./home/HomeGuest");
const { route } = require("./Auth");

const router = express.Router();

router.get("/marketing", getMarketing);

module.exports = router;