import prisma from "../lib/prisma.js";

export const getTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const tasks = await prisma.task.findMany({ where: { userId } });
    return res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    if (!id) {
      return res.staus(404).json({ error: "id not found" });
    }

    const task = await prisma.task.findUnique({
      where: { id: Number(id), userId },
    });

    return res.json(task);
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
};

// Update a task by ID
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, content, postType } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id), userId },
      data: {
        title,
        content,
        postType,
      },
    });

    return res.json(updatedTask);
  } catch (error) {
    console.error("PATCH Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  const { title, content, category, status, dueDate, userId } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        content,
        category,
        status,
        dueDate,
        userId,
      },
    });

    return res
      .status(201)
      .json({ task: newTask, message: "task created successfully" });
  } catch (error) {
    console.error("CREATE Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: Number(id), userId },
    });

    return res.json(deletedTask);
  } catch (error) {
    console.error("DELETE Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
