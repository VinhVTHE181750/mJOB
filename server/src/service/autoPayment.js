const cron = require('node-cron');
const { sequelize } = require('../models/SQLize');

const Job = require('../models/job/Job');
const Compensation = require('../models/job/Compensation');
// Function to calculate time left for each job
const calculateTimeLeft = (endDate) => {
  const now = new Date();
  const timeLeft = new Date(endDate) - now;
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutesLeft = Math.floor((timeLeft / 1000 / 60) % 60);
  return `${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes left`;
};

// Schedule a task to run every 10 seconds
cron.schedule('*/10 * * * * *', async () => {
  try {
    const jobs = await Job.findAll();
    jobs.forEach(job => {
      const timeLeft = calculateTimeLeft(job.endDate);
      console.log(`Job: ${job.title}, Time left: ${timeLeft}`);
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
});

console.log('Cron job initialized. It will log time left for each job every 10 seconds.');
