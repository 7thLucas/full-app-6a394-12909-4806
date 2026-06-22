import { useState } from "react";
import { useLoaderData, useNavigate, Link } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import {
  ArrowLeft,
  Bookmark,
  MessageCircle,
  Phone,
  Navigation,
  FileText,
  Wifi,
  Car,
  Smartphone,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
  UtensilsCrossed,
  BedDouble,
  Binoculars,
  Landmark,
  Flame,
} from "lucide-react";
import { BottomNav } from "~/components/bottom-nav";
import { AddSpotFAB } from "~/components/add-spot-fab";
import { isSpotOpenNow, formatOperatingHours } from "~/lib/spot-utils";
import type { Spot } from "~/spots/types";

const CATEGORY_LABELS: Record<string, string> = {
  restaurants: "Restaurant",
  lodging: "Lodging",
  safari: "Safari & Park",
  historical: "Historical Site",
  braai: "Braai & Local Eats",
  other: "Other",
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const base = new URL(request.url).origin;
  const data = await fetch(`${base}/api/spots/${params.id}`)
    .then((r) => r.json())
    .catch(() => ({ success: false, data: null }));

  if (!data.success || !data.data) {
    throw new Response("Spot not found", { status: 404 });
  }

  return { spot: data.data as Spot };
}

export default function SpotDetailPage() {
  const { spot } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [tipText, setTipText] = useState("");
  const [tips, setTips] = useState(spot.tips || []);
  const [submittingTip, setSubmittingTip] = useState(false);

  const isOpen = isSpotOpenNow(spot.operatingHours);
  const photos = spot.photos?.length
    ? spot.photos
    : ["https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80"];
  const hours = formatOperatingHours(spot.operatingHours);

  const handleWhatsApp = () => {
    const number = spot.whatsappNumber?.replace(/\D/g, "");
    if (number) window.open(`https://wa.me/${number}`, "_blank");
  };

  const handleCall = () => {
    if (spot.phoneNumber) window.open(`tel:${spot.phoneNumber}`, "_self");
  };

  const handleNavigate = () => {
    if (spot.lat && spot.lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`, "_blank");
    } else if (spot.address) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.address)}`, "_blank");
    }
  };

  const handleAddTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipText.trim()) return;
    setSubmittingTip(true);
    try {
      const res = await fetch(`/api/spots/${spot._id}/tips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: tipText.trim(), author: "Anonymous Explorer" }),
      });
      const data = await res.json();
      if (data.success) {
        setTips(data.data.tips || []);
        setTipText("");
      }
    } catch {
      // silently fail
    } finally {
      setSubmittingTip(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Gallery */}
      <div className="relative h-64 overflow-hidden bg-secondary">
        <img
          src={photos[photoIndex]}
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Save button */}
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-12 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
        >
          <Bookmark
            className={`w-5 h-5 ${saved ? "text-accent fill-accent" : "text-white"}`}
          />
        </button>

        {/* Photo navigation */}
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setPhotoIndex((i) => Math.max(0, i - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center"
              disabled={photoIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setPhotoIndex((i) => Math.min(photos.length - 1, i + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center"
              disabled={photoIndex === photos.length - 1}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === photoIndex ? "bg-white w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pt-4">
        {/* Title + status */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h1 className="text-foreground text-xl font-bold leading-tight">{spot.name}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {CATEGORY_LABELS[spot.category] || spot.category}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            {spot.priceRange && (
              <span className="text-accent font-bold text-sm">{spot.priceRange}</span>
            )}
            <span
              className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                isOpen ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`} />
              {isOpen ? "Open Now" : "Closed"}
            </span>
          </div>
        </div>

        {/* Address */}
        {spot.address && (
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-muted-foreground text-sm">{spot.address}</p>
          </div>
        )}

        {/* Quick-Action Dock */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {spot.whatsappNumber && (
            <button
              onClick={handleWhatsApp}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-muted-foreground text-center leading-tight">WhatsApp</span>
            </button>
          )}
          {spot.phoneNumber && (
            <button onClick={handleCall} className="flex flex-col items-center gap-1.5">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground text-center leading-tight">Call</span>
            </button>
          )}
          <button onClick={handleNavigate} className="flex flex-col items-center gap-1.5">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
              <Navigation className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground text-center leading-tight">Navigate</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground text-center leading-tight">Menu/Rates</span>
          </button>
        </div>

        {/* Amenities */}
        {(spot.hasFreeWifi || spot.hasParking || spot.acceptsEcocash) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {spot.hasFreeWifi && (
              <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
                <Wifi className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">Free Wi-Fi</span>
              </div>
            )}
            {spot.hasParking && (
              <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
                <Car className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">Parking</span>
              </div>
            )}
            {spot.acceptsEcocash && (
              <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-full">
                <Smartphone className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">EcoCash</span>
              </div>
            )}
          </div>
        )}

        {/* About */}
        {spot.description && (
          <div className="mb-6">
            <h2 className="text-foreground font-bold text-base mb-2">About</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{spot.description}</p>
          </div>
        )}

        {/* Operating Hours */}
        {hours.length > 0 && (
          <div className="mb-6">
            <h2 className="text-foreground font-bold text-base mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Opening Hours
            </h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {hours.map(({ day, hours: h }, i) => {
                const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
                const isToday = day === today;
                return (
                  <div
                    key={day}
                    className={`flex items-center justify-between px-4 py-2.5 ${
                      i !== 0 ? "border-t border-border" : ""
                    } ${isToday ? "bg-primary/5" : ""}`}
                  >
                    <span
                      className={`text-sm ${isToday ? "text-primary font-semibold" : "text-foreground"}`}
                    >
                      {day}
                    </span>
                    <span
                      className={`text-sm ${
                        h === "Closed"
                          ? "text-destructive"
                          : isToday
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      }`}
                    >
                      {h}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Crowdsourced Tips */}
        <div className="mb-6">
          <h2 className="text-foreground font-bold text-base mb-3">Traveller Tips</h2>
          {tips.length > 0 ? (
            <div className="flex flex-col gap-3 mb-4">
              {tips.map((tip, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-4">
                  <p className="text-foreground text-sm leading-relaxed">"{tip.text}"</p>
                  {tip.author && (
                    <p className="text-muted-foreground text-xs mt-2">— {tip.author}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm mb-4">
              No tips yet. Be the first to share your experience!
            </p>
          )}

          {/* Add tip form */}
          <form onSubmit={handleAddTip} className="flex gap-2">
            <input
              type="text"
              value={tipText}
              onChange={(e) => setTipText(e.target.value)}
              placeholder="Share a quick tip..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!tipText.trim() || submittingTip}
              className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <BottomNav />
      <AddSpotFAB />
    </div>
  );
}
