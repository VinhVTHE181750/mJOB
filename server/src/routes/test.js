const express = require("express");
const { relevantJobSearch } = require("../utils/algorithms/RelativeSearch");
const Job = require("../models/job/Job");
const { log } = require("../utils/Logger");
const { generateResponse, calcRelevance } = require("../utils/OpenAI");
const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).send("Hello, world!");
});

router.get("/relevant-jobs/:id", async (req, res) => {
  try {
    const id = 1;
    const jobList = await Job.findAll();
    const result = await relevantJobSearch(id, jobList);
    if (!result) {
      return res.status(400).send("No relevant jobs found");
    }
    return res.status(200).send(result);
  } catch (error) {
    log(error, "ERROR", "TEST");
    return res.status(500).send(error.message);
  }
});

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await generateResponse(prompt);
    return res.status(200).send(response);
  } catch (error) {
    log(error, "ERROR", "TEST");
    return res.status(500).send(error.message);
  }
});

router.post("/calc", async (req, res) => {
  try {
    const { type, title, content } = req.body;
    const result = await calcRelevance(type, title, content);
    return res.status(200).send(result);
  } catch (error) {
    log(error, "ERROR", "TEST");
    return res.status(500).send(error.message);
  }
});

module.exports = router;
