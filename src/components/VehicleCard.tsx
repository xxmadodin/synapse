"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Fuel,
  Gauge,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
  Info,
  Bike,
  Car,
  ImageOff,
} from "lucide-react";
import { Vehicle } from "@/types/vehicle";

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  onBook: (vehicle: Vehicle) => void;
}

export default function VehicleCard({
  vehicle,
  onSelect,
  onBook,
}: VehicleCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Vehicle Media Header */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
        {!imgError ? (
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={false}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
              {vehicle.category === "car" ? (
                <Car className="w-6 h-6" />
              ) : (
                <Bike className="w-6 h-6" />
              )}
            </div>
            <span className="text-xs font-black text-white">{vehicle.name}</span>
            <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
              Place {vehicle.image.split("/").pop()} in public/vehicles/
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {vehicle.badge && (
            <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-600 text-white rounded-lg shadow-sm">
              {vehicle.badge}
            </span>
          )}
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-md rounded-lg">
            {vehicle.category}
          </span>
        </div>

        {/* Availability Pill */}
        <div className="absolute top-3 right-3">
          {vehicle.available ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-300 rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Reserved Today
            </span>
          )}
        </div>

        {/* Bottom Vendor Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="font-semibold text-slate-100 drop-shadow-sm truncate max-w-[65%]">
            {vehicle.vendor.name}
          </span>
          <span className="flex items-center gap-1 bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded-md font-black text-[11px] shadow-xs">
            <Star className="w-3 h-3 fill-slate-950" />
            {vehicle.vendor.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Title & Subtitle */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {vehicle.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium line-clamp-1">
                {vehicle.subtitle}
              </p>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-slate-600">
            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
              <Fuel className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] text-slate-400 font-semibold uppercase leading-none">Fuel</p>
                <p className="text-xs font-bold text-slate-800 capitalize leading-tight">{vehicle.fuelType}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
              <Gauge className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] text-slate-400 font-semibold uppercase leading-none">Mileage</p>
                <p className="text-xs font-bold text-slate-800 leading-tight">{vehicle.mileageOrRange}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-100">
              <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <div className="truncate">
                <p className="text-[10px] text-slate-400 font-semibold uppercase leading-none">Capacity</p>
                <p className="text-xs font-bold text-slate-800 leading-tight">{vehicle.seats} Seater</p>
              </div>
            </div>
          </div>

          {/* Quick Feature Perks */}
          <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{vehicle.features[0]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{vehicle.features[1]}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Booking Footer */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">
                  ₹{vehicle.dailyRate}
                </span>
                <span className="text-xs font-semibold text-slate-500">/ day</span>
              </div>
              <p className="text-[11px] font-semibold text-emerald-700">
                ₹{vehicle.hourlyRate}/hr (Min. 4 hrs)
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Deposit</p>
              <p className="text-xs font-bold text-slate-700">
                ₹{vehicle.securityDeposit} <span className="text-[10px] font-normal text-slate-500">(100% Refundable)</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSelect(vehicle)}
              className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Full Details</span>
            </button>

            <button
              type="button"
              disabled={!vehicle.available}
              onClick={() => onBook(vehicle)}
              className={`w-full py-2.5 px-3 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                vehicle.available
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white active:scale-98"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>{vehicle.available ? "Book Now" : "Reserved"}</span>
              {vehicle.available && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
