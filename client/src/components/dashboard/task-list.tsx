import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Task } from "@/types";
import { Link } from "react-router-dom";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import EditorJsRenderer from "../EditorJsRenderer";
import { useNavigate } from "react-router-dom";

export function TaskList({ tasks }: { tasks: Task[] }) {
  const router = useNavigate();
  
  return (
    <Card className="p-6 overflow-auto" style={{scrollbarWidth: "none"}}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Tasks</h2>
        <Button variant="outline">
          <Link to={"/tasks"}>View All</Link>
        </Button>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {tasks &&
            tasks.length &&
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-4 cursor-pointer"
                onClick={()=>{
                  router(`/tasks/${task.id}?action=view`);
                }}
              >
                <div>
                  <h3 className="text-[18px]">{task.title}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-sm text-gray-500">
                      Due:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : ""}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {task.status ?? ""}
                    </span>
                  </div>
                </div>
                <div
                  // if priority has range [1, 10] => [1, 3] high priority
                  className={`px-3 py-1 rounded-full text-xs
                
              ${
                task.priority <= 3
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  : task.priority > 3 && task.priority <= 5
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              }`}
                >
                  {task.priority}
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
