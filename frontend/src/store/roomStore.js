import { create } from "zustand";
import { getRooms } from "@/lib/api";

const useRoomStore = create((set) => ({
  rooms: [],
  loading: false,
  error: "",

  fetchRooms: async () => {
    set({ loading: true, error: "" });
    try {
      const res = await getRooms();
      set({ rooms: res.data.rooms });
    } catch {
      set({ error: "Failed to load rooms. Please try again." });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useRoomStore;
