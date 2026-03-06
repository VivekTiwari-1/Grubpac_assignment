"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { checkRoomAvailability, createBooking } from "@/lib/api";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

export default function BookingModal({
  room,
  isOpen,
  onClose,
  onBookingSuccess,
}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nights =
    startDate && endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = nights
    ? (nights * parseFloat(room.price_per_night)).toFixed(2)
    : null;

  const formatDate = (date) => date.toISOString().split("T")[0]; // YYYY-MM-DD

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      setError("Please select both check-in and check-out dates");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1 — check availability
      const availRes = await checkRoomAvailability(
        room.id,
        formatDate(startDate),
        formatDate(endDate),
      );

      if (!availRes.data.available) {
        setError(
          "This room is not available for the selected dates. Please choose different dates.",
        );
        setLoading(false);
        return;
      }

      // Step 2 — confirm booking
      await createBooking({
        roomId: room.id,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      });

      toast.success("Room booked successfully!");
      onBookingSuccess?.();
      handleClose();
    } catch (err) {
      const msg =
        err.response?.data?.message || "Booking failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStartDate(null);
    setEndDate(null);
    setError("");
    setLoading(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Book — ${room?.name}`}>
      <div className="flex flex-col gap-4">
        {/* Room summary */}
        <div className="bg-gray-50 rounded-lg px-4 py-3 flex justify-between items-center">
          <span className="text-sm text-gray-600">Price per night</span>
          <span className="font-semibold text-gray-900">
            ${parseFloat(room?.price_per_night).toFixed(2)}
          </span>
        </div>

        {/* Date pickers */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Check-in
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                // Reset end date if it's before new start
                if (endDate && date >= endDate) setEndDate(null);
                setError("");
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              placeholderText="Select date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              dateFormat="MMM d, yyyy"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Check-out
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                setError("");
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={
                startDate
                  ? new Date(startDate.getTime() + 86400000)
                  : new Date()
              }
              placeholderText="Select date"
              disabled={!startDate}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                disabled:bg-gray-100 disabled:cursor-not-allowed"
              dateFormat="MMM d, yyyy"
            />
          </div>
        </div>

        {/* Price summary */}
        {nights > 0 && (
          <div className="bg-blue-50 rounded-lg px-4 py-3 flex flex-col gap-1">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                ${parseFloat(room?.price_per_night).toFixed(2)} × {nights} night
                {nights > 1 ? "s" : ""}
              </span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 pt-1 border-t border-blue-100 mt-1">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-1">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button className="flex-1" loading={loading} onClick={handleSubmit}>
            Confirm Booking
          </Button>
        </div>
      </div>
    </Modal>
  );
}
