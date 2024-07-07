const express = require("express");
const PostCategory = require("../../models/forum/PostCategory");
const router = express.Router();


const getCategories = async (req, res) => {
    try {
        const categories = await PostCategory.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await PostCategory.findOne({ where: { id: req.params.id } });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const insertCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (name === "") {
            res.status(400).json({ message: "Category name cannot be empty." });
            return;
        }
        const category = await PostCategory.create({ name });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const putCategory = async (req, res) => {
    try {
        const { id, name } = req.body;
        if (name === "") {
            res.status(400).json({ message: "Category name cannot be empty." });
            return;
        }
        const category = await PostCategory.update({ name }, { where: { id } });
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        await PostCategory.destroy({ where: { id } });
        res.status(200).json({ message: "Category deleted." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", insertCategory);
router.put("/", putCategory);
router.delete("/", deleteCategory);
module.exports = router;
