const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on("joinRoom", ({ room, name }) => {
    socket.join(room);

    socket.emit("userConnected", `Welcome to we chat ${name}`);
    socket.broadcast
      .to(room)
      .emit("userConnected", `${name} has joined the chat`);

    socket.on("messenger", (msg) => {
      io.to(room).emit("messenger", msg);
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("userDisconnected", "A user has left the chat");
    console.log("A user disconnected");
  });
});

const PORT = 3010;

server.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
