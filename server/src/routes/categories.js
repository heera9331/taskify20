import express from "express";
import {
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
  getAllCategories,
  createCategoryWithParent,
} from "../controllers/categories.js";

const categoryRouter = express.Router();

// GET /api/categories/
categoryRouter.get("/", getAllCategories);

// POST /api/categories/
categoryRouter.post("/", createCategory);

// PUT /api/categories/
categoryRouter.put("/:id", updateCategory);

// GET /api/categories/4
categoryRouter.get("/:id", getCategoryById);

// DELETE /api/categories/4
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
