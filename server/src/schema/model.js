import { model } from "mongoose";
import userSchema from "./userSchema.js";
import chatSchema from "./chatSchema.js";
import messageSchema from "./messageSchema.js";


export const User = model("User", userSchema);

export const Chat = model("Chat", chatSchema);

export const Message = model("Message", messageSchema);
