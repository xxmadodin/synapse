"use client";

import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Compass,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Building,
  Navigation,
} from "lucide-react";
import { POPULAR_ROUTES, CAMPUS_LOCATIONS } from "@/data/mockVehicles";

const FAQS = [
  {
    q: "How does vehicle handover work at IIM Lucknow campus gates?",
    a: "Our local vendor partner arrives at your chosen delivery point (Gate 1 Main Gate, Gate 2 Chhatrapati Shivaji, or Hostel Quad) at your scheduled slot. They do a 2-minute digital check of your driving license, hand over the sanitized keys and 2 helmets, and you're good to drive!",
  },
  {
    q: "Do I have to surrender my original college ID card?",
    a: "NO! Unlike shady roadside rental shops, IIML Wheels has strict vendor partner agreements. The vendor will only digitally verify your IIML Roll Number and Driving License on-screen. Your physical cards remain in your wallet.",
  },
  {
    q: "When and how is my security deposit refunded?",
    a: "Immediately upon vehicle handover at the end of your trip. The vendor executive performs a 60-second visual check and initiates an instant UPI transfer back to your phone before you walk back to your hostel.",
  },
  {
    q: "What is the fuel policy?",
    a: "Fair Fuel Policy: The vehicle comes with fuel (typically half to full tank). Simply return it with roughly the same fuel level. Alternatively, for electric vehicles (like Ather 450X), charging is completely free at designated campus points!",
  },
  {
    q: "Can we take the vehicle outside Lucknow (e.g. Ayodhya or Dudhwa)?",
    a: "Yes! All partner vehicles carry valid All-India Tourist/Commercial permits, fastags, and comprehensive insurance. Highway getaways to Ayodhya (140 km via NH27) and Dudhwa National Park are fully permitted.",
  },
];

export default function CampusGuideSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-16">
      
      {/* Section 1: Campus Delivery Hubs */}
      <section id="campus-delivery" className="scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Campus Logistics
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
            15-Minute Handover at 4 Campus Points
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            No walking to outside taxi stands or auto ranks. The vendor brings the vehicle right inside or at the gate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CAMPUS_LOCATIONS.map((loc, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                0{idx + 1}
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {loc}
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {idx === 0 && "Ideal for highway access & Sitapur road connectivity."}
                {idx === 1 && "Convenient for students staying near residential wings."}
                {idx === 2 && "Doorstep drop right outside hostel messes for quick weekend loading."}
                {idx === 3 && "Convenient for visiting MDP executives, guests & alumni."}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <Clock className="w-3.5 h-3.5" />
                <span>15 Min Avg Arrival</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Popular Student Weekend Routes */}
      <section id="weekend-routes" className="scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Roadtrip Inspiration
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
            Popular Helion Riding Destinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Distance and drive times measured directly from IIM Lucknow Prabandh Nagar campus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POPULAR_ROUTES.map((route, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-emerald-400 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-emerald-700 font-bold mb-2">
                  <span className="flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5" />
                    {route.distance}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    {route.time}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900">
                  {route.destination}
                </h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {route.tip}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-slate-400">
                Fastag & GPS Ready Fleet
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Student FAQs */}
      <section id="faqs" className="scroll-mt-24 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
