const express = require("express");
const router = express.Router();
const { log } = require("../../utils/Logger");
const User = require("../../models/user/User");
const Post = require("../../models/forum/post/Post");
const Job = require("../../models/job/Job");
const Application = require("../../models/job/Application");
const { Op } = require('sequelize');
const PostMetric = require("../../models/forum/metric/PostMetric");

const getAppliedJob = async (req, res) => {
    try {
        const userId = 1;
        // const userId = req.userId;
        // if (!req.userId) return res.status(401).json({ message: "Unauthorized" });        
        const jobHistory = await Application.findAll({
            where: { UserId: userId, status: 'PENDING' },
            include: [
                {
                    model: Job,
                },
            ]
        });
        res.status(200).json(jobHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getOngoingJob = async (req, res) => {
    try {
        const userId = 1;
        // const userId = req.userId;
        // if (!req.userId) return res.status(401).json({ message: "Unauthorized" });        
        const jobHistory = await Application.findAll({
            where: { UserId: userId, status: 'ONGOING' },
            include: [
                {
                    model: Job,
                },
            ]
        });
        res.status(200).json(jobHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getRelatedJob = async (req, res) => {
    try {
        // const userId = req.userId;
        // if (!req.userId) return res.status(401).json({ message: "Unauthorized" });        
        const jobHistory = await Job.findAll({
            where: {
                tags: {
                    [Op.like]: '%HR%'
                }
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            limit: 3
        });
        const currentTime = new Date();
        jobHistory.forEach(job => {
          const endDate = new Date(job.endDate);
          const timeDifference = endDate.getTime() - currentTime.getTime();
          const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days
          job.dataValues.timeleft = daysLeft;
        });
        res.status(200).json(jobHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const getNewPost = async (req, res) => {
    try {   
        const jobHistory = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: 3         
        });
        res.status(200).json(jobHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getHotPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: PostMetric,
                    attributes: ['views']
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [
                [{ model: PostMetric }, 'views', 'DESC']
            ],
            limit: 3
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send(error);
    }        
}

module.exports = {
    getAppliedJob,
    getOngoingJob,
    getRelatedJob,
    // getRelatedPost,
    getNewPost,
    getHotPosts
};
