import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#047857",
};

export const metadata: Metadata = {
  title: "IIML Wheels | Campus Vehicle Rentals for IIM Lucknow",
  description:
    "Campus-first vehicle rental marketplace for IIM Lucknow students. Discover, compare, and book verified scooters, motorcycles, and cars delivered directly to Gate 1, Gate 2, or your Hostel Quad.",
  keywords: [
    "IIM Lucknow",
    "IIML",
    "Bike rental Lucknow",
    "Scooter rental Lucknow",
    "Activa rental IIM Road",
    "IIML Wheels",
    "Prabandh Nagar",
  ],
  authors: [{ name: "IIML Student Community" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
