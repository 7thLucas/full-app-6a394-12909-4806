# ZimSpots — Product Overview

## App Name
**ZimSpots**

## What It Is
A three-sided travel discovery platform focused on Zimbabwe, combining official government tourism data, crowdsourced local knowledge, and business self-service tools to create the definitive map of Zimbabwe's restaurants, lodges, hotels, national parks, and tour operators. Works offline in areas with no cellular signal.

## The Problem
Zimbabwe's travel and hospitality landscape is fragmented and poorly catalogued. International tourists can't easily discover verified local spots. Locals have no reliable go-to platform for dining and travel recommendations. Small businesses — restaurants, lodges, tour operators — rely entirely on word-of-mouth with no affordable digital presence. No single platform consolidates official, local, and business-managed travel information for Zimbabwe. Cellular signals drop entirely when travelling between towns or inside national parks like Hwange, Mana Pools, and Gonarezhou — making internet-dependent apps useless at precisely the moment a traveler needs them.

## The Solution — Three Data Layers

### 1. Official Seed Data (ZTA Partnership)
Baseline database sourced from the Zimbabwe Tourism Authority (ZTA) registry, supplemented by OpenStreetMap and Google Places API. Covers registered tour operators, hotels, national parks, and restaurants. Initial focus: Harare (MVP), expanding region by region.

### 2. Crowdsourced Additions ("Add a Spot")
Users — especially locals — drop a pin on a map, upload a photo, and list any restaurant or travel spot not in the official registry. Floating "+" button accessible from any main screen. Gamified with a Points system and achievement badges: "Zim Explorer," "Local Foodie," "Top Foodie." Contributions go live once peer-verified or admin-approved.

### 3. Owner Verification (B2B Portal)
Restaurant owners and lodge managers claim their listing for free via a dedicated B2B portal. Owners update: operational hours, menu PDFs, WhatsApp contact numbers, and promotional prices. Creates self-maintaining, always-current data at zero cost to the platform.

## Key Differentiator — Offline Regional Packs
Users download lightweight regional packs while on Wi-Fi (e.g., "Download Eastern Highlands Directory – 35 MB"). All coordinates, phone numbers, and descriptions are stored locally. The app works fully without internet — critical for Hwange, Mana Pools, Gonarezhou, and inter-city travel.

## Users
- **International tourists** visiting Zimbabwe (pre-trip planning and on-the-ground discovery)
- **Local residents** in Harare, Bulawayo, and Victoria Falls (dining, day trips, weekend travel)
- **Business owners** — restaurants, lodges, tour operators (managing and promoting their own listings)

## Geography & Regions
Five tourism clusters, each available as a downloadable offline pack:
1. Harare & Surrounds
2. Bulawayo & Matobo
3. Victoria Falls
4. The Eastern Highlands
5. Kariba & Great Zimbabwe

## Spot Categories
- 🍔 Restaurants
- ⛺ Lodging
- 🐆 Safari & Parks
- 🗺️ Historical Sites
- 🔥 Braai & Local Eats

## Key UI Features
- **Home Screen**: Greeting + search bar ("Find a spot, a meal, or an adventure…"), scrollable quick-filter pills by category, "Explore by Region" carousel, "Trending Near You" GPS grid with price-range indicators ($$)
- **Search / List View**: Map View / List View toggle; cards show venue image, bold name, Open Now / Closed badge (live by local time), amenity icons (Free Wi-Fi, Parking, EcoCash Accepted), GPS distance indicator
- **Detail Page**: Full-width hero image gallery, Quick-Action Dock (WhatsApp Chat, Call Direct, Navigate, View Menu/Rates), About description, weekly operating hours, Crowdsourced Tips section
- **Add a Spot**: Floating "+" button → pin drop or GPS auto-locate → photo upload → Name / Category / Contact fields → success animation + badge points
- **Offline Maps**: Download regional packs; internal offline map navigation falls back to Google Maps / Apple Maps coordinate handoff

## Payment & Contact
- **EcoCash Accepted** indicator on listing cards and detail pages
- **WhatsApp as the booking channel** — direct message link to business owner

## Brand & Tone
Local-first, community-driven, credible (ZTA-backed), approachable and gamified for locals, trustworthy and comprehensive for tourists. Warm and authentically Zimbabwean.

### Brand Colors
- **Primary**: Deep safari green — `#1E3F20`
- **Accent**: Sunset gold / terracotta — `#D97706`
- **Background**: Clean white

### Typography
- Inter or Roboto — clean sans-serif, highly legible in outdoor / bright sunlight conditions

## Performance Requirements
Optimized for older Android devices and slower mobile networks. Smart image caching (images don't reload constantly). Large, tappable touch targets throughout.

## MVP Scope
- **Phase 1 — Harare only**: Prove the full loop in one city — find, verify, add, claim — before national rollout
- Map-based discovery of ZTA-registered spots (all categories)
- "Add a Spot" crowdsourcing with Points and badge system (Zim Explorer, Local Foodie)
- B2B "Claim Your Listing" portal — hours, menu PDFs, WhatsApp contact, promotional prices
- Open Now / Closed badges based on listed operating hours
- Beta test: ~100 travelers and food-lovers in Harare

## Rollout Plan
1. Harare & Surrounds (MVP)
2. Bulawayo & Matobo
3. Victoria Falls
4. Eastern Highlands
5. Kariba & Great Zimbabwe

## Data Strategy Timeline
- **Month 1**: Scrape & Seed — ZTA registry + OpenStreetMap / Google Places API for Harare
- **Month 2+**: "Claim My Listing" loop — businesses self-maintain their data
- **Ongoing**: Crowdsourced pin-dropping fills undocumented gems

## Strategic Principles
- ZTA data partnership provides instant credibility and legal legitimacy at launch
- Crowdsourcing drives organic growth and local community engagement
- B2B portal creates self-maintaining data and a clear future premium monetization path
- Offline packs remove the connectivity barrier — critical in Zimbabwe's national parks and rural areas
- Three-sided network effect: more spots → more tourists → more businesses claim → better data → more tourists
