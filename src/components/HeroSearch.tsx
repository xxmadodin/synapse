"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Bike,
  Car,
  Zap,
  ArrowRight,
} from "lucide-react";
import { CAMPUS_LOCATIONS, CAMPUS_STATS } from "@/data/mockVehicles";
import { VehicleCategory, CampusLocation } from "@/types/vehicle";

interface HeroSearchProps {
  selectedCategory: VehicleCategory;
  onSelectCategory: (cat: VehicleCategory) => void;
  onSearchSubmit: (params: {
    category: VehicleCategory;
    location: CampusLocation;
    duration: string;
    pickupTime: string;
  }) => void;
}

export default function HeroSearch({
  selectedCategory,
  onSelectCategory,
  onSearchSubmit,
}: HeroSearchProps) {
  const [location, setLocation] = useState<CampusLocation>(CAMPUS_LOCATIONS[0]);
  const [duration, setDuration] = useState<string>("24 Hours (Full Day)");
  const [pickupDate, setPickupDate] = useState<string>("Today, 06:00 PM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      category: selectedCategory,
      location,
      duration,
      pickupTime: pickupDate,
    });
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Accent Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Campus Header Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            Exclusively for IIM Lucknow Students & Faculty
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Zero Security Ransom • Verified Local Vendors
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-5">
            Campus Mobility, <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Engineered for Helions.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Rent scooters, highway roadsters, and cars with pre-negotiated student tariffs. Handover in 15 minutes at <strong className="text-white">Gate 1, Gate 2, or your Hostel Quad</strong>.
          </p>
        </div>

        {/* Interactive Search Box */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl border border-white/20 text-slate-900">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 mb-6 border-b border-slate-100 pb-4 overflow-x-auto">
            <button
              type="button"
              onClick={() => onSelectCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              All Vehicles
            </button>
            <button
              type="button"
              onClick={() => onSelectCategory("scooter")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === "scooter"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Zap className="w-4 h-4" />
              Scooters (Activa / Ather)
            </button>
            <button
              type="button"
              onClick={() => onSelectCategory("bike")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === "bike"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Bike className="w-4 h-4" />
              Motorcycles (Hunter / Classic)
            </button>
            <button
              type="button"
              onClick={() => onSelectCategory("car")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === "car"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Car className="w-4 h-4" />
              Cars (Swift / Thar)
            </button>
          </div>

          {/* Form Controls */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            {/* Campus Drop Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Delivery Spot
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value as CampusLocation)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              >
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Pickup Date & Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Pickup Window
              </label>
              <select
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              >
                <option value="Today, 06:00 PM">Today, 06:00 PM (Evening Run)</option>
                <option value="Today, 09:00 PM">Today, 09:00 PM (Late Night Drive)</option>
                <option value="Tomorrow, 08:00 AM">Tomorrow, 08:00 AM (Early Trip)</option>
                <option value="This Friday, 05:00 PM">This Friday, 05:00 PM (Weekend Getaway)</option>
                <option value="This Saturday, 07:00 AM">This Saturday, 07:00 AM (Ayodhya Roadtrip)</option>
              </select>
            </div>

            {/* Duration Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              >
                <option value="4 Hours">4 Hours (Quick City Errands)</option>
                <option value="8 Hours">8 Hours (Full Evening Outing)</option>
                <option value="24 Hours (Full Day)">24 Hours (1 Full Day)</option>
                <option value="48 Hours (Weekend)">48 Hours (Full Weekend)</option>
                <option value="72 Hours (3 Days)">72 Hours (Long Weekend)</option>
              </select>
            </div>

            {/* Search Submit CTA */}
            <div>
              <button
                type="submit"
                className="w-full h-11 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all active:scale-98 cursor-pointer"
              >
                <span>Find Vehicles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

          {/* Quick Micro-USPs */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Doorstep Delivery inside Campus Gates
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              2 Sanitized ISI Helmets with 2-Wheelers
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              No Original College ID Retention
            </span>
            <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Use Code: IIMLFIRST (₹50 Off)
            </span>
          </div>

        </div>

        {/* Campus Metrics Strip */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {CAMPUS_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 backdrop-blur-xs"
            >
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
