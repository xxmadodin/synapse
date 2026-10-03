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
import Image from "next/image";

const WHY_POINTS = [
  {
    title: "Your college ID stays in your wallet",
    body: "Vendors check your licence and roll number on screen. Nobody holds on to your Aadhaar or ID card.",
  },
  {
    title: "Delivered inside campus",
    body: "Pick it up at Gate 1, Gate 2, the hostel quad or the MDP guest house. No auto ride to a stand on IIM Road.",
  },
  {
    title: "Two clean helmets, every time",
    body: "Every two-wheeler comes with sanitised ISI helmets for you and your pillion, free.",
  },
  {
    title: "Deposit back before you walk away",
    body: "Hand back the keys, the vendor does a one-minute check, and the deposit lands on UPI right there.",
  },
];

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
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      <Navbar
        activeBookingsCount={bookings.length}
        onOpenBookings={() => setShowBookingsModal(true)}
        onOpenArchitecture={() => setShowArchitectureModal(true)}
        onScrollToSection={handleScrollToSection}
      />

      <HeroSearch
        selectedCategory={filter.category}
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        onSearchSubmit={handleHeroSearchSubmit}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-24 space-y-28 sm:space-y-32">
        {/* Fleet */}
        <section id="catalog" className="scroll-mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-ink">
                The fleet
              </h2>
              <p className="mt-2 text-muted max-w-lg">
                Every vehicle is serviced, insured and comes with helmets. Rates are pre-negotiated for IIML students.
              </p>
            </div>
          </div>

          <VehicleFilter
            filter={filter}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalCount={filteredVehicles.length}
          />

          {filteredVehicles.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-lg font-medium text-ink">Nothing matches those filters</p>
              <p className="mt-1 text-sm text-muted">Try a different fuel type or gearbox.</p>
              <button
                onClick={handleResetFilters}
                className="mt-5 h-10 px-5 text-sm font-medium rounded-full border border-ink text-ink hover:bg-ink hover:text-paper transition-colors cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
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

        {/* Why */}
        <section className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-center">
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-line">
            <Image
              src="/photos/ladakh-rider.jpg"
              alt="A rider with a motorcycle on a mountain ridge in Ladakh"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-ink max-w-md">
              Why students skip the roadside rental shop
            </h2>
            <ol className="mt-10 divide-y divide-line border-y border-line">
              {WHY_POINTS.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[2.5rem_1fr] gap-2 py-6">
                  <span className="text-sm text-muted tabular-nums pt-0.5">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-medium text-ink">{p.title}</h3>
                    <p className="mt-1 text-muted leading-relaxed">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

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
