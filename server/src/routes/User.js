const express = require("express");
const router = express.Router();
const { JwtMiddleware } = require("../utils/JWT");

const { getAllUsers, getUser, updateUser } = require("./user/User");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser)


module.exports = router;