const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');
const config = require('../../config.json');

const logsDir = path.join(__dirname, '../../logs');
const latestLogPath = path.join(logsDir, 'latest.log');

// Log levels and their corresponding console colors
const levels = {
    ERROR: { value: 0, color: '\x1b[31m' }, // Red
    WARN: { value: 1, color: '\x1b[33m' },  // Yellow
    INFO: { value: 2, color: '\x1b[32m' },  // Green
    DEBUG: { value: 3, color: '\x1b[34m' }  // Blue
};

// Current log level
const consoleLogLevel = config.logger.level;

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

if (fs.existsSync(latestLogPath)) {
    const stats = fs.statSync(latestLogPath);
    const modifiedTime = format(stats.mtime, 'yyyyMMdd_HHmmss');
    const archivedLogPath = path.join(logsDir, `${modifiedTime}.log`);
    fs.renameSync(latestLogPath, archivedLogPath);
}

let logBuffer = '';

function log(message, level, prefix) {
    if (!level) {
        level = 'INFO';
    }
    const logLevel = levels[level];
    if(!logLevel) {
        throw new Error(`Invalid log level: ${level}`);
    }
    if (logLevel <= consoleLogLevel) {
        const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        const logMessage = `[${timestamp}] [${level}] [${prefix}] ${message}`;
        const consoleMessage = `${logLevel.color}${logMessage}\x1b[0m`;
        console.log(consoleMessage);
        logBuffer += `${logMessage}\n`;
    }
}

function flushLogBuffer() {
    fs.appendFileSync(latestLogPath, logBuffer);
    logBuffer = '';
}

setInterval(flushLogBuffer, 5000);
process.on('exit', flushLogBuffer);

module.exports = {
    log,
};