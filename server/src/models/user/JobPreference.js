const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");

class JobPreference extends Model {}

JobPreference.init(
  {
    // Fields used for suggestion
    tags: {
      // Should be a list of tags separated by commas
      // e.g: it, software, developer
      type: DataTypes.STRING,
      allowNull: true,
    },

    type: {
      type: DataTypes.ENUM("FULL_TIME", "PART_TIME", "INTERNSHIP", "COMMISION", "FREELANCE", "CONTRACT"),
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    salaryMin: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    salaryMax: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    // Indicate if user is actively looking for a job, used for recommendation to employers
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = JobPreference;
