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
app.use(cookieParser());

// Enhanced CORS configuration
app.use(
  cors({
   origin: 'https://real-estate-connect-client.onrender.com', // Your frontend URL
  //  origin:[
  // 'http://localhost:5173',
  // 'https://real-estate-connect-client.onrender.com'
  // ],
    credentials: true, // Allow credentials (cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers if needed
  })
);

app.use(express.json());

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
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


