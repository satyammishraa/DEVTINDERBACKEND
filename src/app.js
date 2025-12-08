const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
require("dotenv").config();
require("./utils/cronjob");

const allowedOrigins = [
  "http://localhost:5173",
  "https://devtinderfrontendnew.vercel.app",
  "https://devtinderfrontendnew1.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

// Routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);

// SOCKET FIX
const initializeSocket = require("./utils/socket");
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connected");
    server.listen(process.env.PORT || 7777, () => {
      console.log("Server running on port:", process.env.PORT || 7777);
    });
  })
  .catch((err) => {
    console.error("Database connection failed!!", err);
  });
