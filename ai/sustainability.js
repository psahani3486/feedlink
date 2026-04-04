// FeedLink X — Sustainability & Carbon Impact Engine

const CONVERSION_FACTORS = {
  foodToMethane: 0.272,   // kg methane per kg food waste prevented
  foodToCO2: 0.414,       // kg CO2 equivalent per kg food saved
  foodToWater: 20,        // liters water per kg food
  co2PerTree: 22,         // kg CO2 absorbed per tree per year
  mealWeight: 0.35,       // avg kg per meal
};

export function calculateCarbonImpact(foodSavedKg) {
  return {
    co2Saved: Math.round(foodSavedKg * CONVERSION_FACTORS.foodToCO2),
    methanePrevented: Math.round(foodSavedKg * CONVERSION_FACTORS.foodToMethane),
    waterSaved: Math.round(foodSavedKg * CONVERSION_FACTORS.foodToWater),
    treesEquivalent: Math.round((foodSavedKg * CONVERSION_FACTORS.foodToCO2) / CONVERSION_FACTORS.co2PerTree),
    landfillDiverted: Math.round(foodSavedKg * 0.85),
    mealsEquivalent: Math.round(foodSavedKg / CONVERSION_FACTORS.mealWeight),
  };
}

export function getSDGImpact(metrics) {
  return [
    { goal: 1, name: 'No Poverty', impact: Math.min(100, Math.round(metrics.mealsEquivalent / 1000)), desc: 'Meals provided to economically vulnerable populations' },
    { goal: 2, name: 'Zero Hunger', impact: Math.min(100, Math.round(metrics.mealsEquivalent / 500)), desc: 'Direct hunger relief through food redistribution' },
    { goal: 3, name: 'Good Health & Well-being', impact: Math.min(100, Math.round(metrics.mealsEquivalent / 2000)), desc: 'Nutritious food access improving community health' },
    { goal: 12, name: 'Responsible Consumption', impact: Math.min(100, Math.round(metrics.landfillDiverted / 300)), desc: 'Food waste diverted from landfills' },
    { goal: 13, name: 'Climate Action', impact: Math.min(100, Math.round(metrics.co2Saved / 200)), desc: 'Greenhouse gas emissions prevented' },
    { goal: 17, name: 'Partnerships for Goals', impact: Math.min(100, 55), desc: 'Cross-sector collaboration between restaurants, NGOs, volunteers' },
  ];
}

export function generateESGReport(companyName, mealsSponsored, co2Saved) {
  const envScore = Math.min(100, Math.round(co2Saved / 100));
  const socialScore = Math.min(100, Math.round(mealsSponsored / 500));
  const govScore = 85;
  const overall = Math.round((envScore * 0.4 + socialScore * 0.4 + govScore * 0.2));

  return {
    company: companyName,
    overallESG: overall,
    environmental: { score: envScore, co2Saved, waterSaved: co2Saved * 48, wasteReduced: co2Saved * 2.4 },
    social: { score: socialScore, mealsSponsored, beneficiariesReached: Math.round(mealsSponsored * 0.3), communitiesServed: Math.round(mealsSponsored / 5000) },
    governance: { score: govScore, transparency: 'High', audited: true, reportingFrequency: 'Monthly' },
    rating: overall >= 85 ? 'AAA' : overall >= 70 ? 'AA' : overall >= 55 ? 'A' : 'BBB',
    ratingColor: overall >= 85 ? '#22c55e' : overall >= 70 ? '#10b981' : overall >= 55 ? '#f59e0b' : '#94a3b8',
  };
}
