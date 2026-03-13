import { Request, Response } from "express";
import { Order } from "../types/order";

let orders: Order[] = [
  {
    id: 1,
    customerName: "Emir",
    items: [{ itemId: 1, name: "Latte", quantity: 2, price: 90 }],
    totalPrice: 180,
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

  const newOrder: Order = {
    id: orders.length + 1,
    customerName,
    items,
    totalPrice,
    status: "pending",
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
};

export const updateOrderStatus = (req: Request, res: Response) => {
  const orderId = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = ["pending", "preparing", "ready", "completed"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;

  res.json(order);
};

export const getOrderById = (req: Request, res: Response) => {
  const orderId = Number(req.params.id);

  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};