"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  Tag,
  CreditCard,
  User,
  Mail,
  Phone,
  FileText,
  Sparkles,
} from "lucide-react";
import { Vehicle, CampusLocation, BookingRecord, BookingAddOns } from "@/types/vehicle";
import { CAMPUS_LOCATIONS } from "@/data/mockVehicles";

interface BookingModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBookingSuccess: (booking: BookingRecord) => void;
}

export default function BookingModal({
  vehicle,
  onClose,
  onBookingSuccess,
}: BookingModalProps) {
  // Form State
  const [studentName, setStudentName] = useState("Devansh Prajapati");
  const [studentEmail, setStudentEmail] = useState("devansh.pgp42@iiml.ac.in");
  const [studentRollNo, setStudentRollNo] = useState("PGP42297");
  const [studentPhone, setStudentPhone] = useState("+91 98765 43210");
  const [drivingLicenseNo, setDrivingLicenseNo] = useState("UP32 2023 0089123");
  const [pickupLocation, setPickupLocation] = useState<CampusLocation>(CAMPUS_LOCATIONS[0]);
  
  // Trip duration state
  const [durationHours, setDurationHours] = useState<number>(24);
  const [pickupTime, setPickupTime] = useState<string>("Today, 06:00 PM");

  // Add-ons
  const [addOns, setAddOns] = useState<BookingAddOns>({
    extraHelmet: true,
    zeroDepInsurance: true,
    phoneMount: true,
  });

  // Promo code
  const [promoCode, setPromoCode] = useState("IIMLFIRST");
  const [promoApplied, setPromoApplied] = useState(true);

  const [imgError, setImgError] = useState(false);

  if (!vehicle) return null;

  // Cost Calculations
  // If duration >= 24h, compute days * dailyRate
  const days = Math.ceil(durationHours / 24);
  const basePrice =
    durationHours >= 24
      ? days * vehicle.dailyRate
      : durationHours * vehicle.hourlyRate;

  const extraHelmetCost = addOns.extraHelmet ? 50 : 0;
  const zeroDepCost = addOns.zeroDepInsurance ? (durationHours >= 24 ? 99 * days : 59) : 0;
  const addOnTotal = extraHelmetCost + zeroDepCost;

  const discount = promoApplied ? 50 : 0;
  const taxableAmount = Math.max(0, basePrice + addOnTotal - discount);
  const gst = Math.round(taxableAmount * 0.05); // 5% GST
  const totalRent = taxableAmount + gst;
  const securityDeposit = vehicle.securityDeposit;
  const totalPayableNow = totalRent + securityDeposit;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "IIMLFIRST") {
      setPromoApplied(true);
    } else {
      alert("Invalid code. Try 'IIMLFIRST' for ₹50 off!");
      setPromoApplied(false);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentName.trim() || !studentRollNo.trim() || !drivingLicenseNo.trim()) {
      alert("Please fill in your name, IIML roll number, and driving license.");
      return;
    }

    const bookingId = `IIML-2026-BK${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRecord = {
      id: bookingId,
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      vehicleCategory: vehicle.category,
      vehicleImage: vehicle.image,
      studentName,
      studentEmail,
      studentRollNo,
      studentPhone,
      drivingLicenseNo,
      pickupLocation,
      pickupDateTime: pickupTime,
      returnDateTime: `+${durationHours} hours after handover`,
      durationHours,
      addOns,
      promoCode: promoApplied ? promoCode : undefined,
      basePrice,
      addOnPrice: addOnTotal,
      gst,
      securityDeposit,
      discount,
      totalRent,
      totalPayableNow,
      status: "confirmed",
      createdAt: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }),
      vendor: vehicle.vendor,
    };

    onBookingSuccess(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 flex items-center justify-center">
              {!imgError ? (
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="text-[10px] font-black text-emerald-400">IIML</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  {vehicle.name}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 px-2 py-0.5 rounded text-white">
                  {vehicle.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Vendor: {vehicle.vendor.name} • Handover inside IIM Lucknow
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleConfirmBooking} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Step 1: Campus Handover Details */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                1. Campus Pickup Spot & Timing
              </h4>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Free Campus Doorstep Drop
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1 space-y-1">
                <label className="text-xs font-semibold text-slate-600">
                  Campus Handover Point
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value as CampusLocation)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">
                  Pickup Slot
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Today, 06:00 PM">Today, 06:00 PM</option>
                  <option value="Today, 09:00 PM">Today, 09:00 PM</option>
                  <option value="Tomorrow, 08:00 AM">Tomorrow, 08:00 AM</option>
                  <option value="This Friday, 05:00 PM">This Friday, 05:00 PM</option>
                  <option value="This Saturday, 07:00 AM">This Saturday, 07:00 AM</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">
                  Duration
                </label>
                <select
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={4}>4 Hours (₹{vehicle.hourlyRate * 4})</option>
                  <option value={8}>8 Hours (₹{vehicle.hourlyRate * 8})</option>
                  <option value={24}>24 Hours (Full Day - ₹{vehicle.dailyRate})</option>
                  <option value={48}>48 Hours (Weekend - ₹{vehicle.dailyRate * 2})</option>
                  <option value={72}>72 Hours (3 Days - ₹{vehicle.dailyRate * 3})</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Student Identification */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                2. Student Verification Details
              </h4>
              <span className="text-[11px] text-slate-500">
                Exclusive student rates verified via Roll No.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Devansh Prajapati"
                    className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">IIM Lucknow Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="student.pgp42@iiml.ac.in"
                    className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">IIML Roll Number / Batch</label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={studentRollNo}
                    onChange={(e) => setStudentRollNo(e.target.value)}
                    placeholder="e.g. PGP42297"
                    className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Driving License Number</label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={drivingLicenseNo}
                    onChange={(e) => setDrivingLicenseNo(e.target.value)}
                    placeholder="e.g. UP32 2023 0089123"
                    className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Student Add-ons */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              3. Ride Add-ons
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  addOns.extraHelmet
                    ? "border-emerald-500 bg-emerald-50/60"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-bold text-slate-800">
                    2nd Pillion Helmet
                  </div>
                  <input
                    type="checkbox"
                    checked={addOns.extraHelmet}
                    onChange={(e) =>
                      setAddOns({ ...addOns, extraHelmet: e.target.checked })
                    }
                    className="accent-emerald-600 w-4 h-4 rounded mt-0.5"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  1 driver helmet is free. Add 1 sanitized ISI helmet for pillion.
                </p>
                <span className="text-xs font-black text-slate-800 mt-2">
                  +₹50 Flat
                </span>
              </label>

              <label
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  addOns.zeroDepInsurance
                    ? "border-emerald-500 bg-emerald-50/60"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-bold text-slate-800">
                    Zero-Dep Damage Cover
                  </div>
                  <input
                    type="checkbox"
                    checked={addOns.zeroDepInsurance}
                    onChange={(e) =>
                      setAddOns({ ...addOns, zeroDepInsurance: e.target.checked })
                    }
                    className="accent-emerald-600 w-4 h-4 rounded mt-0.5"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Zero liability on minor scratches during campus/city runs.
                </p>
                <span className="text-xs font-black text-slate-800 mt-2">
                  +₹{durationHours >= 24 ? 99 * days : 59}
                </span>
              </label>

              <label
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  addOns.phoneMount
                    ? "border-emerald-500 bg-emerald-50/60"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-bold text-slate-800">
                    Phone Handlebar Mount
                  </div>
                  <input
                    type="checkbox"
                    checked={addOns.phoneMount}
                    onChange={(e) =>
                      setAddOns({ ...addOns, phoneMount: e.target.checked })
                    }
                    className="accent-emerald-600 w-4 h-4 rounded mt-0.5"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Sturdy vibration-damped mount for Google Maps navigation.
                </p>
                <span className="text-xs font-bold text-emerald-700 mt-2">
                  FREE
                </span>
              </label>
            </div>
          </div>

          {/* Step 4: Transparent Cost Breakdown */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Transparent Tariff Breakdown
              </h4>
              <span className="text-[11px] font-semibold text-emerald-700">
                100% Refundable Deposit Included
              </span>
            </div>

            {/* Promo Code Entry */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter Promo Code"
                  className="w-full h-8 pl-8 pr-2 text-xs bg-white border border-slate-200 rounded-lg uppercase font-bold text-slate-800"
                />
              </div>
              <button
                type="button"
                onClick={handleApplyPromo}
                className="h-8 px-3 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                {promoApplied ? "Applied ✓" : "Apply"}
              </button>
            </div>

            {/* Line items */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Rental ({durationHours} hours)</span>
                <span className="font-semibold text-slate-800">₹{basePrice}</span>
              </div>

              {addOnTotal > 0 && (
                <div className="flex justify-between">
                  <span>Selected Add-ons (Helmet / Cover)</span>
                  <span className="font-semibold text-slate-800">+₹{addOnTotal}</span>
                </div>
              )}

              {promoApplied && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>IIM Lucknow Student Welcome Discount (IIMLFIRST)</span>
                  <span className="font-bold">-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Applicable GST (5%)</span>
                <span className="font-semibold text-slate-800">₹{gst}</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="font-semibold text-slate-800">Total Vehicle Rent</span>
                <span className="font-bold text-slate-900">₹{totalRent}</span>
              </div>

              <div className="flex justify-between text-amber-800 bg-amber-50/80 px-2.5 py-1.5 rounded-lg border border-amber-200/80">
                <span>Security Deposit (Refunded instantly upon handover)</span>
                <span className="font-bold">+₹{securityDeposit}</span>
              </div>
            </div>

            {/* Total Payable Now */}
            <div className="mt-4 pt-3 border-t-2 border-slate-200 flex items-baseline justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Total Payable at Handover
                </p>
                <p className="text-[11px] text-slate-400">
                  Pay via UPI / Card when vehicle arrives at campus
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  ₹{totalPayableNow}
                </span>
                <p className="text-[10px] text-emerald-700 font-semibold">
                  (Includes ₹{securityDeposit} deposit)
                </p>
              </div>
            </div>
          </div>

          {/* Guaranteed Handover Banner */}
          <div className="bg-slate-100 p-3 rounded-2xl flex items-center gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Your vehicle will be delivered to <strong>{pickupLocation}</strong>. The vendor will call 15 minutes before arrival.
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <span>Confirm Campus Booking</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
