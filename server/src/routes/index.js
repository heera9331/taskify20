import express from "express";
import notesRouter from "./notes.js";
import tasksRouter from "./tasks.js";
import categoryRouter from "./categories.js";
import postRouter from "./posts.js";
import authenticateUser from "../middlewares/authenticate-user.js";

const Router = express.Router();

Router.get("/", async (req, res) => {
  return res.json({ message: "get -> /api it workds" });
});

// /api/notes/
Router.use("/notes",authenticateUser, notesRouter);

// /api/tasks/
Router.use("/tasks",authenticateUser, tasksRouter);

// /api/categories/
Router.use("/categories",authenticateUser, categoryRouter);

// /api/posts/
Router.use("/posts",authenticateUser, postRouter);

export default Router;
