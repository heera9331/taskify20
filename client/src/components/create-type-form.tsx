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
  mode: string; // view | edit
  categoryData?: { id: number; title: string; parentId: number | null }; // Pass existing category data for editing
}

const FormCreateNoteType = ({
  title = "Category",
  mode = "view",
  categoryData,
}: FormProp) => {
  const [typeName, setTypeName] = useState(categoryData?.title || "");
  const [parentId, setParentId] = useState<number | null>(
    categoryData?.parentId || null
  );
  const [error, setError] = useState("");
  const { categories } = useUser(); // Fetch categories from user context

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    try {
      if (categoryData?.id) {
        // Update category
        const response = await axios.put(`/api/categories/${categoryData.id}`, {
          title: typeName,
          parentId: parentId,
        });
        toast.success("Category updated successfully!");
      } else {
        // Create category
        const response = await axios.post("/api/categories", {
          title: typeName,
          parentId: parentId,
        });
        toast.success("Category created successfully!");
      }
      setTypeName(""); // Reset the type input
      setParentId(0); // Reset the parent selection
      setError("");
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong while processing the request.");
    }
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-semibold">
          {categoryData?.id ? `Edit ${title}` : `Create ${title}`} Form
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
            <Label className="font-semibold">{title} Type</Label>
            <Input
              type="text"
              placeholder={`Enter ${title} Type`}
              value={typeName}
              onChange={(e) => {
                setTypeName(e.target.value);
              }}
            />
          </div>

          {/* Error Messages */}
          {error && <p className="text-red-600">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" className="mt-4">
            {categoryData?.id ? "Update" : "Create"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormCreateNoteType;
