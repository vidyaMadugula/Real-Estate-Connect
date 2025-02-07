

import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const io = new Server(4000, {
  cors: {
    // origin: process.env.VITE_CLIENT_URL, // Ensure this matches your deployed client URL
    origin: [process.env.VITE_CLIENT_URL,
      'http://localhost:5173',
    ], 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  if (!onlineUser.find((user) => user.userId === userId)) {
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
  console.log("A user connected:", socket.id);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(`User added: ${userId}`);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
    } else {
      console.log(`User with ID ${receiverId} not found`);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    removeUser(socket.id);
  });
});

console.log("WebSocket server listening on port 4000");
