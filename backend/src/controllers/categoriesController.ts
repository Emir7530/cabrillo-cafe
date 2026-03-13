import { Request, Response } from "express";

export const getCategories = (req: Request, res: Response) => {
  const categories = [
    { id: 1, name: "Coffee" },
    { id: 2, name: "Tea" },
    { id: 3, name: "Pastry" },
    { id: 4, name: "Cold Drinks" },
  ];

  res.json(categories);
};