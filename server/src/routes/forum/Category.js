const express = require("express");
const PostCategory = require("../../models/forum/post/PostCategory");
const {isHexColor} = require("../../validators/NumberValidator");
const router = express.Router();


const getCategories = async (req, res) => {
    try {
        const categories = await PostCategory.findAll();
        if (categories.length === 0) {
            res.status(404).json({message: "No categories found."});
            return;
        }
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getCategoryById = async (req, res) => {
    try {
        const {id} = req.params;
        const category = await PostCategory.findByPk(id);
        if (category === null) {
            res.status(404).json({message: "Category not found."});
            return;
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const insertCategory = async (req, res) => {
    try {
        let {name, bgColor, fgColor, enabled} = req.body;
        if (name === "" || !name) {
            name = "New Category";
        }
        if (isHexColor(bgColor) === false || !bgColor) {
            bgColor = "ffffff";
        }
        if (isHexColor(fgColor) === false || !fgColor) {
            fgColor = "000000";
        }
        if (!enabled) {
            enabled = false;
        }

        const category = await PostCategory.create({name, fgColor, bgColor, enabled});
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const putCategory = async (req, res) => {
    try {
        let {id, name, bgColor, fgColor} = req.body;
        const category = await PostCategory.findByPk(id);
        if (category === null) {
            res.status(404).json({message: "Category not found."});
            return;
        }
        if (!name || name === "") {
            name = category.name;
        }
        if (!bgColor || bgColor === "" || isHexColor(bgColor) === false) {
            bgColor = category.bgColor;
        }
        if (!fgColor || fgColor === "" || isHexColor(fgColor) === false) {
            fgColor = category.fgColor;
        }
        await category.update({name, bgColor, fgColor});
        console.log(isHexColor("aaaaaa"))
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const deleteCategory = async (req, res) => {
    try {
        const {id} = req.body;
        const category = await PostCategory.findByPk(id);
        if (category === null) {
            res.status(404).json({message: "Category not found."});
            return;
        }
        await category.destroy();
        res.status(200).json({message: "Category deleted."});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", insertCategory);
router.put("/", putCategory);
router.delete("/", deleteCategory);
module.exports = router;
