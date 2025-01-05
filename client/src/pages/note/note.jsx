import { useEffect, useState } from "react";
import NoteEditor from "@/components/note-editor";
import { toast } from "sonner";
import Loader from "@/components/loader";
import { useParams } from "react-router-dom";
import { useUser } from "@/contexts/user-context";
import { useNotes } from "@/hooks/use-notes";

const Note = () => {
  const { user } = useUser();
  const { id } = useParams();
  const { getNote, notes, loading } = useNotes();

  const [note, setNote] = useState({
    id: 0,
    title: "",
    content: "",
    userId: user?.id ?? 0,
  });

  useEffect(() => {
    const loadNote = async () => {
      if (!Number(id)) return;
  
      const fetchedNote = getNote(Number(id));
      if (fetchedNote) {
        setNote(fetchedNote);
      } else {
        toast.error("Note not found");
      }
    };

    loadNote();
  }, [id, notes, getNote]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="min-h-screen">
        <NoteEditor
          initialNote={{
            id: note.id,
            title: note.title,
            content: note.content,
            userId: note.userId,
          }}
        />
      </div>
    </div>
  );
};

export default Note;
