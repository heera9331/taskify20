import { Post } from "../models/index.js"; // Assuming you have a Post model
import slugify from "slugify";

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get a specific post by ID
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ error: "ID not provided" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ error: "Invalid post ID provided." });
    }

    const { title, content, category } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content, // No need to serialize if `content` is already structured
        category,
      },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found or not updated." });
    }

    return res.json({
      post: updatedPost,
      message: "Post updated successfully",
    });
  } catch (error) {
    console.error("Post update error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      parentId,
      userId,
      isPublic,
      category,
      name,
      postType,
    } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ error: "Title and userId are required." });
    }

    const newPost = await Post.create({
      title,
      content, // Assuming content is structured data
      userId,
      category,
      parentId,
      name: name ?? slugify(title, { lower: true }),
      postType,
      isPublic: Boolean(isPublic),
    });

    return res.status(201).json({ post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error:error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ error: "Post not found or already deleted." });
    }

    return res.json({
      post: deletedPost,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
};
