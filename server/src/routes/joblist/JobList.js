const express = require("express");
const router = express.Router();
const User = require("../../models/user/User");
const PostCategory = require("../../models/forum/post/PostCategory");
const Post = require("../../models/forum/post/Post");
const Job = require("../../models/job/Job");
const JobHistory = require("../../models/job/JobHistory");
const Application = require("../../models/job/Application");
const JobMetric = require("../../models/job/JobMetric");
const { log } = require("../../utils/Logger");
const io = require("../../../io");

const getJobListbyDefaut = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            where: {
                status: "ACTIVE",
            },
        });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getJobListbyView = async (req, res) => {
    try {
        const jobs = await Job.findAll({
          include: {
            model: JobMetric,
            attributes: ['view']
          },
          order: [[{ model: JobMetric }, 'view', 'DESC']]
        });
        res.json(jobs);
      } catch (error) {
        console.error('Error fetching jobs ordered by view count:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const getJobListbyDate= async (req, res) => {
    try {
        const jobs = await Job.findAll({
          order: [['startDate', 'DESC']]
        });
        res.json(jobs);
      } catch (error) {
        console.error('Error fetching jobs ordered by creation date:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports = {
    getJobListbyDefaut,
    getJobListbyView,
    getJobListbyDate
};
// module.exports = router;

