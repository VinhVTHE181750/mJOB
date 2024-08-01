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

const getUserJobHistory = async (req, res) => {
    try {
        const userId = 1; // The UserId in Application we are interested in
        // const jobsCreatorId = 1; // The UserId in Job as creator
        // if (!req.userId) return res.status(401).json({ message: "Unauthorized" });        
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
        res.status(500).json({ message: err.message });
    }
}

const getUserJobbyStatus = async (req, res) => {
    try {
        // const { jobStatus } = req.param;
        const userId = 1; // The UserId in Application we are interested in
        const result = await Application.findAll({
        //   where: { status: jobStatus, UserId: userId },
          include: [
            {
              model: Job,
            },
          ],
        });
    
        if (result.recordset.length === 0) {
          res.status(404).json({ message: "Data not found" });
        } else {
          res.json(result.recordset);
        }
      } catch (err) {
        // console.log(err);
        res.status(500).json({ message: req.param });
      }
}


//Employer history
const getUserCreatedJob = async (req, res) => {
    try {
        const { userId } = req.params;  
        const jobHistory = await Job.findAll({
            where: { UserId: userId },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
            order: [['updatedAt', 'DESC']],
        });
        res.status(200).json(jobHistory);
    } catch (err) {
        res.status(500).json({ message: req.param });;
    }
}


module.exports = {
    getUserJobHistory,
    getUserJobbyStatus,
    getUserCreatedJob
};
// module.exports = router;