const express = require("express");
const router = express.Router();
const { log } = require("../../utils/Logger");
const Post = require("../../models/forum/post/Post");
const Job = require("../../models/job/Job");
const Marketing = require("../../models/home/Marketing");

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

module.exports = {
    getMarketing
};
