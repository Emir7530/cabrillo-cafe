import { Request, Response } from "express";

type Category = {
  id: number;
  name: string;
};

let categories: Category[] = [
  { id: 1, name: "Coffee" },
  { id: 2, name: "Tea" },
  { id: 3, name: "Pastry" },
];

export const getCategories = (req: Request, res: Response) => {
  res.json(categories);
};

export const createCategory = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const newCategory: Category = {
    id: categories.length + 1,
    name,
  };

  categories.push(newCategory);

  res.status(201).json(newCategory);
};

export const updateCategory = (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);
  const { name } = req.body;

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  if (name !== undefined) {
    category.name = name;
  }

  res.json(category);
};

export const deleteCategory = (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);

  const index = categories.findIndex((c) => c.id === categoryId);

  if (index === -1) {
    return res.status(404).json({ message: "Category not found" });
  }

  const deleted = categories[index];
  categories.splice(index, 1);

  res.json({
    message: "Category deleted successfully",
    deleted,
  });
};