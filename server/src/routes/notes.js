import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.js";

const notesRouter = express.Router();

// GET /api/notes/
notesRouter.get("/", getNotes);

// POST /api/notes/
notesRouter.post("/", createNote);

// PUT /api/notes/
notesRouter.put("/:id", updateNote);

// GET /api/notes/4
notesRouter.get("/:id", getNote);

// DELETE /api/notes/4
notesRouter.delete("/:id", deleteNote);

export default notesRouter;
