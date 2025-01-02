import express from "express";
import {
  createPost,
  deletePost,
  updatePost,
  getPost,
  getPosts,
} from "../controllers/posts.js";

const postRouter = express.Router();

// GET /api/posts/
postRouter.get("/", getPosts);

// POST /api/posts/
postRouter.post("/", createPost);

// PUT /api/posts/
postRouter.put("/:id", updatePost);

// GET /api/posts/4
postRouter.get("/:id", getPost);

// DELETE /api/posts/4
postRouter.delete("/:id", deletePost);

export default postRouter;
