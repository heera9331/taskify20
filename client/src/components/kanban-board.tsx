
import React, { useState, useEffect } from "react";
import { Task } from "@/types";
import { useTasks } from "@/hooks/use-tasks"; // Custom hook to fetch tasks

const KanbanBoard = () => {
  const { tasks } = useTasks(); // Fetch tasks from the backend
  const [groupedTasks, setGroupedTasks] = useState<Record<string, Task[]>>({});

  useEffect(() => {
    if (tasks) {
      // Group tasks by their status
      const grouped = tasks.reduce(
        (acc: Record<string, Task[]>, task: Task) => {
          if (!acc[task.status]) acc[task.status] = [];
          acc[task.status].push(task);
          return acc;
        },
        {}
      );
      setGroupedTasks(grouped);
    }
  }, [tasks]);

  return (
    <div className="flex flex-wrap min-h-screen gap-4 p-4 bg-gray-100">
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div
          key={status}
          className="w-1/3 p-4 bg-white border border-gray-200 rounded shadow"
        >
          <h2 className="mb-4 text-lg font-semibold">{status}</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 transition rounded shadow cursor-pointer bg-gray-50 hover:shadow-lg"
              >
                <h3 className="font-medium text-md">{task.title}</h3>
                <p className="text-sm text-gray-500 truncate">{task.content}</p>
                <p className="mt-2 text-xs text-gray-400">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
