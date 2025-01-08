import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import dotenv from "dotenv";

dotenv.config();
const authRouter = express.Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// /auth/register
authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, userName, password } = req.body;

    if (!userName || !password || !email) {
      return res
        .status(400)
        .json({ error: "userName, email and password are required" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username: userName });
    if (existingUser) {
      return res.status(400).json({ error: "userName already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({
      name,
      email,
      username: userName,
      password: hashedPassword,
    });

    await newUser.save();

    // Remove the password before sending the response
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

// /auth/login
authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Username not found" });
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, userName: user.username },
      SECRET_KEY,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Remove the password before sending the response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.json({
      message: "Authentication successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: error.message });
  }
});

export default authRouter;
