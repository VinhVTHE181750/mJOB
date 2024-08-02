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
    approvalMethod: {
      type: DataTypes.ENUM("AUTO"),
      allowNull: false,
      defaultValue: "AUTO",
    },
    // Description
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Location
    location: {
      type: DataTypes.STRING,
      allowNull: true,
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
      defaultValue: 10,
    },
    // Number of recruits: amount of people needed
    recruitments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    // This will be set to true if the job is verified by bot or mod/admin
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    // This is to determine whether the job is verified by bot or manual
    // true = manual; false = bot
    isManuallyVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    // Approval method: true = auto; false = manual
    // This is to determine whether appicants are auto-approved or not
    isAutoSelected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
      defaultValue: DataTypes.NOW,
    },
    // End date
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    // Salary amount
    salary: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },

    // ONE OF: hourly, daily, weekly, monthly, once, percentage or none
    salaryType: {
      type: DataTypes.ENUM("HOURLY", "DAILY", "WEEKLY", "MONTHLY", "ONCE", "PERCENTAGE", "NONE"),
      allowNull: true,
      defaultValue: "NONE",
    },

    salaryCurrency: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "USD",
    },
    // Job status:

    // DRAFT: job is inactive and cannot be applied to. This may happen when employers
    // had written the job but not yet published it.

    // ACTIVE: job is active and can be applied to

    // PENDING: job is pending for approval and cannot be applied to.

    // DELISTED: job is delisted and cannot be applied to. This may happen when MOD or ADMIN
    // had delisted the job.

    // ONGOING: this job has finished hiring, and in the phase of managing payment

    // COMPLETED: job is completed and cannot be applied to. This may happen when the job
    status: {
      type: DataTypes.ENUM("DRAFT", "PENDING", "ACTIVE", "FUNDING", "ONGOING", "COMPLETED", "INACTIVE", "DELISTED", "CANCELLED"),
      allowNull: false,
      defaultValue: "DRAFT",
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
