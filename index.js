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

  socket.on("messenger", (msg) => {
    io.emit("messenger", msg);
  });

  socket.on("userConnect", (username) => {
    console.log(`${username} connected`);
    io.emit("userJoined", `${username} has joined`);
  });

  socket.on("userDisconnect", (username) => {
    console.log(`${username} disconnected`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3030;

server.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
