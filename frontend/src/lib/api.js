import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // required so cookies are sent cross-origin
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  // Read token from memory via localStorage fallback for page refreshes
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const logoutUser = () => api.post("/auth/logout");
export const getMe = () => api.get("/auth/me");

// Rooms
export const getRooms = () => api.get("/rooms");
export const getRoomById = (id) => api.get(`/rooms/${id}`);
export const checkRoomAvailability = (id, startDate, endDate) =>
  api.get(`/rooms/${id}/availability`, { params: { startDate, endDate } });

// Bookings
export const createBooking = (data) => api.post("/bookings", data);
export const getMyBookings = () => api.get("/bookings/my");

export default api;
