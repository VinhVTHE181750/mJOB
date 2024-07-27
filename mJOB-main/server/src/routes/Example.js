const express = require("express");
const router = express.Router();

// const example1Routes = require("./example/Example1");
// router.use("/example1", example1Routes);

const example2Routes = require("./example/Example2");
router.use("/example2", example2Routes);

module.exports = router;