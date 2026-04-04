# 🍱 FeedLink X — AI-Powered Food Surplus & Hunger Management

## 🎯 Project Overview
**FeedLink X** is a high-performance, full-stack Next.js application designed to eliminate food waste by bridging the gap between food donors (hotels, caterers, restaurants) and those in need (NGOs, shelters, beneficiaries). 

The platform has transitioned from a mock-data prototype to a **production-ready architecture** backed by **Neon PostgreSQL**, featuring AI-driven logistics, real-time IoT monitoring simulations, and 100% data persistence.

---

## 🏗️ System Architecture

### Three-Tier Architecture Overview
FeedLink X follows a **layered architecture pattern** optimized for real-time interactions, data consistency, and serverless scalability:

```mermaid
graph TB
    subgraph Presentation["🎨 Presentation Layer (Client)"]
        Web["Web Browser"]
        App["React Components"]
        State["AppContext State Manager"]
    end

    subgraph Business["⚙️ Business Logic Layer (Backend)"]
        Router["Next.js App Router"]
        API["API Route Handlers"]
        Middleware["Validation & Auth Middleware"]
        AI["AI Engine<br/>- Shelf-Life Calculation<br/>- Urgency Tagging"]
        Logistics["Logistics Engine<br/>- Haversine Distance<br/>- Proximity Matching"]
    end

    subgraph Data["🗄️ Data Layer"]
        Prisma["Prisma ORM<br/>Type-Safe Queries"]
        Pool["Connection Pool<br/>WebSocket Driver"]
        DB["Neon PostgreSQL<br/>Serverless Scalable"]
    end

    Web -->|HTTP/JSON Request| Router
    App -->|State Updates| State
    State -->|Fetch Call| Middleware
    Middleware -->|Route Handler| API
    API -->|Business Logic| AI
    API -->|Business Logic| Logistics
    AI -->|Query via| Prisma
    Logistics -->|Query via| Prisma
    Prisma -->|Connection Pool| Pool
    Pool -->|SQL| DB
    DB -->|Result Set| Prisma
    Prisma -->|JSON Response| API
    API -->|JSON Response| State
    State -->|Re-render| App
    App -->|Visual Update| Web
```

### Data Flow: Deep Dive

#### **1. Request Phase (Client → Server)**
- User action triggers → `React Component` → `AppContext.dispatch()`
- Immediate **optimistic state update** in React (0ms perceived latency)
- Simultaneous async `fetch()` call to `/api/donations/accept` (non-blocking)

#### **2. Processing Phase (Server)**
- Next.js Route Handler validates JWT token
- Prisma executes database transaction:
  - Read current donation status (prevent double-acceptance)
  - Update donation → `status: 'assigned'`
  - Create volunteer task record
  - Log audit trail
- All within a **transaction boundary** for ACID guarantees

#### **3. Response Phase (Server → Client)**
- API responds with updated data
- React merges response with existing state
- If backend fails → automatic **rollback** to previous state
- UI remains consistent regardless of network outcome

### The "Optimistic UI Sync" Pattern (Core Innovation)

**Problem:** Traditional request-response cycles create perceptible delays in donation management (button clicks feel sluggish).

**Solution:** Implemented a **Client-Side Sync Middleware** in `AppContext.js`:

```javascript
// Conceptual pseudocode
dispatchWithSync(action) {
  // 1. Immediate UI update
  setAppState(reducer(currentState, action));

  // 2. Async persistence (fire-and-forget)
  fetch('/api/donations/' + action.id, {
    method: 'PATCH',
    body: JSON.stringify(action.payload)
  })
  .catch(() => {
    // 3. Rollback on failure
    setAppState(reducer(appState, { type: 'UNDO' }));
  });
}
```

**Benefits:**
- UI feels responsive instantly (0ms perceived latency)
- Background persistence ensures data durability
- Automatic rollback prevents inconsistent states
- Reduces perceived RTT from ~200-500ms to ~0ms

### Connection Pool & Serverless Optimization

**Challenge:** Vercel/Serverless functions create new database connections on each invocation, exhausting Neon's connection pool.

**Solution:**
- Implemented **Prisma Client Singleton Pattern** to reuse the same Prisma instance
- Integrated `@neondatabase/serverless` driver adapter for WebSocket-based connections
- Connection pooling prevents "Too many connections" errors under high load

