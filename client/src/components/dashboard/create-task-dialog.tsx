"use client";

import { useState, FormEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar1,
  CalendarIcon,
  Flame,
  Loader2,
  Plus,
  Text,
  TextSelect,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTasks } from "@/hooks/use-tasks";
import { useUser } from "@/contexts/user-context";
import { toast } from "sonner";

interface Task {
  title: string;
  content: string;
  priority: number;
  dueDate: string; // ISO string format
  status: "TODO" | "IN_PROGRESS" | "DONE";
  userId: number;
}

export function CreateTaskDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { addTask } = useTasks();
  const { user } = useUser();
 

  const [task, setTask] = useState<Task>({
    title: "",
    content: "",
    priority: 0,
    dueDate: new Date().toISOString(),
    status: "TODO",
    userId: 0,
  });

  useEffect(() => {
    setTask({ ...task, userId: user?.id ?? 0 });
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      setTask({ ...task, userId: user?.id ?? 0 });
      const response = await addTask({ task }); // Assuming `addTask` accepts a Task object directly
      toast.success("Task created successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.success("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center mb-2">
              <span className="pr-2">
                <TextSelect className="w-5 h-5" />
              </span>
              <span className="">Title</span>
            </Label>
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
            <Label htmlFor="description" className="flex items-center mb-2">
              <span className="pr-2">
                <Text className="w-5 h-5" />
              </span>
              <span className="">Description</span>
            </Label>
            <Textarea
              className="min-h-[150px]"
              id="description"
              value={task.content}
              onChange={(e) => setTask({ ...task, content: e.target.value })}
              placeholder="Enter task description"
            />
          </div>

          {/* Priority Select */}
          <div className="space-y-2">
            <Label htmlFor="priority" className="flex items-center">
              <span className="pr-2">
                <Flame className="w-5 h-5" />
              </span>
              <span className="pr-2">Priority</span>
            </Label>
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
            <Label htmlFor="dueDate" className="flex items-center">
              <span className="pr-2">
                <Calendar1 className="w-5 h-5 " />
              </span>
              <span className="pr-2">Due Date</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
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
                Creating...
              </>
            ) : (
              "Create Task"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
