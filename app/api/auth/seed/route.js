import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

const SEED_USERS = [
  { email: 'donor@feedlink.in', password: 'password', name: 'Raj Sharma', role: 'donor', avatar: '🍽️', org: 'Taj Palace Kitchen', city: 'Delhi', phone: '+91 98100 11111', verified: true },
  { email: 'ngo@feedlink.in', password: 'password', name: 'Priya Singh', role: 'ngo', avatar: '🏥', org: 'Akshaya Patra Foundation', city: 'Bangalore', phone: '+91 98808 22222', verified: true },
  { email: 'volunteer@feedlink.in', password: 'password', name: 'Arjun Patel', role: 'volunteer', avatar: '🚴', org: 'Independent', city: 'Mumbai', phone: '+91 98200 33333', verified: true },
  { email: 'admin@feedlink.in', password: 'admin123', name: 'Admin User', role: 'admin', avatar: '👨‍💼', org: 'FeedLink HQ', city: 'Delhi', phone: '+91 98100 00000', verified: true },
];

const DONORS = [
  { id: 'd1', name: 'Taj Palace Kitchen', type: 'Hotel', city: 'Delhi', lat: 28.6129, lng: 77.2295, rating: 4.8, totalDonations: 342, contact: '+91 98100 12345' },
  { id: 'd2', name: 'Saravana Bhavan', type: 'Restaurant', city: 'Chennai', lat: 13.0604, lng: 80.2496, rating: 4.6, totalDonations: 256, contact: '+91 98400 23456' },
  { id: 'd3', name: 'Marriott Banquets', type: 'Hotel', city: 'Mumbai', lat: 19.1136, lng: 72.8697, rating: 4.9, totalDonations: 189, contact: '+91 98200 34567' },
  { id: 'd4', name: 'ITC Grand Chola', type: 'Hotel', city: 'Chennai', lat: 13.0108, lng: 80.2206, rating: 4.7, totalDonations: 278, contact: '+91 98400 45678' },
  { id: 'd5', name: "Haldiram's Central", type: 'Restaurant', city: 'Delhi', lat: 28.6315, lng: 77.2167, rating: 4.5, totalDonations: 412, contact: '+91 98100 56789' },
  { id: 'd6', name: 'MTR Foods', type: 'Restaurant', city: 'Bangalore', lat: 12.9557, lng: 77.5858, rating: 4.4, totalDonations: 167, contact: '+91 98808 67890' },
  { id: 'd7', name: 'Oberoi Grand', type: 'Hotel', city: 'Kolkata', lat: 22.5574, lng: 88.3509, rating: 4.8, totalDonations: 203, contact: '+91 98300 78901' },
  { id: 'd8', name: 'Paradise Biryani', type: 'Restaurant', city: 'Hyderabad', lat: 17.4401, lng: 78.4983, rating: 4.6, totalDonations: 334, contact: '+91 98490 89012' },
  { id: 'd9', name: 'IIT Delhi Mess', type: 'Hostel', city: 'Delhi', lat: 28.5450, lng: 77.1926, rating: 4.2, totalDonations: 521, contact: '+91 98100 90123' },
  { id: 'd10', name: 'Café Coffee Day HQ', type: 'Café', city: 'Bangalore', lat: 12.9352, lng: 77.6245, rating: 4.3, totalDonations: 145, contact: '+91 98808 01234' },
  { id: 'd11', name: 'Bikanervala', type: 'Restaurant', city: 'Jaipur', lat: 26.9157, lng: 75.8015, rating: 4.5, totalDonations: 198, contact: '+91 98290 12345' },
  { id: 'd12', name: 'Hotel Soaltee', type: 'Hotel', city: 'Pune', lat: 18.5308, lng: 73.8474, rating: 4.7, totalDonations: 156, contact: '+91 98226 23456' },
  { id: 'd13', name: 'Mainland China', type: 'Restaurant', city: 'Kolkata', lat: 22.5183, lng: 88.3630, rating: 4.4, totalDonations: 187, contact: '+91 98300 34567' },
  { id: 'd14', name: 'LIT Fest Caterers', type: 'Event', city: 'Lucknow', lat: 26.8508, lng: 80.9493, rating: 4.1, totalDonations: 67, contact: '+91 98390 45678' },
  { id: 'd15', name: 'Radisson Blu', type: 'Hotel', city: 'Ahmedabad', lat: 23.0369, lng: 72.5611, rating: 4.6, totalDonations: 134, contact: '+91 98245 56789' },
  { id: 'd16', name: 'Sagar Ratna', type: 'Restaurant', city: 'Delhi', lat: 28.5672, lng: 77.2100, rating: 4.3, totalDonations: 289, contact: '+91 98100 67890' },
  { id: 'd17', name: 'Vidyarthi Bhavan', type: 'Restaurant', city: 'Bangalore', lat: 12.9505, lng: 77.5736, rating: 4.7, totalDonations: 176, contact: '+91 98808 78901' },
  { id: 'd18', name: 'Flurys', type: 'Bakery', city: 'Kolkata', lat: 22.5517, lng: 88.3513, rating: 4.5, totalDonations: 145, contact: '+91 98300 89012' },
  { id: 'd19', name: 'Hyderabad House', type: 'Restaurant', city: 'Hyderabad', lat: 17.3616, lng: 78.4747, rating: 4.4, totalDonations: 223, contact: '+91 98490 90123' },
  { id: 'd20', name: 'Dum Pukht', type: 'Restaurant', city: 'Mumbai', lat: 19.0410, lng: 72.8354, rating: 4.8, totalDonations: 167, contact: '+91 98200 01234' },
];

