"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { FilterState, VehicleCategory } from "@/types/vehicle";

interface VehicleFilterProps {
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalCount: number;
}

const CATEGORIES: { id: VehicleCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "scooter", label: "Scooters" },
  { id: "bike", label: "Motorcycles" },
  { id: "car", label: "Cars" },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-8 px-3 text-[13px] rounded-full border capitalize transition-colors cursor-pointer ${
        active
          ? "bg-ink border-ink text-paper"
          : "bg-surface border-line text-ink-soft hover:border-ink/30"
      }`}
    >
      {children}
    </button>
  );
}

export default function VehicleFilter({
  filter,
  onFilterChange,
  onResetFilters,
  totalCount,
}: VehicleFilterProps) {
  const isFiltered =
    filter.category !== "all" ||
    filter.fuelType !== "all" ||
    filter.transmission !== "all" ||
    filter.searchQuery.trim() !== "" ||
    filter.sortBy !== "popular";

  return (
    <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-paper/90 backdrop-blur-md border-b border-line">
      {/* Row 1: categories + search + sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar -mb-px">
          {CATEGORIES.map((cat) => {
            const active = filter.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ category: cat.id })}
                className={`pb-3 text-[15px] whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  active
                    ? "border-ink text-ink font-medium"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pb-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Activa, Hunter, Thar…"
              value={filter.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              className="w-full h-9 pl-9 pr-3 text-sm bg-surface border border-line rounded-full focus:outline-none focus:border-ink/40 text-ink placeholder:text-muted"
            />
          </div>
          <select
            value={filter.sortBy}
            onChange={(e) =>
              onFilterChange({ sortBy: e.target.value as FilterState["sortBy"] })
            }
            className="h-9 pl-3 pr-8 text-sm bg-surface border border-line rounded-full text-ink focus:outline-none focus:border-ink/40 cursor-pointer field-select bg-position-[right_0.75rem_center]"
            aria-label="Sort vehicles"
          >
            <option value="popular">Recommended</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      {/* Row 2: chips */}
      <div className="flex items-center gap-2 py-3 border-t border-line overflow-x-auto no-scrollbar">
        {(["petrol", "electric", "diesel"] as const).map((f) => (
          <Chip
            key={f}
            active={filter.fuelType === f}
            onClick={() =>
              onFilterChange({ fuelType: filter.fuelType === f ? "all" : f })
            }
          >
            {f}
          </Chip>
        ))}
        <span className="w-px h-5 bg-line mx-1 shrink-0" />
        {(["automatic", "manual"] as const).map((t) => (
          <Chip
            key={t}
            active={filter.transmission === t}
            onClick={() =>
              onFilterChange({
                transmission: filter.transmission === t ? "all" : t,
              })
            }
          >
            {t}
          </Chip>
        ))}

        <div className="ml-auto flex items-center gap-3 pl-3 shrink-0">
          <span className="text-[13px] text-muted whitespace-nowrap tabular-nums">
            {totalCount} {totalCount === 1 ? "vehicle" : "vehicles"}
          </span>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-[13px] text-ink underline underline-offset-4 decoration-line hover:decoration-ink cursor-pointer whitespace-nowrap"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
