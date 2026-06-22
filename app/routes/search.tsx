import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { Search, LayoutList, Map, SlidersHorizontal, X, ArrowLeft } from "lucide-react";
import { BottomNav } from "~/components/bottom-nav";
import { AddSpotFAB } from "~/components/add-spot-fab";
import { SpotCard } from "~/components/spot-card";
import { useConfigurables } from "~/modules/configurables";
import type { Spot } from "~/spots/types";

const CATEGORY_OPTIONS = [
  { id: "all", label: "All" },
  { id: "restaurants", label: "Restaurants" },
  { id: "lodging", label: "Lodging" },
  { id: "safari", label: "Safari & Parks" },
  { id: "historical", label: "Historical" },
  { id: "braai", label: "Braai & Local Eats" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const base = url.origin;
  const q = url.searchParams.get("q") || "";
  const category = url.searchParams.get("category") || "";
  const region = url.searchParams.get("region") || "";
  const featured = url.searchParams.get("featured") || "";

  const params = new URLSearchParams({ limit: "50" });
  if (q) params.set("search", q);
  if (category && category !== "all") params.set("category", category);
  if (region) params.set("region", region);
  if (featured) params.set("featured", featured);

  const data = await fetch(`${base}/api/spots?${params}`).then((r) => r.json()).catch(() => ({ data: [], total: 0 }));

  return {
    spots: (data.data || []) as Spot[],
    total: data.total || 0,
    initialSearch: q,
    initialCategory: category || "all",
    initialRegion: region,
  };
}

export default function SearchPage() {
  const { spots, total, initialSearch, initialCategory, initialRegion } = useLoaderData<typeof loader>();
  const { config, loading } = useConfigurables();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showFAB] = useState(true);

  const searchPlaceholder = loading ? "Search spots..." : (config?.searchPlaceholder || "Search spots...");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search.trim()) {
      params.set("q", search.trim());
    } else {
      params.delete("q");
    }
    navigate(`/search?${params}`);
  };

  const handleCategoryFilter = (catId: string) => {
    setActiveCategory(catId);
    const params = new URLSearchParams(searchParams);
    if (catId && catId !== "all") {
      params.set("category", catId);
    } else {
      params.delete("category");
    }
    navigate(`/search?${params}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-4 pt-12 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => { setSearch(""); navigate("/search"); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </form>
          <button
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"
          >
            {viewMode === "list" ? (
              <LayoutList className="w-4 h-4 text-foreground" />
            ) : (
              <SlidersHorizontal className="w-4 h-4 text-foreground" />
            )}
          </button>
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryFilter(cat.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-3">
        <p className="text-muted-foreground text-xs">
          {total > 0 ? `${total} spot${total !== 1 ? "s" : ""} found` : ""}
          {initialRegion ? ` in ${initialRegion.replace("-", " ")}` : ""}
        </p>
      </div>

      {/* Results */}
      <div className="px-4">
        {spots.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-foreground font-semibold text-lg">No spots found</h3>
            <p className="text-muted-foreground text-sm mt-2 max-w-xs">
              Try a different search term or category, or add this spot yourself!
            </p>
          </div>
        ) : viewMode === "list" ? (
          <div className="flex flex-col gap-3">
            {spots.map((spot) => (
              <SpotCard key={spot._id} spot={spot} variant="list" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {spots.map((spot) => (
              <SpotCard key={spot._id} spot={spot} variant="grid" />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
      {showFAB && <AddSpotFAB />}
    </div>
  );
}
