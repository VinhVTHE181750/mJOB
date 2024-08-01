const express = require("express");
const db = require("../models/DBContext");
const User = require("../models/user/User");
const Job = require("../models/job/Job");
const Application = require("../models/job/Application");
const { Op } = require('sequelize');
// const { get3JobCreatedRecent, get3JobAppliedRecent, getTotalCompletedJob, getTotalCurrentAppliedJob, getTotalCreatedJob, get3JobCompletedRecent } = require("./jobDashBoard/dashboard");
const { getUserJobbyStatus, getUserJobHistory , getUserCreatedJob} = require("./jobDashBoard/jobhistory");
const { route } = require("./Auth");
const router = express.Router();

router.get("/history", getUserJobHistory);


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
  try {
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

//Get applicant current apply list
router.get("/applylist/:userId", async (req, res) => {
  try {
    // const userId = 3;
    const { userId } = req.params; // Get userId from request body
    const jobStatus = 'pending'; // Set the status to "pending"

    if (!userId) {
      return res.status(400).json({ message: `User ID is required ${userId}` });
    }

    const jobHistory = await Application.findAll({
      where: { UserId: userId, status: jobStatus },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]
    });
    res.status(200).json(jobHistory);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
});


//Select application list of a jobs
router.get("/applicationlist/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const applicationList = await Application.findAll({
      where: { JobId: jobId, status: 'PENDING' },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ]
    });
    res.status(200).json(applicationList);
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


//Delete an application
router.delete("/deleteapplication", async (req, res) => {
  // const jobId = 1;
  // const userId = 3;
  const { jobId, userId } = req.body;
  if (!jobId || !userId) {
    return res.status(400).json({ message: "jobId and userId are required" });
  }
  try {
    const result = await Application.destroy({
      where: {
        jobId: jobId,
        userId: userId,
      },
    });

    if (result === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "An error occurred while deleting the application" });
  }
});

router.get("/jobapplication", async (req, res) => {
  try {
    const jobApplication = await Application.findAll({
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
    res.status(200).json(jobApplication);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Error occurred", error: err });
  }
});



//Employer

//Get employer created job
router.get("/employer/createdjob", async (req, res) => {
  try {
    const { userId } = req.body;
    const jobCreatedList = await Job.findAll({
      where: { UserId: userId },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [
        ['updatedAt', 'DESC'],
      ]
    });
    res.status(200).json(jobCreatedList);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
});

//Get employer created done by order time
router.get("/employer/jobcompleted", async (req, res) => {
  try {
    const { userId } = req.body;
    const jobDoneList = await Job.findAll({
      where: { UserId: userId, status: 'COMPLETED' },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [
        ['updatedAt', 'DESC'],
      ],
    });

  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
});

//Get all applications of a jobs
router.get("/employer/jobapplication", async (req, res) => {
  try {
    const { jobId } = req.body;
    const jobApplicationList = await Application.findAll({
      where: { jobId: jobId },
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
    res.status(200).json(jobApplicationList);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
});

const getJobCreatedRecently = async (req, res) => {
  try {
      const {userId} = req.params;
      const jobs = await Job.findAll({
          where: { 
            UserId: userId, 
            status: 'ACTIVE' 
          },
          include: [
              {
                  model: User,
                  attributes: ['username']
              }
          ],
          order: [['createdAt', 'DESC']],
      });
      res.status(200).json(jobs);
  } catch (error) {
      res.status(500).send(error);
  }
}

//Get jobs is in progress of user
const getJobProcessedRecently = async (req, res) => {
  try {
    const { userId } = req.params;
    const jobs = await Job.findAll({
        where: { 
          UserId: userId, 
          status: {
            // [Op.or]: ['ACTIVE', 'COMPLETED']
            [Op.notIn]: ['ACTIVE', 'COMPLETED']
          } 
        },
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ],
        order: [['createdAt', 'DESC']],
    });
    res.status(200).json(jobs);
} catch (error) {
    res.status(500).send(error);
}
}

const getJobCompletedRecently = async (req, res) => {
  try {
      const { userId } = req.body;
      const jobs = await Job.findAll({
          where: { UserId: userId, status: 'COMPLETED' },
          include: [
              {
                  model: User,
                  attributes: ['username']
              }
          ],
          order: [['updatedAt', 'DESC']],
      });
      res.status(200).json(jobs);
  } catch (error) {
      res.status(500).send(error);
  }
}
//Employer Dashboard
router.get('/employer/jobcreated/:userId', getJobCreatedRecently);
router.get('/employer/jobprogress/:userId', getJobProcessedRecently);
router.get('/employer/jobcompleted/:userId', getJobCompletedRecently);


//Employer History
router.get('/employer/createdhistory/:userId', getUserCreatedJob);

module.exports = router;