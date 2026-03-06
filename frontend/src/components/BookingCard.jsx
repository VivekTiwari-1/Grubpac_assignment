import Image from "next/image";
import { format, isPast, isToday } from "date-fns";
import Badge from "./ui/Badge";

// Derive booking status purely from dates
const getStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isPast(end)) return { label: "Completed", variant: "default" };
  if (isToday(start) || (now >= start && now <= end))
    return { label: "Active", variant: "success" };
  return { label: "Upcoming", variant: "info" };
};

export default function BookingCard({ booking }) {
  const status = getStatus(booking.start_date, booking.end_date);

  const nights = Math.ceil(
    (new Date(booking.end_date) - new Date(booking.start_date)) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col sm:flex-row">
      {/* Room image */}
      <div className="relative w-full sm:w-44 h-40 sm:h-auto shrink-0">
        {booking.image_url ? (
          <Image
            src={booking.image_url}
            alt={booking.room_name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 176px"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900">{booking.room_name}</h3>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>

        {/* Dates row */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Check-in
            </span>
            <span className="font-medium text-gray-800">
              {format(new Date(booking.start_date), "MMM d, yyyy")}
            </span>
          </div>
          <div className="text-gray-300 self-end mb-0.5">→</div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              Check-out
            </span>
            <span className="font-medium text-gray-800">
              {format(new Date(booking.end_date), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            {nights} night{nights !== 1 ? "s" : ""} ·{" "}
            <span className="text-xs text-gray-400">
              Booked {format(new Date(booking.created_at), "MMM d, yyyy")}
            </span>
          </span>
          <span className="font-semibold text-gray-900">
            ${parseFloat(booking.total_price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
