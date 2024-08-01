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

router.get('/job-count' , async (req, res) => {
    try {
      const count = await Job.count();
      return res.status(200).json(count);
    } catch (err) {
      return res.status(500).json({ message: "Error occurred", error: err });
    }
  });

  router.delete('/delete-job/:id', async (req, res) => {
    try {
      const job = await Job.findByPk(req.params.id);
      if (!job) {
        return res.status(404).json({ success: false, message: 'Job not found' });
      }
      await job.destroy();
      res.json({ success: true, message: 'Job deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
})

module.exports = router;