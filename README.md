# 🍱 FeedLink X — AI-Powered Food Surplus & Hunger Management

## 🎯 What is FeedLink X?
**FeedLink X** is an end-to-end platform designed to completely eliminate food waste. It uses intelligent algorithms to bridge the gap between people who have extra food (like restaurants) and people who urgently need it (like NGOs and shelters). 

Instead of randomly calling shelters, the platform uses AI to find the perfect match, ensuring food is delivered properly before it spoils!

---

## 🌟 Core Features (Explained Simply)

### 1. 🍽️ Donor Dashboard
*   **What it does:** Restaurants, weddings, and caterers log completely untouched food they want to give away.
*   **The Magic:** As soon as they enter the food type and temperature, an **AI Shelf-Life Engine** calculates exactly how many hours the food will stay fresh. It automatically flags items that need immediate delivery.

### 2. 🏥 NGO & Shelter Management
*   **What it does:** NGOs manage the food coming into their facilities.
*   **The Magic:** They have a **Capacity Tracker**. The system knows how much fridge space they have left and automatically stops matching them with extra food if their fridges are over 90% full, preventing secondary waste.

### 3. 🚴 Volunteer Delivery System
*   **What it does:** Volunteers use this dashboard to pick up food from Donors and drive it to the matched NGOs.
*   **The Magic:** It includes a **Smart Routing Engine** and a gamified points system. A volunteer scans an auto-generated QR code when picking up the food to confirm the chain of custody.

### 4. 🤲 Beneficiary Portal (The Best Feature!)
*   **What it does:** Most apps stop at the NGO. We built an interface for the end-users (people in need, students, struggling families).
*   **The Magic:** Users can log in, see what meals are available nearby, and reserve a specific time slot. They receive a 4-digit OTP to collect their meal safely effortlessly.

### 5. 🧊 IoT Smart Community Fridges
*   **What it does:** A dashboard that monitors public community fridges dotted around the city.
*   **The Magic:** It tracks exactly how full the fridge is and its internal temperature in real-time, alerting administrators if a fridge breaks or needs an urgent re-stock.

---

## 🛠️ Problems Faced & Technical Challenges (For the Interviewer)

When explaining this project to an interviewer, focus on how you solved these specific engineering challenges:

### Challenge 1: The "Smart Matching" Problem
*   **The Problem:** How do you guarantee food goes to the right place quickly? If you match based *only* on distance, a tiny NGO might receive 500 meals they can't store. 
*   **The Solution:** I designed a heavily weighted Matching Engine. It doesn't just use distance (calculated via the Haversine formula); it evaluates 5 data points simultaneously: Proximity (35%), NGO Storage Capacity (25%), Expiration Urgency (20%), Partner Rating (10%), and Historical Acceptance (10%).

### Challenge 2: Next.js Module Resolution Bugs
*   **The Problem:** The Next.js Turbopack compiler lost the ability to resolve standard `@/` path aliases, causing the entire application to crash with `Module not found` errors. 
*   **The Solution:** Instead of relying on buggy `.jsconfig` caching inside Monorepo structures, I wrote a custom Node script that recursively traversed the file system and successfully mapped every single import statement to strict, fail-proof relative paths (`../../`), stabilizing the entire application architecture immediately.

### Challenge 3: System Resilience & Database State
*   **The Problem:** Running a heavy database setup is complex for testing and causes permission issues on local machines (like PostgreSQL `pg_hba.conf` locking out connections).
*   **The Solution:** I engineered the app to be completely resilient by using modular architectures. It can simulate state using localized Context (`MockData`), operate on zero-setup SQLite, or switch seamlessly to a remote **Neon PostgreSQL Pool** seamlessly via environment variables.

---

## 🚀 Future Improvements & Scaling Ideas (For the Interviewer)

Show the interviewer you have product vision by discussing these upcoming upgrades:

1. **Full API & Database Migration:** Currently, the platform's UI uses simulated JSON Context for extreme speed. The immediate next step is creating full Next.js App Router API endpoints to pipe everything directly into the newly attached Neon PostgreSQL Database.
2. **True Location APIs:** Upgrading the static coordinate engine into actual Google Maps/MapBox APIs for real-time traffic-adjusted ETA predictions for volunteers.
3. **Computer Vision AI Verification:** Integrating a lightweight AI image-recognition model where donors take a photo of the food, and the AI automatically detects the food category and assesses quality before allowing it onto the platform.
4. **Push Notifications:** Integrating WebSockets or Firebase for live push notifications so volunteers don't have to refresh the app to find new pickups.
