// express import
const express = require("express");

// Middleware imports
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const server = require("./src/models/SQLize");

// Utils imports
const {log: logger} = require("./src/utils/Logger");

// Config imports
const config = require("./config.json");
const rateLimit = require("express-rate-limit");

const log = async (msg, level) => {
    await logger(msg, level, 'Main');
}

log("Starting server...", 'INFO');
const app = express();

// auth middleware with JWT
const JwtMiddleware = require("./src/utils/JWT");
const LoggerMiddleware = async (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;
    await log(`Request to ${req.originalUrl} from ${clientIp}`, 'DEBUG');
    next();
}

const session = require('express-session');
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false} // set to true if your app is on https
}));

// CORS rule
app.use(
    cors({
        origin: config.middleware.cors.origin,
    })
);
log("Enabled middleware: CORS", 'INFO');

// Rate limiter
app.use(
    rateLimit({
        windowMs: config.middleware.rateLimiter.windowMs,
        max: config.middleware.rateLimiter.max,
    })
);
log("Enabled middleware: Rate limiter", 'INFO');


// Compression
app.use(compression());
log("Enabled middleware: Compression", 'INFO');

// Helmet
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
        },
    })
);
log("Enabled middleware: Helmet", 'INFO');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
log("Enabled middleware: JSON parser", 'INFO');


const authRoute = require("./src/routes/Auth");
app.use("/api/auth", authRoute);
log("Enabled route: /api/auth", 'INFO');

const forumRoute = require("./src/routes/Forum");
app.use("/api/forum", forumRoute);
log("Enabled route: /api/forum", 'INFO');

// const marketingRoute = require("./src/routes/marketing");
// app.use("/api/marketing", marketingRoute);
// log("Enabled route: /api/marketing", 'INFO');
//
// const dataPostRoute = require("./src/routes/datapost");
// app.use("/api/datapost", dataPostRoute);
// log("Enabled route: /api/datapost", 'INFO');
//
// const hotJobRoute = require("./src/routes/job/top3job");
// app.use("/api/jobs/top3", hotJobRoute);
// log("Enabled route: /api/jobs/top3", 'INFO');
//
// const ticketRoute = require("./src/routes/ticket");
// app.use("/api/ticket", ticketRoute);
// log("Enabled route: /api/ticket", 'INFO');
//
// const countTotalUserRoute = require("./src/routes/dashboard/countTotalUser");
// app.use("/api/dashboard/count/user/total", countTotalUserRoute);
// log("Enabled route: /api/dashboard/count/user/total", 'INFO');
//
// const countActiveUserRoute = require("./src/routes/dashboard/countActiveUser");
// app.use("/api/dashboard/count/user/active", countActiveUserRoute);
// log("Enabled route: /api/dashboard/count/user/active", 'INFO');
//
// const jobsRoute = require("./src/routes/jobs");
// app.use("/api/jobs", jobsRoute);
// log("Enabled route: /api/jobs", 'INFO');
//
// const dashboardRoute = require("./src/routes/Dashboard");
// app.use("/api/myjobs", dashboardRoute);
// log("Enabled route: /api/myjobs", 'INFO');
//
// const jobListRoute = require("./src/routes/JobList");
// app.use("/api/joblist", jobListRoute);
// log("Enabled route: /api/joblist", 'INFO');

const routeRoute = async (req, res) => {
    // send all routes address to the client
    const message = 1 + 1;
    res.status(200).json({message});
};
app.use("/api/test", LoggerMiddleware, routeRoute)
log("Enabled route: /api/test", 'INFO');

log("Other routes are not updated to use sequelize", 'WARN');
log('Use the old.js instead to run old routes', 'WARN');
log("cmd: \x1b[1m\x1b[34m" + 'node old.js', 'INFO');

// Start the server, if port is already in use, try the next port
let port = config.boot.port;
app.listen(port, () => {
    log(`Server is running on port ${port}`, 'INFO');
}).on("error", (err) => {
    // const maxTries = config.boot.maxRetries;
    if (err.code === "EADDRINUSE") {
        log(
            `Port ${port} is already in use. Trying the next port...`,
            'WARN'
        );
        port++;
        app.listen(port, () => {
            log(`Server is running on port ${port}`, 'INFO');
        });
    } else {
        log(`Failed to start server: ${err}`, 'ERROR');
    }
});
