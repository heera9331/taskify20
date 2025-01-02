"use client";
import { FormEvent, useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { axios } from "@/lib/axios";
import { useUser } from "@/contexts/user-context";
import { toast } from "sonner";

interface FormProp {
  title: string;
  mode: string; // Modes: new or update
  existingData?: { id: number; title: string; parentId: number | null }; // Existing data for update
}

const FormCreateNoteType = ({
  title = "Category",
  mode = "new",
  existingData,
}: FormProp) => {
  const [typeName, setTypeName] = useState(existingData?.title || "");
  const [parentId, setParentId] = useState<number | null>(
    existingData?.parentId || null
  );
  const [error, setError] = useState("");
  const { categories } = useUser(); // Fetch categories from user context

  useEffect(() => {
    // Update state if existingData changes (useful for edit mode)
    if (existingData) {
      setTypeName(existingData.title);
      setParentId(existingData.parentId || null);
    }
  }, [existingData]);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    try {
      if (mode === "update" && existingData?.id) {
        // Update category
        const response = await axios.put(`/api/categories/${existingData.id}`, {
          title: typeName,
          parentId: parentId,
        });
        toast.success("Category updated successfully!");
      } else {
        // Create new category
        const response = await axios.post("/api/categories", {
          title: typeName,
          parentId: parentId,
        });
        toast.success("Category created successfully!");
      }
      setTypeName(""); // Reset the input
      setParentId(0); // Reset the parent selection
      setError("");
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-semibold">
          {mode === "update" ? `Update ${title}` : `Create ${title}`} Form
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
          {/* Parent Category Selector */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">Parent {title}</Label>
            <Select
              value={parentId?.toString() || ""}
              onValueChange={(value) => setParentId(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Parent Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                {categories.map((category: any) => (
                  <SelectItem value={category.id.toString()} key={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Name Input */}
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">{title} Name</Label>
            <Input
              type="text"
              placeholder={`Enter ${title} Name`}
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" className="mt-4">
            {mode === "update" ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export { FormCreateNoteType };
