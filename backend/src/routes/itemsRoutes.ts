import { Router } from "express";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemsController";

const router = Router();

router.get("/", getItems);
router.post("/", createItem);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;