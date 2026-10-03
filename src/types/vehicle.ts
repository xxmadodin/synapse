export type VehicleCategory = "all" | "scooter" | "bike" | "car";

export type FuelType = "petrol" | "diesel" | "electric";

export type Transmission = "manual" | "automatic";

export type CampusLocation =
  | "Gate 1 (Main Gate - IIM Road)"
  | "Gate 2 (Chhatrapati Shivaji Gate)"
  | "Hostel Quad & Central Mess Lane"
  | "MDP / Executive Guest House";

export interface VendorInfo {
  name: string;
  rating: number;
  totalTrips: number;
  responseTime: string;
  phone: string;
  locationArea: string;
}

export interface Vehicle {
  id: string;
  name: string;
  subtitle: string;
  category: "scooter" | "bike" | "car";
  image: string;
  badge?: string;
  hourlyRate: number;
  dailyRate: number;
  fuelType: FuelType;
  transmission: Transmission;
  mileageOrRange: string;
  seats: number;
  engineCc: string;
  securityDeposit: number;
  vendor: VendorInfo;
  features: string[];
  available: boolean;
  freeKmsPerDay: number;
  extraKmRate: number;
  description: string;
}

export interface BookingAddOns {
  extraHelmet: boolean;
  zeroDepInsurance: boolean;
  phoneMount: boolean;
}

export interface BookingRequest {
  vehicleId: string;
  studentName: string;
  studentEmail: string;
  studentRollNo: string;
  studentPhone: string;
  drivingLicenseNo: string;
  pickupLocation: CampusLocation;
  pickupDateTime: string;
  returnDateTime: string;
  durationHours: number;
  addOns: BookingAddOns;
  promoCode?: string;
}

export interface BookingRecord extends BookingRequest {
  id: string;
  vehicleName: string;
  vehicleCategory: "scooter" | "bike" | "car";
  vehicleImage: string;
  basePrice: number;
  addOnPrice: number;
  gst: number;
  securityDeposit: number;
  discount: number;
  totalPayableNow: number;
  totalRent: number;
  status: "confirmed" | "completed" | "cancelled";
  createdAt: string;
  vendor: VendorInfo;
}

export interface FilterState {
  category: VehicleCategory;
  fuelType: string;
  transmission: string;
  sortBy: "popular" | "price-asc" | "price-desc" | "rating";
  maxPrice: number;
  searchQuery: string;
}
