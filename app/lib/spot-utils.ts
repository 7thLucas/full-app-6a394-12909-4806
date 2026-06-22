import type { OperatingHours } from "~/spots/types";

const DAY_KEYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;

export function isSpotOpenNow(hours?: OperatingHours): boolean {
  if (!hours) return true; // assume open if no hours defined

  const now = new Date();
  const dayKey = DAY_KEYS[now.getDay()];
  const dayHours = hours[dayKey];

  if (!dayHours || dayHours === "Closed") return false;
  if (dayHours === "24/7") return true;

  // Parse "HH:MM - HH:MM"
  const match = dayHours.match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/);
  if (!match) return true;

  const openH = parseInt(match[1], 10);
  const openM = parseInt(match[2], 10);
  const closeH = parseInt(match[3], 10);
  const closeM = parseInt(match[4], 10);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

export function formatOperatingHours(hours?: OperatingHours): Array<{ day: string; hours: string }> {
  if (!hours) return [];
  return [
    { day: "Monday", hours: hours.monday || "Closed" },
    { day: "Tuesday", hours: hours.tuesday || "Closed" },
    { day: "Wednesday", hours: hours.wednesday || "Closed" },
    { day: "Thursday", hours: hours.thursday || "Closed" },
    { day: "Friday", hours: hours.friday || "Closed" },
    { day: "Saturday", hours: hours.saturday || "Closed" },
    { day: "Sunday", hours: hours.sunday || "Closed" },
  ];
}

export const CATEGORY_ICONS: Record<string, string> = {
  restaurants: "UtensilsCrossed",
  lodging: "BedDouble",
  safari: "Binoculars",
  historical: "Landmark",
  braai: "Flame",
  other: "MapPin",
};

export const CATEGORY_LABELS: Record<string, string> = {
  restaurants: "Restaurants",
  lodging: "Lodging",
  safari: "Safari & Parks",
  historical: "Historical Sites",
  braai: "Braai & Local Eats",
  other: "Other",
  all: "All Spots",
};