const NGOS = [
  { id: 'n1', name: 'Akshaya Patra Foundation', city: 'Bangalore', lat: 12.9783, lng: 77.5712, capacity: 500, currentLoad: 342, speciality: 'School Meals', rating: 4.9, contact: '+91 80 2345 6789', beneficiaries: 15000 },
  { id: 'n2', name: 'Feeding India (Zomato)', city: 'Delhi', lat: 28.6271, lng: 77.2275, capacity: 800, currentLoad: 456, speciality: 'Urban Hunger', rating: 4.8, contact: '+91 11 2345 6789', beneficiaries: 25000 },
  { id: 'n3', name: 'Robin Hood Army', city: 'Mumbai', lat: 19.0825, lng: 72.8815, capacity: 350, currentLoad: 210, speciality: 'Community Distribution', rating: 4.7, contact: '+91 22 2345 6789', beneficiaries: 12000 },
  { id: 'n4', name: 'Annamrita Foundation', city: 'Mumbai', lat: 19.0178, lng: 72.8478, capacity: 600, currentLoad: 520, speciality: 'Mid-day Meals', rating: 4.8, contact: '+91 22 3456 7890', beneficiaries: 20000 },
  { id: 'n5', name: 'No Food Waste', city: 'Chennai', lat: 13.0453, lng: 80.2468, capacity: 250, currentLoad: 180, speciality: 'Zero Waste', rating: 4.6, contact: '+91 44 2345 6789', beneficiaries: 8000 },
  { id: 'n6', name: 'Roti Bank', city: 'Pune', lat: 18.5074, lng: 73.8278, capacity: 400, currentLoad: 278, speciality: 'Daily Meals', rating: 4.5, contact: '+91 20 2345 6789', beneficiaries: 10000 },
  { id: 'n7', name: 'Goonj', city: 'Delhi', lat: 28.5542, lng: 77.2482, capacity: 450, currentLoad: 367, speciality: 'Disaster Relief', rating: 4.7, contact: '+91 11 3456 7890', beneficiaries: 18000 },
  { id: 'n8', name: 'Rise Against Hunger India', city: 'Hyderabad', lat: 17.4065, lng: 78.4772, capacity: 300, currentLoad: 198, speciality: 'Meal Packaging', rating: 4.6, contact: '+91 40 2345 6789', beneficiaries: 9500 },
  { id: 'n9', name: 'Seva Kitchen', city: 'Kolkata', lat: 22.5601, lng: 88.3778, capacity: 200, currentLoad: 145, speciality: 'Street Children', rating: 4.4, contact: '+91 33 2345 6789', beneficiaries: 5000 },
  { id: 'n10', name: 'Jan Kalyan Samiti', city: 'Jaipur', lat: 26.9045, lng: 75.7990, capacity: 180, currentLoad: 120, speciality: 'Rural Distribution', rating: 4.3, contact: '+91 141 234 5678', beneficiaries: 4500 },
  { id: 'n11', name: 'Anna Daan Trust', city: 'Ahmedabad', lat: 23.0145, lng: 72.5830, capacity: 350, currentLoad: 267, speciality: 'Community Kitchen', rating: 4.5, contact: '+91 79 2345 6789', beneficiaries: 7500 },
  { id: 'n12', name: 'Sai Dham Food Bank', city: 'Lucknow', lat: 26.8320, lng: 80.9372, capacity: 220, currentLoad: 156, speciality: 'Food Banking', rating: 4.4, contact: '+91 522 234 5678', beneficiaries: 6000 },
  { id: 'n13', name: 'Bhook Foundation', city: 'Chandigarh', lat: 30.7414, lng: 76.7683, capacity: 150, currentLoad: 98, speciality: 'Night Shelters', rating: 4.3, contact: '+91 172 234 5678', beneficiaries: 3500 },
  { id: 'n14', name: 'Kerala Food Bank', city: 'Kochi', lat: 9.9475, lng: 76.2544, capacity: 280, currentLoad: 190, speciality: 'Flood Relief', rating: 4.6, contact: '+91 484 234 5678', beneficiaries: 8500 },
  { id: 'n15', name: 'NE Hunger Mission', city: 'Guwahati', lat: 26.1581, lng: 91.7247, capacity: 160, currentLoad: 110, speciality: 'Tribal Areas', rating: 4.2, contact: '+91 361 234 5678', beneficiaries: 3000 },
];

