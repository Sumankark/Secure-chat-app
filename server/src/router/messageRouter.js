import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import { allMessages, sendMessage } from "../controller/messageController.js";


let messageRouter = Router();

messageRouter.route("/").post(protect, sendMessage);

messageRouter.route("/:chatId").get(protect, allMessages);

export default messageRouter;
