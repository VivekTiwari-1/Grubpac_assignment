"use client";

import { useEffect, useState } from "react";
import useRoomStore from "@/store/roomStore";
import RoomCard from "@/components/RoomCard";
import BookingModal from "@/components/BookingModal";

export default function DashboardPage() {
  const { rooms, loading, error, fetchRooms } = useRoomStore();
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleBook = (room) => setSelectedRoom(room);
  const handleClose = () => setSelectedRoom(null);

  // Loading state
  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Available Rooms
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 h-72 animate-pulse"
            >
              <div className="bg-gray-200 h-48 rounded-t-xl" />
              <div className="p-4 flex flex-col gap-2">
                <div className="bg-gray-200 h-4 rounded w-3/4" />
                <div className="bg-gray-200 h-3 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="text-red-600 text-sm">{error}</p>
        <button
          onClick={fetchRooms}
          className="text-blue-600 text-sm underline"
        >
          Try again
        </button>
      </div>
    );
  }

  // Empty state
  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2 text-center">
        <p className="text-gray-500 text-lg font-medium">No rooms available</p>
        <p className="text-gray-400 text-sm">
          Check back later for new listings.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Available Rooms</h1>
        <span className="text-sm text-gray-500">
          {rooms.length} room{rooms.length !== 1 ? "s" : ""} found
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onBook={handleBook} />
        ))}
      </div>

      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          isOpen={!!selectedRoom}
          onClose={handleClose}
          onBookingSuccess={fetchRooms}
        />
      )}
    </div>
  );
}
