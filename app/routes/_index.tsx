import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import {
  UtensilsCrossed,
  BedDouble,
  Binoculars,
  Landmark,
  Flame,
  Search,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { BottomNav } from "~/components/bottom-nav";
import { AddSpotFAB } from "~/components/add-spot-fab";
import { SpotCard } from "~/components/spot-card";
import { useConfigurables } from "~/modules/configurables";
import type { Spot } from "~/spots/types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  UtensilsCrossed,
  BedDouble,
  Binoculars,
  Landmark,
  Flame,
};

export async function loader({ request }: LoaderFunctionArgs) {
  const baseUrl = new URL(request.url).origin;
  const [trendingRes, featuredRes] = await Promise.all([
    fetch(`${baseUrl}/api/spots?limit=10&region=harare`).then((r) => r.json()).catch(() => ({ data: [] })),
    fetch(`${baseUrl}/api/spots?featured=true&limit=6`).then((r) => r.json()).catch(() => ({ data: [] })),
  ]);

  return {
    trendingSpots: (trendingRes.data || []) as Spot[],
    featuredSpots: (featuredRes.data || []) as Spot[],
  };
}

export default function DiscoverPage() {
  const { config, loading } = useConfigurables();
  const { trendingSpots, featuredSpots } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const appName = loading ? "ZimSpots" : (config?.appName || "ZimSpots");
  const tagline = loading ? "Discover Zimbabwe" : (config?.tagline || "Discover Zimbabwe");
  const searchPlaceholder = loading ? "Find a spot, a meal, or an adventure..." : (config?.searchPlaceholder || "Find a spot, a meal, or an adventure...");
  const categories = loading ? [] : (config?.categories || []);
  const regions = loading ? [] : (config?.regions || []);
  const showFAB = loading ? true : (config?.showCrowdsourcingFAB !== false);
  const maxTrending = loading ? 10 : (config?.maxTrendingSpots || 10);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const defaultCategories = [
    { id: "restaurants", label: "Restaurants", icon: "UtensilsCrossed" },
    { id: "lodging", label: "Lodging", icon: "BedDouble" },
    { id: "safari", label: "Safari & Parks", icon: "Binoculars" },
    { id: "historical", label: "Historical Sites", icon: "Landmark" },
    { id: "braai", label: "Braai & Local Eats", icon: "Flame" },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  const defaultRegions = [
    { id: "harare", name: "Harare", imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80", isActive: true },
    { id: "bulawayo", name: "Bulawayo & Matobo", imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80", isActive: false },
    { id: "victoria-falls", name: "Victoria Falls", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80", isActive: false },
    { id: "eastern-highlands", name: "Eastern Highlands", imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&q=80", isActive: false },
    { id: "kariba", name: "Kariba & Great Zimbabwe", imageUrl: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?w=400&q=80", isActive: false },
  ];

  const displayRegions = regions.length > 0 ? regions : defaultRegions;
  const displayTrending = trendingSpots.slice(0, maxTrending);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-primary-foreground font-bold text-2xl tracking-tight">{appName}</h1>
            <p className="text-primary-foreground/75 text-sm">{tagline}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-background text-foreground placeholder:text-muted-foreground text-sm border-0 outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </form>
      </div>

      {/* Category Filter Pills */}
      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => navigate("/search")}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium"
          >
            All Spots
          </button>
          {displayCategories.map((cat) => {
            const Icon = ICON_MAP[cat.icon || ""] || MapPin;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/search?category=${cat.id}`)}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary text-muted-foreground text-sm font-medium active:bg-primary active:text-primary-foreground transition-colors"
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explore by Region */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-foreground font-bold text-base">Explore by Region</h2>
          <button className="text-accent text-sm font-medium flex items-center gap-0.5">
            See All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {displayRegions.map((region) => (
            <div
              key={region.id}
              className={`relative flex-shrink-0 w-36 h-24 rounded-xl overflow-hidden cursor-pointer active:scale-95 transition-transform duration-150 ${
                !region.isActive ? "opacity-70" : ""
              }`}
              onClick={() =>
                region.isActive
                  ? navigate(`/search?region=${region.id}`)
                  : undefined
              }
            >
              <img
                src={region.imageUrl || "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80"}
                alt={region.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-2 left-3 right-2">
                <p className="text-white text-xs font-bold leading-tight">{region.name}</p>
                {!region.isActive && (
                  <p className="text-white/70 text-[10px] mt-0.5">Coming Soon</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Spots */}
      {featuredSpots.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-foreground font-bold text-base">Editor's Picks</h2>
            <Link to="/search?featured=true" className="text-accent text-sm font-medium flex items-center gap-0.5">
              See All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 no-scrollbar pb-1">
            {featuredSpots.map((spot) => (
              <div key={spot._id} className="flex-shrink-0 w-56">
                <SpotCard spot={spot} variant="grid" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Near You */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-foreground font-bold text-base">Trending in Harare</h2>
          <Link to="/search" className="text-accent text-sm font-medium flex items-center gap-0.5">
            See All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {displayTrending.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {displayTrending.map((spot) => (
              <SpotCard key={spot._id} spot={spot} variant="grid" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-3">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground font-medium">No spots yet</p>
            <p className="text-muted-foreground text-sm mt-1">Be the first to add a spot!</p>
          </div>
        )}
      </div>

      {/* Offline Packs Banner */}
      {(!loading && config?.showOfflinePacksFeature !== false) && (
        <div className="mx-4 mb-6 rounded-2xl bg-primary p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
            <Binoculars className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-primary-foreground font-bold text-sm">Offline Regional Packs</p>
            <p className="text-primary-foreground/70 text-xs mt-0.5 leading-snug">
              Download spot data for national parks and remote areas — no internet required.
            </p>
          </div>
          <button className="flex-shrink-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-2 rounded-xl">
            Soon
          </button>
        </div>
      )}

      <BottomNav />
      {showFAB && <AddSpotFAB />}
    </div>
  );
}
