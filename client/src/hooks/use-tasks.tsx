import { axios } from "@/lib/axios";
import { useState, useEffect } from "react";

interface Task {
  _id: string;
  title: string;
  content: string;
  priority: number;
  status: string;
  dueDate: string;
  userId: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks && storedTasks !== "undefined") {
      try {
        const tasks = JSON.parse(storedTasks);
        setTasks(tasks);
      } catch (e) {
        console.error("Failed to parse tasks from localStorage:", e);
        fetchTasks();
      }
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/tasks");
      const data = response.data.tasks;
      localStorage.setItem("tasks", JSON.stringify(data.tasks));
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async ({ task }: { task: Omit<Task, "_id"> }) => {
    try {
      const response = await axios.post("/api/tasks", task);
      const newTask = response.data.task;
      const oldTasks = tasks;
      setTasks([...oldTasks, newTask]);

      return newTask;
    } catch (error) {
      console.error("Failed to add task:", error);
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, updates);
      const updatedTask = response.data.task;
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, ...updatedTask } : task
        )
      );
      return updatedTask;
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await axios.delete(`/api/tasks/${id}`);
      const data = response.data;
      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
      return data;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const getTask = (id: string): Task | null => {
    return tasks.find((task) => task._id === id) || null;
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    loading,
    error,
    getTask,
  };
}
