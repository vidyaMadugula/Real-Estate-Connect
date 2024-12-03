import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

import logger from "./logger.js";
import morgan from "morgan";

const app = express();

// Enhanced CORS configuration
app.use(
  cors({
    origin: 'https://real-estate-connect-client.onrender.com', // Your frontend URL
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers if needed
  })
);

app.use(express.json());
app.use(cookieParser());
const morganFormat = ":method :url :status :response-time ms";


app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


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
// import authRoute from "./routes/auth.route.js";
// import postRoute from "./routes/post.route.js";
// import testRoute from "./routes/test.route.js";
// import userRoute from "./routes/user.route.js";
// import chatRoute from "./routes/chat.route.js";
// import messageRoute from "./routes/message.route.js";

// import logger from "./logger.js";
// import morgan from "morgan";

// const app = express();

// // Enhanced CORS configuration to handle multiple origins
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://real-estate-connect-client.onrender.com'
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true, // Allow credentials (cookies)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   })
// );

// // Handle preflight requests for all routes
// app.options('*', cors());

// app.use(express.json());
// app.use(cookieParser());
// const morganFormat = ":method :url :status :response-time ms";


// app.use(
//   morgan(morganFormat, {
//     stream: {
//       write: (message) => {
//         const logObject = {
//           method: message.split(" ")[0],
//           url: message.split(" ")[1],
//           status: message.split(" ")[2],
//           responseTime: message.split(" ")[3],
//         };
//         logger.info(JSON.stringify(logObject));
//       },
//     },
//   })
// );

// // Route definitions
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/test", testRoute);
// app.use("/api/chats", chatRoute);
// app.use("/api/messages", messageRoute);

// // Start server
// const PORT = process.env.PORT || 8800;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



