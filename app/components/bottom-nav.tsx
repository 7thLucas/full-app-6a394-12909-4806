import { Link, useLocation } from "react-router";
import { Compass, Search, Bookmark, User } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", icon: Compass, label: "Discover" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/saved", icon: Bookmark, label: "Saved" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-navbar-background border-t border-border"
      style={{ boxShadow: "0 -2px 12px rgba(0,0,0,0.08)" }}
    >
      <div className="flex items-center max-w-lg mx-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
          const isActive =
            to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-3 min-h-[56px]"
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-accent" : "text-muted-foreground"
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
