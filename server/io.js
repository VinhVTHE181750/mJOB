// io.js
const { Server } = require("socket.io");
const { log } = require("./src/utils/Logger");
const config = require("./config.json").middleware.cors;
let io;

function init(server) {
  io = new Server(server, {
    cors: {
      origin: config.origin,
    },
  
  });
  log("Socket.io server initialized", "INFO", "Socket");

  // Listen for chat messages from clients
  io.on("connection", (socket) => {
    log("Socket.io server connected", "INFO", "Socket");
    socket.on("forumChat", (msg) => {
      log(msg, "WARN", "Socket");
      // Emit the received message to all clients
      io.emit("forumChat", msg);
    });
  });

  io.on("disconnect", () => {
    log("Socket.io server disconnected", "INFO", "Socket");
  });

  return io;
}

module.exports = { init, getIo: () => io };
