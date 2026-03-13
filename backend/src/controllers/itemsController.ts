import { Request, Response } from "express";

export const getItems = (req: Request, res: Response) => {
  const items = [
    { id: 1, name: "Latte", price: 90, category: "Coffee" },
    { id: 2, name: "Cappuccino", price: 85, category: "Coffee" },
    { id: 3, name: "Croissant", price: 60, category: "Pastry" },
  ];

  res.json(items);
};