```javascript
// lib/prisma.js - Singleton Pattern
const globalForPrisma = global || {};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaNeon(new Pool({ connectionString: DATABASE_URL }))
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### Component Interaction Map

```mermaid
graph LR
    subgraph Frontend_Components
        DD["Donor Dashboard"]
        VC["Volunteer Center"]
        NGC["NGO Command Center"]
        BP["Beneficiary Portal"]
    end

    subgraph Shared_Services
        Auth["Authentication Service"]
        Context["AppContext<br/>State Management"]
        Sync["Sync Middleware"]
    end

    subgraph Backend_Services
        DonationAPI["Donation API"]
        VolunteerAPI["Volunteer API"]
        MatchingAPI["Matching Engine"]
        IoTAPI["IoT Monitoring"]
    end

    subgraph Database_Tables
        Donations["donations"]
        Users["users"]
        Tasks["volunteer_tasks"]
        IoTData["iot_sensor_data"]
        Assignments["assignments"]
    end

    DD -->|Sync| Context
    VC -->|Sync| Context
    NGC -->|Sync| Context
    BP -->|Sync| Context
    Context -->|Auth| Auth
    Context -->|Middleware| Sync
    Sync -->|Fetch| DonationAPI
    Sync -->|Fetch| VolunteerAPI
    Sync -->|Fetch| MatchingAPI
    DonationAPI -->|Query| Donations
    VolunteerAPI -->|Query| Tasks
    MatchingAPI -->|Query| Donations
    MatchingAPI -->|Query| Users
    IoTAPI -->|Query| IoTData
```

### Database Schema (Simplified View)

```sql
-- Core Donation Pipeline
CREATE TABLE donations (
  id UUID PRIMARY KEY,
  donor_id UUID REFERENCES users(id),
  category TEXT,                    -- 'cooked', 'packed', 'raw'
  quantity INT,
  prepared_at TIMESTAMP,
  expires_at TIMESTAMP,             -- AI calculated
  status ENUM('available', 'assigned', 'in-transit', 'delivered', 'spoiled'),
  urgency ENUM('fresh', 'moderate', 'critical'),
  lat FLOAT, lng FLOAT,             -- For haversine queries
  created_at TIMESTAMP
);

-- Logistics Chain of Custody
CREATE TABLE volunteer_tasks (
  id UUID PRIMARY KEY,
  donation_id UUID REFERENCES donations(id),
  volunteer_id UUID REFERENCES users(id),
  ngo_id UUID REFERENCES users(id),
  status ENUM('assigned', 'picked-up', 'in-transit', 'delivered'),
  pickup_qr_verified BOOLEAN,
  delivery_qr_verified BOOLEAN,
  created_at TIMESTAMP
);

