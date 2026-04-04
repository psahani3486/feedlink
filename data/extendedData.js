// FeedLink X — Extended Mock Data for Premium Features

// ============ COMMUNITY FRIDGES ============
export const COMMUNITY_FRIDGES = [
  { id: 'cf1', name: 'Delhi Gate Smart Fridge', city: 'Delhi', lat: 28.6384, lng: 77.2388, fillLevel: 72, temperature: 4.2, status: 'active', capacity: 200, currentItems: 144, lastRefill: '2h ago', spoilageRisk: 'low', dailyUsage: 89, installDate: '2025-06-15' },
  { id: 'cf2', name: 'Dharavi Community Hub', city: 'Mumbai', lat: 19.0420, lng: 72.8545, fillLevel: 35, temperature: 5.1, status: 'needs_refill', capacity: 150, currentItems: 53, lastRefill: '8h ago', spoilageRisk: 'medium', dailyUsage: 120, installDate: '2025-04-20' },
  { id: 'cf3', name: 'Koramangala Fridge Hub', city: 'Bangalore', lat: 12.9352, lng: 77.6245, fillLevel: 88, temperature: 3.8, status: 'active', capacity: 180, currentItems: 158, lastRefill: '1h ago', spoilageRisk: 'low', dailyUsage: 75, installDate: '2025-07-10' },
  { id: 'cf4', name: 'T Nagar Public Fridge', city: 'Chennai', lat: 13.0418, lng: 80.2341, fillLevel: 15, temperature: 6.3, status: 'critical', capacity: 120, currentItems: 18, lastRefill: '14h ago', spoilageRisk: 'high', dailyUsage: 95, installDate: '2025-03-05' },
  { id: 'cf5', name: 'Park Street Smart Fridge', city: 'Kolkata', lat: 22.5512, lng: 88.3522, fillLevel: 55, temperature: 4.5, status: 'active', capacity: 160, currentItems: 88, lastRefill: '4h ago', spoilageRisk: 'low', dailyUsage: 68, installDate: '2025-08-22' },
  { id: 'cf6', name: 'Secunderabad Hub Fridge', city: 'Hyderabad', lat: 17.4399, lng: 78.4983, fillLevel: 42, temperature: 5.8, status: 'active', capacity: 140, currentItems: 59, lastRefill: '6h ago', spoilageRisk: 'medium', dailyUsage: 82, installDate: '2025-05-18' },
  { id: 'cf7', name: 'FC Road Smart Fridge', city: 'Pune', lat: 18.5308, lng: 73.8474, fillLevel: 91, temperature: 3.5, status: 'active', capacity: 130, currentItems: 118, lastRefill: '30m ago', spoilageRisk: 'low', dailyUsage: 56, installDate: '2025-09-01' },
  { id: 'cf8', name: 'Manek Chowk Fridge', city: 'Ahmedabad', lat: 23.0258, lng: 72.5873, fillLevel: 28, temperature: 7.2, status: 'needs_refill', capacity: 110, currentItems: 31, lastRefill: '10h ago', spoilageRisk: 'high', dailyUsage: 73, installDate: '2025-06-30' },
  { id: 'cf9', name: 'Hazratganj Smart Fridge', city: 'Lucknow', lat: 26.8510, lng: 80.9460, fillLevel: 63, temperature: 4.8, status: 'active', capacity: 100, currentItems: 63, lastRefill: '3h ago', spoilageRisk: 'low', dailyUsage: 45, installDate: '2025-10-12' },
  { id: 'cf10', name: 'MI Road Fridge Hub', city: 'Jaipur', lat: 26.9150, lng: 75.8010, fillLevel: 47, temperature: 5.5, status: 'active', capacity: 90, currentItems: 42, lastRefill: '5h ago', spoilageRisk: 'medium', dailyUsage: 38, installDate: '2025-11-05' },
  { id: 'cf11', name: 'Sector 17 Smart Fridge', city: 'Chandigarh', lat: 30.7414, lng: 76.7683, fillLevel: 80, temperature: 4.0, status: 'active', capacity: 120, currentItems: 96, lastRefill: '2h ago', spoilageRisk: 'low', dailyUsage: 52, installDate: '2025-07-25' },
  { id: 'cf12', name: 'MG Road Community Fridge', city: 'Kochi', lat: 9.9680, lng: 76.2890, fillLevel: 58, temperature: 5.0, status: 'active', capacity: 100, currentItems: 58, lastRefill: '4h ago', spoilageRisk: 'low', dailyUsage: 41, installDate: '2025-08-15' },
];

