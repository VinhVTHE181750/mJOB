const express = require("express");
const cors = require("cors");
const config = require("./config.json");
const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser');
const sql = require('mssql');


const app = express();

// CORS rule
app.use(cors({
  origin: config.middleware.cors.origin
}));


// Rate limiter
app.use(rateLimit({
  windowMs: config.middleware.rateLimiter.windowMs,
  max: config.middleware.rateLimiter.max
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


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



// Start the server, if port is already in use, try the next port
var port = config.boot.port;
app.listen(port, () => {
  console.log(`(server.js) Server is running on port ${port}`);
}).on('error', (err) => {
  const maxTries = config.boot.maxBootRetries;
  if (err.code === 'EADDRINUSE') {
    console.log(`(server.js) Port ${port} is already in use. Trying the next port...`);
    port++;
    app.listen(port, () => {
      console.log(`(server.js) Server is running on port ${port}`);
    });
  } else {
    console.error(`(server.js) Failed to start server: ${err}`);
  }
});
