import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from "../controller/chatController.js";

let chatRouter = Router();

chatRouter.route("/").post(protect, accessChat).get(protect, fetchChats);

chatRouter.route("/group").post(protect, createGroupChat);

chatRouter.route("/rename").patch(protect, renameGroup);

chatRouter.route("/remove-from-group").patch(protect, removeFromGroup);

chatRouter.route("/add-to-group").patch(protect, addToGroup);

export default chatRouter;
