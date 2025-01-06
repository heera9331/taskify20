import dovenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";

import prisma from "./lib/prisma.js";
import Router from "./routes/index.js";
import authRouter from "./routes/auth.js";
import uploadRouter from "./routes/upload.js";
import { fileURLToPath } from "url";

dovenv.config();
const PORT = process.env.PORT;


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
  const notes = await prisma.note.findMany();
  console.log("notes", notes);
  res.send("Welcome to the Node.js Backend!");
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${5000}`);
});
