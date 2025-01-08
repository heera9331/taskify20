import { Note } from "../models/index.js"; // Assuming you have a Note model

// Get all notes for a user
export const getNotes = async (req, res) => {
  try {
    const { userId } = req.user;

    const notes = await Note.find({ userId });
    console.log(notes);
    return res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific note by ID
export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    if (!id) {
      return res.status(404).json({ error: "Note ID is required" });
    }

    const note = await Note.findOne({ _id: id, userId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.json({ note });
  } catch (error) {
    res.status(500).json({ error:error.messasge});
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const { title, content, category } = req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid note ID provided." });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId },
      { title, content: JSON.stringify(content), category },
      { new: true } // Return the updated document
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found or not updated." });
    }

    return res.json({
      note: updatedNote,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Update Note Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content, parentId, isPublic, category } = req.body;
    const { userId } = req.user;

    if (!title || !userId) {
      return res.status(400).json({ error: "Title and userId are required." });
    }

    const newNote = await Note.create({
      title,
      content: JSON.stringify(content),
      userId,
      parentId,
      isPublic: Boolean(isPublic),
      category,
    });

    return res.status(201).json({ note: newNote });
  } catch (error) {
    console.error("Create Note Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const deletedNote = await Note.findOneAndDelete({ _id: id, userId });

    if (!deletedNote) {
      return res
        .status(404)
        .json({ error: "Note not found or already deleted." });
    }

    return res.json({
      note: deletedNote,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};
