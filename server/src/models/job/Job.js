const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../SQLize");
const Requirement = require("./Requirement");
const Compensation = require("./Compensation");
const JobHistory = require("./JobHistory");
const Application = require("./Application");
const JobMetric = require("./JobMetric");

class Job extends Model {}

Job.init(
  {
    // Title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("FULL_TIME", "PART_TIME", "INTERNSHIP", "COMMISSION", "FREELANCE", "CONTRACT"),
      allowNull: false,
    },
    // Description
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Location
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Tags, can be null
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Max applicants count: amount of applications
    maxApplicants: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // Number of recruits: amount of people needed
    recruitments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    // Approval method: true = auto; false = manual
    approvalMethod: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // Contact: can be email, phone, etc (string)
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Start date
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // End date
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    // Salary amount
    salary: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    // ONE OF: hourly, daily, weekly, monthly, once, percentage or none
    salaryType: {
      type: DataTypes.ENUM("HOURLY", "DAILY", "WEEKLY", "MONTHLY", "ONCE", "PERCENTAGE", "NONE"),
      allowNull: true,
    },
    salaryCurrency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Job status:

    // ACTIVE: job is active and can be applied to

    // INACTIVE: job is inactive and cannot be applied to. This may happen when employers
    // had written the job but not yet published it.

    // DELISTED: job is delisted and cannot be applied to. This may happen when MOD or ADMIN
    // had delisted the job.

    // ONGOING: this job has finished hiring, and in the phase of managing payment

    // COMPLETED: job is completed and cannot be applied to. This may happen when the job
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE", "DELISTED", "ONGOING", "COMPLETED"),
      allowNull: false,
      defaultValue: "INACTIVE",
    },
  },
  {
    sequelize,
    paranoid: true,
  }
);

// Job may have many requirements
Job.hasMany(Requirement);
Requirement.belongsTo(Job);

// Job has many compensations to every applicant
Job.hasMany(Compensation);
Compensation.belongsTo(Job);

// Job has many applicants
Job.hasMany(Application);
Application.belongsTo(Job);

Job.hasMany(JobHistory);
JobHistory.belongsTo(Job);

Job.hasMany(JobMetric);
JobMetric.belongsTo(Job);

module.exports = Job;
