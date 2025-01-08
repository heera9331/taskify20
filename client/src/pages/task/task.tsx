import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useUser } from "@/contexts/user-context";
import { useTasks } from "@/hooks/use-tasks";
import { toast } from "sonner";
import useSearchParams from "@/hooks/use-query-params";
import { useParams } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  content: string;
  priority: number;
  status: string;
  dueDate: string;
  userId: string;
}

const TaskPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [query] = useSearchParams();
  const { addTask, updateTask, getTask } = useTasks();
  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState<Task>({
    _id: "",
    title: "",
    content: "",
    priority: 1,
    dueDate: new Date().toISOString(),
    status: "TODO",
    userId: user?._id ?? "",
  });
  const isEditing = query["action"] === "edit";

  // Track if initial task has been loaded
  const [isTaskLoaded, setIsTaskLoaded] = useState(false);

  useEffect(() => {
    if (id && !isTaskLoaded) {
      const taskData = getTask(id);
      if (taskData) {
        setTask(taskData);
        setIsTaskLoaded(true); // Mark as loaded
      }
    }
  }, [id, getTask, isTaskLoaded]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask({ ...task, content: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!task.title || !task.content) {
      toast.error("Title and content are required");
      setLoading(false);
      return;
    }

    try {
      if (isEditing && task._id) {
        await updateTask(task._id, task);
        toast.success("Task updated successfully");
      } else {
        await addTask(task);
        toast.success("Task created successfully");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to save task";
      console.error(errorMessage, error);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pl-4 mb-4">
      <header className="pt-4">
        <h2 className="text-[32px]">
          {isEditing ? "Edit Task" : "Create Task"}
        </h2>
      </header>

      <div className="mt-4">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-[720px]">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-2 font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={task.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description with Markdown Preview */}
          <div>
            <label htmlFor="content" className="block mb-2 font-medium">
              Description (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              value={task.content}
              onChange={handleMarkdownChange}
              className="w-full h-40 p-2 border rounded"
              placeholder="Write task description in Markdown..."
            />
            <div className="p-4 mt-4 border rounded bg-gray-50">
              <h3 className="mb-2 text-lg font-semibold">Markdown Preview:</h3>
              <ReactMarkdown>{task.content}</ReactMarkdown>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block mb-2 font-medium">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={task.priority.toString()}
              onChange={(e) =>
                setTask({ ...task, priority: parseInt(e.target.value, 10) })
              }
              className="w-full p-2 border rounded"
            >
              {[...Array(10).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block mb-2 font-medium">
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={task.dueDate ? task.dueDate.split("T")[0] : ""}
              onChange={(e) =>
                setTask({ ...task, dueDate: `${e.target.value}T00:00:00.000Z` })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block mb-2 font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Done</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900"
            disabled={loading}
          >
            {loading ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskPage;
