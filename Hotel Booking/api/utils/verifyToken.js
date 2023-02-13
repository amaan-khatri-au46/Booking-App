import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// here we are accessing a cookie ... sending back to the user ... 
export const verifyToken = (req, res, next) => {
    // here we are accessing a cookie from the Browser....
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

// here we are bascically very the user ...
// if the user has cookie than he/she can perform any task .... 
export const verifyUser = (req, res, next) => {
    verifyToken(req, res,next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next()
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };

//   now we will verify that the user is admin or not .... 
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};