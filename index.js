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

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on("joinRoom", ({ room, name, avatar }) => {
    const user = userJoin(socket.id, name, room, avatar);
    socket.join(user.room);

    socket.emit("userConnected", {
      sender: "server",
      message: `Welcome to the chat ${user.name}`,
      time: null,
      avatar: null,
    });

    socket.broadcast.to(user.room).emit("userConnected", {
      sender: "server",
      message: `${user.name} joined the chat`,
      time: null,
      avatar: null,
    });

    socket.on("messenger", (msg) => {
      io.to(user.room).emit("messenger", msg);
    });

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    console.log(user);
    if (user) {
      io.to(user.room).emit("userDisconnected", {
        sender: "server",
        message: `${user.name} left the chat`,
        time: null,
        avatar: null,
      });
      console.log(`${user.name} user disconnected`);

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
    console.log("disconnected");
  });
});
// socket.on("disconnect", () => {
//     const user = userLeave(socket.id);

//     if (user) {
//       io.to(user.room).emit(
//         "message",
//         formatMessage(botName, `${user.username} has left the chat`)
//       );

//       // Send users and room info
//       io.to(user.room).emit("roomUsers", {
//         room: user.room,
//         users: getRoomUsers(user.room),
//       });
//     }
//   });
const PORT = 3010;

server.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Run when client connects
// io.on("connection", (socket) => {
//   console.log(io.of("/").adapter);
//   socket.on("joinRoom", ({ username, room }) => {
//     const user = userJoin(socket.id, username, room);

//     socket.join(user.room);

//     // Welcome current user
//     socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

//     // Broadcast when a user connects
//     socket.broadcast
//       .to(user.room)
//       .emit(
//         "message",
//         formatMessage(botName, `${user.username} has joined the chat`)
//       );

//     // Send users and room info
//     io.to(user.room).emit("roomUsers", {
//       room: user.room,
//       users: getRoomUsers(user.room),
//     });
//   });

//   // Listen for chatMessage
//   socket.on("chatMessage", (msg) => {
//     const user = getCurrentUser(socket.id);

//     io.to(user.room).emit("message", formatMessage(user.username, msg));
//   });

//   // Runs when client disconnects
//   socket.on("disconnect", () => {
//     const user = userLeave(socket.id);

//     if (user) {
//       io.to(user.room).emit(
//         "message",
//         formatMessage(botName, `${user.username} has left the chat`)
//       );

//       // Send users and room info
//       io.to(user.room).emit("roomUsers", {
//         room: user.room,
//         users: getRoomUsers(user.room),
//       });
//     }
//   });
// });
