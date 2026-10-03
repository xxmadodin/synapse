"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  CheckCircle2,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { BookingRecord } from "@/types/vehicle";

interface ActiveBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onCancelBooking: (id: string) => void;
  onSelectBookingReceipt: (booking: BookingRecord) => void;
}

export default function ActiveBookingsModal({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onSelectBookingReceipt,
}: ActiveBookingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                My Campus Bookings
              </h3>
              <p className="text-xs text-slate-400">
                {bookings.length} active reservation{bookings.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {bookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Ticket className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-700">No active bookings yet</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our catalog of scooters, bikes, and cars to book your first campus rental!
              </p>
            </div>
          ) : (
            bookings.map((b) => (
              <BookingCardItem
                key={b.id}
                booking={b}
                onSelectBookingReceipt={onSelectBookingReceipt}
                onCancelBooking={onCancelBooking}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            24x7 Partner Vendor Dispatch
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

function BookingCardItem({
  booking,
  onSelectBookingReceipt,
  onCancelBooking,
}: {
  booking: BookingRecord;
  onSelectBookingReceipt: (b: BookingRecord) => void;
  onCancelBooking: (id: string) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 transition-all hover:border-emerald-400 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      <div className="flex items-center gap-3.5">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 flex items-center justify-center">
          {!imgError ? (
            <Image
              src={booking.vehicleImage}
              alt={booking.vehicleName}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-[10px] font-black text-emerald-700">IIML</span>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black text-emerald-700">
              {booking.id}
            </span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {booking.status}
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">{booking.vehicleName}</h4>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-600" />
            {booking.pickupLocation}
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-600" />
            {booking.pickupDateTime} ({booking.durationHours} hrs)
          </p>
        </div>
      </div>

      <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
        <div className="text-left sm:text-right">
          <span className="text-xs text-slate-400">Total Rent</span>
          <p className="text-base font-black text-slate-900">₹{booking.totalRent}</p>
          <p className="text-[10px] text-amber-700 font-semibold">+₹{booking.securityDeposit} deposit</p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSelectBookingReceipt(booking)}
            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            View Pass
          </button>
          <button
            onClick={() => {
              if (confirm(`Cancel reservation for ${booking.vehicleName}?`)) {
                onCancelBooking(booking.id);
              }
            }}
            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Cancel Booking"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

