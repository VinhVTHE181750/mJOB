const cron = require("node-cron");
const { log } = require("../../utils/Logger"); // Adjust the path as necessary
const Job = require("../../models/job/Job");
const { Op } = require("sequelize");
const { sequelize } = require("../../models/SQLize");

// if table Jobs does not exist, try running after is has been created

sequelize.sync().then(async () => {
  const { count, rows } = await Job.findAndCountAll({
    where: {
      salaryType: {
        [Op.in]: ["HOURLY", "DAILY", "WEEKLY", "MONTHLY"],
      },
    },
  });
  
  if (!rows) {
      log("No jobs found", "INFO", "JobsPayment");
    } else {
      log(`Found ${count} jobs`, "INFO", "JobsPayment");
      // create a schedule for each job: incur payment based on salaryType
  }
});
