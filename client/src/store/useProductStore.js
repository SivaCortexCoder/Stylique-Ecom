import { create } from "zustand";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useProductStore = create((set) => ({
  productData: [],
  isLoading: false,
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`${baseURL}/api/product/allProducts`);
      set({ productData: res.data.allProducts });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
