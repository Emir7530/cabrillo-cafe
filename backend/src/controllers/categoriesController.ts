import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    const newCategory = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(newCategory);
  } catch {
    res.status(400).json({ message: "Category could not be created" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { name },
    });

    res.json(updatedCategory);
  } catch {
    res.status(404).json({ message: "Category not found" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);

  try {
    await prisma.category.delete({
      where: { id: categoryId },
    });

    res.json({ message: "Category deleted successfully" });
  } catch {
    res.status(404).json({ message: "Category not found" });
  }
};