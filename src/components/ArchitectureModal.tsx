"use client";

import React, { useState } from "react";
import {
  X,
  Code2,
  Database,
  Layers,
  Sparkles,
  Server,
  Cloud,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchitectureModal({
  isOpen,
  onClose,
}: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<"elevator" | "architecture" | "supabase" | "interview">("elevator");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const interviewScript = `
"IIML Wheels is a campus-first mobility marketplace built specifically for IIM Lucknow. 

Architecturally, it's structured in 3 clean layers:
1. Presentation Layer: Built with Next.js App Router and React using TypeScript and Tailwind CSS. It handles our 5-step user journey: Search, Browse & Filter, Vehicle Details, Booking, and Confirmation.
2. Business Logic Layer: Handles dynamic duration math (hourly vs daily rate optimization), campus gate delivery routing, and tariff breakdown with refundable security deposits.
3. Data Layer: Designed as clean TypeScript interfaces that map 1:1 to a relational PostgreSQL database on Supabase with 4 primary tables: Vehicles, Bookings, Students, and Partner Vendors.
We deploy directly to Vercel via Git-triggered CI/CD with zero cold-starts."
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(interviewScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">
                  15-Minute Interview Cheat Sheet
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Ready to Pitch
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Simple, executive-level technical talking points for your Round 2 interview
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("elevator")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "elevator"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            1. 30-Sec Pitch
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("architecture")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "architecture"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            2. 3-Tier Architecture
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("supabase")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "supabase"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            3. Supabase Schema
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("interview")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "interview"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            4. Word-For-Word Script
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-xs sm:text-sm">
          
          {/* Tab 1: Elevator Pitch */}
          {activeTab === "elevator" && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <h4 className="font-extrabold text-emerald-950 text-sm mb-1">
                  The Core Problem We Are Solving:
                </h4>
                <p className="text-emerald-900/90 leading-relaxed text-xs sm:text-sm">
                  IIM Lucknow is located on the outskirts (Prabandh Nagar, Sitapur Road). Students frequently need reliable mobility for airport drops, client meetings, or weekend getaways to Hazratganj and Ayodhya. Existing local vendors demand cash, hold original college ID cards as collateral, and provide unpredictable vehicle conditions.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">
                  Our Value Proposition in 3 Bullets:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Campus Doorstep Handover:</strong> Delivery within 15 minutes at Gate 1, Gate 2, or Hostel Quad.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Student Trust Shield:</strong> Zero physical ID confiscation. Only digital verification of IIML Roll Number.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Transparent Pricing:</strong> Clear hourly/daily rates, pre-negotiated student tariffs, and instant deposit refunds via UPI.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: 3-Tier Architecture */}
          {activeTab === "architecture" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Explain this simple 3-tier diagram to the interview panel:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-2">
                    1
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Frontend Layer</h5>
                  <p className="text-slate-500 mt-1">
                    <strong>Next.js 14+ (App Router)</strong> with React and Tailwind CSS.
                  </p>
                  <p className="text-slate-400 mt-2 text-[11px]">
                    Provides high performance, fast static rendering, and responsive UI across desktop and mobile.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-2">
                    2
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Logic / Service Layer</h5>
                  <p className="text-slate-500 mt-1">
                    <strong>TypeScript Business Rules</strong>
                  </p>
                  <p className="text-slate-400 mt-2 text-[11px]">
                    Computes student discount codes (IIMLFIRST), duration math (hourly vs daily rate breaks), GST, and add-ons.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-2">
                    3
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Data / Persistence</h5>
                  <p className="text-slate-500 mt-1">
                    <strong>Supabase PostgreSQL</strong>
                  </p>
                  <p className="text-slate-400 mt-2 text-[11px]">
                    Relational schema with Row Level Security (RLS) for student privacy and instant query speed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Supabase Schema */}
          {activeTab === "supabase" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                When asked how you will scale to a real backend, describe these 4 database tables:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-slate-900 text-slate-200 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">TABLE vehicles</span>
                  <div className="mt-2 space-y-0.5 text-[11px] text-slate-400">
                    <div>• id: uuid (PK)</div>
                    <div>• name: text</div>
                    <div>• category: text (scooter|bike|car)</div>
                    <div>• hourly_rate: int</div>
                    <div>• daily_rate: int</div>
                    <div>• is_available: boolean</div>
                    <div>• vendor_id: uuid (FK)</div>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-200 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">TABLE bookings</span>
                  <div className="mt-2 space-y-0.5 text-[11px] text-slate-400">
                    <div>• id: text (PK e.g. IIML-2026)</div>
                    <div>• vehicle_id: uuid (FK)</div>
                    <div>• student_id: uuid (FK)</div>
                    <div>• pickup_gate: text</div>
                    <div>• duration_hrs: int</div>
                    <div>• total_rent: decimal</div>
                    <div>• deposit_status: text</div>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-200 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">TABLE students</span>
                  <div className="mt-2 space-y-0.5 text-[11px] text-slate-400">
                    <div>• id: uuid (PK / Supabase Auth)</div>
                    <div>• email: text (@iiml.ac.in)</div>
                    <div>• roll_no: text (e.g. PGP42297)</div>
                    <div>• license_number: text</div>
                    <div>• is_verified: boolean</div>
                  </div>
                </div>

                <div className="bg-slate-900 text-slate-200 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-emerald-400 font-bold">TABLE vendors</span>
                  <div className="mt-2 space-y-0.5 text-[11px] text-slate-400">
                    <div>• id: uuid (PK)</div>
                    <div>• name: text (Awadh Moto Hub)</div>
                    <div>• phone: text</div>
                    <div>• rating: numeric(2,1)</div>
                    <div>• dispatch_hub: text</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Word-For-Word Script */}
          {activeTab === "interview" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Copy & Memorize for Your Pitch
                </span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Pitch"}</span>
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-medium italic">
                {interviewScript}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Keep this modal open during mock interviews for reference.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