export const FRIDGE_HISTORY = [
  { time: '06:00', items: 45, temperature: 3.8 },
  { time: '08:00', items: 32, temperature: 4.1 },
  { time: '10:00', items: 78, temperature: 4.0 },
  { time: '12:00', items: 55, temperature: 4.5 },
  { time: '14:00', items: 40, temperature: 5.2 },
  { time: '16:00', items: 90, temperature: 4.3 },
  { time: '18:00', items: 65, temperature: 4.8 },
  { time: '20:00', items: 42, temperature: 5.0 },
  { time: '22:00', items: 28, temperature: 4.2 },
];

// ============ DISASTER / EMERGENCY ============
export const DISASTER_EVENTS = [
  { id: 'de1', type: 'flood', title: 'Assam Floods 2026', city: 'Guwahati', lat: 26.1445, lng: 91.7362, severity: 'critical', affectedPeople: 125000, status: 'active', startDate: '2026-03-28', campsSetup: 8, mealsServed: 45000, volunteersDeployed: 120, description: 'Severe flooding in Brahmaputra basin affecting 12 districts' },
  { id: 'de2', type: 'heatwave', title: 'Rajasthan Heatwave', city: 'Jaipur', lat: 26.9124, lng: 75.7873, severity: 'high', affectedPeople: 80000, status: 'active', startDate: '2026-03-30', campsSetup: 5, mealsServed: 22000, volunteersDeployed: 65, description: 'Temperatures exceeding 47°C in western Rajasthan' },
  { id: 'de3', type: 'earthquake', title: 'HP Earthquake Relief', city: 'Chandigarh', lat: 30.7333, lng: 76.7794, severity: 'medium', affectedPeople: 35000, status: 'monitoring', startDate: '2026-03-15', campsSetup: 3, mealsServed: 12000, volunteersDeployed: 42, description: '4.5 magnitude earthquake, relief camps operational' },
  { id: 'de4', type: 'cyclone', title: 'Cyclone Alert - Odisha', city: 'Bhubaneswar', lat: 20.2961, lng: 85.8245, severity: 'high', affectedPeople: 200000, status: 'preparing', startDate: '2026-04-02', campsSetup: 12, mealsServed: 8000, volunteersDeployed: 200, description: 'Category 3 cyclone expected to make landfall in 48h' },
];

export const EMERGENCY_CAMPS = [
  { id: 'ec1', name: 'Guwahati Relief Camp A', eventId: 'de1', lat: 26.15, lng: 91.74, capacity: 500, current: 420, mealsToday: 1260, status: 'active', supplies: { water: 65, food: 45, medical: 78 } },
  { id: 'ec2', name: 'Guwahati Relief Camp B', eventId: 'de1', lat: 26.13, lng: 91.72, capacity: 300, current: 290, mealsToday: 870, status: 'full', supplies: { water: 30, food: 25, medical: 55 } },
  { id: 'ec3', name: 'Jaipur Cooling Center', eventId: 'de2', lat: 26.92, lng: 75.80, capacity: 200, current: 145, mealsToday: 435, status: 'active', supplies: { water: 80, food: 70, medical: 90 } },
  { id: 'ec4', name: 'Shimla Aid Station', eventId: 'de3', lat: 30.74, lng: 76.78, capacity: 150, current: 98, mealsToday: 294, status: 'active', supplies: { water: 55, food: 60, medical: 42 } },
  { id: 'ec5', name: 'Bhubaneswar Prep Camp', eventId: 'de4', lat: 20.30, lng: 85.83, capacity: 1000, current: 120, mealsToday: 360, status: 'preparing', supplies: { water: 90, food: 85, medical: 95 } },
];

