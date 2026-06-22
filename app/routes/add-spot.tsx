import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Camera,
  MapPin,
  CheckCircle,
  Trophy,
  Loader2,
  X,
} from "lucide-react";
import { BottomNav } from "~/components/bottom-nav";

const CATEGORIES = [
  { id: "restaurants", label: "Restaurant" },
  { id: "lodging", label: "Lodging" },
  { id: "safari", label: "Safari & Parks" },
  { id: "historical", label: "Historical Site" },
  { id: "braai", label: "Braai & Local Eats" },
  { id: "other", label: "Other" },
];

type Step = "details" | "photos" | "success";

export default function AddSpotPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("details");
  const [loading, setLoading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [createdSpotId, setCreatedSpotId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    phoneNumber: "",
    whatsappNumber: "",
    priceRange: "",
    hasFreeWifi: false,
    hasParking: false,
    acceptsEcocash: false,
  });

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/uploader/image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.data?.url) {
        const fullUrl = data.data.url.startsWith("http")
          ? data.data.url
          : `${window.location.origin}${data.data.url}`;
        setUploadedPhotos((prev) => [...prev, fullUrl]);
      }
    } catch {
      // silently fail
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.category) return;
    setLoading(true);
    try {
      const res = await fetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          photos: uploadedPhotos,
          region: "harare",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCreatedSpotId(data.data._id);
        setStep("success");
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center pb-24">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-foreground text-2xl font-bold mb-2">Spot Added!</h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-xs">
          Thanks for contributing to ZimSpots! Your spot has been submitted and will be visible shortly.
        </p>

        {/* Badge earned */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-5 mb-8 w-full max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-accent-foreground" />
            </div>
            <div className="text-left">
              <p className="text-foreground font-bold text-sm">Badge Earned!</p>
              <p className="text-accent font-semibold text-base">Zim Explorer</p>
              <p className="text-muted-foreground text-xs">First spot submitted</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {createdSpotId && (
            <button
              onClick={() => navigate(`/spot/${createdSpotId}`)}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm"
            >
              View Your Spot
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 rounded-2xl border border-border text-foreground font-medium text-sm"
          >
            Back to Discover
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b border-border px-4 pt-12 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-foreground font-bold text-lg">Add a Spot</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Location Pin prompt */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-foreground font-semibold text-sm">Location</p>
            <p className="text-muted-foreground text-xs mt-0.5">
              Using current GPS location for Harare. Enter address below.
            </p>
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="text-foreground font-semibold text-sm block mb-2">
            Photos
          </label>
          <div className="flex gap-3 flex-wrap">
            {uploadedPhotos.map((url, i) => (
              <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden">
                <img src={url} alt="uploaded" className="w-full h-full object-cover" />
                <button
                  onClick={() => setUploadedPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            <label className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer bg-secondary hover:bg-muted transition-colors">
              {uploadingPhoto ? (
                <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
              ) : (
                <>
                  <Camera className="w-5 h-5 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Add Photo</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={uploadingPhoto}
              />
            </label>
          </div>
        </div>

        {/* Spot Name */}
        <div>
          <label className="text-foreground font-semibold text-sm block mb-2">
            Spot Name <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Gava's Restaurant"
            className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-foreground font-semibold text-sm block mb-2">
            Category <span className="text-destructive">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm outline-none focus:ring-2 focus:ring-primary appearance-none"
          >
            <option value="">Select a category...</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="text-foreground font-semibold text-sm block mb-2">
            Address
          </label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="e.g. 14 Sam Levy Village, Borrowdale"
            className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-foreground font-semibold text-sm block mb-2">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Tell people what makes this spot special..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Phone & WhatsApp */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-foreground font-semibold text-sm block mb-2">Phone</label>
            <input
              type="tel"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              placeholder="+263..."
              className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-foreground font-semibold text-sm block mb-2">WhatsApp</label>
            <input
              type="tel"
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              placeholder="+263..."
              className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="text-foreground font-semibold text-sm block mb-2">Price Range</label>
          <div className="flex gap-2">
            {["$", "$$", "$$$"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setForm({ ...form, priceRange: form.priceRange === p ? "" : p })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                  form.priceRange === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-muted-foreground border-transparent"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="text-foreground font-semibold text-sm block mb-3">Amenities</label>
          <div className="flex flex-col gap-3">
            {[
              { key: "hasFreeWifi", label: "Free Wi-Fi" },
              { key: "hasParking", label: "Parking Available" },
              { key: "acceptsEcocash", label: "Accepts EcoCash" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    form[key as keyof typeof form]
                      ? "bg-primary border-primary"
                      : "bg-transparent border-border"
                  }`}
                  onClick={() => setForm({ ...form, [key]: !form[key as keyof typeof form] })}
                >
                  {form[key as keyof typeof form] && (
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <span className="text-foreground text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!form.name || !form.category || loading}
          className="w-full py-4 rounded-2xl bg-accent text-accent-foreground font-bold text-base disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ minHeight: "52px" }}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Submit Spot"
          )}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
