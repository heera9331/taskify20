import React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Notebook, Plus, Save, StickyNote, X } from "lucide-react";
import NoteEditor from "@/components/note-editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotes } from "@/hooks/use-notes";
import { useNavigate } from "react-router-dom";
import EditorJsRenderer from "../EditorJsRenderer";

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

export function NotesSection() {
  const { notes } = useNotes();
  const router = useNavigate();

  const handleNewNote = () => {
    router("/notes/0?action=new");
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-yellow-500" />
          <h2 className="text-lg font-semibold">Quick Notes</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleNewNote}>
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              router(`/notes/`);
            }}
          >
            <Notebook className="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="pr-4 space-y-4">
          {notes &&
            notes.length &&
            notes.map((note) => (
              <button
                key={note._id}
                className="w-full text-left"
                onClick={() => {
                  router(`/notes/${note._id}?action=view`);
                }}
              >
                <div className="p-4 transition-colors rounded-lg bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-yellow-900 dark:text-yellow-100">
                      {note.title}
                    </h3>
                    <span className="text-xs text-yellow-700 dark:text-yellow-300">
                      {new Date(note.createdAt).toLocaleDateString().toString()}
                    </span>
                  </div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 line-clamp-2">
                    <EditorJsRenderer data={note.content}/>
                  </p>
                </div>
              </button>
            ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
