const express = require("express");
const { relevantJobSearch } = require("../utils/algorithms/RelativeSearch");
const Job = require("../models/job/Job");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).send("Hello, world!");
});

router.get("/relevant-jobs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const jobList = await Job.findAll();
    const result = await relevantJobSearch(id, jobList);
    if (!result) {
      return res.status(400).send("No relevant jobs found");
    }
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
