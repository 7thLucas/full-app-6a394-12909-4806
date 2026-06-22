export interface SpotTip {
  text: string;
  author?: string;
  createdAt?: string;
}

export interface OperatingHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Spot {
  _id: string;
  name: string;
  category: string;
  description?: string;
  address?: string;
  region?: string;
  lat?: number;
  lng?: number;
  phoneNumber?: string;
  whatsappNumber?: string;
  priceRange?: string;
  photos?: string[];
  hasFreeWifi?: boolean;
  hasParking?: boolean;
  acceptsEcocash?: boolean;
  operatingHours?: OperatingHours;
  tips?: SpotTip[];
  isActive?: boolean;
  isFeatured?: boolean;
  viewCount?: number;
  submittedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SpotCategory =
  | "all"
  | "restaurants"
  | "lodging"
  | "safari"
  | "historical"
  | "braai"
  | "other";

export interface SpotsListResponse {
  success: boolean;
  data: Spot[];
  total: number;
}

export interface SpotDetailResponse {
  success: boolean;
  data: Spot;
}
