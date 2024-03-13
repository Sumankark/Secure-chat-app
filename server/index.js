import cors from "cors";
import express, { json } from "express";
import { port } from "./config.js";
import connectToMongoDB from "./src/connectToDb/connectedToMongooseDb.js";
import chatRouter from "./src/router/chatRouter.js";
import messageRouter from "./src/router/messageRouter.js";
import userRouter from "./src/router/userRouter.js";
import { expressApp, server } from "./src/socket/socket.js";

expressApp.use(cors());

server.listen(port, () => {
  console.log(`Express application is listening at port ${port}`);
});

expressApp.use(json());

expressApp.use(express.static("./public"));

connectToMongoDB();

expressApp.use("/users", userRouter);
expressApp.use("/messages", messageRouter);
expressApp.use("/chats", chatRouter);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
//   pingTimeout: 60000,
// });

// io.on("connection", (socket) => {
//   console.log("connected to socket.io");
//   socket.on("setup", (userData) => {
//     console.log(userData);
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });
// });

// const httpServer = createServer(expressApp);

// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
//   pingTimeout: 60000,
// });

// io.on("connection", (socket) => {
//   console.log("connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });
// });