// ============ CORPORATE / CSR ============
export const CORPORATE_SPONSORS = [
  { id: 'cs1', name: 'Infosys Foundation', logo: '🏢', sector: 'IT', totalSponsored: 250000, mealsSponsored: 95000, co2Saved: 4500, csrBudget: 5000000, sdgScore: 92, since: '2024', tier: 'platinum' },
  { id: 'cs2', name: 'Tata Trusts', logo: '🏭', sector: 'Conglomerate', totalSponsored: 800000, mealsSponsored: 320000, co2Saved: 15000, csrBudget: 15000000, sdgScore: 96, since: '2023', tier: 'diamond' },
  { id: 'cs3', name: 'Wipro Cares', logo: '💻', sector: 'IT', totalSponsored: 180000, mealsSponsored: 72000, co2Saved: 3200, csrBudget: 3500000, sdgScore: 88, since: '2024', tier: 'gold' },
  { id: 'cs4', name: 'HDFC CSR', logo: '🏦', sector: 'Banking', totalSponsored: 350000, mealsSponsored: 140000, co2Saved: 6800, csrBudget: 8000000, sdgScore: 90, since: '2023', tier: 'platinum' },
  { id: 'cs5', name: 'Reliance Foundation', logo: '⚡', sector: 'Energy', totalSponsored: 1200000, mealsSponsored: 480000, co2Saved: 22000, csrBudget: 25000000, sdgScore: 94, since: '2022', tier: 'diamond' },
  { id: 'cs6', name: 'Zomato Impact', logo: '🍕', sector: 'FoodTech', totalSponsored: 150000, mealsSponsored: 60000, co2Saved: 2800, csrBudget: 2000000, sdgScore: 85, since: '2025', tier: 'gold' },
];

export const CSR_MONTHLY = [
  { month: 'Jan', meals: 28000, spending: 420000, co2: 1200 },
  { month: 'Feb', meals: 32000, spending: 480000, co2: 1400 },
  { month: 'Mar', meals: 38000, spending: 570000, co2: 1650 },
  { month: 'Apr', meals: 42000, spending: 630000, co2: 1820 },
  { month: 'May', meals: 45000, spending: 675000, co2: 1950 },
  { month: 'Jun', meals: 52000, spending: 780000, co2: 2250 },
  { month: 'Jul', meals: 48000, spending: 720000, co2: 2080 },
  { month: 'Aug', meals: 55000, spending: 825000, co2: 2380 },
  { month: 'Sep', meals: 51000, spending: 765000, co2: 2210 },
  { month: 'Oct', meals: 60000, spending: 900000, co2: 2600 },
  { month: 'Nov', meals: 58000, spending: 870000, co2: 2510 },
  { month: 'Dec', meals: 65000, spending: 975000, co2: 2820 },
];

// ============ BENEFICIARIES ============
export const BENEFICIARY_PROFILES = [
  { id: 'b1', type: 'shelter', name: 'Aashray Night Shelter', city: 'Delhi', lat: 28.6350, lng: 77.2250, members: 85, dietary: 'vegetarian', priority: 'high', needsPerDay: 255, reservedSlots: 3, contact: '+91 98100 11111' },
  { id: 'b2', type: 'orphanage', name: 'Bal Sahyog Children Home', city: 'Delhi', lat: 28.5700, lng: 77.2100, members: 120, dietary: 'mixed', priority: 'critical', needsPerDay: 360, reservedSlots: 5, contact: '+91 98100 22222' },
  { id: 'b3', type: 'labor_camp', name: 'Andheri Construction Workers', city: 'Mumbai', lat: 19.1200, lng: 72.8500, members: 200, dietary: 'mixed', priority: 'high', needsPerDay: 600, reservedSlots: 2, contact: '+91 98200 33333' },
  { id: 'b4', type: 'students', name: 'Government School Hostel', city: 'Chennai', lat: 13.0600, lng: 80.2400, members: 150, dietary: 'vegetarian', priority: 'medium', needsPerDay: 450, reservedSlots: 4, contact: '+91 98400 44444' },
  { id: 'b5', type: 'elderly', name: 'Vriddha Ashram', city: 'Kolkata', lat: 22.5400, lng: 88.3500, members: 45, dietary: 'soft_food', priority: 'critical', needsPerDay: 135, reservedSlots: 2, contact: '+91 98300 55555' },
  { id: 'b6', type: 'women', name: 'Mahila Shelter Home', city: 'Bangalore', lat: 12.9600, lng: 77.5800, members: 60, dietary: 'vegetarian', priority: 'high', needsPerDay: 180, reservedSlots: 3, contact: '+91 98808 66666' },
  { id: 'b7', type: 'slum', name: 'Dharavi Community Kitchen', city: 'Mumbai', lat: 19.0430, lng: 72.8540, members: 350, dietary: 'mixed', priority: 'critical', needsPerDay: 1050, reservedSlots: 8, contact: '+91 98200 77777' },
  { id: 'b8', type: 'tribal', name: 'Adivasi Settlement', city: 'Bhopal', lat: 23.2500, lng: 77.4000, members: 180, dietary: 'mixed', priority: 'high', needsPerDay: 540, reservedSlots: 4, contact: '+91 97520 88888' },
  { id: 'b9', type: 'shelter', name: 'Railway Station Shelter', city: 'Patna', lat: 25.6100, lng: 85.1400, members: 95, dietary: 'mixed', priority: 'high', needsPerDay: 285, reservedSlots: 2, contact: '+91 98350 99999' },
  { id: 'b10', type: 'orphanage', name: 'Hope Foundation', city: 'Hyderabad', lat: 17.3800, lng: 78.4900, members: 75, dietary: 'mixed', priority: 'medium', needsPerDay: 225, reservedSlots: 3, contact: '+91 98490 10101' },
];

