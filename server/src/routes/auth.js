import express from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// /auth/regiter
authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, userName, password } = req.body;

    if (!userName || !password || !email) {
      return res
        .status(400)
        .json({ error: "userName, email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { username: userName },
    });

    if (user) {
      return res.status(404).json({ error: "userName already exits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username: userName,
        password: hashedPassword,
      },
    });

    // Remove the password from the user object before sending response
    const { password: _, ...userWithoutPassword } = newUser;

    return res.json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// /auth/login
authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("JSON data > ", { username, password });
    if (!username || !password) {
      return res
        .status(404)
        .json({ error: "Username and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "Username not found" });
    }

    // Compare password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ error: "Invalid password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, userName: user.username },
      SECRET_KEY,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Remove the password from the user object before sending response
    const { password: _, ...userWithoutPassword } = user;

    // Return success response with token and user details
    return res.json({
      message: "Authentication successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log("login error > ", error);
    return res.status(500).json({ error: "internal server error" });
  }
});

export default authRouter;
