import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";

interface CustomRequest extends Request {
  user?: Document;
}

export const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  // Extract token
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.headers.authorization;
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token provided" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET not defined in environment variables");
      return res.status(500).json({ success: false, message: "Server error" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & {
      userId: string;
    };

    if (!decoded || !decoded.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, invalid token" });
    }

    // Fetch user from DB and attach to req.user
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Auth middleware error:", error.message);
      return res.status(401).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: "Unknown error" });
  }
};
