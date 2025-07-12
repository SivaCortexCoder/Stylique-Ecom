import { create } from "zustand";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebaseConfig";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = create((set, get) => ({
  currentUser: null,
  isLoading: true, // Add loading state

  initializeAuth: () => {
    // Use onAuthStateChanged properly - it should be called once
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const res = await axios.get(`${baseURL}/api/user/is-admin/${firebaseUser.uid}`);
          set({
            currentUser: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              isAdmin: res.data.isAdmin,
            },
            isLoading: false
          });
        } catch (err) {
          console.error("Error fetching user info:", err.message);
          set({ currentUser: null, isLoading: false });
        }
      } else {
        set({ currentUser: null, isLoading: false });
      }
    });
  },

  // Method to manually refresh user data
  refreshUser: async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const res = await axios.get(`${baseURL}/api/user/is-admin/${user.uid}`);
        set({
          currentUser: {
            uid: user.uid,
            email: user.email,
            isAdmin: res.data.isAdmin,
          }
        });
      } catch (err) {
        console.error("Error refreshing user info:", err.message);
      }
    }
  }
}));