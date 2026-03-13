import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRoutes from "./routes/itemsRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import ordersRoutes from "./routes/ordersRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Cabrillo Cafe backend is running");
});

app.use("/api/items", itemsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/orders", ordersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});