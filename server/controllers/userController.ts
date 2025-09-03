import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// Generae JWT Token
const generateToken = (userId: string) => {
  const payload = { userId };

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Register User Interface
interface RegisterUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

// REGISTER USER
export const registerUser = async (
  req: RegisterUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "please fill all the fields",
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(409).json({ success: false, message: "User already exists" });
      return;
    }

    // Hash password and create user
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate JWT Token
    const token = generateToken(user._id.toString());

    res.status(201).json({ success: true, token });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
      res.json({ success: false, message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: error });
    }
  }
};
