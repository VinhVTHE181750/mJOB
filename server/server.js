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

const app = express();
log("Starting server...", 'INFO');

// auth middleware with JWT
const JwtMiddleware = require("./src/utils/JWT");
const LoggerMiddleware = async (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;
    await log(`Request to ${req.originalUrl} from ${clientIp}`, 'INFO');
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
log("Route enabled: /api/auth", 'INFO');

const forumRoute = require("./src/routes/Forum");
app.use("/api/forum", forumRoute);
log("Route enabled: /api/forum", 'INFO');


const routeRoute = async (req, res) => {
    // send all routes address to the client
    const message = 1 + 1;
    res.status(200).json({message});
};
app.use("/api/test", LoggerMiddleware, routeRoute)
log("Route enabled: /api/test", 'INFO');

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