const VOLUNTEERS = [
  { id: 'v1', name: 'Aarav Sharma', city: 'Delhi', lat: 28.62, lng: 77.215, rating: 4.9, deliveries: 156, points: 4680, available: true, badges: '["🏆","⭐","🚀"]' },
  { id: 'v2', name: 'Priya Menon', city: 'Bangalore', lat: 12.965, lng: 77.59, rating: 4.8, deliveries: 132, points: 3960, available: true, badges: '["🏆","⭐"]' },
  { id: 'v3', name: 'Rohan Patel', city: 'Mumbai', lat: 19.07, lng: 72.88, rating: 4.7, deliveries: 98, points: 2940, available: false, badges: '["⭐","🔥"]' },
  { id: 'v4', name: 'Sneha Iyer', city: 'Chennai', lat: 13.07, lng: 80.25, rating: 4.9, deliveries: 178, points: 5340, available: true, badges: '["🏆","⭐","🚀","💎"]' },
  { id: 'v5', name: 'Vikram Singh', city: 'Hyderabad', lat: 17.39, lng: 78.48, rating: 4.6, deliveries: 87, points: 2610, available: true, badges: '["⭐"]' },
  { id: 'v6', name: 'Ananya Das', city: 'Kolkata', lat: 22.56, lng: 88.36, rating: 4.5, deliveries: 64, points: 1920, available: true, badges: '["🔥"]' },
  { id: 'v7', name: 'Karthik Reddy', city: 'Pune', lat: 18.525, lng: 73.855, rating: 4.8, deliveries: 145, points: 4350, available: false, badges: '["🏆","⭐","🔥"]' },
  { id: 'v8', name: 'Meera Joshi', city: 'Ahmedabad', lat: 23.025, lng: 72.57, rating: 4.4, deliveries: 56, points: 1680, available: true, badges: '[]' },
  { id: 'v9', name: 'Arjun Nair', city: 'Kochi', lat: 9.935, lng: 76.26, rating: 4.7, deliveries: 92, points: 2760, available: true, badges: '["⭐","🔥"]' },
  { id: 'v10', name: 'Pooja Gupta', city: 'Jaipur', lat: 26.91, lng: 75.79, rating: 4.6, deliveries: 73, points: 2190, available: true, badges: '["⭐"]' },
];

