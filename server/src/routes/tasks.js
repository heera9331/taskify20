import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.js";

const tasksRouter = express.Router();

// GET /api/tasks/
tasksRouter.get("/", getTasks);

// POST /api/tasks/
tasksRouter.post("/", createTask);

// GET /api/tasks/4
tasksRouter.get("/:id", getTask);

// DELETE /api/tasks/4
tasksRouter.delete("/:id", deleteTask);

// UPDATE /api/tasks/4
tasksRouter.put("/:id", updateTask);

export default tasksRouter;
