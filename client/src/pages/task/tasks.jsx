import { useEffect, useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import TaskList from "@/components/TaskList";
import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog";
import KanbanBoard from "@/components/kanban-board";
import { Layout, LayoutDashboard } from "lucide-react";
import Loader from "@/components/loader";

const Tasks = () => {
  const [taskView, setTaskView] = useState("list");
  const { tasks = [], loading } = useTasks();

  useEffect(() => {}, [tasks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header with Create Task Button */}
      <header className="flex items-center justify-between mb-6">
        <CreateTaskDialog />
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTaskView("list")}
            className={`flex items-center gap-2 px-3 py-1 border rounded ${
              taskView === "list"
                ? "bg-gray-300 text-black"
                : "bg-white text-gray-600"
            }`}
          >
            <Layout className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setTaskView("kanban")}
            className={`flex items-center gap-2 px-3 py-1 border rounded ${
              taskView === "kanban"
                ? "bg-gray-300 text-black"
                : "bg-white text-gray-600"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Kanban View
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {loading && <Loader />}
        {tasks?.length > 0 ? (
          taskView === "list" ? (
            <TaskList tasks={tasks} />
          ) : (
            <KanbanBoard />
          )
        ) : (
          !loading && (
            <p className="mt-10 text-center text-gray-600">
              No tasks found. Create a new one!
            </p>
          )
        )}
      </main>
    </div>
  );
};

export default Tasks;
