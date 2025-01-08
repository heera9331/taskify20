import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

// MongoDB connection URI
const uri = process.env.MONGO_DATABASE_URL;

// Persistent connection instance
let isConnected = false;

// Function to connect to MongoDB
export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return mongoose.connection;
  }

  try {
    // Connect to MongoDB
    const connection = await mongoose.connect(uri);
    isConnected = mongoose.connection.readyState === 1; // 1 means connected
    console.log("Connected to MongoDB successfully");

    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if unable to connect
  }
};

