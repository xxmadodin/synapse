"use client";

import React from "react";
import { Ticket } from "lucide-react";

interface NavbarProps {
  activeBookingsCount: number;
  onOpenBookings: () => void;
  onOpenArchitecture: () => void;
  onScrollToSection: (id: string) => void;
}

const LINKS = [
  { id: "catalog", label: "Fleet" },
  { id: "campus-delivery", label: "Pickup points" },
  { id: "weekend-routes", label: "Trips" },
  { id: "faqs", label: "FAQ" },
];

export default function Navbar({
  activeBookingsCount,
  onOpenBookings,
  onOpenArchitecture,
  onScrollToSection,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Wordmark */}
          <button
            onClick={() => onScrollToSection("hero")}
            className="flex items-center gap-2.5 cursor-pointer"
            aria-label="IIML Wheels home"
          >
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-ink text-paper text-[15px] font-semibold tracking-tight">
              W
            </span>
            <span className="text-[17px] font-semibold tracking-tight text-ink">
              IIML Wheels
            </span>
            <span className="hidden sm:inline text-xs text-muted border-l border-line pl-2.5 ml-0.5">
              IIM Lucknow
            </span>
          </button>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-ink-soft">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => onScrollToSection(l.id)}
                className="hover:text-ink transition-colors cursor-pointer"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenArchitecture}
              className="hidden lg:inline text-sm text-muted hover:text-ink underline-offset-4 hover:underline cursor-pointer"
            >
              How it&apos;s built
            </button>
            <button
              onClick={onOpenBookings}
              className="inline-flex items-center gap-2 h-9 pl-3 pr-2 text-sm font-medium text-ink bg-surface border border-line rounded-full hover:border-ink/30 transition-colors cursor-pointer"
            >
              <Ticket className="w-4 h-4" strokeWidth={1.75} />
              <span>My bookings</span>
              <span
                className={`grid place-items-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-semibold tabular-nums ${
                  activeBookingsCount > 0
                    ? "bg-ink text-paper"
                    : "bg-paper text-muted"
                }`}
              >
                {activeBookingsCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
