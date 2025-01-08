import { axios } from "@/lib/axios";
import { useEffect, useState } from "react";
import { Note } from "@/types/index";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes && storedNotes !== "undefined") {
      setNotes(JSON.parse(storedNotes));
    } else {
      localStorage.removeItem("notes");
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/notes");
      const notes = response.data.notes;
      setNotes(notes);
      localStorage.setItem("notes", JSON.stringify(notes));
    } catch (err) {
      setError("Error while fetching notes");
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  const getNote = (id: string) => {
    return notes.find((note) => note._id === id) || null;
  };

  const updateNote = (newNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === newNote._id ? { ...note, ...newNote } : note
      )
    );
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await axios.delete(`/api/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      return response;
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return { notes, setNotes, getNote, updateNote, deleteNote, loading, error };
}
