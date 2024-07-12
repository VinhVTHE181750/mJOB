const express = require("express");
const router = express.Router();
const { JwtMiddleware } = require("../utils/JWT");

const { getAllUsers } = require("./user/User");

router.get("/", getAllUsers);

module.exports = router;
