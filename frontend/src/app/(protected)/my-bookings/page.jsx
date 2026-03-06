"use client";

import { useEffect } from "react";
import useBookingStore from "@/store/bookingStore";
import BookingCard from "@/components/BookingCard";
import Link from "next/link";

export default function MyBookingsPage() {
  const { bookings, loading, error, fetchBookings } = useBookingStore();

  useEffect(() => {
    fetchBookings();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 h-36 animate-pulse flex overflow-hidden"
            >
              <div className="w-44 bg-gray-200 shrink-0" />
              <div className="flex-1 p-4 flex flex-col gap-3">
                <div className="bg-gray-200 h-4 rounded w-1/3" />
                <div className="bg-gray-200 h-3 rounded w-1/2" />
                <div className="bg-gray-200 h-3 rounded w-1/4 mt-auto" />
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
          onClick={fetchBookings}
          className="text-blue-600 text-sm underline"
        >
          Try again
        </button>
      </div>
    );
  }

  // Empty state
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
        <div className="text-5xl">🛏️</div>
        <p className="text-gray-700 font-medium text-lg">No bookings yet</p>
        <p className="text-gray-400 text-sm">
          You haven't booked any rooms. Start exploring available rooms.
        </p>
        <Link
          href="/dashboard"
          className="mt-2 text-sm text-blue-600 hover:underline font-medium"
        >
          Browse Rooms →
        </Link>
      </div>
    );
  }

  // Separate bookings into upcoming/active and past
  const now = new Date();
  const upcoming = bookings.filter((b) => new Date(b.end_date) >= now);
  const past = bookings.filter((b) => new Date(b.end_date) < now);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <span className="text-sm text-gray-500">
          {bookings.length} booking{bookings.length !== 1 ? "s" : ""} total
        </span>
      </div>

      {/* Upcoming / Active */}
      {upcoming.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Upcoming & Active
          </h2>
          <div className="flex flex-col gap-4">
            {upcoming.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </section>
      )}

      {/* Past */}
      {past.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Past Bookings
          </h2>
          <div className="flex flex-col gap-4 opacity-75">
            {past.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
