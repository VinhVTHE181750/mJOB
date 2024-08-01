const express = require("express");
const db = require("../models/DBContext");
const {getJobListbyDefaut, getJobListbyView, getJobListbyDate, getLocationList} = require("./joblist/JobList");

const router = express.Router();

router.get("/default",getJobListbyDefaut);

router.get("/view",getJobListbyView);

router.get("/date",getJobListbyDate);

router.get("/location",getLocationList);

module.exports = router;