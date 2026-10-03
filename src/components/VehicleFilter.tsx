"use client";

import React from "react";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { FilterState, VehicleCategory } from "@/types/vehicle";

interface VehicleFilterProps {
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalCount: number;
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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Search Bar & Sorting */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by vehicle (e.g. Activa, Hunter, Swift)..."
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Quick Stats & Controls */}
        <div className="w-full md:w-auto flex flex-wrap items-center justify-between md:justify-end gap-2.5">
          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-slate-900">{totalCount}</strong> verified options
          </span>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500">Sort:</span>
            <select
              value={filter.sortBy}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as FilterState["sortBy"],
                })
              }
              className="h-9 px-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="popular">Campus Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated Vendor</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Filter Row: Fuel Type & Transmission Pills */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            Fuel:
          </span>
          {["all", "petrol", "electric", "diesel"].map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange({ fuelType: f })}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                filter.fuelType === f
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f === "all" ? "All Fuels" : f}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Gearbox:
          </span>
          {["all", "automatic", "manual"].map((t) => (
            <button
              key={t}
              onClick={() => onFilterChange({ transmission: t })}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                filter.transmission === t
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t === "all" ? "All Gears" : t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
