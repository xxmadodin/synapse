"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Fuel,
  Gauge,
  Users,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Star,
  ArrowRight,
} from "lucide-react";
import { Vehicle } from "@/types/vehicle";

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBook: (vehicle: Vehicle) => void;
}

export default function VehicleModal({
  vehicle,
  onClose,
  onBook,
}: VehicleModalProps) {
  const [imgError, setImgError] = useState(false);

  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Vehicle Header Photo Banner */}
        <div className="relative aspect-16/9 w-full bg-slate-900 shrink-0">
          {!imgError ? (
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-sm font-black text-white">{vehicle.name}</span>
              <span className="text-xs text-slate-400 mt-1">
                Place {vehicle.image.split("/").pop()} in public/vehicles/
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

          {/* Overlay Info */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              {vehicle.badge && (
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-md">
                  {vehicle.badge}
                </span>
              )}
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md rounded-md">
                {vehicle.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {vehicle.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {vehicle.subtitle}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Overview Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {vehicle.description}
          </p>

          {/* Key Specifications Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Technical Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <Fuel className="w-4 h-4 text-emerald-600 mb-1" />
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Fuel Type</p>
                <p className="text-xs font-bold text-slate-800 capitalize">{vehicle.fuelType}</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <Gauge className="w-4 h-4 text-emerald-600 mb-1" />
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Mileage / Range</p>
                <p className="text-xs font-bold text-slate-800">{vehicle.mileageOrRange}</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <Settings className="w-4 h-4 text-emerald-600 mb-1" />
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Gearbox</p>
                <p className="text-xs font-bold text-slate-800 capitalize">{vehicle.transmission}</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <Users className="w-4 h-4 text-emerald-600 mb-1" />
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Engine / Power</p>
                <p className="text-xs font-bold text-slate-800">{vehicle.engineCc}</p>
              </div>
            </div>
          </div>

          {/* Included Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Included with Every Campus Rental
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vehicle.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{vehicle.freeKmsPerDay} km Free per day (₹{vehicle.extraKmRate}/km extra)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Doorstep Drop at Gate 1, 2 or Hostel Quad</span>
              </div>
            </div>
          </div>

          {/* Partner Vendor Details */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900">
                  {vehicle.vendor.name}
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {vehicle.vendor.rating}
                </span>
                <span className="text-[11px] text-slate-500">
                  ({vehicle.vendor.totalTrips} verified trips)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {vehicle.vendor.locationArea} • Average campus delivery {vehicle.vendor.responseTime}
              </p>
            </div>
            <a
              href={`tel:${vehicle.vendor.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call Partner Desk</span>
            </a>
          </div>

          {/* Campus Student Protection Notice */}
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">IIM Lucknow Student Trust Guarantee:</strong>
              <p className="text-emerald-800/90 mt-0.5">
                No physical original ID retention. The vendor only inspects your Driving License and IIML Roll No on delivery. Refundable deposit of ₹{vehicle.securityDeposit} is instantly credited upon handover.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer with Pricing & Book Action */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                ₹{vehicle.dailyRate}
              </span>
              <span className="text-xs font-semibold text-slate-500">/ 24 hrs</span>
            </div>
            <p className="text-xs font-semibold text-emerald-700">
              or ₹{vehicle.hourlyRate}/hour (Min 4 hrs)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={!vehicle.available}
              onClick={() => {
                onClose();
                onBook(vehicle);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                vehicle.available
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white active:scale-98"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
            >
              <span>{vehicle.available ? "Book for Campus Delivery" : "Unavailable"}</span>
              {vehicle.available && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
