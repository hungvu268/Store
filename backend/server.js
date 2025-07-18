import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is started at http://localhost:" + PORT);
});
