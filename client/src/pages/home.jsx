import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  BarChart3,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// import { CalendarView } from "@/components/dashboard/calendar-view";
import { NotesSection } from "@/components/dashboard/notes-section";
import { StatsCard } from "@/components/dashboard/stats-card";
import { CreateTaskDialog } from "@/components/dashboard/create-task-dialog";
import { TaskList } from "@/components/dashboard/task-list";
import { useTasks } from "@/hooks/use-tasks";

const taskStats = {
  todo: 0,
  inProgess: 0,
  done: 0,
  total: 0,
};

export default function Home() {
  const [progress, setProgress] = useState(65);
  const { tasks } = useTasks();

  useEffect(() => {
    const total = tasks.length;
    taskStats.total = total;

    taskStats.inProgess = tasks.filter(
      (task) => task.status === "PENDING"
    ).length;

    taskStats.done = tasks.filter((task) => task.status === "COMPLETED").length;
    setProgress(taskStats.done / tasks.length);
    
  }, [tasks]);

  const stats = [
    {
      label: "Total",
      value: taskStats.total,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      label: "Completed",
      value: taskStats.done,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      label: "In Progress",
      value: taskStats.inProgess,
      icon: Clock,
      color: "text-blue-500",
    },
    {
      label: "Todo",
      value: taskStats.inProgess,
      icon: AlertCircle,
      color: "text-orange-500",
    },
  ];

  console.log("statks> ", stats);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 p-4 bg-white border-b dark:bg-gray-800">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <CreateTaskDialog />
        </div>
      </header>

      <main className="grid w-full gap-6 p-4 mx-auto max-w-7xl sm:p-6 lg:p-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Progress Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Tasks List */}
          <div className="lg:col-span-2">
            <TaskList tasks={tasks} />
          </div>

          {/* Calendar */}
          <div className="h-full bg-white rounded shadow hover:shadow-lg">
            {/* <CalendarView tasks={tasks} /> */}
          </div>
        </div>

        {/* Notes Section */}
        <NotesSection />
      </main>

      {/* Footer */}
      <footer className="p-4 bg-white border-t dark:bg-gray-800">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex gap-6">
            <Button variant="ghost" className="gap-2">
              <Calendar className="w-4 h-4" /> Calendar
            </Button>
            <Button variant="ghost" className="gap-2">
              <BarChart3 className="w-4 h-4" /> Reports
            </Button>
            <Button variant="ghost" className="gap-2">
              <Users className="w-4 h-4" /> Team
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
