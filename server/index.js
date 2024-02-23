import cors from "cors";
import express, { json } from "express";
import { Server } from "socket.io";
import connectToMongoDB from "./src/connectToDb/connectedToMongooseDb.js";
import userRouter from "./src/router/userRouter.js";
import messageRouter from "./src/router/messageRouter.js";
import chatRouter from "./src/router/chatRouter.js";
import { port } from "./config.js";

let expressApp = express();
expressApp.use(cors());

const server = expressApp.listen(port, () => {
  console.log(`Express application is listening at port ${port}`);
});

expressApp.use(json());

expressApp.use(express.static("./public"));

connectToMongoDB();

expressApp.use("/users", userRouter);
expressApp.use("/messages", messageRouter);
expressApp.use("/chats", chatRouter);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    console.log(userData);
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
});
