const cron = require('node-cron');
const { log } = require('../../utils/Logger'); // Adjust the path as necessary
const os = require('os');

// Report process stats every minute
cron.schedule('* * * * *', () => {
  try {
    const stats = `
            Uptime: ${process.uptime().toFixed(0)} seconds
    OS Memory used: ${os.totalmem() - os.freemem()}
   OS Memory total: ${os.totalmem()}
         CPU usage: ${process.cpuUsage().user/1000} ms user / ${process.cpuUsage().system/1000} ms system
    `
    log(`\n${stats}`, 'DEBUG', 'node-cron');
  } catch (err) {
    log(`Error in scheduled task: exampleScheduler - ${err.message}`, 'ERROR', 'node-cron');
  }
});