-- Real-time IoT Monitoring
CREATE TABLE iot_sensor_data (
  id UUID PRIMARY KEY,
  fridge_id UUID,
  fill_level INT,                   -- 0-100%
  temperature FLOAT,
  spoilage_risk FLOAT,              -- AI calculated
  last_refill TIMESTAMP,
  recorded_at TIMESTAMP
);
```

### Scalability Architecture

#### **Horizontal Scaling Strategy**
1. **Frontend:** Deployed on Vercel Edge Network (global CDN)
2. **Backend:** Auto-scaling serverless functions on Vercel
3. **Database:** Neon PostgreSQL with read replicas for high-traffic queries
4. **Caching:** Component-level caching + ISR (Incremental Static Regeneration)

#### **Performance Optimizations**
- **Query Optimization:** Prisma query batching + indexed coordinates for haversine searches
- **Connection Pooling:** PrismaNeon WebSocket adapter prevents connection exhaustion
- **State Deduplication:** React Context prevents prop-drilling, reduces re-renders
- **Bundle Size:** Next.js code splitting ensures <50KB critical JS

#### **Failure Resilience**
- **Optimistic Updates:** UI remains functional during network latency
- **Transaction Rollback:** Database-level ACID guarantees prevent partial updates
- **Error Boundaries:** React error boundaries contain failures to specific components
- **Retry Logic:** Exponential backoff for failed API calls with max 3 retries

---

## 💻 Tech Stack

### Frontend & UI
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19 (Server Components & Hooks)
- **Styling:** Vanilla CSS (Modern Premium Aesthetics)
- **Icons:** Lucide React
- **Animations:** Canvas Confetti & CSS Transitions

### Backend & Database
- **Server:** Next.js Serverless Functions
- **Database:** Neon PostgreSQL (Scalable Serverless Postgres)
- **ORM:** Prisma 7 with Driver Adapters
- **Authentication:** Custom `bcryptjs` based secure authentication
- **Communication:** Standard REST API Routes

### Utilities & Logistics
- **Distance Calculation:** Haversine Formula (Spherical Geometry)
- **Diagrams:** Mermaid.js
- **Verification:** QR Code unique ID generation

---

## 🌟 Comprehensive Feature Breakdown

### 1. 🍽️ Donor Dashboard (Smart Logging)
- **Real-time Persistence:** Every donation is immediately saved to PostgreSQL with specific coordinates.
- **AI Shelf-Life Engine:** Automatically calculates remaining freshness based on food category, quantity, and storage temperature.
- **Urgency Tagging:** Dynamically flags food as "Critical," "Moderate," or "Fresh" based on expiration time.

### 2. 🏥 NGO Command Center
- **Capacity Management:** Tracks current load vs. maximum capacity in real-time.
- **Proximity-Based Matching:** NGOs see a "Smart Match" list sorted by geographical distance and storage availability.
- **One-Click Acceptance:** Seamless claiming of donations with automatic volunteer notification.

### 3. 🚴 Volunteer Gamification & Logistics
- **Task Management:** Real-time list of available pickups and deliveries.
- **Chain of Custody:** Uses unique QR-code identifiers to verify that the right volunteer picked up the right food from the donor.
- **Leaderboard:** Global points system and "Rankings" based on successful deliveries and total meals served.

### 4. 🧊 Community Fridge Network (IoT Simulation)
- **Digital Twin:** Real-time monitoring of community fridges across the city.
- **IoT Metrics:** Tracks `Fill Level`, `Temperature`, and `Spoilage Risk`.
- **Refill Coordination:** Notifies donors when a nearby fridge falls below 20% capacity.

### 5. 🏥 Beneficiary Portal
- **Meal Reservations:** Vulnerable individuals or smaller shelters can reserve specific meals.
- **Dietary Matching:** Filters food by dietary needs (Veg, Non-Veg, Nut-Free).
- **Priority Distribution:** System flags high-priority beneficiaries (e.g., children's shelters) for faster matching.

### 6. 📈 Sustainability & CSR Reporting
- **Carbon Impact:** Calculates CO2 saved by preventing food from ending up in landfills.
- **SDG Scorecard:** Tracks contribution to UN Sustainable Development Goals (Zero Hunger, Responsible Consumption).
- **Corporate Tiers:** Allows corporate sponsors to see their meal-matching impact in real-time.

### 7. 🚨 Disaster Relief Modules
- **Emergency Camps:** Coordination center for sudden events (Floods, Fires).
- **Supply Chain:** Real-time tracking of water, medical, and food supplies across emergency camps.

---

## 🛠️ Engineering Challenges & Solutions (Interviewer Focus)

### Q1: How did you handle data persistence in a highly interactive Next.js app?
**A:** "Instead of relying on slow direct API calls for every button click, I implemented an **Optimistic UI pattern**. I wrapped the standard React `dispatch` in a sync utility that updates the UI instantly while handling the database write in the background. This ensures data durability without sacrificing the 'snappy' feel expected of modern web apps."

### Q2: How do you solve the 'Nearest Neighbor' problem for logistics?
**A:** "In the matching engine, I implemented the **Haversine Formula**. Since the database stores latitude and longitude for every Donor and NGO, the system calculates the great-circle distance between two points on a sphere. I then weighted this distance against the NGO's current storage capacity to ensure we don't overwhelm a single location just because it's nearby."

### Q3: How do you ensure the system is production-ready in a serverless environment?
**A:** "Serverless functions can often hit database connection limits (Next.js/Vercel). To solve this, I used the **Prisma Client Singleton Pattern** to prevent multiple instances from being created during hot reloads. I also integrated the `@neondatabase/serverless` driver adapter to ensure efficient connection pooling over WebSockets."

### Q4: How is the 'Chain of Custody' maintained?
**A:** "To prevent fraud or leakage in the supply chain, each donation generates a unique QR-identifier in the database. A volunteer must 'confirm' the pickup on-site, which updates the status from `pending` to `in-transit`. Only when the NGO confirms the delivery does the record close and points get awarded to the volunteer."

---

## 🚀 Local Setup Guide

1. **Clone the Project:**
   ```bash
   git clone https://github.com/yourusername/feedlink-x.git
   cd feedlink-x
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root and add your Neon PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://user:password@neon-host/dbname?sslmode=require"
   ```

4. **Initialize Prisma:**
   ```bash
   npx prisma generate
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```

6. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🔮 Future Roadmap
- 🖼️ **AI Image Verification:** Using Computer Vision to verify food quality via photo uploads.
- 🗺️ **Live Traffic Maps:** Integrating MapBox for real-time traffic-aware volunteer routing.
- 💬 **WhatsApp Integration:** Instant volunteer notifications via Twilio/WhatsApp API.
