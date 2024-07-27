const express = require("express");
const db = require("../models/DBContext");
const User = require("../models/user/User");
const Job = require("../models/job/Job");
const Application = require("../models/job/Application");
const { Op } = require('sequelize');
// const { get3JobCreatedRecent, get3JobAppliedRecent, getTotalCompletedJob, getTotalCurrentAppliedJob, getTotalCreatedJob, get3JobCompletedRecent } = require("./jobDashBoard/dashboard");
const { getUserJobbyStatus, getUserJobHistory } = require("./jobDashBoard/jobhistory");
const { route } = require("./Auth");
const router = express.Router();

router.get("/history", getUserJobHistory);
// router.get("/applied",getUserAppliedJob);
// router.get("/created",getUserCreatedJob);
// router.get("/completed", getTotalCompletedJob);
// router.get("/applied", getTotalCurrentAppliedJob);
// router.get("/created", getTotalCreatedJob);
// router.get("/RecentApplied", get3JobAppliedRecent);
// router.get("/RecentCreated", get3JobCreatedRecent);
// router.get("/RecentCompleted", get3JobCompletedRecent);

//Select user total completed job
router.get("/completed/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const totalCompletedJob = await Application.count({
      where: { UserId: userId, status: "COMPLETED" }
    });

    return res.status(200).json({ totalCompletedJob });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


//Select user applied job
router.get("/applied/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const totalAppliedJob = await Application.count({
      where: {
        UserId: userId,
        status: {
          [Op.ne]: 'COMPLETED' // [Op.ne] is Sequelize's operator for "not equal"
        }
      }
    });
    return res.status(200).json({ totalAppliedJob });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//Select user created job
router.get("/created/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const totalJob = await Job.count({
      where: { UserId: userId }
    });
    return res.status(200).json({ totalJob });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
);



//Select user completed job list
router.get("/completedlist/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const jobHistory = await Application.findAll({
      where: {
        UserId: userId,
        status: {
          [Op.eq]: 'COMPLETED' // [Op.ne] is Sequelize's operator for "not equal"
        }
      },
      order: [['updatedAt', 'DESC']],
      limit: 3,
      include: [
        {
          model: Job,
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'tags',
            'maxApplicants',
            'recruitments',
            'approvalMethod',
            'contact',
            'startDate',
            'endDate',
            'salary',
            'salaryType',
            'salaryCurrency',
            'status' // Assuming you want to include job status
          ],
          include: [
            {
              model: User, // Assuming User model is imported and associated with Job
              attributes: ['username'] // Adjust attributes as per your User model
            }
          ]
        }
      ]

    });
    
    return res.status(200).json(jobHistory);
    // } else {
    //     res.status(200).json({ message: 'No job found' });
    // }
    // res.status(200).json(jobHistory);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


//Select user applied joblist
router.get("/appliedlist/:userId", async (req, res) => {
  console.log("After");
  try {
    console.log("After 2");
    const { userId } = req.params;
    const jobHistory = await Application.findAll({
      where: {
        UserId: userId,
        status: {
          [Op.ne]: 'COMPLETED' // [Op.ne] is Sequelize's operator for "not equal"
        }
      },
      order: [['updatedAt', 'DESC']],
      limit: 3,
      include: [
        {
          model: Job,
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'tags',
            'maxApplicants',
            'recruitments',
            'approvalMethod',
            'contact',
            'startDate',
            'endDate',
            'salary',
            'salaryType',
            'salaryCurrency',
            'status' // Assuming you want to include job status
          ],
          include: [
            {
              model: User, // Assuming User model is imported and associated with Job
              attributes: ['username'] // Adjust attributes as per your User model
            }
          ]
        }
      ]

    });
    console.log("3");    
    return res.status(200).json(jobHistory);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


//Select user job history (current applied, current doing job,failed job and completed job) 
router.get("/jobhistory/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const jobHistory = await Application.findAll({
      where: { UserId: userId },
      include: [
          {
              model: Job,
              where: { status: 'ACTIVE' },
              include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ]
          },
      ]
  });
  res.status(200).json(jobHistory);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

// router.get("/jobhistory/:status", getUserJobbyStatus);
//Select user list of status available
router.get("/jobhistory/status/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const statusList = await Application.aggregate('status', 'DISTINCT', { plain: false });
    const formattedStatusList = statusList.map(status => status.DISTINCT);
    res.json(formattedStatusList);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

//Select user job history list w status available
router.get("/jobhistory/jobstatus/:userId/:jobStatus", async (req, res) => {
  try {
    const { userId, jobStatus } = req.params;

    const jobHistory = await Application.findAll({
      where: { UserId: userId, status: jobStatus },
      include: [
        {
          model: Job,
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'tags',
            'maxApplicants',
            'recruitments',
            'approvalMethod',
            'contact',
            'startDate',
            'endDate',
            'salary',
            'salaryType',
            'salaryCurrency',
            'status' // Assuming you want to include job status
          ],
          include: [
            {
              model: User,
              attributes: ['username'],
            }
          ]
        },
      ]
    });
    res.status(200).json(jobHistory);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});

module.exports = router;