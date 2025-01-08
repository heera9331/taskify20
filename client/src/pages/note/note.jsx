import React, { useEffect, useState } from "react";
import useSearchParams from "@/hooks/use-query-params";
import NoteEditor from "@/components/note-editor";
import Loader from "@/components/loader";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useNotes } from "@/hooks/use-notes";

const Note = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { getNote, notes, loading } = useNotes();

  const [note, setNote] = useState(null);
  const action = searchParams.action;

  useEffect(() => {
    if (action === "new") {
      // Creating a new note
      setNote({
        _id: null,
        title: "",
        content: "",
        userId: null,
      });
    } else {
      // Loading an existing note
      const loadNote = async () => {
        if (loading) return;
        const fetchedNote = getNote(id);
        if (fetchedNote) {
          setNote(fetchedNote);
        } else {
          toast.error("Note not found");
        }
      };

      loadNote();
    }
  }, [id, action, getNote, loading]);

  if (loading) return <Loader />;

  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading note...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <NoteEditor
        initialNote={{
          _id: note._id,
          title: note.title,
          content: note.content,
          userId: note.userId,
        }}
      />
    </div>
  );
};

export default Note;
