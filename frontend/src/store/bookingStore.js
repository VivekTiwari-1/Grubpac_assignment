import { create } from "zustand";
import { getMyBookings } from "@/lib/api";

const useBookingStore = create((set) => ({
  bookings: [],
  loading: false,
  error: "",

  fetchBookings: async () => {
    set({ loading: true, error: "" });
    try {
      const res = await getMyBookings();
      set({ bookings: res.data.bookings });
    } catch {
      set({ error: "Failed to load bookings. Please try again." });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBookingStore;
