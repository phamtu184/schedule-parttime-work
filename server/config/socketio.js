const User = require("../models/user.model");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("we have a new connect");
    socket.on("join", (roomId) => {
      socket.join(roomId);
    });
    socket.on("disconnect", () => {
      console.log("user disconnect");
    });
    socket.on("sendMessage", ({ content, roomId, ofUser }) => {
      const message = { content, ofUser };
      io.to(roomId).emit("receiveMessage", {
        message,
        roomId,
      });
    });
    socket.on("typing", ({ typing, roomId }) => {
      socket.to(roomId).emit("typing", { typing, currentRoom: roomId });
    });
  });
};
