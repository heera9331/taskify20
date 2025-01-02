import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import NoteEditor from "@/components/note-editor";
import { toast } from "sonner";
import Loader from "@/components/loader";
import { useParams } from "react-router-dom";
import { useUser } from "@/contexts/user-context";

const Note = () => {
  const { user } = useUser();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState({
    id: 0,
    title: "",
    content: "",
    userId: user?.id ?? 0,
  });

  console.log("id > ", id);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/notes/${id}`);
        if (response.data.note) {
          setNote(response.data.note);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading();
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

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
