import { Request, Response } from "express";

let orders = [
  {
    id: 1,
    customerName: "Emir",
    items: [
      { itemId: 1, name: "Latte", quantity: 2, price: 90 },
      { itemId: 3, name: "Croissant", quantity: 1, price: 60 },
    ],
    totalPrice: 240,
    status: "pending",
  },
];

export const getOrders = (req: Request, res: Response) => {
  res.json(orders);
};

export const createOrder = (req: Request, res: Response) => {
  const { customerName, items } = req.body;

  if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Customer name and items are required" });
  }

  const totalPrice = items.reduce(
    (sum: number, item: { quantity: number; price: number }) =>
      sum + item.quantity * item.price,
    0
  );

  const newOrder = {
    id: orders.length + 1,
    customerName,
    items,
    totalPrice,
    status: "pending",
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
};