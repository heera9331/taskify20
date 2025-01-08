// Import necessary libraries
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// Middleware to verify JWT tokens
const authenticateUser = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log("user not authenticated");
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Attach the user object to the request
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};

export default authenticateUser;
