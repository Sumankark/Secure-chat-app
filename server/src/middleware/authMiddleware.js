import jwt from "jsonwebtoken";
import { User } from "../schema/model.js";
import { secretKey } from "../../config.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, secretKey);

      req.user = await User.findById(decoded._id).select("-password");
      
      next();
    } catch (error) {
      res.status(401).json({
        message: new Error("Not authorized, token failed"),
      });
    }
  }
  if (!token) {
    res.status(401).json({
      message: new Error("Not authorized, no token"),
    });
  }
};

export default protect;
