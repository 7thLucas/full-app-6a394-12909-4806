import { Link } from "react-router";
import { Wifi, Car, Smartphone, MapPin } from "lucide-react";
import type { Spot } from "~/spots/types";
import { isSpotOpenNow } from "~/lib/spot-utils";

interface SpotCardProps {
  spot: Spot;
  variant?: "list" | "grid";
}

const CATEGORY_LABELS: Record<string, string> = {
  restaurants: "Restaurant",
  lodging: "Lodging",
  safari: "Safari & Parks",
  historical: "Historical",
  braai: "Braai & Local Eats",
  other: "Other",
};

export function SpotCard({ spot, variant = "list" }: SpotCardProps) {
  const isOpen = isSpotOpenNow(spot.operatingHours);
  const photo = spot.photos?.[0] || `https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=60`;

  if (variant === "grid") {
    return (
      <Link
        to={`/spot/${spot._id}`}
        className="block rounded-2xl overflow-hidden bg-card border border-border shadow-sm active:scale-[0.97] transition-transform duration-150"
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={photo}
            alt={spot.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {spot.priceRange && (
            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {spot.priceRange}
            </div>
          )}
          {spot.isFeatured && (
            <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              Hot
            </div>
          )}
        </div>
        <div className="p-3">
          <p className="text-sm font-semibold text-foreground truncate">{spot.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <p className="text-xs text-muted-foreground truncate">{spot.address || spot.region}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                isOpen
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`}
              />
              {isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/spot/${spot._id}`}
      className="flex gap-3 p-3 bg-card rounded-2xl border border-border shadow-sm active:scale-[0.97] transition-transform duration-150"
    >
      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={photo}
          alt={spot.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {spot.isFeatured && (
          <div className="absolute top-1 left-1 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            Hot
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
            {spot.name}
          </h3>
          {spot.priceRange && (
            <span className="text-accent text-xs font-bold flex-shrink-0">{spot.priceRange}</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {CATEGORY_LABELS[spot.category] || spot.category}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <p className="text-xs text-muted-foreground truncate">{spot.address || spot.region}</p>
        </div>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span
            className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
              isOpen
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`}
            />
            {isOpen ? "Open Now" : "Closed"}
          </span>
          <div className="flex items-center gap-1.5">
            {spot.hasFreeWifi && (
              <span className="bg-secondary p-1 rounded-lg" title="Free Wi-Fi">
                <Wifi className="w-3 h-3 text-primary" />
              </span>
            )}
            {spot.hasParking && (
              <span className="bg-secondary p-1 rounded-lg" title="Parking">
                <Car className="w-3 h-3 text-primary" />
              </span>
            )}
            {spot.acceptsEcocash && (
              <span className="bg-secondary p-1 rounded-lg" title="EcoCash Accepted">
                <Smartphone className="w-3 h-3 text-primary" />
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
