# ZimSpots — Zimbabwe's Travel Discovery Platform

## Product Summary
ZimSpots is a mobile-first travel and local discovery app for Zimbabwe. It solves the core problem of poorly catalogued restaurants, lodges, national parks, and hidden local gems — especially off-grid spots that don't appear on Google Maps.

## Target Users
- **International tourists** visiting Zimbabwe (Victoria Falls, safari parks, Great Zimbabwe)
- **Local residents** navigating their own cities (Harare, Bulawayo, etc.)

## Brand & Tone
- Warm, premium, and authentically Zimbabwean
- Feels like a trusted local guide — not a generic directory
- Celebrates Zimbabwe's natural beauty, cuisine, and culture
- Approachable and adventurous; empowering for both tourists and locals

## MVP Core Features

### 1. Discovery Hub (Home Screen)
- Search bar with placeholder: "Find a spot, a meal, or an adventure..."
- Horizontal quick-filter pills: Restaurants, Lodging, Safari & Parks, Historical Sites, Braai & Local Eats
- "Explore by Region" horizontal carousel: Harare, Bulawayo & Matobo, Victoria Falls, Eastern Highlands, Kariba & Great Zimbabwe
- "Trending Near You" GPS-based 2-column image grid with price range indicators

### 2. Search & Directory (List/Map Toggle)
- Map View and List View toggle
- List cards: venue photo, business name, Open Now/Closed status badge (real-time), amenity icons (Free Wi-Fi, Parking, EcoCash Accepted), distance indicator (GPS-based)

### 3. Business Detail Page
- Full-width hero image gallery (3–5 photos) with bookmark/save button
- Quick-Action Dock: WhatsApp Chat, Call Direct, Navigate (offline map or Google Maps handoff), View Menu/Rates (PDF/image)
- About description, operating hours by day, physical address
- Crowdsourced Tips section

### 4. Add a New Spot (Crowdsourcing)
- Floating "+" FAB accessible from all main screens
- Flow: drop pin on map / use GPS → snap/upload photo → fill Name, Category, Contact Number → submit with success animation + badge progress (Zim Explorer, Local Foodie badges)

### 5. Seed Data — Harare Launch City
- Pre-populated with realistic Zimbabwean business names and locations across Harare
- Categories: restaurants, cafes, historical sites, lodges

## Offline Capability
- Architecture supports downloadable "Regional Packs" — lightweight bundles (coordinates, phone numbers, descriptions) stored locally for offline use in national parks and remote areas

## Payment Context
- EcoCash (Zimbabwe's dominant mobile payment) shown as accepted payment indicator on listings

## WhatsApp Integration
- WhatsApp numbers on every business listing; primary booking/contact method

## Strategic Principles
- Big tappable areas for outdoor sunlight use
- Smart image caching optimised for older Android devices and slow mobile networks
- Harare is MVP launch region; other regions visible but marked "Coming Soon"
