const express = require("express");
const router = express.Router();
const WorkExperience = require("../models/user/WorkExperience");
const User = require("../models/user/User");

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const workExperiences = await WorkExperience.findOne({
      where: { UserId: userId },
      include: [User], // Include User model if you want to fetch user details along with work experiences
    });

    res.json(workExperiences);
  } catch (error) {
    console.error("Error fetching work experiences:", error);
    res.status(500).json({ message: "Error fetching work experiences" });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { title, company, location, startDate, endDate, description } = req.body;

  try {
    // Find the user to verify ownership (optional step)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the work experience record by its associated userId
    let workExperience = await WorkExperience.findOne({
      where: {
        UserId: userId,
      },
    });

    if (!workExperience) {
      // If work experience record doesn't exist, create a new one
      workExperience = await WorkExperience.create({
        UserId: userId,
        title,
        company,
        location,
        startDate,
        endDate,
        description
      });
    } else {
      // Update the fields of the existing work experience record
      workExperience.title = title;
      workExperience.company = company;
      workExperience.location = location;
      workExperience.startDate = startDate; // Assuming `from` maps to `startDate`
      workExperience.endDate = endDate; // Assuming `to` maps to `endDate`
      workExperience.description = description;

      // Save the updated work experience record
      await workExperience.save();
    }

    // Respond with the work experience record (updated or newly created) in JSON format
    res.json(workExperience);
  } catch (error) {
    console.error("Error updating/creating work experience:", error);
    res.status(500).json({ message: "Error updating/creating work experience" });
  }
});

module.exports = router;