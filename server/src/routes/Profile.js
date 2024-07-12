const express = require("express");
const router = express.Router();
const { JwtMiddleware } = require("../utils/JWT");

const { getUser } = require("./user/User");
const { submitWorkExp } = require("./user/WorkExperience");

router.get("/:id", getUser);
router.post("/work-experience", submitWorkExp);

module.exports = router;
