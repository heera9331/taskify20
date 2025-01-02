import prisma from "../lib/prisma.js";
import slugify from "slugify";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({});
    return res.json({ posts });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.staus(404).json({ error: "id not found" });
    }
    const posts = await prisma.post.findUnique({ where: { id: parseInt(id) } });

    return res.json({ posts });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params; // Directly access `id` from `req.params`

    if (isNaN(parseInt(id))) {
      return res.status(404).json({ error: "Invalid post ID provided." });
    }

    const { title, content, category } = req.body;

    const updatedpost = await prisma.post.update({
      where: { id: parseInt(id) }, // Ensure `id` is an integer
      data: {
        title,
        content: JSON.stringify(content), // Assuming content needs to be serialized
        category,
      },
    });

    if (updatedpost) {
      return res.json({ post: updatedpost, message: "post updated" });
    }

    return res.status(500).json({ error: "Error while updating post" });
  } catch (error) {
    console.log("post update error> ", error);
    return res.status(500).json({ error: "Error while updating post" });
  }
};

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

    console.log(title, content);

    // Validate required fields
    if (!title || !userId) {
      return res.status(400).json({
        error: "Title and userId are required.",
      });
    }

    // Create new post in the database
    const newpost = await prisma.post.create({
      data: {
        title,
        content: JSON.stringify(content), // Assuming content is structured data
        userId: Number(userId),
        category: category?.toString(), // Ensure it's a string if provided
        parentId,
        name: name ?? slugify(title, true),
        postType,
      },
    });

    // Return the created post
    res.status(201).json({ post: newpost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post." });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedpost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return res.json(deletedpost);
  } catch (error) {
    console.error("DELETE Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
