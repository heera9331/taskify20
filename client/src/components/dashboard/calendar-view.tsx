"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

interface CalendarViewProps {
  tasks: Task[];
}

export function CalendarView({ tasks }: CalendarViewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Group tasks by date
  const tasksByDate = tasks.reduce((acc, task) => {
    const date = task.dueDate.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  // Custom day content renderer
  const DayContent = (day: Date) => {
    const dateStr = day.toISOString().split('T')[0];
    const dayTasks = tasksByDate[dateStr] || [];
    
    if (dayTasks.length === 0) {
      return <div className="w-full h-full">{day.getDate()}</div>;
    }

    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="relative w-full h-full">
            {day.getDate()}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
              {dayTasks.slice(0, 3).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1 h-1 rounded-full",
                    dayTasks[i].priority === "HIGH" ? "bg-red-500" :
                    dayTasks[i].priority === "MEDIUM" ? "bg-yellow-500" :
                    "bg-blue-500"
                  )}
                />
              ))}
              {dayTasks.length > 3 && (
                <span className="text-xs text-muted-foreground">+{dayTasks.length - 3}</span>
              )}
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-64 p-2" align="start">
          <div className="space-y-2">
            {dayTasks.map((task) => (
              <div key={task.id} className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{task.title}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      task.priority === "HIGH" ? "border-red-500 text-red-500" :
                      task.priority === "MEDIUM" ? "border-yellow-500 text-yellow-500" :
                      "border-blue-500 text-blue-500"
                    )}
                  >
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {task.description}
                </p>
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Calendar</h2>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        components={{
          DayContent: ({ date, ...props }) => (
            <div {...props}>
              {DayContent(date)}
            </div>
          ),
        }}
        className="rounded-md border"
      />
    </Card>
  );
}
