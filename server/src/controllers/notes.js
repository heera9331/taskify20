import prisma from "../lib/prisma.js";

export const getNotes = async (req, res) => {
  try {
    const { userId } = req.user;
    const notes = await prisma.note.findMany({ where: { userId } });
    return res.json({ notes });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    if (!id) {
      return res.staus(404).json({ error: "id not found" });
    }
    const note = await prisma.note.findUnique({
      where: { id: parseInt(id), userId },
    });

    return res.json({ note });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params; // Directly access `id` from `req.params`
    const { userId } = req.user;

    if (isNaN(parseInt(id))) {
      return res.status(404).json({ error: "Invalid note ID provided." });
    }

    const { title, content, category } = req.body;

    const updatedNote = await prisma.note.update({
      where: { id: parseInt(id), userId }, // Ensure `id` is an integer
      data: {
        title,
        content: JSON.stringify(content), // Assuming content needs to be serialized
        category,
      },
    });

    if (updatedNote) {
      return res.json({ note: updatedNote, message: "Note updated" });
    }

    return res.status(500).json({ error: "Error while updating note" });
  } catch (error) {
    console.log("Note update error> ", error);
    return res.status(500).json({ error: "Error while updating note" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, parentId, userId, isPublic, category } = req.body;
    console.log(title, content);

    // Validate required fields
    if (!title || !userId) {
      return res.status(400).json({
        error: "Title and userId are required.",
      });
    }

    // Create new note in the database
    const newNote = await prisma.note.create({
      data: {
        title,
        content: JSON.stringify(content), // Assuming content is structured data
        userId: Number(userId),
        isPublic: Boolean(isPublic),
        category: category?.toString(), // Ensure it's a string if provided
        parentId,
      },
    });

    // Return the created note
    res.status(201).json({ note: newNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to create note." });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const deletedNote = await prisma.note.delete({
      where: { id: Number(id), userId },
    });

    return res.json(deletedNote);
  } catch (error) {
    console.error("DELETE Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
