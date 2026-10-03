"use client";

import React from "react";
import { Compass, Sparkles, MapPin, Phone, ShieldCheck, Heart, Code2 } from "lucide-react";

interface FooterProps {
  onOpenArchitecture: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Footer({
  onOpenArchitecture,
  onScrollToSection,
}: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-black text-xl tracking-tight text-white">
                IIML <span className="text-emerald-400">Wheels</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                IIM Lucknow
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier campus-first vehicle rental marketplace for IIM Lucknow students, faculty, and visiting executives. Verified scooters, bikes, and cars delivered directly to campus gates with zero physical ID retention.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={onOpenArchitecture}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-emerald-400 transition-colors cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Interview Architecture Explainer</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Campus Fleet
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onScrollToSection("catalog")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Honda Activa 6G (₹59/hr)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("catalog")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Ather 450X EV (Free Charging)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("catalog")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Royal Enfield Hunter 350
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("catalog")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Maruti Swift (5-Seater)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("catalog")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Mahindra Thar 4x4
                </button>
              </li>
            </ul>
          </div>

          {/* Delivery Gates */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Handover Points
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Gate 1 (Main Gate - IIM Road)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Gate 2 (Chhatrapati Shivaji)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Hostel Quad & Mess Lane</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>MDP / Executive Guest House</span>
              </li>
            </ul>
          </div>

          {/* Campus Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Helpline & Safety
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 98380 12345 (Gate 1 Hub)</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Support available 24x7 for active campus bookings & roadside assist.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-amber-300">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Student Verified Partners</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} IIML Wheels. Prabandh Nagar, IIM Road, Lucknow - 226013.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the IIM Lucknow Community.
          </p>
        </div>

      </div>
    </footer>
  );
}