export const MEAL_SLOTS = [
  { id: 'ms1', time: '07:00 - 08:30', label: 'Breakfast', available: 45, total: 80, status: 'available' },
  { id: 'ms2', time: '12:00 - 13:30', label: 'Lunch', available: 12, total: 120, status: 'filling' },
  { id: 'ms3', time: '16:00 - 17:00', label: 'Snacks', available: 60, total: 60, status: 'available' },
  { id: 'ms4', time: '19:00 - 20:30', label: 'Dinner', available: 0, total: 100, status: 'full' },
];

// ============ SUSTAINABILITY ============
export const SUSTAINABILITY_METRICS = {
  foodWasteReduced: 45678,
  methanePreventedKg: 12450,
  co2SavedKg: 18920,
  waterSavedLiters: 890000,
  landfillDivertedKg: 38900,
  treesEquivalent: 842,
  sdgGoals: [
    { number: 1, name: 'No Poverty', progress: 15, color: '#e5243b' },
    { number: 2, name: 'Zero Hunger', progress: 78, color: '#dda63a' },
    { number: 3, name: 'Good Health', progress: 42, color: '#4c9f38' },
    { number: 12, name: 'Responsible Consumption', progress: 65, color: '#bf8b2e' },
    { number: 13, name: 'Climate Action', progress: 38, color: '#3f7e44' },
    { number: 17, name: 'Partnerships', progress: 55, color: '#19486a' },
  ],
  monthlyCarbon: [
    { month: 'Jan', saved: 1200, waste: 320 },
    { month: 'Feb', saved: 1450, waste: 280 },
    { month: 'Mar', saved: 1680, waste: 250 },
    { month: 'Apr', saved: 1820, waste: 230 },
    { month: 'May', saved: 2100, waste: 210 },
    { month: 'Jun', saved: 2380, waste: 195 },
    { month: 'Jul', saved: 2150, waste: 220 },
    { month: 'Aug', saved: 2500, waste: 180 },
    { month: 'Sep', saved: 2680, waste: 165 },
    { month: 'Oct', saved: 2900, waste: 150 },
    { month: 'Nov', saved: 3100, waste: 140 },
    { month: 'Dec', saved: 3350, waste: 125 },
  ],
  impactBreakdown: [
    { category: 'Cooked Meals Rescued', kg: 18500, co2: 7400, water: 370000 },
    { category: 'Bakery & Bread', kg: 8200, co2: 3280, water: 164000 },
    { category: 'Fruits & Vegetables', kg: 12300, co2: 4920, water: 246000 },
    { category: 'Dairy Products', kg: 3200, co2: 1920, water: 64000 },
    { category: 'Packaged Foods', kg: 3478, co2: 1400, water: 46000 },
  ],
};

