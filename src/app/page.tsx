"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSearch from "@/components/HeroSearch";
import VehicleFilter from "@/components/VehicleFilter";
import VehicleCard from "@/components/VehicleCard";
import VehicleModal from "@/components/VehicleModal";
import BookingModal from "@/components/BookingModal";
import BookingConfirmationModal from "@/components/BookingConfirmationModal";
import ActiveBookingsModal from "@/components/ActiveBookingsModal";
import CampusGuideSection from "@/components/CampusGuideSection";
import ArchitectureModal from "@/components/ArchitectureModal";
import Footer from "@/components/Footer";

import { MOCK_VEHICLES, INITIAL_BOOKINGS } from "@/data/mockVehicles";
import {
  Vehicle,
  VehicleCategory,
  FilterState,
  BookingRecord,
  CampusLocation,
} from "@/types/vehicle";
import {
  ShieldCheck,
  Zap,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Headphones,
} from "lucide-react";

export default function HomePage() {
  // Master Vehicles & Bookings State
  const [vehicles] = useState<Vehicle[]>(MOCK_VEHICLES);
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
    category: "all",
    fuelType: "all",
    transmission: "all",
    sortBy: "popular",
    maxPrice: 5000,
    searchQuery: "",
  });

  // Modal Controllers
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [showBookingsModal, setShowBookingsModal] = useState<boolean>(false);
  const [showArchitectureModal, setShowArchitectureModal] = useState<boolean>(false);

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter & Search Handlers
  const handleFilterChange = (newFilter: Partial<FilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleResetFilters = () => {
    setFilter({
      category: "all",
      fuelType: "all",
      transmission: "all",
      sortBy: "popular",
      maxPrice: 5000,
      searchQuery: "",
    });
  };

  const handleHeroSearchSubmit = ({
    category,
  }: {
    category: VehicleCategory;
    location: CampusLocation;
    duration: string;
    pickupTime: string;
  }) => {
    setFilter((prev) => ({
      ...prev,
      category,
    }));
    handleScrollToSection("catalog");
  };

  // Booking Flow Handlers
  const handleInitiateBooking = (vehicle: Vehicle) => {
    setDetailVehicle(null);
    setBookingVehicle(vehicle);
  };

  const handleBookingSuccess = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
    setBookingVehicle(null);
    setConfirmedBooking(newBooking);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  // Filtered & Sorted Vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // Category
        if (filter.category !== "all" && v.category !== filter.category) {
          return false;
        }
        // Fuel
        if (filter.fuelType !== "all" && v.fuelType !== filter.fuelType) {
          return false;
        }
        // Transmission
        if (
          filter.transmission !== "all" &&
          v.transmission !== filter.transmission
        ) {
          return false;
        }
        // Search Query
        if (filter.searchQuery.trim() !== "") {
          const q = filter.searchQuery.toLowerCase();
          const matchName = v.name.toLowerCase().includes(q);
          const matchSub = v.subtitle.toLowerCase().includes(q);
          const matchFeatures = v.features.some((f) =>
            f.toLowerCase().includes(q)
          );
          if (!matchName && !matchSub && !matchFeatures) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === "price-asc") return a.dailyRate - b.dailyRate;
        if (filter.sortBy === "price-desc") return b.dailyRate - a.dailyRate;
        if (filter.sortBy === "rating") return b.vendor.rating - a.vendor.rating;
        return 0; // "popular" preserves default curated order
      });
  }, [vehicles, filter]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      
      {/* 1. Global Navbar */}
      <Navbar
        activeBookingsCount={bookings.length}
        onOpenBookings={() => setShowBookingsModal(true)}
        onOpenArchitecture={() => setShowArchitectureModal(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* 2. Hero Search Banner */}
      <HeroSearch
        selectedCategory={filter.category}
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        onSearchSubmit={handleHeroSearchSubmit}
      />

      {/* 3. Main Fleet Catalog Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 space-y-12">
        
        {/* Section Header */}
        <section id="catalog" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                  Verified Fleet
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Pre-negotiated Student Tariffs
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Choose Your Campus Ride
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                All vehicles come sanitized, with full paperwork, campus gate delivery, and zero ID retention.
              </p>
            </div>

            {/* Category Quick Chips */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 p-1.5 rounded-2xl self-start">
              {(
                [
                  { id: "all", label: "All Vehicles" },
                  { id: "scooter", label: "Scooters" },
                  { id: "bike", label: "Motorcycles" },
                  { id: "car", label: "Cars & SUVs" },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleFilterChange({ category: cat.id })}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    filter.category === cat.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Filters Bar */}
          <VehicleFilter
            filter={filter}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalCount={filteredVehicles.length}
          />

          {/* Vehicle Grid */}
          {filteredVehicles.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <Zap className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">
                No vehicles matched your selected filters
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try resetting your fuel type or transmission filters to view more available vehicles.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={setDetailVehicle}
                  onBook={handleInitiateBooking}
                />
              ))}
            </div>
          )}
        </section>

        {/* 4. Value Proposition: Why IIML Wheels? */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                The Student Mobility Advantage
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 tracking-tight">
                Why Helions Rent Through IIML Wheels
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                We designed this platform specifically to eliminate the friction points students face with unorganized roadside rental operators in Lucknow.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 backdrop-blur-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">No Physical ID Holds</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Roadside shops keep your original Aadhaar or College ID. We only perform on-screen digital verification.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 backdrop-blur-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Campus Doorstep Drop</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Delivery straight to Gate 1, Gate 2, or your Hostel Quad in 15 minutes. No auto rides to outside stands.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 backdrop-blur-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">2 ISI Helmets Free</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Every 2-wheeler rental includes clean, sanitized ISI helmets for rider and pillion at zero extra charge.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 backdrop-blur-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Instant UPI Refunds</h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Your security deposit is refunded on-spot via UPI as soon as you hand the vehicle back to the partner executive.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Campus Delivery Guide & Student FAQs */}
        <CampusGuideSection />

      </main>

      {/* 6. Footer */}
      <Footer
        onOpenArchitecture={() => setShowArchitectureModal(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Modals */}
      {/* Vehicle Specs Modal */}
      <VehicleModal
        vehicle={detailVehicle}
        onClose={() => setDetailVehicle(null)}
        onBook={handleInitiateBooking}
      />

      {/* Booking Checkout Modal */}
      <BookingModal
        vehicle={bookingVehicle}
        onClose={() => setBookingVehicle(null)}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Booking Confirmation / Digital Boarding Pass */}
      <BookingConfirmationModal
        booking={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
        onViewAllBookings={() => setShowBookingsModal(true)}
      />

      {/* Active Bookings Drawer */}
      <ActiveBookingsModal
        isOpen={showBookingsModal}
        onClose={() => setShowBookingsModal(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onSelectBookingReceipt={(b) => {
          setShowBookingsModal(false);
          setConfirmedBooking(b);
        }}
      />

      {/* Interview Architecture Explainer Modal */}
      <ArchitectureModal
        isOpen={showArchitectureModal}
        onClose={() => setShowArchitectureModal(false)}
      />

    </div>
  );
}
