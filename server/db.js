const express = require("express");
const cors = require("cors");
const db = require("./src/models/SQLize");
const config = require("./config.json");
const rateLimit = require("express-rate-limit");
const { log: logger } = require("./src/utils/Logger");

const log = (msg, level) => {
    logger(msg, level, 'Main');
}

const app = express();
// Example usage
log('Server started', 'INFO');

// auth middleware with JWT
const JwtMiddleware = require("./src/middlewares/JWT");

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

// Rate limiter
app.use(
    rateLimit({
        windowMs: config.middleware.rateLimiter.windowMs,
        max: config.middleware.rateLimiter.max,
    })
);

app.use(express.json());

const forumRoute = require("./src/routes/Forum");
app.use("/api/forum", forumRoute);

const authRoute = require("./src/routes/Auth");
app.use("/api/auth", authRoute);

const routeRoute = async (req, res) => {
    // send all routes address to the client

    const message = 1 + 1;
    res.status(200).json({message});
};
app.use("/api/test", JwtMiddleware, routeRoute);

// Start the server, if port is already in use, try the next port
var port = config.boot.port;
app.listen(port, () => {
    log(`Server is running on port ${port}`, 'INFO');
}).on("error", (err) => {
    const maxTries = config.boot.maxBootRetries;
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
