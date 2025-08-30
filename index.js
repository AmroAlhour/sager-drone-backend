const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");


const express = require("express");
const app = express();
const socketUtils = require("./utils/socketUtils");

const server = http.createServer(app);
const io = socketUtils.sio(server);
socketUtils.connection(io);

const socketIOMiddleware = (req, res, next) => {
  req.io = io;
  next();
};

// CORS
app.use(cors());

// // ROUTES
// app.use("/api/v1/hello", socketIOMiddleware, (req, res) => {
//   req.io.emit("message", `Hello, ${req.originalUrl}`);
//   res.send("hello world!");
// });


// LISTEN
const port = process.env.PORT || 9013;

// We listen on host '0.0.0.0' to accept connections from Render's network.
server.listen(port, '0.0.0.0', () => {
  console.log(`App running on port ${port}...`);
});