import prisma from "../lib/prisma.js";

// GET: Fetch children of a category by ID
const getCategoryById = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  try {
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "Invalid ID provided." });
    }

    const category = await prisma.category.findUnique({
      where: { id: parsedId, userId },
      include: { children: true }, // Include subcategories
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    return res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error.message);
    return res.status(500).json({ error: "Failed to fetch category." });
  }
};

// PUT: Update a category by ID
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { title, description, parentId } = req.body;

  try {
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return res
        .status(400)
        .json({ error: "Invalid ID. ID must be a number." });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parsedId, userId },
      data: {
        title,
        description,
        parentId, // Assuming `parentId` is optional and nullable
      },
    });

    return res.json({ category: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error.message);

    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "Category not found for the given ID." });
    }

    return res.status(500).json({ error: "Internal server error." });
  }
};

// POST: Create a new category
const createCategory = async (req, res) => {
  const { title, description, parentId } = req.body;
  const { userId } = req.user;
  try {
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const newCategory = await prisma.category.create({
      data: {
        title,
        description: description || "",
        parentId,
        userId,
      },
    });

    return res.status(201).json({ category: newCategory });
  } catch (error) {
    console.error("Error creating category:", error.message);
    return res.status(500).json({ error: "Failed to create category." });
  }
};

// DELETE: Delete a category by ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.params;

  try {
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      return res.status(400).json({ error: "Invalid ID." });
    }

    const deletedCategory = await prisma.category.delete({
      where: { id: parsedId, userId },
    });

    return res.json({ category: deletedCategory });
  } catch (error) {
    console.error("Error deleting category:", error.message);

    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ error: "Category not found for the given ID." });
    }

    return res.status(500).json({ error: "Internal server error." });
  }
};

// GET: Fetch all categories with their children
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { userId },
      include: { children: true }, // Include subcategories recursively
    });

    return res.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return res.status(500).json({ error: "Failed to fetch categories." });
  }
};

// POST: Create a new category with optional parentId
const createCategoryWithParent = async (req, res) => {
  const { title, description, parentId } = req.body;
  const { userId } = req.params;

  try {
    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const newCategory = await prisma.category.create({
      data: {
        title,
        description: description || "",
        parentId,
        userId
      },
    });

    return res.status(201).json({ category: newCategory });
  } catch (error) {
    console.error("Error creating category:", error.message);
    return res.status(500).json({ error: "Failed to create category." });
  }
};

export {
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
  getAllCategories,
  createCategoryWithParent,
};
