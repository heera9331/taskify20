import React, { FormEvent, useState } from "react";
import Markdown  from "react-markdown";
import { useUser } from "@/contexts/user-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useTasks } from "@/hooks/use-tasks";
import { toast } from "@/hooks/use-toast";
import { format } from "path";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface Task {
  id?: number; // Optional for new tasks
  title: string;
  content: string;
  priority: number;
  dueDate: string; // ISO string format
  status: "TODO" | "IN_PROGRESS" | "DONE";
  userId: number;
}

interface CreateTaskDialogProps {
  initialTask?: Task; // For editing
}

export function CreateTaskDialog({ initialTask }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    initialTask ? new Date(initialTask.dueDate) : new Date()
  );
  const { addTask, updateTask } = useTasks(); // Assuming updateTask exists
  const { user } = useUser();

  const [task, setTask] = useState<Task>(
    initialTask || {
      title: "",
      content: "",
      priority: 0,
      dueDate: new Date().toISOString(),
      status: "TODO",
      userId: user?.id ?? 0,
    }
  );

  const isEditing = !!initialTask;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && task.id) {
        await updateTask(task.id, task); // Call updateTask with task ID and updated task data
        toast.success("Task updated successfully");
      } else {
        await addTask(task); // Create a new task
        toast.success("Task created successfully");
      }
      setOpen(false);
    } catch (error) {
      console.error("Failed to save task:", error);
      toast.error("Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {isEditing ? "Edit Task" : "New Task"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={task.content}
              onChange={(e) => setTask({ ...task, content: e.target.value })}
              placeholder="Enter task description"
            />
          </div>

          {/* Priority Select */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={task.priority.toString()}
              onValueChange={(value) =>
                setTask({ ...task, priority: parseInt(value, 10) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10).keys()].map((n) => (
                  <SelectItem key={n + 1} value={(n + 1).toString()}>
                    {n + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Due Date Picker */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start w-full font-normal text-left"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setTask({
                      ...task,
                      dueDate: selectedDate
                        ? selectedDate.toISOString()
                        : new Date().toISOString(),
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : isEditing ? (
              "Update Task"
            ) : (
              "Create Task"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
