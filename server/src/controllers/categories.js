import { Category } from "../models/index.js"; // Import your Mongoose category model

// GET: Fetch children of a category by ID
export const getCategoryById = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    const category = await Category.findOne({ _id: id, userId }).populate(
      "children"
    );

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    return res.json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// PUT: Update a category by ID
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, description, parentId } = req.body;

  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id, userId },
      { title, description, parentId },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ error: "Category not found for the given ID." });
    }

    return res.json({ category: updatedCategory });
  } catch (error) {
    return res.status(500).json({ error: error.messageF });
  }
};

// POST: Create a new category
export const createCategory = async (req, res) => {
  const { title, description, parentId } = req.body;
  const { userId } = req.user;

  try {
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const newCategory = await Category.create({
      title,
      description: description || "",
      parentId,
      userId,
    });

    return res.status(201).json({ category: newCategory });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// DELETE: Delete a category by ID
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const deletedCategory = await Category.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ error: "Category not found for the given ID." });
    }

    return res.json({ category: deletedCategory });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// GET: Fetch all categories with their children
export const getAllCategories = async (req, res) => {
  const { userId } = req.user;

  try {
    const categories = await Category.find({ userId });

    return res.json({ categories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST: Create a new category with optional parentId
export const createCategoryWithParent = async (req, res) => {
  const { title, description, parentId } = req.body;
  const { userId } = req.user;

  try {
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const newCategory = await Category.create({
      title,
      description: description || "",
      parentId,
      userId,
    });

    return res.status(201).json({ category: newCategory });
  } catch (error) {
    return res.status(500).json({ error:error.message });
  }
};
