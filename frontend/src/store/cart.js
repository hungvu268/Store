import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  fetchCart: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/cart", {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    const data = await res.json();
    set({ cart: data.cart });
  },
  addToCart: async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await res.json();
    set({ cart: data.cart });
  },
  removeFromCart: async (productId) => {
    const token = localStorage.getItem("token");
    const res = await fetch("/api/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();
    set({ cart: data.cart });
  },
}));
