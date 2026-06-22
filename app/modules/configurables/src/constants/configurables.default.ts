/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  // Base
  background: string;
  foreground: string;
  // Card
  card: string;
  cardForeground: string;
  // Popover
  popover: string;
  popoverForeground: string;
  // Primary
  primary: string;
  primaryForeground: string;
  // Secondary
  secondary: string;
  secondaryForeground: string;
  // Muted
  muted: string;
  mutedForeground: string;
  // Accent
  accent: string;
  accentForeground: string;
  // Destructive
  destructive: string;
  destructiveForeground: string;
  // Border / Input / Ring
  border: string;
  input: string;
  ring: string;
  // Charts
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
  // Navbar
  navbarBackground: string;
  // Sidebar
  sidebarBackground: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type TFont = {
  headingFont: string;
  textFont: string;
};

export type TCategory = {
  id: string;
  label: string;
  icon?: string;
};

export type TRegion = {
  id: string;
  name: string;
  imageUrl?: string;
  isActive?: boolean;
};

export type TBadge = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  requiredSpots: number;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  font: TFont;
  // ZimSpots content fields
  tagline?: string;
  heroSubtitle?: string;
  searchPlaceholder?: string;
  categories?: TCategory[];
  regions?: TRegion[];
  badges?: TBadge[];
  showOfflinePacksFeature?: boolean;
  showCrowdsourcingFAB?: boolean;
  defaultRegion?: string;
  trendingGridColumns?: number;
  maxTrendingSpots?: number;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "ZimSpots",
  logoUrl: "",
  tagline: "Discover Zimbabwe",
  heroSubtitle: "Restaurants, lodges, parks & hidden local gems across Zimbabwe.",
  searchPlaceholder: "Find a spot, a meal, or an adventure...",
  categories: [
    { id: "restaurants", label: "Restaurants", icon: "UtensilsCrossed" },
    { id: "lodging", label: "Lodging", icon: "BedDouble" },
    { id: "safari", label: "Safari & Parks", icon: "Binoculars" },
    { id: "historical", label: "Historical Sites", icon: "Landmark" },
    { id: "braai", label: "Braai & Local Eats", icon: "Flame" },
  ],
  regions: [
    { id: "harare", name: "Harare", imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&q=80", isActive: true },
    { id: "bulawayo", name: "Bulawayo & Matobo", imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&q=80", isActive: false },
    { id: "victoria-falls", name: "Victoria Falls", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80", isActive: false },
    { id: "eastern-highlands", name: "Eastern Highlands", imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&q=80", isActive: false },
    { id: "kariba", name: "Kariba & Great Zimbabwe", imageUrl: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?w=400&q=80", isActive: false },
  ],
  badges: [
    { id: "zim-explorer", name: "Zim Explorer", description: "Add your first spot", icon: "Map", requiredSpots: 1 },
    { id: "local-foodie", name: "Local Foodie", description: "Add 5 food spots", icon: "UtensilsCrossed", requiredSpots: 5 },
    { id: "safari-scout", name: "Safari Scout", description: "Add 3 park or nature spots", icon: "Binoculars", requiredSpots: 10 },
    { id: "city-guide", name: "City Guide", description: "Add 20 spots total", icon: "Trophy", requiredSpots: 20 },
  ],
  showOfflinePacksFeature: true,
  showCrowdsourcingFAB: true,
  defaultRegion: "harare",
  trendingGridColumns: 2,
  maxTrendingSpots: 10,
  brandColor: {
    // Base
    background:        "#ffffff",
    foreground:        "#1a1a1a",
    // Card
    card:              "#fafaf7",
    cardForeground:    "#1a1a1a",
    // Popover
    popover:           "#ffffff",
    popoverForeground: "#1a1a1a",
    // Primary — Deep Safari Green
    primary:           "#1E3F20",
    primaryForeground: "#ffffff",
    // Secondary — warm off-white
    secondary:           "#f0f4f0",
    secondaryForeground: "#1a1a1a",
    // Muted
    muted:           "#f0f4f0",
    mutedForeground: "#6B7280",
    // Accent — Sunset Gold
    accent:           "#D97706",
    accentForeground: "#ffffff",
    // Destructive
    destructive:           "#DC2626",
    destructiveForeground: "#ffffff",
    // Border / Input / Ring
    border: "#E5E7EB",
    input:  "#E5E7EB",
    ring:   "#1E3F20",
    // Charts
    chart1: "#D97706",
    chart2: "#1E3F20",
    chart3: "#16A34A",
    chart4: "#DC2626",
    chart5: "#6B7280",
    // Navbar — bottom nav white
    navbarBackground: "#ffffff",
    // Sidebar
    sidebarBackground:        "#fafaf7",
    sidebarForeground:        "#1a1a1a",
    sidebarPrimary:           "#1E3F20",
    sidebarPrimaryForeground: "#ffffff",
    sidebarAccent:            "#f0f4f0",
    sidebarAccentForeground:  "#1a1a1a",
    sidebarBorder:            "#E5E7EB",
    sidebarRing:              "#1E3F20",
  },
  font: {
    headingFont: "Inter",
    textFont: "Inter",
  },
  // ─────────────────────────────────────────────────────────────────────
  // Add new field defaults here. See RULES.md §5 for per-type shape.
  // ─────────────────────────────────────────────────────────────────────
};