// ============ REDISTRIBUTION (NGO→NGO) ============
export const REDISTRIBUTION_REQUESTS = [
  { id: 'rr1', fromNGO: 'Akshaya Patra Foundation', fromCity: 'Bangalore', toNGO: 'No Food Waste', toCity: 'Chennai', food: 'Rice & Roti', quantity: 200, unit: 'kg', urgency: 'medium', status: 'pending', expiresIn: '8h' },
  { id: 'rr2', fromNGO: 'Feeding India', fromCity: 'Delhi', toNGO: 'Sai Dham Food Bank', toCity: 'Lucknow', food: 'Cooked Meals', quantity: 150, unit: 'servings', urgency: 'high', status: 'in_transit', expiresIn: '3h' },
  { id: 'rr3', fromNGO: 'Annamrita Foundation', fromCity: 'Mumbai', toNGO: 'Roti Bank', toCity: 'Pune', food: 'Bread & Bakery', quantity: 80, unit: 'kg', urgency: 'low', status: 'completed', expiresIn: '—' },
  { id: 'rr4', fromNGO: 'Robin Hood Army', fromCity: 'Mumbai', toNGO: 'Rise Against Hunger', toCity: 'Hyderabad', food: 'Packaged Snacks', quantity: 300, unit: 'packets', urgency: 'medium', status: 'pending', expiresIn: '24h' },
  { id: 'rr5', fromNGO: 'Goonj', fromCity: 'Delhi', toNGO: 'NE Hunger Mission', toCity: 'Guwahati', food: 'Mixed', quantity: 500, unit: 'kg', urgency: 'critical', status: 'in_transit', expiresIn: '2h' },
];

// ============ FRAUD ENGINE ============
export const FRAUD_ALERTS_DETAILED = [
  { id: 'fa1', type: 'location_mismatch', severity: 'critical', entity: 'Donor', name: 'LIT Fest Caterers', detail: 'Donation location 18km from registered address. GPS coordinates don\'t match Lucknow office.', score: 15, timestamp: '2h ago', action: 'investigate', resolved: false },
  { id: 'fa2', type: 'duplicate_claim', severity: 'high', entity: 'NGO', name: 'Unknown NGO #47', detail: 'Same donation DON-0032 claimed by 2 different NGOs within 3 minutes.', score: 22, timestamp: '5h ago', action: 'block', resolved: false },
  { id: 'fa3', type: 'spoiled_food', severity: 'critical', entity: 'Donation', name: 'DON-0045', detail: 'Temperature sensor showed 42°C for dairy products. Food quality AI score: 18/100.', score: 8, timestamp: '1h ago', action: 'reject', resolved: false },
  { id: 'fa4', type: 'volume_anomaly', severity: 'medium', entity: 'Donor', name: 'IIT Delhi Mess', detail: 'Reported 2000 servings — 4x historical average. May be legitimate (event) or error.', score: 45, timestamp: '3h ago', action: 'verify', resolved: false },
  { id: 'fa5', type: 'qr_reuse', severity: 'high', entity: 'Volunteer', name: 'Unknown Vol', detail: 'QR code FL-QR-DON-0028 scanned at 2 locations 50km apart within 10 minutes.', score: 12, timestamp: '6h ago', action: 'investigate', resolved: true },
  { id: 'fa6', type: 'pattern_abuse', severity: 'medium', entity: 'Beneficiary', name: 'ID-B99', detail: 'Same beneficiary collected meals from 4 different fridges in 2 hours.', score: 35, timestamp: '4h ago', action: 'flag', resolved: false },
  { id: 'fa7', type: 'identity_fraud', severity: 'critical', entity: 'Volunteer', name: 'Fake Profile #12', detail: 'Profile photo reverse-image search matches stock photo. No verified deliveries.', score: 5, timestamp: '12h ago', action: 'ban', resolved: true },
];

export const TRUST_SCORES = {
  donors: { avg: 87, high: 145, medium: 52, low: 12, flagged: 3 },
  ngos: { avg: 91, high: 12, medium: 2, low: 1, flagged: 0 },
  volunteers: { avg: 84, high: 120, medium: 65, low: 18, flagged: 5 },
};
