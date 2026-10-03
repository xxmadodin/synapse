"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { POPULAR_ROUTES, CAMPUS_LOCATIONS } from "@/data/mockVehicles";

const FAQS = [
  {
    q: "How does vehicle handover work at IIM Lucknow campus gates?",
    a: "Our local vendor partner arrives at your chosen delivery point (Gate 1 Main Gate, Gate 2 Chhatrapati Shivaji, or Hostel Quad) at your scheduled slot. They do a 2-minute digital check of your driving license, hand over the sanitized keys and 2 helmets, and you're good to drive!",
  },
  {
    q: "Do I have to surrender my original college ID card?",
    a: "No. IIML Wheels has strict vendor partner agreements. The vendor will only digitally verify your IIML Roll Number and Driving License on-screen. Your physical cards remain in your wallet.",
  },
  {
    q: "When and how is my security deposit refunded?",
    a: "Immediately upon vehicle handover at the end of your trip. The vendor executive performs a 60-second visual check and initiates an instant UPI transfer back to your phone before you walk back to your hostel.",
  },
  {
    q: "What is the fuel policy?",
    a: "Fair Fuel Policy: The vehicle comes with fuel (typically half to full tank). Simply return it with roughly the same fuel level. Alternatively, for electric vehicles (like the Bajaj Chetak), charging is completely free at designated campus points!",
  },
  {
    q: "Can we take the vehicle outside Lucknow (e.g. Ayodhya or Dudhwa)?",
    a: "Yes! All partner vehicles carry valid All-India Tourist/Commercial permits, fastags, and comprehensive insurance. Highway getaways to Ayodhya (140 km via NH27) and Dudhwa National Park are fully permitted.",
  },
];

const PICKUP_NOTES = [
  "Closest to IIM Road and the Sitapur Road highway.",
  "Handy if you live in the residential wings.",
  "Right outside the mess. Easiest for loading up on weekends.",
  "For MDP participants, guests and visiting alumni.",
];

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-10 max-w-xl">
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-ink">{title}</h2>
      <p className="mt-2 text-muted">{subtitle}</p>
    </div>
  );
}

export default function CampusGuideSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-28 sm:space-y-32">
      {/* Pickup points */}
      <section id="campus-delivery" className="scroll-mt-24">
        <SectionHeading
          title="Four pickup points on campus"
          subtitle="The vendor brings the vehicle to you, usually within 15 minutes of your slot."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line">
          {CAMPUS_LOCATIONS.map((loc, idx) => (
            <div
              key={loc}
              className="py-6 sm:pr-6 border-b border-line lg:border-b-0 lg:[&:not(:first-child)]:pl-6 lg:[&:not(:last-child)]:border-r"
            >
              <span className="text-sm text-muted tabular-nums">0{idx + 1}</span>
              <h3 className="mt-3 text-lg font-medium text-ink leading-snug">{loc}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{PICKUP_NOTES[idx]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trips */}
      <section id="weekend-routes" className="scroll-mt-24">
        <SectionHeading
          title="Where students ride"
          subtitle="Distances and drive times from the Prabandh Nagar campus."
        />
        <ul className="border-t border-line">
          {POPULAR_ROUTES.map((route) => (
            <li
              key={route.destination}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1.2fr_2fr_auto] gap-x-6 gap-y-1 py-5 border-b border-line items-baseline"
            >
              <h3 className="text-lg font-medium text-ink">{route.destination}</h3>
              <p className="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto text-sm text-muted">{route.tip}</p>
              <p className="text-right text-ink tabular-nums whitespace-nowrap">
                {route.distance}
                <span className="text-muted"> · {route.time}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section id="faqs" className="scroll-mt-24 grid lg:grid-cols-[1fr_2fr] gap-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-ink">Questions</h2>
          <p className="mt-2 text-muted">
            Anything else? Call the Gate 1 desk on{" "}
            <a href="tel:+919838012345" className="text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
              +91 98380 12345
            </a>
            .
          </p>
        </div>

        <div className="border-t border-line">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={faq.q} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full py-5 text-left flex items-center justify-between gap-6 text-[17px] font-medium text-ink cursor-pointer"
                >
                  {faq.q}
                  <Plus
                    className={`w-5 h-5 shrink-0 text-muted transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    strokeWidth={1.75}
                  />
                </button>
                {isOpen && (
                  <p className="pb-6 pr-10 text-muted leading-relaxed">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
