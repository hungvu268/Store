import express from "express";
import { auth } from "../middleware/auth.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const router = express.Router();

// Get current user's cart
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.userId).populate("cart.product");
  res.json({ success: true, cart: user.cart });
});

// Add product to cart
router.post("/add", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user.userId);
  const existing = user.cart.find((item) => item.product.toString() === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    user.cart.push({ product: productId, quantity });
  }
  await user.save();
  res.json({ success: true, cart: user.cart });
});

// Remove product from cart
router.post("/remove", auth, async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user.userId);
  user.cart = user.cart.filter((item) => item.product.toString() !== productId);
  await user.save();
  res.json({ success: true, cart: user.cart });
});

export default router;
