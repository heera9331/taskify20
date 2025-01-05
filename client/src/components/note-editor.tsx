import React from "react";
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Paragraph from "@editorjs/paragraph";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import Quote from "@editorjs/quote";
import Checklist from "@editorjs/checklist";
import { useParams } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, Save } from "lucide-react";
import { axios } from "@/lib/axios";
import { useUser } from "@/contexts/user-context";
import { toast } from "sonner";

import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "./ui/input";

const EDITOR_HOLDER_ID = "editorjs-container";

interface NoteProps {
  initialNote: {
    id: number;
    title: string;
    content: string;
    userId: number;
  };
}

const NoteEditor = ({ initialNote }: NoteProps) => {
  const { id } = useParams();
  console.log(id);
  const editorInstance = useRef<EditorJS | null>(null);
  const { user, categories } = useUser();
  const [category, setCategory] = useState<number | null>(null);

  const [note, setNote] = useState(initialNote);
  const [loading, setLoading] = useState(false);

  // Initialize EditorJS once when component mounts
  useEffect(() => {
    initializeEditor();

    return () => {
      if (editorInstance.current) {
        // editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeEditor = () => {
    if (editorInstance.current) {
      editorInstance.current.destroy();
    }

    let parsedData;
    try {
      parsedData = note.content ? JSON.parse(note.content) : { blocks: [] };
    } catch (error) {
      console.error("Failed to parse note content:", error);
      parsedData = { blocks: [] };
    }

    const editor = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      tools: {
        header: Header,
        paragraph: Paragraph,
        list: List,
        checklist: Checklist,
        table: Table,
        code: Code,
        inlineCode: InlineCode,
        quote: Quote,
        marker: Marker,
        delimiter: Delimiter,
        embed: Embed,
      },
      placeholder: "Press '/' for commands...",
      data: parsedData,
      onChange: async () => {
        try {
          const savedData = await editor.save();
          setNote((prev) => ({
            ...prev,
            content: JSON.stringify(savedData),
          }));
        } catch (error) {
          console.error("Failed to save editor content:", error);
        }
      },
    });

    editorInstance.current = editor;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, title: e.target.value });
  };

  const saveNote = async () => {
    setLoading(true);
    try {
      const content = JSON.parse(note.content ?? "{}");
      const payload = {
        title: note.title,
        content: content,
        userId: user?.id ?? 0,
        category,
      };

      console.log("Saving Payload:", payload);
      let response = null;
      if (Number(id)) {
        response = await axios.put(`/api/notes/${id}`, payload);
      } else {
        response = await axios.post("/api/notes", payload);
      }
      console.log("Save Response:", response);
      toast.success("Note saved");
    } catch (err) {
      console.error("Error saving note:", err);
      toast.error("Failed to save note");
    } finally {
      setLoading(false);
      // Removed the erroneous toast.error call here
    }
  };

  return (
    <>
      <div className="flex justify-start w-full mb-4">
        <Button onClick={saveNote} disabled={loading} className="gap-2">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save
        </Button>
      </div>

      <div className="flex w-full gap-4">
        <Card className="w-3/4 flex justify-center flex-col gap-2 items-center bg-white border-none shadow-none py-14 max-w-[900px]">
          <input
            type="text"
            value={note.title}
            onChange={handleTitleChange}
            className="w-[72%] py-2 bg-gray-50 text-3xl font-bold active:focus:bg-white focus:outline-none"
            placeholder="Set note title"
          />
          <div className="w-[72%]">
            <div
              id={EDITOR_HOLDER_ID}
              className="prose prose-stone dark:prose-invert max-w-none"
            />
          </div>
        </Card>

        {/* Right Sidebar */}
        <div className="flex flex-col w-1/4 gap-4">
          <Card className="p-4 bg-white">
            <div className="flex flex-col gap-2 min-h-[124px]">
              <Label className="text-xl font-semibold">Featured Image</Label>
              <Input type="file" name="featured_image" />
              <Button className="text-white bg-gray-800">Save</Button>
            </div>
          </Card>

          <Card className="p-4 bg-white">
            <div className="flex flex-col gap-2">
              <Label className="text-xl font-semibold">
                Select Note Category
              </Label>
              <Select
                value={category?.toString() || ""}
                onValueChange={(value) => setCategory(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Parent Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  {categories.map((category: any) => (
                    <SelectItem
                      value={category.id.toString()}
                      key={category.id}
                    >
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          <Card className="p-4 bg-white">
            <div className="flex flex-col gap-2">
              <Label className="text-xl font-semibold">Publish</Label>
              <Button className="text-white bg-gray-800">Publish</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default NoteEditor;
