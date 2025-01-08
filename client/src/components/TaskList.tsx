import React from "react";
import { useTasks } from "@/hooks/use-tasks";
import { Task } from "@/types";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const TaskList = ({ tasks = [] }: { tasks: Task[] }) => {
  const { deleteTask, } = useTasks();

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteTask(id);
      console.log(response);
      toast.success("Deleted successfully");
    } catch (error) {
      console.log(error);
      toast.success("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Tasks</h1>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 transition-shadow bg-white rounded shadow hover:shadow-lg"
            >
              <h2 className="mb-2 text-xl font-semibold">{task.title}</h2>
              <p className="mb-4 text-sm text-gray-700">
                {task.content.length < 200
                  ? task.content
                  : task.content.slice(200)}
              </p>

              <p className="text-xs text-gray-500">
                <strong>Created:</strong>
                {new Date(task.createdAt).toLocaleDateString()}
              </p>

              <div className="flex items-center justify-between w-full mt-2">
                <Link
                  to={`/tasks/${task._id}?action=edit`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  View Details
                </Link>
                <Trash2
                  className="w-4 h-4 text-red-600 cursor-pointer"
                  onClick={(e:any) => {
                    console.log(e);
                    handleDelete(task._id);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
