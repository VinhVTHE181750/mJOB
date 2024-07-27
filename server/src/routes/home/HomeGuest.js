const express = require("express");
const router = express.Router();
const { log } = require("../../utils/Logger");
const Post = require("../../models/forum/post/Post");
const Job = require("../../models/job/Job");
const Marketing = require("../../models/home/Marketing");
const JobMetric = require("../../models/job/JobMetric");
const PostMetric = require("../../models/forum/metric/PostMetric");
const { sequelize } = require('../../models/SQLize');
const User = require("../../models/user/User");


const getMarketing = async (req, res) => {
    try {
        const marketing = await Marketing.findAll({
            where: {
                active: true
            }
        });
        res.send(marketing);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getHotJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            include: [
                {
                    model: JobMetric,
                    attributes: ['view']
                }
            ],
            order: [[{ model: JobMetric }, 'view', 'DESC']],
            limit: 3
        });
        res.send(jobs);
    } catch (error) {
        res.status(500).send(error);
    }
};

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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getMarketing,
    getHotJobs,
    getHotPosts
};
