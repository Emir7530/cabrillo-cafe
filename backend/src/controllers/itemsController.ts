import { Request, Response } from "express";

type Item = {
  id: number;
  name: string;
  price: number;
  category: string;
};

let items: Item[] = [
  { id: 1, name: "Latte", price: 90, category: "Coffee" },
  { id: 2, name: "Cappuccino", price: 85, category: "Coffee" },
  { id: 3, name: "Croissant", price: 60, category: "Pastry" },
];

export const getItems = (req: Request, res: Response) => {
  res.json(items);
};

export const createItem = (req: Request, res: Response) => {
  const { name, price, category } = req.body;

  if (!name || price === undefined || !category) {
    return res.status(400).json({ message: "Name, price and category are required" });
  }

  const newItem: Item = {
    id: items.length + 1,
    name,
    price: Number(price),
    category,
  };

  items.push(newItem);

  res.status(201).json(newItem);
};

export const updateItem = (req: Request, res: Response) => {
  const itemId = Number(req.params.id);
  const { name, price, category } = req.body;

  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (name !== undefined) item.name = name;
  if (price !== undefined) item.price = Number(price);
  if (category !== undefined) item.category = category;

  res.json(item);
};

export const deleteItem = (req: Request, res: Response) => {
  const itemId = Number(req.params.id);

  const itemIndex = items.findIndex((i) => i.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const deletedItem = items[itemIndex];
  items.splice(itemIndex, 1);

  res.json({
    message: "Item deleted successfully",
    deletedItem,
  });
};