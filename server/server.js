const express = require("express");
const { Server } = require("socket.io");
const config = require("./config.json");
const applyMiddlewares = require("./src/middlewares");
const applyRoutes = require("./src/routes");
const { notFoundHandler, errorHandler } = require("./src/errorHandling");
const { log } = require("./src/utils/Logger");
const { init } = require("./io");

const app = express();
applyMiddlewares(app);
applyRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

let port = config.boot.port;
const server = app
  .listen(port, () => {
    log(`Server is running on port ${port}`, "INFO", "Server");
  })
  .on("error", handleServerError);

const io = init(server);

function handleServerError(err) {
  if (err.code === "EADDRINUSE") {
    log(`Port ${port} is already in use`, "ERROR");
    port++;
    server.listen(port);
  } else {
    log(err.message, "ERROR");
  }
}
