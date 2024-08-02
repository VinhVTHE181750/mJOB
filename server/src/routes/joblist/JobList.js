const express = require("express");
const router = express.Router();
const User = require("../../models/user/User");
const Job = require("../../models/job/Job");
const JobMetric = require("../../models/job/JobMetric");
const { log } = require("../../utils/Logger");
const io = require("../../../io");
const { sequelize } = require('../../models/SQLize'); // Import sequelize instance
const EmployerProfile = require("../../models/user/EmployerProfile");
const {relevantJobSearch} = require("../../utils/algorithms/RelativeSearch");
const { Result } = require("tedious/lib/token/helpers");
const JobPreference = require("../../models/user/JobPreference");
const getJobListbyDefaut = async (req, res) => {
  try {
    const { userId } = req.params;
    const jobs = await Job.findAll({
      where: {
        status: "ACTIVE",
      },
      include: [{
        model: User,
        attributes: ['username'],
        include:
        {
          model: EmployerProfile,
          attributes: ['name', 'avatar']
        }
      }],
    });
    // Calculate timeleft for each job
    const currentTime = new Date();
    jobs.forEach(job => {
      const endDate = new Date(job.endDate);
      const timeDifference = endDate.getTime() - currentTime.getTime();
      const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
      job.dataValues.timeleft = daysLeft;
    });
    // const jobpre = await JobPreference.findAll({where:{UserId: req.userId}});
    const result = await relevantJobSearch( req.userId, jobs);
    res.status(200).json(result);
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
        attributes: ['username'],
        include:
        {
          model: EmployerProfile,
          attributes: ['name', 'avatar']
        }
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

const getJobListbyDate = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      where: {
        status: "ACTIVE",
      },
      include: [
        {
          model: User,
          attributes: ['username'],
          include:
          {
            model: EmployerProfile,
            attributes: ['name', 'avatar']
          }
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


const getLocationList = async (req, res) => {
  try {
    // Fetch all unique locations from the Job model
    const locations = await Job.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('location')), 'location']
      ]
    });

    // Map the result to an array of locations
    const locationList = locations.map(location => location.location);

    // Return the result
    res.status(200).json(locationList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = {
  getJobListbyDefaut,
  getJobListbyView,
  getJobListbyDate,
  getLocationList,
};
// module.exports = router;

