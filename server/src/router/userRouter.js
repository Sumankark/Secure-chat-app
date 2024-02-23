import { Router } from "express";
import {
  SearchUsers,
  createUser,
  forgotPassword,
  loginUser,
  myProfile,
  readAllUsers,
  resetPassword,
  updatePassword,
  updateProfile,
  verifyUser,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import authorized from "../middleware/authorized.js";
import protect from "../middleware/authMiddleware.js";

let userRouter = Router();

userRouter
  .route("/")
  .post(createUser)
  .get(isAuthenticated, authorized(["admin", "superAdmin"]), readAllUsers);

userRouter.route("/verify-user").patch(verifyUser);

userRouter.route("/search-user").get(protect, SearchUsers);

userRouter.route("/login").post(loginUser);

userRouter.route("/my-profile").get(isAuthenticated, myProfile);

userRouter.route("/update-profile").patch(isAuthenticated, updateProfile);

userRouter.route("/update-password").patch(isAuthenticated, updatePassword);

userRouter.route("/forgot-password").post(forgotPassword);

userRouter.route("/reset-password").post(isAuthenticated, resetPassword);

export default userRouter;
