import { create } from "zustand";
import { loginUser, registerUser, logoutUser, getMe } from "@/lib/api";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  // Called once on app mount to rehydrate user
  initAuth: async () => {
    try {
      const res = await getMe();
      set({ user: res.data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  login: async (email, password) => {
    const res = await loginUser({ email, password });
    console.log(res.data.user);
    set({ user: res.data.user });
    toast.success(`Welcome back, ${res.data.user.name}!`);
  },

  register: async (name, email, password) => {
    await registerUser({ name, email, password });
    toast.success("Account created! Please log in.");
  },

  logout: async () => {
    try {
      await logoutUser();
      router.push("/login");
    } catch {
      // proceed regardless
    }
    set({ user: null });
  },
}));

export default useAuthStore;
