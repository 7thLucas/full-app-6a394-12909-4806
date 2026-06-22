import { Link } from "react-router";
import { Plus } from "lucide-react";

export function AddSpotFAB() {
  return (
    <Link
      to="/add-spot"
      className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center active:scale-90 transition-transform duration-150"
      style={{ boxShadow: "0 4px 16px rgba(217,119,6,0.35)" }}
      aria-label="Add a new spot"
    >
      <Plus className="w-6 h-6" strokeWidth={2.5} />
    </Link>
  );
}
