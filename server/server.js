const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const server = require("./src/models/SQLize");
const { log: logger } = require("./src/utils/Logger");
const config = require("./config.json");
const rateLimit = require("express-rate-limit");
const log = async (msg, level) => {
  await logger(msg, level, "Main");
};
log("Starting server...", "INFO");
const app = express();
const JwtMiddleware = require("./src/utils/JWT");
const LoggerMiddleware = async (req, res, next) => {
  const clientIp = req.ip || req.connection.remoteAddress;
  await log(`Request to ${req.originalUrl} from ${clientIp}`, "DEBUG");
  next();
};
app.use(
  cors({
    origin: config.middleware.cors.origin,
  })
);
log("Enabled middleware: CORS", "INFO");
app.use(
  rateLimit({
    windowMs: config.middleware.rateLimiter.windowMs,
    max: config.middleware.rateLimiter.max,
  })
);
log("Enabled middleware: Rate limiter", "INFO");
app.use(compression());
log("Enabled middleware: Compression", "INFO");
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);
log("Enabled middleware: Helmet", "INFO");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
log("Enabled middleware: Cookie parser", "INFO");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
log("Enabled middleware: JSON parser", "INFO");
//// DO NOT EDIT ABOVE THIS LINE






const authRoute = require("./src/routes/Auth");
app.use("/api/auth", authRoute);
log("Enabled route: /api/auth", "INFO");

const forumRoute = require("./src/routes/Forum");
app.use("/api/forum", forumRoute);
log("Enabled route: /api/forum", "INFO");

// Add routes here

// const marketingRoute = require("./src/routes/marketing");
// app.use("/api/marketing", marketingRoute);

// const dataPostRoute = require("./src/routes/datapost");
// app.use("/api/datapost", dataPostRoute);

// const hotJobRoute = require("./src/routes/job/top3job");
// app.use("/api/jobs/top3", hotJobRoute);

// const ticketRoute = require("./src/routes/ticket");
// app.use("/api/ticket", ticketRoute);

// const countTotalUserRoute = require("./src/routes/dashboard/countTotalUser");
// app.use("/api/dashboard/count/user/total", countTotalUserRoute);

// const countActiveUserRoute = require("./src/routes/dashboard/countActiveUser");
// app.use("/api/dashboard/count/user/active", countActiveUserRoute);

// const jobsRoute = require("./src/routes/jobs");
// app.use("/api/jobs", jobsRoute);

// const dashboardRoute = require("./src/routes/Dashboard");
// app.use("/api/myjobs", dashboardRoute);

// const jobListRoute = require("./src/routes/JobList");
// app.use("/api/joblist", jobListRoute);

// const testRoute = require("./src/routes/test");
// app.use("/api/test", testRoute);








//// DO NOT EDIT BELOW THIS LINE
app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message);
});
const routeRoute = require("./src/routes/test");
app.use("/api/test", LoggerMiddleware, routeRoute);
log("Enabled route: /api/test", "INFO");

// TEMPORARY WARNING
log("Other routes are not updated to use sequelize", "WARN");
log("Use the old.js instead to run old routes", "WARN");
log("cmd: \x1b[1m\x1b[34m" + "node old.js", "INFO");

// DO NOT EDIT BELOW THIS LINE
let port = config.boot.port;
app
  .listen(port, () => {
    log(`Server is running on port ${port}`, "INFO");
  })
  .on("error", (err) => {
    // const maxTries = config.boot.maxRetries;
    if (err.code === "EADDRINUSE") {
      log(`Port ${port} is already in use. Trying the next port...`, "WARN");
      port++;
      app.listen(port, () => {
        log(`Server is running on port ${port}`, "INFO");
      });
    } else {
      log(`Failed to start server: ${err}`, "ERROR");
    }
  });
