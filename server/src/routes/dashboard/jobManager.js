const  Job = require("../../models/job/Job");
const express = require("express");
const router = express.Router();

router.get('/job-list', async (req, res) => {
    try {
        const jobs = await Job.findAll();
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

module.exports = router;