import { Link } from "react-router";
import {
  User,
  Map,
  UtensilsCrossed,
  Binoculars,
  Trophy,
  ChevronRight,
  LogIn,
  Settings,
} from "lucide-react";
import { BottomNav } from "~/components/bottom-nav";
import { AddSpotFAB } from "~/components/add-spot-fab";
import { useAuth } from "~/modules/authentication";
import { useConfigurables } from "~/modules/configurables";

const BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Map,
  UtensilsCrossed,
  Binoculars,
  Trophy,
};

export default function ProfilePage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { config, loading } = useConfigurables();

  const badges = loading ? [] : (config?.badges || []);

  const defaultBadges = [
    { id: "zim-explorer", name: "Zim Explorer", description: "Add your first spot", icon: "Map", requiredSpots: 1 },
    { id: "local-foodie", name: "Local Foodie", description: "Add 5 food spots", icon: "UtensilsCrossed", requiredSpots: 5 },
    { id: "safari-scout", name: "Safari Scout", description: "Add 10 spots", icon: "Binoculars", requiredSpots: 10 },
    { id: "city-guide", name: "City Guide", description: "Add 20 spots", icon: "Trophy", requiredSpots: 20 },
  ];

  const displayBadges = badges.length > 0 ? badges : defaultBadges;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="px-4 pt-12 pb-4 border-b border-border">
          <h1 className="text-foreground font-bold text-xl">Profile</h1>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-foreground font-bold text-lg mb-2">Join ZimSpots</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-xs">
            Sign up to earn explorer badges, save your favourite spots, and contribute to Zimbabwe's travel community.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Link
              to="/auth/register"
              className="w-full py-3.5 rounded-2xl bg-accent text-accent-foreground font-bold text-sm text-center"
            >
              Create Account
            </Link>
            <Link
              to="/auth/login"
              className="w-full py-3.5 rounded-2xl border border-border text-foreground font-medium text-sm text-center flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Link>
          </div>

          {/* Preview badges */}
          <div className="mt-10 w-full max-w-xs">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-3 text-center">
              Explorer Badges
            </p>
            <div className="grid grid-cols-2 gap-3">
              {displayBadges.map((badge) => {
                const Icon = BADGE_ICONS[badge.icon || ""] || Trophy;
                return (
                  <div
                    key={badge.id}
                    className="bg-card border border-border rounded-2xl p-3 flex flex-col items-center text-center opacity-40"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground text-xs font-bold leading-tight">{badge.name}</p>
                    <p className="text-muted-foreground text-[10px] mt-0.5">{badge.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <BottomNav />
        <AddSpotFAB />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary px-4 pt-12 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-primary-foreground font-bold text-xl">Profile</h1>
          <button className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center">
            <Settings className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
            <User className="w-8 h-8 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-primary-foreground font-bold text-lg">{user?.username || "Explorer"}</h2>
            <p className="text-primary-foreground/70 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Spots Added", value: "0" },
            { label: "Tips Shared", value: "0" },
            { label: "Saved", value: "0" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-3 text-center">
              <p className="text-foreground font-bold text-xl">{value}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="px-4 mb-6">
        <h2 className="text-foreground font-bold text-base mb-3">Explorer Badges</h2>
        <div className="grid grid-cols-2 gap-3">
          {displayBadges.map((badge) => {
            const Icon = BADGE_ICONS[badge.icon || ""] || Trophy;
            const earned = false; // For MVP
            return (
              <div
                key={badge.id}
                className={`bg-card border border-border rounded-2xl p-4 flex flex-col items-center text-center ${
                  !earned ? "opacity-40" : ""
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    earned ? "bg-accent" : "bg-secondary"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${earned ? "text-accent-foreground" : "text-primary"}`} />
                </div>
                <p className="text-foreground text-sm font-bold leading-tight">{badge.name}</p>
                <p className="text-muted-foreground text-xs mt-1">{badge.description}</p>
                {!earned && (
                  <p className="text-muted-foreground text-[10px] mt-1.5">
                    {badge.requiredSpots} spot{badge.requiredSpots !== 1 ? "s" : ""} needed
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Menu items */}
      <div className="px-4 mb-6">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {[
            { label: "My Submitted Spots", to: "/search" },
            { label: "Saved Spots", to: "/saved" },
            { label: "Settings", to: "/auth/login" },
          ].map(({ label, to }, i) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center justify-between px-4 py-4 ${
                i !== 0 ? "border-t border-border" : ""
              }`}
            >
              <span className="text-foreground text-sm font-medium">{label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4">
        <Link
          to="/auth/logout"
          className="w-full py-4 rounded-2xl border border-destructive text-destructive font-semibold text-sm text-center block"
          onClick={(e) => {
            e.preventDefault();
            fetch("/auth/logout", { method: "POST" }).then(() => window.location.href = "/");
          }}
        >
          Sign Out
        </Link>
      </div>

      <BottomNav />
      <AddSpotFAB />
    </div>
  );
}
