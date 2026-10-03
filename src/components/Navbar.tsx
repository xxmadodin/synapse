"use client";

import React from "react";
import { Compass, ShieldCheck, Ticket, PhoneCall, Code2, Sparkles } from "lucide-react";

interface NavbarProps {
  activeBookingsCount: number;
  onOpenBookings: () => void;
  onOpenArchitecture: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({
  activeBookingsCount,
  onOpenBookings,
  onOpenArchitecture,
  onScrollToSection,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          
          {/* Logo & Campus Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onScrollToSection("hero")}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                    IIML <span className="text-emerald-600">Wheels</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/60 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    IIM Lucknow
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Campus-First Vehicle Rentals</p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onScrollToSection("catalog")}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Browse Fleet
            </button>
            <button
              onClick={() => onScrollToSection("campus-delivery")}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Campus Gates
            </button>
            <button
              onClick={() => onScrollToSection("weekend-routes")}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Trip Routes
            </button>
            <button
              onClick={() => onScrollToSection("faqs")}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Student FAQs
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Tech Explainer Button (For Interview Pitch) */}
            <button
              onClick={onOpenArchitecture}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-300/80 shadow-xs"
              title="Click to view the 15-min interview architecture summary"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden lg:inline">Interview</span> Architecture
            </button>

            {/* My Bookings Button */}
            <button
              onClick={onOpenBookings}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all active:scale-95"
            >
              <Ticket className="w-4 h-4 text-emerald-400" />
              <span>Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-xs">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            {/* Vendor Hotline Link */}
            <a
              href="tel:+919838012345"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 border-l border-slate-200 pl-3 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
              <span>Gate 1 Partner Desk</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
