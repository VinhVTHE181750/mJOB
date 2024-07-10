const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const config = require("./config.json");
const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser');
const sql = require('mssql');


const app = express();
// Explicitly parse request body as JSON
app.use(express.json());

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

// Helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

// Import and define routes
const exampleRoutes = require("./src/routes/Example");
app.use("/api/example", exampleRoutes);

const forumRoute = require("./src/routes/Forum");
app.use("/api/forum", forumRoute);

const authRoute = require("./src/routes/auth");
app.use("/api/auth", authRoute);

const marketingRoute = require("./src/routes/marketing");
app.use("/api/marketing", marketingRoute);

const dataPostRoute = require("./src/routes/datapost");
app.use("/api/datapost", dataPostRoute);

const hotJobRoute = require("./src/routes/job/top3job");
app.use("/api/jobs/top3", hotJobRoute);

const ticketRoute = require("./src/routes/ticket");
app.use("/api/ticket", ticketRoute);

const countTotalUserRoute = require("./src/routes/dashboard/countTotalUser");
app.use("/api/dashboard/count/user/total", countTotalUserRoute);

const countActiveUserRoute = require("./src/routes/dashboard/countActiveUser");
app.use("/api/dashboard/count/user/active", countActiveUserRoute);

const jobsRoute = require("./src/routes/jobs");
app.use("/api/jobs", jobsRoute);

const profileRoute = require('./src/routes/profile/post');
app.post('/submit', profileRoute.profile);

const workInfoRoute = require('./src/routes/profile/wPost');
app.post('/work', workInfoRoute.submitProfile);

const viewProfileRoute = require('./src/routes/profile/wPost');
app.get('/view-profile', viewProfileRoute.getProfiles);

const dashboardRoute = require("./src/routes/Dashboard");
app.use("/api/myjobs", dashboardRoute);

const jobListRoute = require("./src/routes/JobList");
app.use("/api/joblist", jobListRoute);

const testRoute = require("./src/routes/test");
app.use("/api/test", testRoute);

// Start the server, if port is already in use, try the next port
async function startServer() {
  var port = config.boot.port;
  var delay = config.boot.retryDelay;

  while (true) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
          console.log(`(server.js) Server is running on port ${port}`);
          resolve(server);
        });

        server.on("error", (err) => {
          if (err.code === "EADDRINUSE") {
            console.log(
              `(server.js) Port ${port} is already in use. Trying the next port...`
            );
            port++;
          } else {
            console.log(`Unexpected error: ${err}. Retrying in ${delay}s...`);
          }
          reject(err);
        });
      });
      break; // If server starts successfully, break the loop
    } catch (err) {
      // Wait for delay milliseconds before next iteration in case of an error
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Call your function
startServer();