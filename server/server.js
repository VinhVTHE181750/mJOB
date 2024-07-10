const express = require("express");
const { Server } = require("socket.io");
const config = require("./config.json");
const applyMiddlewares = require("./src/middlewares");
const applyRoutes = require("./src/routes");
const { notFoundHandler, errorHandler } = require("./src/errorHandling");
const { log } = require("./src/utils/Logger");

const app = express();
applyMiddlewares(app);
applyRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

let port = config.boot.port;
const server = app
  .listen(port, () => {
    log(`Server is running on port ${port}`, "INFO");
  })
  .on("error", handleServerError);

const io = new Server(server);

function handleServerError(err) {
  // Error handling logic here
}
