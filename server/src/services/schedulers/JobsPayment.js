const cron = require("node-cron");
const { log } = require("../../utils/Logger"); // Adjust the path as necessary
const Job = require("../../models/job/Job");
const { Op } = require("sequelize");
const { sequelize } = require("../../models/SQLize");
const Compensation = require("../../models/job/Compensation");
const { transfer } = require("../../routes/payment/Transfer");

const getNextPaymentDate = (date, period) => {
  const currentDate = new Date(date);
  let nextDate;

  switch (period) {
    case "MONTHLY":
      nextDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
      break;
    case "WEEKLY":
      nextDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
      break;
    case "DAILY":
      nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      break;
    case "HOURLY":
      nextDate = new Date(currentDate.setHours(currentDate.getHours() + 1));
      break;
    default:
      throw new Error("Unsupported period type");
  }
  return nextDate.toISOString();
};

const parseCronExpression = (date) => {
  // date is ISO string
  const d = new Date(date);
  const second = d.getSeconds();
  const minute = d.getMinutes();
  const hour = d.getHours();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  // const year = d.getFullYear(); ${year}
  return `${second} ${minute} ${hour} ${day} ${month} *`;
};

const schedulePayment = (c) => {
  if (!c.nextPayment) {
    log(`Compensation ${c.id} does not have nextPayment date`, "ERROR", "node-cron");
    return;
  }
  const exp = parseCronExpression(c.nextPayment);
  cron.schedule(exp, async () => {
    log(`Processing compensation ${c.id}`, "DEBUG", "node-cron");
    try {
      // Check if the status is PAID, this case should not happen normally
      if (c.status === "PAID") {
        log(`Compensation ${c.id} is already paid`, "DEBUG", "node-cron");
        return;
      }

      // Check if the status is OVERDUE, this case should not happen normally
      if (c.status === "OVERDUE") {
        log(`Compensation ${c.id} is overdue`, "DEBUG", "node-cron");
        return;
      }

      // Check if the status is PENDING, this is the normal case
      if (c.status === "PENDING") {
        // Make the payment
        transfer(c.from, c.to, c.amount, `Payment for job ${c.jobId}`);
        // For now, just log the payment
        log(`Paying ${c.amount} from ${c.from} to ${c.to}`, "DEBUG", "node-cron");

        // Update the status to PAID if nextPayment > endDate
        const j = await Job.findOne({
          where: {
            id: c.jobId,
          },
        });
        if (j.endDate < c.nextPayment) {
          await c.update({ status: "PAID" });
        } else {
          // Update the status to PENDING and reschedule
          const nextPaymentDate = getNextPaymentDate(c.nextPayment, j.salaryType);
          await c.update({
            status: "PENDING",
            nextPayment: nextPaymentDate,
          });
          schedulePayment(c); // Reschedule the payment
        }
      }
    } catch (err) {
      log(`Error in scheduled task: JobsPayment - ${err.message}`, "ERROR", "node-cron");
    }
  });
};

// if table Jobs does not exist, try running after it has been created
sequelize.sync().then(async () => {
  const { count, rows } = await Compensation.findAndCountAll();

  log(`Found ${count} compensations`, "INFO", "node-cron");

  if (count === 0) {
    return;
  } else {
    log("Scheduling payments", "INFO", "node-cron");
    rows.map((c) => {
      schedulePayment(c);
    });
  }
});

module.exports = getNextPaymentDate;