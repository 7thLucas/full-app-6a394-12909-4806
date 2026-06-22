# ZimSpots Design Guidelines

## Color Palette
- **Primary:** Deep Safari Green `#1E3F20`
- **Accent:** Sunset Gold / Terracotta `#D97706`
- **Background:** Clean White `#FFFFFF`
- **Surface:** Warm off-white `#FAFAF7`
- **Text Primary:** Near-black `#1A1A1A`
- **Text Secondary:** Medium grey `#6B7280`
- **Success / Open badge:** `#16A34A`
- **Closed badge:** `#DC2626`
- **Border / Divider:** `#E5E7EB`

## Typography
- **Font Family:** Inter (primary), fallback Roboto, system-ui
- **H1 (Screen titles):** 28px / Bold / `#1A1A1A`
- **H2 (Section headers):** 20px / SemiBold / `#1A1A1A`
- **H3 (Card titles):** 16px / SemiBold / `#1A1A1A`
- **Body:** 14px / Regular / `#1A1A1A`
- **Caption / Label:** 12px / Medium / `#6B7280`
- All text must be legible in direct outdoor sunlight — high contrast ratios preferred

## Elevation & Shadows
- Cards: `box-shadow: 0 2px 8px rgba(0,0,0,0.10)`
- Bottom nav / docks: `box-shadow: 0 -2px 12px rgba(0,0,0,0.08)`
- FAB: `box-shadow: 0 4px 16px rgba(217,119,6,0.35)` (gold glow)
- Modal sheets: `box-shadow: 0 -4px 24px rgba(0,0,0,0.15)`

## Components

### Buttons
- **Primary CTA:** Background `#D97706`, text white, border-radius 12px, height 52px, bold font — large tap target
- **Secondary:** Border `#1E3F20`, text `#1E3F20`, transparent background
- **Destructive:** Red `#DC2626`
- **Icon Buttons (Quick-Action Dock):** Rounded square 60×60px, background `#F0F4F0`, icon `#1E3F20`

### Cards
- Border-radius: 16px
- Image aspect ratio: 16:9 for list cards, square for grid tiles
- Amenity icons: small pill badges, background `#F0F4F0`
- Price range: amber text on white background

### Filter Pills
- Active: Background `#1E3F20`, text white, border-radius 20px
- Inactive: Background `#F0F4F0`, text `#6B7280`

### Status Badges
- Open Now: Green dot + "Open Now" — background `#DCFCE7`, text `#16A34A`
- Closed: Red dot + "Closed" — background `#FEE2E2`, text `#DC2626`

### Bottom Navigation
- 4 tabs: Discover, Search, Saved, Profile
- Active tab: icon `#D97706` (gold), label `#D97706`
- Inactive: icon `#9CA3AF`, label `#9CA3AF`
- Background white with top shadow

### FAB (Add a Spot)
- Size: 56×56px, background `#D97706`, white "+" icon
- Positioned bottom-right, above bottom nav
- Gold drop shadow for premium lift

### Region Carousel Cards
- Height ~120px, full-bleed background image, gradient overlay
- Region name in white bold text bottom-left
- Rounded corners 12px

## Layout Principles
- Bottom-navigation based (mobile-first)
- Minimum touch target: 44×44px
- Generous padding: 16px horizontal margins, 12px vertical spacing between cards
- Section headers + "See All" links on same row
- Skeleton loading states for all image-heavy views
- Pull-to-refresh on list/discovery screens

## Iconography
- Lucide Icons (clean, outlined)
- Icon size: 24px standard, 20px in navigation

## Imagery Style
- Rich, warm photography — golden hour landscapes, vibrant food, wildlife
- Placeholder images using Unsplash landscape/food/africa queries
- Slight warm tint overlay on region cards to evoke Zimbabwean sunsets

## Micro-interactions
- FAB: scale bounce on press
- Badge earned: confetti burst + slide-up toast notification
- Card press: subtle scale-down (0.97) feedback
- Filter pill selection: smooth color transition 150ms