const COMMUNITY_FRIDGES = [
  { id: 'cf1', name: 'Delhi Gate Smart Fridge', city: 'Delhi', lat: 28.6384, lng: 77.2388, fillLevel: 72, temperature: 4.2, status: 'active', capacity: 200, currentItems: 144, lastRefill: '2h ago', spoilageRisk: 'low', dailyUsage: 89, installDate: '2025-06-15' },
  { id: 'cf2', name: 'Dharavi Community Hub', city: 'Mumbai', lat: 19.042, lng: 72.8545, fillLevel: 35, temperature: 5.1, status: 'needs_refill', capacity: 150, currentItems: 53, lastRefill: '8h ago', spoilageRisk: 'medium', dailyUsage: 120, installDate: '2025-04-20' },
  { id: 'cf3', name: 'Koramangala Fridge Hub', city: 'Bangalore', lat: 12.9352, lng: 77.6245, fillLevel: 88, temperature: 3.8, status: 'active', capacity: 180, currentItems: 158, lastRefill: '1h ago', spoilageRisk: 'low', dailyUsage: 75, installDate: '2025-07-10' },
  { id: 'cf4', name: 'T Nagar Public Fridge', city: 'Chennai', lat: 13.0418, lng: 80.2341, fillLevel: 15, temperature: 6.3, status: 'critical', capacity: 120, currentItems: 18, lastRefill: '14h ago', spoilageRisk: 'high', dailyUsage: 95, installDate: '2025-03-05' },
  { id: 'cf5', name: 'Park Street Smart Fridge', city: 'Kolkata', lat: 22.5512, lng: 88.3522, fillLevel: 55, temperature: 4.5, status: 'active', capacity: 160, currentItems: 88, lastRefill: '4h ago', spoilageRisk: 'low', dailyUsage: 68, installDate: '2025-08-22' },
  { id: 'cf6', name: 'Secunderabad Hub Fridge', city: 'Hyderabad', lat: 17.4399, lng: 78.4983, fillLevel: 42, temperature: 5.8, status: 'active', capacity: 140, currentItems: 59, lastRefill: '6h ago', spoilageRisk: 'medium', dailyUsage: 82, installDate: '2025-05-18' },
];

const BENEFICIARY_PROFILES = [
  { id: 'b1', type: 'shelter', name: 'Aashray Night Shelter', city: 'Delhi', lat: 28.635, lng: 77.225, members: 85, dietary: 'vegetarian', priority: 'high', needsPerDay: 255, reservedSlots: 3, contact: '+91 98100 11111' },
  { id: 'b2', type: 'orphanage', name: 'Bal Sahyog Children Home', city: 'Delhi', lat: 28.57, lng: 77.21, members: 120, dietary: 'mixed', priority: 'critical', needsPerDay: 360, reservedSlots: 5, contact: '+91 98100 22222' },
  { id: 'b3', type: 'labor_camp', name: 'Andheri Construction Workers', city: 'Mumbai', lat: 19.12, lng: 72.85, members: 200, dietary: 'mixed', priority: 'high', needsPerDay: 600, reservedSlots: 2, contact: '+91 98200 33333' },
  { id: 'b4', type: 'students', name: 'Government School Hostel', city: 'Chennai', lat: 13.06, lng: 80.24, members: 150, dietary: 'vegetarian', priority: 'medium', needsPerDay: 450, reservedSlots: 4, contact: '+91 98400 44444' },
  { id: 'b5', type: 'elderly', name: 'Vriddha Ashram', city: 'Kolkata', lat: 22.54, lng: 88.35, members: 45, dietary: 'soft_food', priority: 'critical', needsPerDay: 135, reservedSlots: 2, contact: '+91 98300 55555' },
];

const CORPORATE_SPONSORS = [
  { id: 'cs1', name: 'Infosys Foundation', logo: '🏢', sector: 'IT', totalSponsored: 250000, mealsSponsored: 95000, co2Saved: 4500, csrBudget: 5000000, sdgScore: 92, since: '2024', tier: 'platinum' },
  { id: 'cs2', name: 'Tata Trusts', logo: '🏭', sector: 'Conglomerate', totalSponsored: 800000, mealsSponsored: 320000, co2Saved: 15000, csrBudget: 15000000, sdgScore: 96, since: '2023', tier: 'diamond' },
  { id: 'cs3', name: 'Wipro Cares', logo: '💻', sector: 'IT', totalSponsored: 180000, mealsSponsored: 72000, co2Saved: 3200, csrBudget: 3500000, sdgScore: 88, since: '2024', tier: 'gold' },
  { id: 'cs4', name: 'HDFC CSR', logo: '🏦', sector: 'Banking', totalSponsored: 350000, mealsSponsored: 140000, co2Saved: 6800, csrBudget: 8000000, sdgScore: 90, since: '2023', tier: 'platinum' },
  { id: 'cs5', name: 'Reliance Foundation', logo: '⚡', sector: 'Energy', totalSponsored: 1200000, mealsSponsored: 480000, co2Saved: 22000, csrBudget: 25000000, sdgScore: 94, since: '2022', tier: 'diamond' },
  { id: 'cs6', name: 'Zomato Impact', logo: '🍕', sector: 'FoodTech', totalSponsored: 150000, mealsSponsored: 60000, co2Saved: 2800, csrBudget: 2000000, sdgScore: 85, since: '2025', tier: 'gold' },
];

