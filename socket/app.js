// import { Server } from "socket.io";

// const io = new Server({
//   cors: {
//     origin: import.meta.env.VITE_CLIENT_URL,
//   },
// });

// let onlineUser = [];

// const addUser = (userId, socketId) => {
//   const userExits = onlineUser.find((user) => user.userId === userId);
//   if (!userExits) {
//     onlineUser.push({ userId, socketId });
//   }
// };

// const removeUser = (socketId) => {
//   onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return onlineUser.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   socket.on("newUser", (userId) => {
//     addUser(userId, socket.id);
//   });

//   socket.on("sendMessage", ({ receiverId, data }) => {
//     const receiver = getUser(receiverId);
//     if (receiver && receiver.socketId) {
//       io.to(receiver.socketId).emit("getMessage", data);
//     } else {
//       console.log(`User with ID ${receiverId} not found or is offline`);
//     }
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });
// });

// io.listen("4000");


import { Server } from "socket.io";
import dotenv from "dotenv"; // Import dotenv

// Load environment variables from .env file
dotenv.config();

const io = new Server({
  cors: {
    origin: process.env.VITE_CLIENT_URL, // Use the environment variable
    methods: ["GET", "POST"], // Add the allowed methods if needed
    allowedHeaders: ["Authorization"],
    credentials: true 
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver && receiver.socketId) {
      io.to(receiver.socketId).emit("getMessage", data);
    } else {
      console.log(`User with ID ${receiverId} not found or is offline`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

// Listen on the specified port
io.listen(4000);

console.log("Socket.IO server running on port 4000");
