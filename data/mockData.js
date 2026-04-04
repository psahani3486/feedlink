// FeedLink — All-India Mock Data

export const CITIES = [
  { name: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
  { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
  { name: 'Bhopal', lat: 23.2599, lng: 77.4126 },
  { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
  { name: 'Guwahati', lat: 26.1445, lng: 91.7362 },
  { name: 'Patna', lat: 25.6093, lng: 85.1376 },
];

export const FOOD_CATEGORIES = [
  { id: 'cooked_meals', name: 'Cooked Meals', emoji: '🍛', shelfHours: 4, tempSensitivity: 'high' },
  { id: 'rice_roti', name: 'Rice & Roti', emoji: '🍚', shelfHours: 6, tempSensitivity: 'medium' },
  { id: 'dal_curry', name: 'Dal & Curry', emoji: '🥘', shelfHours: 5, tempSensitivity: 'high' },
  { id: 'bread_bakery', name: 'Bread & Bakery', emoji: '🍞', shelfHours: 24, tempSensitivity: 'low' },
  { id: 'fruits', name: 'Fresh Fruits', emoji: '🍎', shelfHours: 48, tempSensitivity: 'medium' },
  { id: 'vegetables', name: 'Vegetables', emoji: '🥬', shelfHours: 36, tempSensitivity: 'medium' },
  { id: 'dairy', name: 'Dairy Products', emoji: '🥛', shelfHours: 3, tempSensitivity: 'very_high' },
  { id: 'sweets', name: 'Sweets & Desserts', emoji: '🍮', shelfHours: 8, tempSensitivity: 'high' },
  { id: 'snacks', name: 'Packaged Snacks', emoji: '🥪', shelfHours: 72, tempSensitivity: 'low' },
  { id: 'beverages', name: 'Beverages', emoji: '🥤', shelfHours: 12, tempSensitivity: 'medium' },
];

export const DONORS = [
  { id: 'd1', name: 'Taj Palace Kitchen', type: 'Hotel', city: 'Delhi', lat: 28.6129, lng: 77.2295, rating: 4.8, totalDonations: 342, contact: '+91 98100 12345' },
  { id: 'd2', name: 'Saravana Bhavan', type: 'Restaurant', city: 'Chennai', lat: 13.0604, lng: 80.2496, rating: 4.6, totalDonations: 256, contact: '+91 98400 23456' },
  { id: 'd3', name: 'Marriott Banquets', type: 'Hotel', city: 'Mumbai', lat: 19.1136, lng: 72.8697, rating: 4.9, totalDonations: 189, contact: '+91 98200 34567' },
  { id: 'd4', name: 'ITC Grand Chola', type: 'Hotel', city: 'Chennai', lat: 13.0108, lng: 80.2206, rating: 4.7, totalDonations: 278, contact: '+91 98400 45678' },
  { id: 'd5', name: 'Haldiram\'s Central', type: 'Restaurant', city: 'Delhi', lat: 28.6315, lng: 77.2167, rating: 4.5, totalDonations: 412, contact: '+91 98100 56789' },
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

export const NGOS = [
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

export const VOLUNTEERS = [
  { id: 'v1', name: 'Aarav Sharma', city: 'Delhi', lat: 28.6200, lng: 77.2150, rating: 4.9, deliveries: 156, points: 4680, available: true, badges: ['🏆', '⭐', '🚀'] },
  { id: 'v2', name: 'Priya Menon', city: 'Bangalore', lat: 12.9650, lng: 77.5900, rating: 4.8, deliveries: 132, points: 3960, available: true, badges: ['🏆', '⭐'] },
  { id: 'v3', name: 'Rohan Patel', city: 'Mumbai', lat: 19.0700, lng: 72.8800, rating: 4.7, deliveries: 98, points: 2940, available: false, badges: ['⭐', '🔥'] },
  { id: 'v4', name: 'Sneha Iyer', city: 'Chennai', lat: 13.0700, lng: 80.2500, rating: 4.9, deliveries: 178, points: 5340, available: true, badges: ['🏆', '⭐', '🚀', '💎'] },
  { id: 'v5', name: 'Vikram Singh', city: 'Hyderabad', lat: 17.3900, lng: 78.4800, rating: 4.6, deliveries: 87, points: 2610, available: true, badges: ['⭐'] },
  { id: 'v6', name: 'Ananya Das', city: 'Kolkata', lat: 22.5600, lng: 88.3600, rating: 4.5, deliveries: 64, points: 1920, available: true, badges: ['🔥'] },
  { id: 'v7', name: 'Karthik Reddy', city: 'Pune', lat: 18.5250, lng: 73.8550, rating: 4.8, deliveries: 145, points: 4350, available: false, badges: ['🏆', '⭐', '🔥'] },
  { id: 'v8', name: 'Meera Joshi', city: 'Ahmedabad', lat: 23.0250, lng: 72.5700, rating: 4.4, deliveries: 56, points: 1680, available: true, badges: [] },
  { id: 'v9', name: 'Arjun Nair', city: 'Kochi', lat: 9.9350, lng: 76.2600, rating: 4.7, deliveries: 92, points: 2760, available: true, badges: ['⭐', '🔥'] },
  { id: 'v10', name: 'Pooja Gupta', city: 'Jaipur', lat: 26.9100, lng: 75.7900, rating: 4.6, deliveries: 73, points: 2190, available: true, badges: ['⭐'] },
  { id: 'v11', name: 'Rahul Verma', city: 'Lucknow', lat: 26.8450, lng: 80.9500, rating: 4.3, deliveries: 41, points: 1230, available: false, badges: [] },
  { id: 'v12', name: 'Divya Krishnan', city: 'Delhi', lat: 28.5800, lng: 77.2300, rating: 4.8, deliveries: 167, points: 5010, available: true, badges: ['🏆', '⭐', '🚀'] },
  { id: 'v13', name: 'Aditya Bhatt', city: 'Mumbai', lat: 19.0500, lng: 72.8400, rating: 4.5, deliveries: 78, points: 2340, available: true, badges: ['🔥'] },
  { id: 'v14', name: 'Ishaan Malhotra', city: 'Chandigarh', lat: 30.7350, lng: 76.7750, rating: 4.4, deliveries: 52, points: 1560, available: true, badges: [] },
  { id: 'v15', name: 'Lakshmi Rao', city: 'Bangalore', lat: 12.9400, lng: 77.6100, rating: 4.7, deliveries: 110, points: 3300, available: true, badges: ['⭐', '🚀'] },
  { id: 'v16', name: 'Nikhil Jain', city: 'Bhopal', lat: 23.2550, lng: 77.4100, rating: 4.2, deliveries: 34, points: 1020, available: true, badges: [] },
  { id: 'v17', name: 'Tanvi Saxena', city: 'Patna', lat: 25.6100, lng: 85.1400, rating: 4.5, deliveries: 67, points: 2010, available: false, badges: ['🔥'] },
  { id: 'v18', name: 'Kunal Mehta', city: 'Guwahati', lat: 26.1450, lng: 91.7350, rating: 4.3, deliveries: 39, points: 1170, available: true, badges: [] },
  { id: 'v19', name: 'Riya Choudhary', city: 'Hyderabad', lat: 17.3750, lng: 78.5000, rating: 4.6, deliveries: 89, points: 2670, available: true, badges: ['⭐'] },
  { id: 'v20', name: 'Sanjay Kumar', city: 'Delhi', lat: 28.6400, lng: 77.1900, rating: 4.9, deliveries: 201, points: 6030, available: true, badges: ['🏆', '⭐', '🚀', '💎', '🌟'] },
];

const STATUSES = ['pending', 'accepted', 'picked_up', 'in_transit', 'delivered'];

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDonationId(index) {
  return `DON-${String(index + 1).padStart(4, '0')}`;
}

function generateQR(id) {
  return `FL-QR-${id}-${Date.now().toString(36).toUpperCase()}`;
}

function hoursAgo(h) {
  return new Date(Date.now() - h * 3600000).toISOString();
}

export function generateDonations(count = 50) {
  const donations = [];
  for (let i = 0; i < count; i++) {
    const donor = DONORS[i % DONORS.length];
    const food = FOOD_CATEGORIES[randomBetween(0, FOOD_CATEGORIES.length - 1)];
    const status = STATUSES[randomBetween(0, STATUSES.length - 1)];
    const ngo = NGOS[randomBetween(0, NGOS.length - 1)];
    const volunteer = VOLUNTEERS[randomBetween(0, VOLUNTEERS.length - 1)];
    const qty = randomBetween(5, 200);
    const hrs = randomBetween(1, 48);

    donations.push({
      id: generateDonationId(i),
      donorId: donor.id,
      donorName: donor.name,
      donorCity: donor.city,
      foodCategory: food.id,
      foodName: food.name,
      foodEmoji: food.emoji,
      quantity: qty,
      unit: qty > 50 ? 'kg' : 'servings',
      status,
      ngoId: status !== 'pending' ? ngo.id : null,
      ngoName: status !== 'pending' ? ngo.name : null,
      volunteerId: ['picked_up', 'in_transit', 'delivered'].includes(status) ? volunteer.id : null,
      volunteerName: ['picked_up', 'in_transit', 'delivered'].includes(status) ? volunteer.name : null,
      qrCode: generateQR(generateDonationId(i)),
      createdAt: hoursAgo(hrs),
      expiresAt: hoursAgo(hrs - food.shelfHours),
      shelfLifeHours: food.shelfHours,
      temperature: randomBetween(18, 38),
      lat: donor.lat + (Math.random() - 0.5) * 0.02,
      lng: donor.lng + (Math.random() - 0.5) * 0.02,
      notes: '',
      urgency: food.shelfHours <= 4 ? 'high' : food.shelfHours <= 12 ? 'medium' : 'low',
    });
  }
  return donations;
}

export const ANALYTICS = {
  totalFoodSaved: 45678,
  totalMealsDelivered: 128940,
  co2Reduced: 12340,
  activeVolunteers: 487,
  wasteReduction: 34.5,
  activeDonors: DONORS.length,
  activeNGOs: NGOS.length,
  avgDeliveryTime: 42, // minutes
  fraudAlertsCount: 3,
  monthlyData: [
    { month: 'Jul', donations: 320, meals: 8400, volunteers: 45 },
    { month: 'Aug', donations: 410, meals: 10800, volunteers: 52 },
    { month: 'Sep', donations: 380, meals: 9800, volunteers: 48 },
    { month: 'Oct', donations: 520, meals: 14200, volunteers: 61 },
    { month: 'Nov', donations: 610, meals: 16800, volunteers: 73 },
    { month: 'Dec', donations: 580, meals: 15200, volunteers: 68 },
    { month: 'Jan', donations: 690, meals: 19400, volunteers: 82 },
    { month: 'Feb', donations: 720, meals: 20100, volunteers: 89 },
    { month: 'Mar', donations: 810, meals: 22600, volunteers: 95 },
    { month: 'Apr', donations: 780, meals: 21800, volunteers: 91 },
    { month: 'May', donations: 890, meals: 25400, volunteers: 102 },
    { month: 'Jun', donations: 950, meals: 28200, volunteers: 110 },
  ],
  topNGOs: [
    { name: 'Akshaya Patra', meals: 15000, efficiency: 96 },
    { name: 'Feeding India', meals: 25000, efficiency: 94 },
    { name: 'Robin Hood Army', meals: 12000, efficiency: 92 },
    { name: 'Annamrita', meals: 20000, efficiency: 95 },
    { name: 'No Food Waste', meals: 8000, efficiency: 91 },
  ],
  foodCategories: [
    { name: 'Cooked Meals', percentage: 35, color: '#10b981' },
    { name: 'Rice & Roti', percentage: 22, color: '#06b6d4' },
    { name: 'Bread & Bakery', percentage: 15, color: '#f59e0b' },
    { name: 'Fruits & Veg', percentage: 12, color: '#8b5cf6' },
    { name: 'Dairy', percentage: 8, color: '#ec4899' },
    { name: 'Others', percentage: 8, color: '#64748b' },
  ],
  demandZones: [
    { city: 'Delhi', demand: 95, lat: 28.6139, lng: 77.2090 },
    { city: 'Mumbai', demand: 88, lat: 19.0760, lng: 72.8777 },
    { city: 'Kolkata', demand: 82, lat: 22.5726, lng: 88.3639 },
    { city: 'Chennai', demand: 75, lat: 13.0827, lng: 80.2707 },
    { city: 'Bangalore', demand: 70, lat: 12.9716, lng: 77.5946 },
    { city: 'Hyderabad', demand: 65, lat: 17.3850, lng: 78.4867 },
    { city: 'Lucknow', demand: 78, lat: 26.8467, lng: 80.9462 },
    { city: 'Patna', demand: 85, lat: 25.6093, lng: 85.1376 },
    { city: 'Guwahati', demand: 72, lat: 26.1445, lng: 91.7362 },
    { city: 'Bhopal', demand: 68, lat: 23.2599, lng: 77.4126 },
  ],
};

export const GAMIFICATION_BADGES = [
  { id: 'first_delivery', emoji: '🎉', name: 'First Delivery', desc: 'Complete your first delivery', threshold: 1 },
  { id: 'ten_deliveries', emoji: '🔥', name: 'On Fire', desc: 'Complete 10 deliveries', threshold: 10 },
  { id: 'fifty_deliveries', emoji: '⭐', name: 'Star Volunteer', desc: 'Complete 50 deliveries', threshold: 50 },
  { id: 'hundred_deliveries', emoji: '🏆', name: 'Champion', desc: 'Complete 100 deliveries', threshold: 100 },
  { id: 'speed_demon', emoji: '🚀', name: 'Speed Demon', desc: 'Deliver under 20 mins 10 times', threshold: 10 },
  { id: 'diamond', emoji: '💎', name: 'Diamond Hands', desc: 'Complete 150 deliveries', threshold: 150 },
  { id: 'legend', emoji: '🌟', name: 'Legend', desc: 'Complete 200 deliveries', threshold: 200 },
  { id: 'night_owl', emoji: '🦉', name: 'Night Owl', desc: '20 deliveries after 8 PM', threshold: 20 },
];

export const NOTIFICATIONS = [
  { id: 1, type: 'donation', message: 'New donation from Taj Palace Kitchen — 50 servings of Biryani', time: '2 min ago', read: false },
  { id: 2, type: 'accept', message: 'Feeding India accepted your donation DON-0012', time: '5 min ago', read: false },
  { id: 3, type: 'pickup', message: 'Volunteer Aarav picked up DON-0008', time: '15 min ago', read: true },
  { id: 4, type: 'delivered', message: 'DON-0005 delivered successfully to Robin Hood Army', time: '30 min ago', read: true },
  { id: 5, type: 'alert', message: '⚠️ DON-0020 expiring in 1 hour — needs urgent pickup', time: '10 min ago', read: false },
  { id: 6, type: 'badge', message: '🏆 Priya earned "Star Volunteer" badge!', time: '1 hr ago', read: true },
  { id: 7, type: 'donation', message: 'New donation from Saravana Bhavan — 30 kg Rice', time: '1 hr ago', read: true },
  { id: 8, type: 'alert', message: 'Unusual activity detected for donor d14 — verify donation', time: '2 hr ago', read: true },
];

export const ACTIVITY_FEED_TEMPLATES = [
  { template: '{donor} donated {qty} {unit} of {food} in {city}', type: 'donation' },
  { template: '{ngo} accepted donation from {donor}', type: 'accept' },
  { template: '{volunteer} picked up {food} from {donor}', type: 'pickup' },
  { template: '{volunteer} delivered {qty} {unit} to {ngo}', type: 'delivered' },
  { template: '🎉 {volunteer} earned the {badge} badge!', type: 'badge' },
];

export function generateActivityFeed(count = 15) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const template = ACTIVITY_FEED_TEMPLATES[randomBetween(0, ACTIVITY_FEED_TEMPLATES.length - 1)];
    const donor = DONORS[randomBetween(0, DONORS.length - 1)];
    const ngo = NGOS[randomBetween(0, NGOS.length - 1)];
    const vol = VOLUNTEERS[randomBetween(0, VOLUNTEERS.length - 1)];
    const food = FOOD_CATEGORIES[randomBetween(0, FOOD_CATEGORIES.length - 1)];
    const badge = GAMIFICATION_BADGES[randomBetween(0, GAMIFICATION_BADGES.length - 1)];
    const qty = randomBetween(5, 100);

    let msg = template.template
      .replace('{donor}', donor.name)
      .replace('{ngo}', ngo.name)
      .replace('{volunteer}', vol.name)
      .replace('{food}', food.name)
      .replace('{qty}', qty)
      .replace('{unit}', qty > 50 ? 'kg' : 'servings')
      .replace('{city}', donor.city)
      .replace('{badge}', badge.name);

    items.push({
      id: i,
      message: msg,
      type: template.type,
      time: `${randomBetween(1, 59)} min ago`,
      emoji: food.emoji,
    });
  }
  return items;
}
