// io.js
const { Server } = require("socket.io");
const { log } = require("./src/utils/Logger");
const config = require("./config.json").middleware.cors;
let io;

function init(server) {
  io = new Server(server, {
    cors: {
      origin: config.origin,
      methods: ["GET", "POST"],
    },
  });
  log("Socket.io server initialized", "INFO", "Socket");

  io.on("connection", (socket) => {
    const user = socket.handshake.query.user;
    if (user) {
      onlineUsers.push(user);
      io.emit("onlineUsers", onlineUsers);
    }

    socket.on("forumChat", (message) => {
      io.emit("forumChat", message);
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((u) => u !== user);
      io.emit("onlineUsers", onlineUsers);
    });
  });

  return io;
}

module.exports = { init, getIo: () => io };
