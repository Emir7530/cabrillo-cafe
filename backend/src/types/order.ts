export type OrderItem = {
  itemId: number;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "preparing" | "ready" | "completed";
};