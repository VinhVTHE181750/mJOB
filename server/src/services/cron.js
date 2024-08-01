const fs = require("fs");
const path = require("path");
const { log } = require("../utils/Logger");

// Directory containing the cron scripts
const schedulersDir = path.join(__dirname, "schedulers");

function initializeCronJobs() {
  // Read the contents of the schedulers directory
  fs.readdir(schedulersDir, (err, files) => {
    if (err) {
      log("Error reading schedulers directory", "ERROR", "node-cron");
      return;
    }

    // Filter out non-JavaScript files
    const jsFiles = files.filter((file) => file.endsWith(".js"));

    // Require and execute each JavaScript file
    let count = 0;
    let success = 0;
    let failed = 0;
    jsFiles.forEach((file) => {
      count++;
      const filePath = path.join(schedulersDir, file);
      try {
        require(filePath);
        log(`Deployed ${file}`, "INFO", "node-cron");
        success++;
      } catch (err) {
        log(`Failed to deploy ${file}: ${err.message}`, "ERROR", "node-cron");
        failed++;
      }
    });

    log(`Deployed ${count} cron jobs. (${failed} failed, ${success} success)`, "INFO", "node-cron");
  });
}

module.exports = initializeCronJobs;
