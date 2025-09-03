import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { Document } from "mongoose";

// Generate JWT Token
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

// LOGIN USER
interface LoginUserRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const loginUser = async (
  req: LoginUserRequest,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
      return;
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    // Generate JWT Token
    const token = generateToken(user._id.toString());
    res.status(200).json({ success: true, token });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    } else {
      console.error("Unknown login error:", error);
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};

// GET USER DATA USING TOKEN
interface CustomRequest extends Request {
  user?: Document;
}

export const getUserData = async (req: CustomRequest, res: Response) => {
  try {
    const { user } = req;

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }
    res.status(200).json({ success: true, user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Get user data error:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    } else {
      console.error("Unknown error in getUserData:", error);
      res.status(500).json({
        success: false,
        message: "An unknown error occurred",
      });
    }
  }
};
