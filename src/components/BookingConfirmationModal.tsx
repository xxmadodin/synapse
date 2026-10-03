"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Copy,
  Printer,
  Share2,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  X,
  FileCheck,
  Check,
} from "lucide-react";
import { BookingRecord } from "@/types/vehicle";

interface BookingConfirmationModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
  onViewAllBookings: () => void;
}

export default function BookingConfirmationModal({
  booking,
  onClose,
  onViewAllBookings,
}: BookingConfirmationModalProps) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!booking) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(booking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 bg-emerald-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200" />
            <span className="font-extrabold text-sm tracking-tight">
              Booking Confirmed • IIM Lucknow Delivery
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Ready for Campus Handover!
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your ride is reserved. Our partner vendor executive has been dispatched for campus gate delivery.
            </p>
          </div>

          {/* Boarding Pass Style Card */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-4 sm:p-5 relative">
            {/* Booking Ref */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Booking Reference ID
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black font-mono text-emerald-700">
                    {booking.id}
                  </span>
                  <button
                    onClick={handleCopyId}
                    className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    title="Copy Reference"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Confirmed
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">{booking.createdAt}</p>
              </div>
            </div>

            {/* Vehicle & Student Snapshot */}
            <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 flex items-center justify-center">
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
                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-tight">
                    {booking.vehicleName}
                  </h4>
                  <p className="text-xs text-slate-500 capitalize">{booking.vehicleCategory}</p>
                  <p className="text-xs font-bold text-emerald-700 mt-1">
                    {booking.durationHours} Hours Rental
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Student:</span>{" "}
                  <strong className="text-slate-800">{booking.studentName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Roll No:</span>{" "}
                  <strong className="text-slate-800 font-mono">{booking.studentRollNo}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Contact:</span>{" "}
                  <span className="text-slate-700">{booking.studentPhone}</span>
                </div>
              </div>
            </div>

            {/* Location & Time */}
            <div className="py-3.5 grid grid-cols-2 gap-3 text-xs border-b border-slate-200">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  Delivery Spot
                </p>
                <p className="font-bold text-slate-800 mt-0.5">{booking.pickupLocation}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  Pickup Slot
                </p>
                <p className="font-bold text-slate-800 mt-0.5">{booking.pickupDateTime}</p>
              </div>
            </div>

            {/* Tariff Totals */}
            <div className="pt-3 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500">Rent Paid:</span>{" "}
                <strong className="text-slate-900 font-black">₹{booking.totalRent}</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-500">Refundable Deposit:</span>{" "}
                <strong className="text-amber-800 font-black">₹{booking.securityDeposit}</strong>
              </div>
            </div>
          </div>

          {/* Vendor Contact Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Assigned Vendor Hub</p>
              <h5 className="text-sm font-bold text-slate-900">{booking.vendor.name}</h5>
              <p className="text-xs text-slate-500">{booking.vendor.locationArea}</p>
            </div>
            <a
              href={`tel:${booking.vendor.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Driver</span>
            </a>
          </div>

          {/* Campus Handover Checklist */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2 text-xs text-emerald-900">
            <h5 className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Quick Handover Checklist
            </h5>
            <ul className="space-y-1 text-emerald-800 list-disc list-inside">
              <li>Keep your physical driving license and IIML student ID card handy.</li>
              <li>Inspect fuel level & record a quick 20-second video of the vehicle condition.</li>
              <li>Your ₹{booking.securityDeposit} deposit is instantly refunded upon return.</li>
            </ul>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Hey, I just booked ${booking.vehicleName} on IIML Wheels! Booking Ref: ${booking.id}. Handover at ${booking.pickupLocation}.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onViewAllBookings();
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              View in My Bookings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
