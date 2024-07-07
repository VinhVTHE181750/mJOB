const express = require("express");
const cors = require("cors");
const db = require("./src/models/SQLize");
const config = require("./config.json");
const rateLimit = require("express-rate-limit");

const app = express();
const jwt = require("jsonwebtoken");


// auth middleware with JWT
const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({ error: "Unauthorized" });
  }
};

const session = require('express-session');

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set to true if your app is on https
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
  res.status(200).json({ message });
};
app.use("/api/test", routeRoute);

// Start the server, if port is already in use, try the next port
var port = config.boot.port;
app
  .listen(port, () => {
    console.log(`(server.js) Server is running on port ${port}`);
  })
  .on("error", (err) => {
    const maxTries = config.boot.maxBootRetries;
    if (err.code === "EADDRINUSE") {
      console.log(
        `(server.js) Port ${port} is already in use. Trying the next port...`
      );
      port++;
      app.listen(port, () => {
        console.log(`(server.js) Server is running on port ${port}`);
      });
    } else {
      console.error(`(server.js) Failed to start server: ${err}`);
    }
  });
