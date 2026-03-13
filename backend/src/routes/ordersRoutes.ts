import { Router } from "express";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  getOrderById,
} from "../controllers/ordersController";

const router = Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus);
router.get("/:id", getOrderById);

export default router;