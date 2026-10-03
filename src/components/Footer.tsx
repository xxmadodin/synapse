"use client";

import React from "react";
import { CAMPUS_LOCATIONS } from "@/data/mockVehicles";
import { PHOTO_CREDITS, commonsUrl } from "@/data/photoCredits";

interface FooterProps {
  onOpenArchitecture: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Footer({
  onOpenArchitecture,
  onScrollToSection,
}: FooterProps) {
  const linkCls = "text-muted hover:text-ink transition-colors cursor-pointer text-left";

  return (
    <footer className="border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1.4fr_1.2fr] gap-10 text-sm">
          <div className="col-span-2 md:col-span-1 max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-ink text-paper text-[15px] font-semibold">
                W
              </span>
              <span className="text-[17px] font-semibold tracking-tight">IIML Wheels</span>
            </div>
            <p className="mt-4 text-muted leading-relaxed">
              Vehicle rentals for the IIM Lucknow community, from verified local vendors.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-ink mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onScrollToSection("catalog")} className={linkCls}>Fleet</button></li>
              <li><button onClick={() => onScrollToSection("weekend-routes")} className={linkCls}>Trips</button></li>
              <li><button onClick={() => onScrollToSection("faqs")} className={linkCls}>FAQ</button></li>
              <li><button onClick={onOpenArchitecture} className={linkCls}>How it&apos;s built</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-ink mb-3">Pickup points</h4>
            <ul className="space-y-2 text-muted">
              {CAMPUS_LOCATIONS.map((loc) => (
                <li key={loc}>{loc}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-ink mb-3">Help</h4>
            <ul className="space-y-2 text-muted">
              <li>
                <a href="tel:+919838012345" className="hover:text-ink transition-colors">
                  +91 98380 12345
                </a>
              </li>
              <li>24x7 for active bookings</li>
              <li>Prabandh Nagar, IIM Road, Lucknow 226013</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-[13px] text-muted">
          <p>© {new Date().getFullYear()} IIML Wheels</p>
          <details className="sm:max-w-xl sm:text-right group">
            <summary className="cursor-pointer list-none hover:text-ink">
              Photo credits
            </summary>
            <p className="mt-2 leading-relaxed">
              Photos from Wikimedia Commons:{" "}
              {PHOTO_CREDITS.map((c, i) => (
                <React.Fragment key={c.file}>
                  <a
                    href={commonsUrl(c.file)}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 decoration-line hover:text-ink"
                  >
                    {c.subject}
                  </a>{" "}
                  by {c.author} ({c.license})
                  {i < PHOTO_CREDITS.length - 1 ? "; " : "."}
                </React.Fragment>
              ))}
            </p>
          </details>
        </div>
      </div>
    </footer>
  );
}
