const express = require("express");
const db = require("../models/DBContext");
const Application = require("../models/job/Application");
const Job = require("../models/job/Job");
const User = require("../models/user/User");
const JobPreference = require("../models/user/JobPreference");
const { getJobCreatedRecently, getJobProcessedRecently, getRelatedJob, getNewPost, getHotPosts } = require("./home/HomeUser");
const { relatedJobs } = require("../utils/algorithms/RelativeSearch");

const router = express.Router();


router.get('/newpost', getNewPost);
router.get('/hotpost', getHotPosts);
// router.get('/ongoing', getOngoingJob);
// router.get('/applied', getAppliedJob);
// router.get('/related', getRelatedJob);








// Route to fetch user's ongoing jobs
router.get('/ongoing/:userId',  async (req, res) => {
try {
  const { userId } = req.params;

  const jobs = await Application.findAll({
    where: { UserId: userId, status: "ONGOING" },
    include: [
      { model: Job,
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
          { model: User,
            attributes: ['username']
          }
        ]
      },
     ],
    limit: 4   
  });
  res.json(jobs);

} catch (err) {
  console.log(err);
  res.status(500).json({ message: "Error occurred", error: err });
}  
});

// Route to fetch user's pending jobs
router.get('/pending/:userId', async (req, res) => {
try {
  const { userId } = req.params;

 const jobs = await Application.findAll({
    where: { UserId: userId, status: "PENDING" },
    include: [
      { model: Job,
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
       }],
    limit: 4   
  });
  res.json(jobs);
} catch (err) {
  console.log(err);
  res.status(500).json({ message: "Error occurred", error: err });
}  
});

// Route to fetch related jobs
// router.get('/relatedjobs', getRelatedJob);
router.get('/relatedjobs', async (req, res) => {
  try {
    const userId = 1; // Default userId, replace with req.userId if available

    // Fetch all jobs
    const jobHistory = await Job.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    // Fetch the job preference of the user
    const jobPreference = await JobPreference.findOne({
      where: { UserId: userId }
    });

    if (!jobPreference) {
      return res.status(404).json({ message: "Job preference not found for the user" });
    }

    // Call the relatedJobs function with the job preference and job history
    const result = await relatedJobs(jobPreference, jobHistory);
    // Return the result
    const limitedResult = result.slice(0, 3);
    res.status(200).json(limitedResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Employer
router.get('/created', getJobCreatedRecently);
router.get('/processed', getJobProcessedRecently);

module.exports = router;