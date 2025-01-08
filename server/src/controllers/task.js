import { Task } from "../models/index.js"; // Assuming you have a Task model

// Get all tasks for a user
export const getTasks = async (req, res) => {
  try {
    const { userId } = req.user;

    // Fetch tasks for the logged-in user
    const tasks = await Task.find({ userId });

    return res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific task by ID
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ error: "Task ID not provided" });
    }

    // Fetch the task by ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
