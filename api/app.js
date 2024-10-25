// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import postRoute from "./routes/post.route.js";
// import authRoute from "./routes/auth.route.js";
// import testRoute from "./routes/test.route.js";
// import userRoute from "./routes/user.route.js";
// import chatRoute from "./routes/chat.route.js";
// import messageRoute from "./routes/message.route.js";


// import dotenv from 'dotenv';
// dotenv.config();


// const app=express();
// app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
// app.use(express.json())
// app.use(cookieParser())

// app.use("/api/auth",authRoute);
// app.use("/api/users",userRoute);
// app.use("/api/posts",postRoute);
// app.use("/api/test",testRoute);
// app.use("/api/chats",chatRoute);
// app.use("/api/messages",messageRoute);

// app.listen(8800,()=>{
//     console.log("server  Running");
// });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();

const allowedOrigins = [
  'https://real-estate-connect.vercel.app',
  'https://real-estate-connect-7lfzvpxdr-vidya-madugulas-projects.vercel.app',
  'http://localhost:4000', // Add your local frontend URL here
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin:", origin); // Log the origin for debugging
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
