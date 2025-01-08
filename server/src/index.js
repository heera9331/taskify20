import dovenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
 
import Router from "./routes/index.js";
import authRouter from "./routes/auth.js";
import uploadRouter from "./routes/upload.js";
import { fileURLToPath } from "url";
import { connectToDatabase } from "./config/db.js";

dovenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// Derive __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());

// api
app.use("/api", Router);
app.use("/auth", authRouter);

app.use("/uploads", uploadRouter);

app.get("/", async (req, res) => {
  res.send("Welcome to the Node.js Backend!");
});

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
