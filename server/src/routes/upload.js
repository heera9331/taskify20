import express from "express";
import prisma from "../lib/prisma.js";
import { upload } from "../lib/multer.js";
import slugify from "slugify";

const uploadRouter = express.Router();

uploadRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;

    // Extract file details
    const fileDetails = {
      originalname: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    };

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: "userId is required." });
    }

    // Construct file URL
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const fileUrl = `${baseUrl}/uploads/${path.basename(file.path)}`;

    // Create post data
    const newPost = {
      title: file.originalname, // File name
      name: slugify(file.originalname), // File slug
      content: fileUrl, // Full URL to the uploaded file
      postType: "ATTACHMENT", // Attachment post type
      userId: parseInt(userId, 10), // Ensure userId is a number
    };

    // Save to the database
    const createdPost = await prisma.post.create({
      data: newPost,
    });

    // Response
    res.status(200).json({
      message: "File uploaded and post created successfully",
      file: fileDetails,
      post: createdPost,
    });
  } catch (error) {
    console.error("Upload error > ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

uploadRouter.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { postType: "ATTACHMENT" },
    });
    return res.json({ posts });
  } catch (error) {
    console.log("upload error > ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

uploadRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await prisma.post.delete({ where: { id: Number(id) } });

    return res.json({ post: deletedPost });
  } catch (error) {
    console.log("upload error > ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default uploadRouter;
