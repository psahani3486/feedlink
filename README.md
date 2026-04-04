# 🍱 FeedLink X — AI-Powered Food Donation & Hunger Management Platform

> **Codename:** FeedLink X
> **Tagline:** _Stop Food Waste. Feed India._
> **Category:** Social Impact · AI/ML · Full-Stack · System Design

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?logo=chartdotjs)](https://chartjs.org)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet)](https://leafletjs.com)

---

## 🎯 Problem Statement

**India wastes ~68.8 million tonnes of food annually** while **190 million people go hungry every day.** The core problem is the disconnect between food surplus and food demand — restaurants throw away perfectly good food while shelters starve a few kilometers away.

**FeedLink X** bridges this gap using **AI-powered matching, real-time tracking, and intelligent logistics** to connect food donors → NGOs → volunteers → beneficiaries in real time.

---

## 🚀 Live Demo

```bash
git clone <repo-url>
cd feedlink-x
npm install
npm run dev
# → http://localhost:3000
```

> **Zero configuration required.** No API keys, no database setup, no backend server. Everything runs client-side with realistic simulated data.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FEEDLINK X PLATFORM                       │
├──────────┬──────────┬───────────┬──────────┬──────────┬─────────┤
│  Donor   │   NGO    │ Volunteer │Benefic.  │Corporate │  Admin  │
│Dashboard │Dashboard │  Panel    │ Portal   │CSR Panel │Analytics│
├──────────┴──────────┴───────────┴──────────┴──────────┴─────────┤
│                     SHARED COMPONENTS LAYER                      │
│  Navbar │ StatsCard │ Charts │ MapComponent │ QR │ Modals       │
├─────────────────────────────────────────────────────────────────┤
│                      AI / ML ENGINE LAYER                        │
│ ShelfLife │ SmartMatch │ DemandPredict │ RouteOptimize │ Fraud  │
│ Prediction│  Engine   │    Engine     │     Engine    │Detection│
│           │           │              │               │& Trust  │
├─────────────────────────────────────────────────────────────────┤
│                      SPECIAL MODULES                             │
│ Community │ Disaster │ Sustainability │ Redistribution │ ESG    │
│  Fridges  │  Relief  │   & Carbon     │   Pipeline     │Reports │
├─────────────────────────────────────────────────────────────────┤
│                    DATA & STATE LAYER                             │
│  React Context │ Mock Data (All-India) │ localStorage Persistence│
└─────────────────────────────────────────────────────────────────┘
```

---

## 📱 Features In-Depth

### 1. 🍽️ Donor Dashboard (`/donor`)

**What it does:** Restaurants, hotels, and event caterers can list surplus food for donation.

**How to use:**
1. Click **"+ New Donation"** to open the donation form
2. Select food type (Cooked Meals, Rice, Bread, Dairy, etc.)
3. Enter quantity, temperature, and hours since cooking
4. **AI Shelf-Life Prediction** updates in real-time as you fill the form
5. See **AI-recommended NGOs** ranked by distance, capacity, and urgency
6. Get **Smart Packaging Instructions** generated per food category
7. Submit — donation enters the pipeline

**Key features:**
- 🧠 Real-time AI shelf-life prediction with confidence scores
- 🎯 Weighted matching algorithm (distance 35%, capacity 25%, urgency 20%, rating 10%, history 10%)
- 📦 Smart packaging tips per food category
- 📊 Donation history with status tracking
- 📄 Tax report preview (CSR-ready)

**Tech used:** React state management, AI shelf-life engine with temperature-adjusted decay curves, Haversine distance calculation for proximity matching.

---

### 2. 🏥 NGO Dashboard (`/ngo`)

**What it does:** NGOs manage incoming donations, track storage, and forecast demand.

**How to use:**
1. View **incoming donation requests** with urgency badges
2. Click **Accept** or **Reject** for each donation
3. Monitor **Storage Capacity** gauges (Refrigerated, Dry, Hot Holding, Frozen)
4. View **AI Demand Forecast** — 7-day prediction chart
5. Switch between **Incoming / Active / Completed** tabs
6. Track food category distribution

**Key features:**
- 📊 4-zone storage capacity tracking with visual gauges
- 🧠 AI demand forecasting (population × time × day × seasonal factors)
- 📦 Accept/reject workflow with urgency-based sorting
- 📋 Complete delivery log and category analytics

**Tech used:** Chart.js for demand visualization, AI demand prediction engine using population weights for 15 Indian cities, time-of-day and seasonal multipliers.

---

### 3. 🚴 Volunteer Panel (`/volunteer`)

**What it does:** Volunteers find nearby pickups, track deliveries, and earn rewards.

**How to use:**
1. Toggle **Online/Offline** availability
2. Browse **Nearby Pickups** with urgency indicators
3. Click **Accept** to start a delivery
4. Follow the **Step-by-Step Tracker** (Assigned → En Route → Picked Up → Delivering → Delivered)
5. Click **Scan QR** to verify pickup/delivery
6. Earn **Points & Badges** for each delivery

**Key features:**
- 📍 Proximity-based pickup notifications
- 📱 QR code verification (generated per donation)
- 🏅 Gamification: 8 badges (First Delivery → Legend), points system, leaderboard
- 🗺️ Delivery step tracker with visual progress
- 📊 Personal stats and delivery history

**Tech used:** `qrcode.react` for QR generation, gamification engine with threshold-based badge unlocking, leaderboard sorting by points.

---

### 4. 🧊 Smart Community Fridge Network (`/fridge`)

**What it does:** Monitors IoT-enabled public food fridges across India.

**How to use:**
1. Browse the **fridge list** — each shows fill level, temperature, and status
2. Click a fridge to see **detailed IoT metrics**: fill %, temperature, spoilage risk
3. View **24-hour activity chart** showing usage patterns
4. Compare **city-wise daily usage** in the bar chart
5. Request refill or generate QR access code

**Key features:**
- 🌡️ Real-time temperature monitoring with safe-zone indicators
- 📊 Fill-level gauges with color-coded status (Active/Needs Refill/Critical)
- ⚠️ AI spoilage risk assessment based on temperature and fill time
- 🔐 QR-based unlock system
- 📈 24-hour usage patterns and city-wise analytics

**Why this is powerful:** Transforms the platform from a donation app into **smart public food infrastructure** — like a network of ATMs, but for food.

**Tech used:** Line charts for temporal data, progress bars for IoT gauges, color-coded status system.

---

### 5. 🤲 Beneficiary Portal (`/beneficiary`)

**What it does:** People in need can find meals, reserve food slots, and access resources.

**How to use:**
1. View **available meal slots** (Breakfast, Lunch, Snacks, Dinner)
2. Click **Reserve Slot** for a time window
3. Receive a **4-digit OTP** for pickup verification
4. Browse **nearby community fridges** with availability status
5. Set **dietary preferences** (Vegetarian, Halal, Jain, etc.)

**Key features:**
- 🕐 Time-slotted meal reservation with real-time availability
- 🔐 OTP-based pickup verification (anti-fraud)
- 🧊 Nearby fridge finder with fill-level status
- 🥗 Dietary preference filtering (7 categories)
- 👨‍👩‍👧‍👦 Priority system: Critical (pregnant/elderly/children) → High → Medium → General
- 📋 10 beneficiary types: Shelters, Orphanages, Labor Camps, Students, Elderly, Women, Slums, Tribal

**Why this is unique:** Most food platforms are donor-centric. This creates a **receiver-side experience**, dramatically increasing real-world utility.

**Tech used:** Slot-based reservation system, OTP generation, priority queue logic.

---

### 6. 🏢 CSR & Corporate Dashboard (`/corporate`)

**What it does:** Enterprise sponsorship tracking with ESG scoring and tax documentation.

**How to use:**
1. Browse **corporate partner cards** (Diamond/Platinum/Gold tiers)
2. Click a company to see their **ESG Report** (Environmental/Social/Governance scores)
3. View **CSR impact trends** (meals vs CO₂ over 12 months)
4. Check **sector-wise distribution** of corporate partnerships
5. Export tax documentation (PDF-ready)

**Key features:**
- 📊 AI-generated ESG reports with AAA-BBB ratings
- 💎 Tiered partnership system (Diamond → Gold)
- 📈 12-month CSR trend analysis (meals + CO₂ on dual-axis chart)
- 🏭 Sector distribution (IT, Banking, Energy, FoodTech, Conglomerate)
- 📄 Tax report export capability
- 🎯 SDG scorecard per company

**Why this is gold:** Recruiters love when student projects include **business monetization + enterprise dashboards**. Shows product thinking.

**Tech used:** ESG calculation engine, dual-axis Chart.js, tier-based categorization.

---

### 7. 🚨 Emergency Relief Mode (`/emergency`)

**What it does:** Switches platform to disaster response for floods, earthquakes, heatwaves, cyclones.

**How to use:**
1. See **active disaster events** with severity badges (Critical/High/Medium)
2. Click an event to view its **relief camps**
3. Monitor **supply levels** per camp (Water/Food/Medical %)
4. View **priority families** table (Pregnant, Elderly, Children, Disabled)
5. Take **quick actions**: Broadcast alert, deploy volunteers, request supplies

**Key features:**
- 🌊 4 disaster types: Flood, Heatwave, Earthquake, Cyclone
- ⛺ Relief camp management with occupancy tracking
- 📊 Supply-level monitoring (Water/Food/Medical bar charts)
- 👨‍👩‍👧‍👦 Priority group management (Pregnant → Children → Elderly → General)
- ⚡ Quick action buttons for emergency coordination
- 🔴 Pulsing "EMERGENCY MODE ACTIVE" indicator

**Why this is powerful:** Can be used in **hackathons, social impact competitions, and gov-tech proposals**.

**Tech used:** Event-based state management, supply chain monitoring, bar charts for supply levels.

---

### 8. 🌍 Carbon Impact & Sustainability (`/sustainability`)

**What it does:** Environmental impact dashboard showing CO₂, water, methane, and SDG alignment.

**How to use:**
1. View the **3 hero cards**: CO₂ Saved, Water Saved, Trees Equivalent
2. Check SDG goal progress (Goals 1, 2, 3, 12, 13, 17)
3. Analyze **Carbon Savings vs Waste** trend over 12 months
4. See **impact by food category** breakdown
5. Explore **real-world equivalents** (car rides, flights, showers eliminated)

**Key features:**
- 🌿 CO₂, methane, water, and landfill metrics
- 🎯 UN SDG alignment with 6 goals tracked
- 📈 12-month carbon savings trend
- 🍽️ Category-wise impact breakdown
- 🚗 Real-world equivalents (car rides, flights, tree plantations, showers)
- 💧 Water savings distribution doughnut chart

**Why this is unique:** Very powerful for **sustainability startups, CSR companies, and gov-tech** pitches.

**Tech used:** Carbon impact calculation engine with scientific conversion factors, SDG mapping algorithm.

---

### 9. 📊 Admin Analytics (`/admin`)

**What it does:** Platform-wide monitoring with fraud detection and redistribution pipeline.

**Key features (enhanced with AI Fraud Engine):**
- 🛡️ **AI Fraud Detection Engine** with 7 alert types:
  - Location mismatch detection
  - Duplicate claim blocking
  - Spoiled food risk alerts
  - Volume anomaly detection
  - QR code reuse detection
  - Pattern abuse flagging
  - Identity fraud detection
- 📊 **Trust Score System**: Average trust scores for Donors (87%), NGOs (91%), Volunteers (84%)
- 🔄 **Smart Inventory Redistribution**: NGO→NGO surplus transfer pipeline with urgency tracking
- 📈 8 KPI cards, 4 chart types, NGO performance table

---

### 10. 📍 Live Map (`/map`)

**What it does:** Full-screen interactive map of India with all platform entities.

**Key features:**
- 🗺️ Dark-themed Leaflet map with OpenStreetMap tiles
- 🟢 20 donor markers (restaurants across 15 cities)
- 🔵 15 NGO location markers
- 🟡 16+ volunteer markers (online/available)
- 🔴 Demand heatmap zones (10 cities, sized by demand intensity)
- 🔍 Filter controls (Donors/NGOs/Volunteers/Demand)
- 📋 Click-to-select detail panel + sidebar stats

---

## 🤖 AI/ML Engines (7 Total)

| # | Engine | Algorithm | Inputs | Outputs |
|---|--------|-----------|--------|---------|
| 1 | **Shelf-Life Prediction** | Temperature-adjusted decay curves | Food type, temp, time since cooking | Hours remaining, risk level, quality %, packaging tips |
| 2 | **Smart Matching** | Weighted scoring (Haversine + multi-factor) | Donor location, NGO list, urgency | Ranked matches with scores, ETA, match reasoning |
| 3 | **Demand Prediction** | Population × time × day × seasonal model | City, hour, day of week | Predicted meals, trend direction, peak hours |
| 4 | **Route Optimization** | Nearest-neighbor TSP with 2-opt improvement | Start location, delivery stops | Optimized route, total distance, per-stop ETA |
| 5 | **Food Quality Assessment** | Rule-based multi-factor scoring | Appearance, smell, temp, packaging | Quality score (0-100), verdict, recommendations |
| 6 | **Fraud Detection** | Anomaly detection + trust scoring | Entity history, location, patterns | Trust score, risk level, flagged anomalies |
| 7 | **Sustainability Calculator** | Scientific CO₂/water/methane conversion | Food saved (kg) | CO₂, water, methane, SDG impact, ESG scores |

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 (App Router) | Server components, file-based routing, performance |
| **UI** | React 19 | Latest concurrent features, hooks |
| **Styling** | Vanilla CSS | Full control, dark mode, glassmorphism, 900+ lines of design system |
| **Charts** | Chart.js 4 + react-chartjs-2 | Beautiful, responsive data visualization |
| **Maps** | Leaflet + react-leaflet | Open-source, zero API key, dark tiles |
| **QR** | qrcode.react | SVG QR code generation per donation |
| **Animation** | Framer Motion + CSS keyframes | Smooth micro-animations, hover effects |
| **State** | React Context + useReducer | Global state without external dependencies |
| **Data** | In-memory + localStorage | Zero backend, instant startup |
| **Fonts** | Inter + Outfit (Google Fonts) | Premium typography |

---

## 📁 Project Structure

```
feedlink-x/
├── app/                          # Next.js pages (12 routes)
│   ├── page.js                   # Landing page
│   ├── layout.js                 # Root layout + providers
│   ├── globals.css               # 900+ line design system
│   ├── donor/page.js             # Donor dashboard
│   ├── ngo/page.js               # NGO dashboard
│   ├── volunteer/page.js         # Volunteer panel
│   ├── fridge/page.js            # Community fridges
│   ├── beneficiary/page.js       # Beneficiary portal
│   ├── corporate/page.js         # CSR dashboard
│   ├── emergency/page.js         # Disaster relief
│   ├── sustainability/page.js    # Carbon impact
│   ├── admin/page.js             # Admin analytics
│   └── map/page.js               # Live map
├── ai/                           # AI/ML engines (7 modules)
│   ├── shelfLife.js              # Shelf-life prediction
│   ├── smartMatch.js             # Donor→NGO→Volunteer matching
│   ├── demandPredict.js          # Demand forecasting
│   ├── routeOptimize.js          # TSP route optimization
│   ├── foodQuality.js            # Food quality assessment
│   ├── fraudDetection.js         # Fraud detection + trust scores
│   └── sustainability.js         # Carbon impact + ESG
├── components/                   # Shared UI components
│   ├── Navbar.js                 # Global navigation (11 links)
│   ├── StatsCard.js              # Animated counter cards
│   ├── MapComponent.js           # Leaflet wrapper
│   └── Charts.js                 # Chart.js wrappers
├── context/
│   └── AppContext.js             # Global state management
├── data/
│   ├── mockData.js               # Core data (donors, NGOs, volunteers)
│   └── extendedData.js           # Premium data (fridges, disasters, CSR)
└── public/
```

---

## 🧪 Challenges Faced & Solutions

### 1. Server-Side Rendering with Leaflet
**Problem:** Leaflet requires `window` object which doesn't exist during SSR in Next.js.
**Solution:** Used `next/dynamic` with `{ ssr: false }` for all map components.

### 2. Real-time Data Simulation
**Problem:** No backend = no real-time updates.
**Solution:** Used `setInterval` with React state to simulate live activity feeds refreshing every 8 seconds, creating a convincing real-time experience.

### 3. AI Engine Performance
**Problem:** Running 7 AI engines on the client could cause lag.
**Solution:** All AI calculations are memoized with `useMemo`, only re-computing when inputs change. Haversine distance and scoring are O(n) efficient.

### 4. Chart.js in React 19
**Problem:** Chart.js requires explicit component registration in newer React.
**Solution:** Centralized chart registration in `Charts.js` wrapper with ChartJS.register() for all scale types.

### 5. Dark Mode Map Tiles
**Problem:** Default OpenStreetMap tiles look jarring in dark mode.
**Solution:** Used CartoDB dark_all tiles which provide a sleek dark-themed map matching the UI.

### 6. State Management Scale
**Problem:** 12 pages sharing donation data, notifications, and user roles.
**Solution:** Single React Context with useReducer handling 7 action types, keeping state predictable and debuggable.

---

## 🔮 Future Improvements

1. **Backend Integration**: Node.js/Express API + PostgreSQL database
2. **Real GPS Tracking**: WebSocket-based volunteer location streaming
3. **ML Model Training**: TensorFlow.js shelf-life model trained on real food data
4. **WhatsApp/SMS**: Twilio integration for NGO notifications
5. **Image-Based Quality**: CNN model for food freshness detection from photos
6. **NLP Chatbot**: GPT-powered support for donors, volunteers, and NGOs
7. **Mobile Apps**: React Native versions for Volunteer and Beneficiary
8. **Blockchain**: Immutable donation tracking for transparency
9. **Government API**: Integration with FSSAI and food safety databases
10. **Payment Gateway**: Razorpay integration for corporate meal sponsorship

---

## 📊 Impact Metrics (Simulated)

| Metric | Value |
|--------|-------|
| Meals Delivered | 128,940+ |
| Food Saved | 45,678 kg |
| CO₂ Reduced | 18,920 kg |
| Water Saved | 913,560 liters |
| Active Volunteers | 487 |
| NGOs Connected | 15 |
| Cities Covered | 15 |
| Community Fridges | 12 |
| Corporate Partners | 6 |
| Disaster Events Managed | 4 |

---

## 🎓 How to Explain in Interviews

### "Tell me about your project"
> "FeedLink X is an AI-powered platform that connects food surplus from restaurants to NGOs and people in need. It uses 7 AI engines including shelf-life prediction, smart matching, and fraud detection. The platform covers 12 dashboards including community fridge monitoring, disaster relief coordination, CSR tracking, and sustainability metrics — all with a premium dark-mode UI and interactive maps."

### "What makes it unique?"
> "Three things make it stand out: First, it has a **Beneficiary Portal** — most food apps are donor-centric, but we created a receiver-side experience with meal slot reservations and OTP pickup. Second, the **Community Fridge Network** transforms it from a donation app into smart public infrastructure. Third, the **AI Fraud Detection Engine** with trust scoring prevents abuse at scale."

### "What was the hardest part?"
> "Designing the Smart Matching Engine. I had to balance 5 competing factors — distance, capacity, urgency, reliability, and performance — using weighted scoring with Haversine distance calculations. Getting the weights right so the algorithm produces sensible matches for edge cases (e.g., urgent but distant vs. nearby but full) required significant testing."

---

## 📄 License

MIT License — Built for social impact. 🌱

---

<p align="center">
  <strong>🍱 FeedLink X</strong> — Built with ❤️ to fight hunger across India<br/>
  <em>Every meal counts. Every line of code matters.</em>
</p>