const DISASTER_EVENTS = [
  { id: 'de1', type: 'flood', title: 'Assam Floods 2026', city: 'Guwahati', lat: 26.1445, lng: 91.7362, severity: 'critical', affectedPeople: 125000, status: 'active', startDate: '2026-03-28', campsSetup: 8, mealsServed: 45000, volunteersDeployed: 120, description: 'Severe flooding in Brahmaputra basin affecting 12 districts' },
  { id: 'de2', type: 'heatwave', title: 'Rajasthan Heatwave', city: 'Jaipur', lat: 26.9124, lng: 75.7873, severity: 'high', affectedPeople: 80000, status: 'active', startDate: '2026-03-30', campsSetup: 5, mealsServed: 22000, volunteersDeployed: 65, description: 'Temperatures exceeding 47°C in western Rajasthan' },
];

const EMERGENCY_CAMPS = [
  { id: 'ec1', name: 'Guwahati Relief Camp A', eventId: 'de1', lat: 26.15, lng: 91.74, capacity: 500, current: 420, mealsToday: 1260, status: 'active', supplyWater: 65, supplyFood: 45, supplyMedical: 78 },
  { id: 'ec2', name: 'Guwahati Relief Camp B', eventId: 'de1', lat: 26.13, lng: 91.72, capacity: 300, current: 290, mealsToday: 870, status: 'full', supplyWater: 30, supplyFood: 25, supplyMedical: 55 },
  { id: 'ec3', name: 'Jaipur Cooling Center', eventId: 'de2', lat: 26.92, lng: 75.80, capacity: 200, current: 145, mealsToday: 435, status: 'active', supplyWater: 80, supplyFood: 70, supplyMedical: 90 },
];

const NOTIFICATIONS = [
  { type: 'donation', message: 'New donation from Taj Palace Kitchen — 50 servings of Biryani', time: '2 min ago', read: false },
  { type: 'accept', message: 'Feeding India accepted your donation DON-0012', time: '5 min ago', read: false },
  { type: 'pickup', message: 'Volunteer Aarav picked up DON-0008', time: '15 min ago', read: true },
  { type: 'delivered', message: 'DON-0005 delivered to Robin Hood Army', time: '30 min ago', read: true },
  { type: 'alert', message: '⚠️ DON-0020 expiring in 1 hour — needs urgent pickup', time: '10 min ago', read: false },
];

const FOOD_CATEGORIES = [
  { id: 'cooked_meals', name: 'Cooked Meals', emoji: '🍛', shelfHours: 4 },
  { id: 'rice_roti', name: 'Rice & Roti', emoji: '🍚', shelfHours: 6 },
  { id: 'dal_curry', name: 'Dal & Curry', emoji: '🥘', shelfHours: 5 },
  { id: 'bread_bakery', name: 'Bread & Bakery', emoji: '🍞', shelfHours: 24 },
  { id: 'fruits', name: 'Fresh Fruits', emoji: '🍎', shelfHours: 48 },
  { id: 'dairy', name: 'Dairy Products', emoji: '🥛', shelfHours: 3 },
];

