const { Server } = require("socket.io");
const { log } = require("./src/utils/Logger");
const config = require("./config.json");
let io;

function getCorsConfig() {
  return {
    cors: {
      origin: config.middleware.cors.origin,
      methods: ["GET", "POST"],
    },
  };
}

function addUser(onlineUsers, user) {
  onlineUsers.add(user);
  io.emit("onlineUsers", Array.from(onlineUsers));
}

function removeUser(onlineUsers, user) {
  onlineUsers.delete(user);
  io.emit("onlineUsers", Array.from(onlineUsers));
}

function init(server) {
  io = new Server(server, getCorsConfig());
  log("Socket.io server initialized", "INFO", "Socket");

  const onlineUsers = new Set();
  io.on("connection", (socket) => {
    const user = socket.handshake.query.user;
    if (user) {
      addUser(onlineUsers, user);
    }

    socket.on("forumChat", (message) => {
      io.emit("forumChat", message);
    });

    socket.on("disconnect", () => {
      if (user) {
        removeUser(onlineUsers, user);
      }
    });
  });

  return io;
}

module.exports = { init, getIo: () => io };
