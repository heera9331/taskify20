import { Task } from "../models/index.js";

// Get all tasks for a user
export const getTasks = async (req, res) => {
  try {
    const { userId } = req.user;

    // Fetch tasks for the logged-in user
    const tasks = await Task.find({ userId });

    return res.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a specific task by ID
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    if (!id) {
      return res.status(404).json({ error: "Task ID not provided" });
    }

    // Fetch the task by ID and userId
    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, content, postType } = req.body;

  try {
    // Update the task with matching ID and userId
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      { title, content, postType },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found or not updated" });
    }

    return res.json(updatedTask);
  } catch (error) {
    console.error("PATCH Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const { title, content, category, status, dueDate, userId } = req.body;

  try {
    const newTask = await Task.create({
      title,
      content,
      category,
      status,
      dueDate,
      userId,
    });

    return res
      .status(201)
      .json({ task: newTask, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id, userId });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ error: "Task not found or already deleted" });
    }

    return res.json({
      task: deletedTask,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
