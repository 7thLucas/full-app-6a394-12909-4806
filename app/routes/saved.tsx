import { Bookmark } from "lucide-react";
import { Link } from "react-router";
import { BottomNav } from "~/components/bottom-nav";
import { AddSpotFAB } from "~/components/add-spot-fab";

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 border-b border-border">
        <h1 className="text-foreground font-bold text-xl">Saved Spots</h1>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Bookmark className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-foreground font-bold text-lg mb-2">No saved spots yet</h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-xs">
          Tap the bookmark icon on any spot to save it for later — perfect for offline planning.
        </p>
        <Link
          to="/"
          className="px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm"
        >
          Discover Spots
        </Link>
      </div>

      <BottomNav />
      <AddSpotFAB />
    </div>
  );
}
