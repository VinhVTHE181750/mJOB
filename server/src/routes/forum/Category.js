const express = require("express");
const PostCategory = require("../../models/forum/post/PostCategory");
const { isHexColor } = require("../../validators/NumberValidator");
const { JwtMiddleware } = require("../../utils/JWT");
const router = express.Router();
const { getIo } = require("../../../io");

const getCategories = async (req, res) => {
  const { role } = req;
  try {
    let categories;
    if (role === "ADMIN") {
      categories = await PostCategory.findAll();
    } else {
      categories = await PostCategory.findAll({ where: { enabled: true } });
    }
    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found." });
      return;
    }
    return res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await PostCategory.findByPk(id);
    if (category === null) {
      res.status(404).json({ message: "Category not found." });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const insertCategory = async (req, res) => {
  if (!req.userId || req.role !== "ADMIN") return res.status(401).json({ message: "Unauthorized" });
  try {
    let { name, bgColor, fgColor, enabled } = req.body;
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

    const category = await PostCategory.create({
      name,
      fgColor,
      bgColor,
      enabled,
    });
    getIo().emit("forum/categories");
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const putCategory = async (req, res) => {
  if (!req.userId || req.role !== "ADMIN") return res.status(401).json({ message: "Unauthorized" });
  try {
    let { id, name, bgColor, fgColor, enabled } = req.body;
    const category = await PostCategory.findByPk(id);
    if (category === null) {
      res.status(404).json({ message: "Category not found." });
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
    await category.update({ name, bgColor, fgColor, enabled });
    getIo().emit("forum/categories");
    return res.status(200).json(category);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteCategory = async (req, res) => {
  if (!req.userId || req.role !== "ADMIN") return res.status(401).json({ message: "Unauthorized" });
  try {
    const { id } = req.params;
    const category = await PostCategory.findByPk(id);
    if (category === null) {
      res.status(404).json({ message: "Category not found." });
      return;
    }
    await category.destroy();
    getIo().emit("forum/categories");
    return res.status(200).json({ message: "Category deleted." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", insertCategory);
router.put("/", putCategory);
router.delete("/:id", deleteCategory);
module.exports = router;
