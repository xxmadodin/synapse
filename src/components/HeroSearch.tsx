"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
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

const CATEGORY_OPTIONS: { value: VehicleCategory; label: string }[] = [
  { value: "all", label: "Anything" },
  { value: "scooter", label: "Scooter" },
  { value: "bike", label: "Motorcycle" },
  { value: "car", label: "Car" },
];

const PICKUP_OPTIONS = [
  { value: "Today, 06:00 PM", label: "Today, 6:00 PM" },
  { value: "Today, 09:00 PM", label: "Today, 9:00 PM" },
  { value: "Tomorrow, 08:00 AM", label: "Tomorrow, 8:00 AM" },
  { value: "This Friday, 05:00 PM", label: "Friday, 5:00 PM" },
  { value: "This Saturday, 07:00 AM", label: "Saturday, 7:00 AM" },
];

const DURATION_OPTIONS = [
  { value: "4 Hours", label: "4 hours" },
  { value: "8 Hours", label: "8 hours" },
  { value: "24 Hours (Full Day)", label: "1 day" },
  { value: "48 Hours (Weekend)", label: "2 days" },
  { value: "72 Hours (3 Days)", label: "3 days" },
];

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-0.5 px-5 py-3 min-w-0 ${className}`}>
      <span className="text-[11px] font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

const selectCls =
  "field-select w-full bg-transparent text-[15px] font-medium text-ink focus:outline-none cursor-pointer truncate";

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
    <section id="hero" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
      {/* Photo banner */}
      <div className="relative h-[460px] sm:h-[520px] rounded-3xl overflow-hidden bg-ink">
        <Image
          src="/photos/ladakh-ride.jpg"
          alt="A Royal Enfield parked on an open mountain road in Ladakh"
          fill
          preload
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-[60%_55%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12 pb-20 sm:pb-24">
          <p className="text-sm text-white/80 mb-3">
            For IIM Lucknow students, faculty &amp; MDP guests
          </p>
          <h1 className="max-w-2xl text-4xl sm:text-5xl lg:text-[64px] font-semibold tracking-[-0.03em] leading-[1.02] text-white">
            Pick a ride. We&apos;ll have it at the gate in 45&nbsp;minutes.
          </h1>
          <p className="mt-4 max-w-lg text-base sm:text-lg text-white/80 leading-relaxed">
            Scooters, bikes and cars from verified Lucknow vendors. Student rates, no ID kept, deposit back on UPI.
          </p>
        </div>
      </div>

      {/* Search bar, overlapping the photo */}
      <form
        onSubmit={handleSubmit}
        className="relative -mt-10 mx-2 sm:mx-6 lg:mx-12 bg-surface rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)] border border-line grid grid-cols-2 lg:grid-cols-[1fr_1.4fr_1.1fr_0.9fr_auto] items-center divide-line lg:divide-x"
      >
        <Field label="Vehicle" className="border-b border-r lg:border-0 border-line">
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value as VehicleCategory)}
            className={selectCls}
          >
            {CATEGORY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Pickup point" className="border-b lg:border-0 border-line">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value as CampusLocation)}
            className={selectCls}
          >
            {CAMPUS_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </Field>

        <Field label="When" className="border-r lg:border-0 border-line">
          <select
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className={selectCls}
          >
            {PICKUP_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="For">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={selectCls}
          >
            {DURATION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="col-span-2 lg:col-span-1 p-2 border-t lg:border-0 border-line">
          <button
            type="submit"
            className="w-full lg:w-auto h-12 px-6 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white text-[15px] font-medium rounded-xl transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" strokeWidth={2.25} />
            Search
          </button>
        </div>
      </form>

      {/* Proof points */}
      <dl className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-5 md:divide-x divide-line">
        {CAMPUS_STATS.map((stat) => (
          <div key={stat.label} className="md:px-8 first:md:pl-0">
            <dt className="text-[13px] text-muted">{stat.label}</dt>
            <dd className="text-2xl font-semibold tracking-tight text-ink tabular-nums">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
