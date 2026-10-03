"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Bike, Car } from "lucide-react";
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

  const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
  const specs = [
    cap(vehicle.fuelType),
    cap(vehicle.transmission),
    vehicle.mileageOrRange,
    vehicle.category === "car" ? `${vehicle.seats} seats` : null,
  ].filter(Boolean);

  return (
    <article className="group flex flex-col">
      {/* Photo */}
      <button
        type="button"
        onClick={() => onSelect(vehicle)}
        className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#e9e6df] cursor-pointer"
        aria-label={`View details for ${vehicle.name}`}
      >
        {!imgError ? (
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className={`${vehicle.imageFit === "contain" ? "object-contain bg-black" : "object-cover"} transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
              vehicle.available ? "" : "grayscale-[60%] opacity-80"
            }`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-muted">
            {vehicle.category === "car" ? (
              <Car className="w-10 h-10" strokeWidth={1.25} />
            ) : (
              <Bike className="w-10 h-10" strokeWidth={1.25} />
            )}
          </div>
        )}

        {vehicle.available ? (
          vehicle.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium text-ink bg-surface/95 rounded-full shadow-sm">
              {vehicle.badge}
            </span>
          )
        ) : (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium text-white bg-ink/85 rounded-full">
            Booked for today
          </span>
        )}
      </button>

      {/* Details */}
      <div className="pt-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelect(vehicle)}
            className="text-left text-[17px] font-semibold tracking-tight text-ink leading-snug hover:underline underline-offset-4 decoration-1 cursor-pointer"
          >
            {vehicle.name}
          </button>
          <span className="shrink-0 inline-flex items-center gap-1 text-sm text-ink tabular-nums pt-0.5">
            <Star className="w-3.5 h-3.5 fill-ink" strokeWidth={0} />
            {vehicle.vendor.rating.toFixed(1)}
          </span>
        </div>

        <p className="mt-1 text-sm text-muted">
          {specs.join(" · ")}
        </p>
        <p className="mt-0.5 text-sm text-muted">
          {vehicle.vendor.name} · {vehicle.vendor.responseTime.replace("<", "under")}
        </p>

        <div className="mt-4 pt-4 border-t border-line flex items-end justify-between gap-3">
          <div>
            <p className="text-ink">
              <span className="text-xl font-semibold tracking-tight tabular-nums">
                ₹{vehicle.dailyRate.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-muted"> / day</span>
            </p>
            <p className="text-[13px] text-muted tabular-nums">
              or ₹{vehicle.hourlyRate}/hr · ₹{vehicle.securityDeposit.toLocaleString("en-IN")} refundable deposit
            </p>
          </div>

          <button
            type="button"
            disabled={!vehicle.available}
            onClick={() => onBook(vehicle)}
            className={`shrink-0 h-10 px-4 text-sm font-medium rounded-full transition-colors ${
              vehicle.available
                ? "bg-ink text-paper hover:bg-accent cursor-pointer"
                : "bg-line text-muted cursor-not-allowed"
            }`}
          >
            {vehicle.available ? "Book" : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}
