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
    } catch (error) {
      setError("error while fetching notes");
    } finally {
      setLoading(false);
    }
  };

  const getNote = (id: number) => {
    return notes.find((note) => note.id === id) || null;
  };

  const updateNote = (newNote: Note) => {
    console.log("put api request");
    setNotes([...notes, newNote]);
    console.log(newNote);
  };

  const deleteNote = async (id: number) => {
    const response = await axios.delete(`/api/notes/${id}`);
    const tmp = notes.filter((note) => note.id !== id);
    setNotes(tmp);
    return response;
  };

  

  return { notes, setNotes, getNote, updateNote, deleteNote, loading };
}
