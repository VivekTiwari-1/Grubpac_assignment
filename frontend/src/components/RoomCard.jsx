"use client";

import Image from "next/image";
import Button from "./ui/Button";

export default function RoomCard({ room, onBook }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      {/* Room image */}
      <div className="relative w-full h-48">
        {room.image_url ? (
          <Image
            src={room.image_url}
            alt={room.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-base">{room.name}</h3>
        <p className="text-sm text-gray-500 mt-1 flex-1 line-clamp-2">
          {room.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-blue-600">
              ${parseFloat(room.price_per_night).toFixed(2)}
            </span>
            <span className="text-xs text-gray-400"> / night</span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Up to {room.capacity} guests
          </span>
        </div>

        <Button className="w-full mt-4" onClick={() => onBook(room)}>
          Book Now
        </Button>
      </div>
    </div>
  );
}
