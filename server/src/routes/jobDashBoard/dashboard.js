
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
const { Op } = require('sequelize');

const get3JobCreatedRecent = async (req, res) => {
    try {
        const userId = 1; // The UserId in Application we are interested in
        // if (!req.userId) return res.status(401).json({ message: "Unauthorized" });        
        const jobHistory = await Job.findAll({
            where: { UserId: userId },
            limit: 3
        });
        if (jobHistory.length > 0) {
            res.status(200).json(jobHistory);
        } else {
            res.status(200).json({ message: 'No job found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const get3JobCompletedRecent = async (req, res) => {
    try {
        const userId = 1; // The UserId in Application we are interested in
        // if (!req.userId) return res.status(401).json({ message: "Unauthorized" });        
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
        if (jobHistory.length > 0) {
            res.status(200).json(jobHistory);
        } else {
            res.status(200).json({ message: 'No job found' });
        }
        // res.status(200).json(jobHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const get3JobAppliedRecent = async (req, res) => {
    try {
        const userId = 1; // The UserId in Application we are interested in
        // if (!req.userId) return res.status(401).json({ message: "Unauthorized" });        
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
        if (jobHistory.length > 0) {
            res.status(200).json(jobHistory);
        } else {
            res.status(200).json({ message: 'No job found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getTotalCompletedJob = async (req, res) => {
    try {
        const userId = 1; // The UserId in Application we are interested in
        const totalCompletedJob = await Application.count({
            where: { UserId: userId, status: "COMPLETED" }
        });

        res.status(200).json({ totalCompletedJob });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getTotalCurrentAppliedJob = async (req, res) => {
    try {
        const userId = 1; // The UserId in Application we are interested in
        const totalAppliedJob = await Application.count({
            where: {
                UserId: userId,
                status: {
                    [Op.ne]: 'COMPLETED' // [Op.ne] is Sequelize's operator for "not equal"
                }
            }
        });
        res.status(200).json({ totalAppliedJob });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getTotalCreatedJob = async (req, res) => {
    try {
        const userId = 1; // The UserId in Application we are interested in
        const totalJob = await Job.count({
            where: { UserId: userId }
        });
        res.status(200).json({ totalJob });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    get3JobCreatedRecent,
    get3JobAppliedRecent,
    get3JobCompletedRecent,
    getTotalCompletedJob,
    getTotalCurrentAppliedJob,
    getTotalCreatedJob
};
// module.exports = router;

