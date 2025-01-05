import prisma from "../lib/prisma.js";

export const getTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const tasks = await prisma.task.findMany({ userId });
    return res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
};

export const getTask = async (req, res) => {
  try {
    const id = req.params;

    if (!id) {
      return res.staus(404).json({ error: "id not found" });
    }
    const task = await prisma.task.findUnique({ id });

    return res.json({ task });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
};
