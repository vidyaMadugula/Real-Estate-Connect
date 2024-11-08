import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.VITE_CLIENT_URL, // Ensure this matches your client URL, e.g., http://localhost:5173
  credentials: true, // Allow credentials (cookies, auth headers, etc.)
}));

app.use(express.json());
app.use(cookieParser());

// Middleware to set custom headers for all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.VITE_CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Route definitions
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Start server
app.listen(8800, () => {
  console.log("Server is running!");
});



// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import postRoute from "./routes/post.route.js";
// import authRoute from "./routes/auth.route.js";
// import testRoute from "./routes/test.route.js";
// import userRoute from "./routes/user.route.js";
// import chatRoute from "./routes/chat.route.js";
// import messageRoute from "./routes/message.route.js";

// dotenv.config();

// const allowedOrigins = [
//   'https://real-estate-connect-client.onrender.com',
//   'https://real-estate-connect.onrender.com',
//   'https://real-estate-connect-socket.onrender.com',
//   'http://localhost:5173',
//   ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : [])
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("Origin:", origin); // Log the origin for debugging
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
//   allowedHeaders: ['Authorization', 'Content-Type'],
// };

// const app = express();

// // Custom CORS middleware to dynamically set the Access-Control-Allow-Origin header
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
//   next();
// });

// // Enable pre-flight for all routes
// app.options('*', (req, res) => {
//   res.sendStatus(200);
// });

// // Middleware for parsing JSON and cookies
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/test", testRoute);
// app.use("/api/chats", chatRoute);
// app.use("/api/messages", messageRoute);

// // Custom error handler for CORS and other errors
// app.use((err, req, res, next) => {
//   if (err.message === 'Not allowed by CORS') {
//     console.error("CORS error:", err.message);
//     res.status(403).send({ error: 'CORS error: Access not allowed from this origin' });
//   } else {
//     next(err);
//   }
// });

// // Start the server
// app.listen(8800, () => {
//   console.log("Server running on port 8800");
// });