function randomBetween(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function generateDonations(count = 50) {
  const statuses = ['pending', 'accepted', 'picked_up', 'in_transit', 'delivered'];
  const donations = [];
  for (let i = 0; i < count; i++) {
    const donor = DONORS[i % DONORS.length];
    const food = FOOD_CATEGORIES[randomBetween(0, FOOD_CATEGORIES.length - 1)];
    const status = statuses[randomBetween(0, statuses.length - 1)];
    const ngo = NGOS[randomBetween(0, NGOS.length - 1)];
    const vol = VOLUNTEERS[randomBetween(0, VOLUNTEERS.length - 1)];
    const qty = randomBetween(5, 200);
    const hrs = randomBetween(1, 48);
    const now = Date.now();
    donations.push({
      id: `DON-${String(i + 1).padStart(4, '0')}`,
      donorId: donor.id, donorName: donor.name, donorCity: donor.city,
      foodCategory: food.id, foodName: food.name, foodEmoji: food.emoji,
      quantity: qty, unit: qty > 50 ? 'kg' : 'servings', status,
      ngoId: status !== 'pending' ? ngo.id : null,
      ngoName: status !== 'pending' ? ngo.name : null,
      volunteerId: ['picked_up', 'in_transit', 'delivered'].includes(status) ? vol.id : null,
      volunteerName: ['picked_up', 'in_transit', 'delivered'].includes(status) ? vol.name : null,
      qrCode: `FL-QR-DON-${i + 1}-${now.toString(36).toUpperCase()}`,
      shelfLifeHours: food.shelfHours,
      temperature: randomBetween(18, 38),
      lat: donor.lat + (Math.random() - 0.5) * 0.02,
      lng: donor.lng + (Math.random() - 0.5) * 0.02,
      notes: '', urgency: food.shelfHours <= 4 ? 'high' : food.shelfHours <= 12 ? 'medium' : 'low',
      createdAt: new Date(now - hrs * 3600000),
      expiresAt: new Date(now - (hrs - food.shelfHours) * 3600000),
    });
  }
  return donations;
}

export async function POST() {
  try {
    const results = {};

    // Seed Users
    let usersCreated = 0;
    for (const u of SEED_USERS) {
      const exists = await prisma.user.findUnique({ where: { email: u.email } });
      if (!exists) {
        await prisma.user.create({ data: { ...u, password: await bcrypt.hash(u.password, 10) } });
        usersCreated++;
      }
    }
    results.users = usersCreated;

    // Seed Donors
    const donorCount = await prisma.donor.count();
    if (donorCount === 0) {
      await prisma.donor.createMany({ data: DONORS });
      results.donors = DONORS.length;
    } else { results.donors = 'already seeded'; }

    // Seed NGOs
    const ngoCount = await prisma.ngo.count();
    if (ngoCount === 0) {
      await prisma.ngo.createMany({ data: NGOS });
      results.ngos = NGOS.length;
    } else { results.ngos = 'already seeded'; }

    // Seed Volunteers
    const volCount = await prisma.volunteer.count();
    if (volCount === 0) {
      await prisma.volunteer.createMany({ data: VOLUNTEERS });
      results.volunteers = VOLUNTEERS.length;
    } else { results.volunteers = 'already seeded'; }

    // Seed Donations
    const donCount = await prisma.donation.count();
    if (donCount === 0) {
      const donations = generateDonations(50);
      await prisma.donation.createMany({ data: donations });
      results.donations = 50;
    } else { results.donations = 'already seeded'; }

    // Seed Notifications
    const notifCount = await prisma.notification.count();
    if (notifCount === 0) {
      await prisma.notification.createMany({ data: NOTIFICATIONS });
      results.notifications = NOTIFICATIONS.length;
    } else { results.notifications = 'already seeded'; }

    // Seed Community Fridges
    const fridgeCount = await prisma.communityFridge.count();
    if (fridgeCount === 0) {
      await prisma.communityFridge.createMany({ data: COMMUNITY_FRIDGES });
      results.fridges = COMMUNITY_FRIDGES.length;
    } else { results.fridges = 'already seeded'; }

    // Seed Beneficiary Profiles
    const benCount = await prisma.beneficiaryProfile.count();
    if (benCount === 0) {
      await prisma.beneficiaryProfile.createMany({ data: BENEFICIARY_PROFILES });
      results.beneficiaries = BENEFICIARY_PROFILES.length;
    } else { results.beneficiaries = 'already seeded'; }

    // Seed Corporate Sponsors
    const csrCount = await prisma.corporateSponsor.count();
    if (csrCount === 0) {
      await prisma.corporateSponsor.createMany({ data: CORPORATE_SPONSORS });
      results.sponsors = CORPORATE_SPONSORS.length;
    } else { results.sponsors = 'already seeded'; }

    // Seed Disaster Events
    const disCount = await prisma.disasterEvent.count();
    if (disCount === 0) {
      await prisma.disasterEvent.createMany({ data: DISASTER_EVENTS });
      results.disasters = DISASTER_EVENTS.length;
    } else { results.disasters = 'already seeded'; }

    // Seed Emergency Camps
    const campCount = await prisma.emergencyCamp.count();
    if (campCount === 0) {
      await prisma.emergencyCamp.createMany({ data: EMERGENCY_CAMPS });
      results.camps = EMERGENCY_CAMPS.length;
    } else { results.camps = 'already seeded'; }

    return NextResponse.json({ success: true, message: 'All data seeded into Neon PostgreSQL!', results });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
