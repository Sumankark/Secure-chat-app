import jwt from "jsonwebtoken";
import { secretKey } from "../../config.js";

export let isAuthenticated = (req, res, next) => {
  let bearerToken = req.headers.authorization;
  let token = bearerToken.split(" ")[1];

  try {
    let infoObj = jwt.verify(token, secretKey);
    req._id = infoObj._id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
