import express from "express";
import { upload } from "../lib/multer.js";
import slugify from "slugify";
import { Post } from "../models/index.js";

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

    const createdPost = await Post.insertMany([newPost]);

    // Response
    res.status(200).json({
      message: "File uploaded and post created successfully",
      file: fileDetails,
      post: createdPost,
    });
  } catch (error) {
    console.error("Upload error > ", error);
    return res.status(500).json({ error: error.message });
  }
});

uploadRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.findMany({ postType: "ATTACHMENT" });

    return res.json({ posts });
  } catch (error) {
    console.log("upload error > ", error);
    return res.status(500).json({ error: error.message });
  }
});

uploadRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.deleteOne({ _id: id });

    return res.json({ post: deletedPost });
  } catch (error) {
    console.log("upload error > ", error);
    return res.status(500).json({ error: error.message });
  }
});

export default uploadRouter;
