const express = require("express");
const router = express.Router();
const User = require("../../models/user/User");
const Job = require("../../models/job/Job");
const JobMetric = require("../../models/job/JobMetric");
const { log } = require("../../utils/Logger");
const io = require("../../../io");

const getJobListbyDefaut = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            where: {
                status: "ACTIVE",
            },
            include: {
              model: User,
              attributes: ['username']
            }
        });
        // Calculate timeleft for each job
        const currentTime = new Date();
        jobs.forEach(job => {
          const endDate = new Date(job.endDate);
          const timeDifference = endDate.getTime() - currentTime.getTime();
          const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
          job.dataValues.timeleft = daysLeft;
        });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getJobListbyView = async (req, res) => {
    try {
        const jobs = await Job.findAll({
          where: {
            status: "ACTIVE",
        },
          include: [{
            model: JobMetric,
            attributes: ['view']
          },
          {
            model: User,
            attributes: ['username']
          }
        ],
          order: [[{ model: JobMetric }, 'view', 'DESC']],
          
        });
        const currentTime = new Date();
        jobs.forEach(job => {
          const endDate = new Date(job.endDate);
          const timeDifference = endDate.getTime() - currentTime.getTime();
          const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
          job.dataValues.timeleft = daysLeft;
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
          where: {
            status: "ACTIVE",
        },
        include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
          order: [['startDate', 'DESC']]
        });
        const currentTime = new Date();
        jobs.forEach(job => {
          const endDate = new Date(job.endDate);
          const timeDifference = endDate.getTime() - currentTime.getTime();
          const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
          job.dataValues.timeleft = daysLeft;
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

