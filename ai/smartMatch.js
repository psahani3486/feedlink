// FeedLink — Smart Matching Engine (Core AI)
// Matches Donor → NGO → Volunteer based on multiple weighted factors

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Normalize a value to 0-1 (lower is better for distance, higher is better for capacity)
function normalize(value, min, max, invert = false) {
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
  return invert ? 1 - normalized : normalized;
}

const WEIGHTS = {
  distance: 0.35,
  capacity: 0.25,
  urgency: 0.20,
  rating: 0.10,
  historicalPerformance: 0.10,
};

export function matchDonorToNGOs(donor, ngos, donation) {
  const results = ngos.map(ngo => {
    const distance = haversineDistance(donor.lat, donor.lng, ngo.lat, ngo.lng);
    const availableCapacity = ngo.capacity - ngo.currentLoad;
    const capacityRatio = availableCapacity / ngo.capacity;

    // Distance score (closer = better)
    const distanceScore = normalize(distance, 0, 500, true);

    // Capacity score (more available = better)
    const capacityScore = normalize(capacityRatio, 0, 1);

    // Urgency score (food with shorter shelf life gets priority matching)
    const urgencyScore = donation.urgency === 'high' ? 1 :
      donation.urgency === 'medium' ? 0.6 : 0.3;

    // Rating score
    const ratingScore = normalize(ngo.rating, 3, 5);

    // Historical performance (simulated)
    const perfScore = normalize(ngo.beneficiaries, 1000, 25000);

    const totalScore = (
      distanceScore * WEIGHTS.distance +
      capacityScore * WEIGHTS.capacity +
      urgencyScore * WEIGHTS.urgency +
      ratingScore * WEIGHTS.rating +
      perfScore * WEIGHTS.historicalPerformance
    );

    return {
      ngo,
      distance: Math.round(distance * 10) / 10,
      availableCapacity,
      score: Math.round(totalScore * 100),
      breakdown: {
        distance: Math.round(distanceScore * 100),
        capacity: Math.round(capacityScore * 100),
        urgency: Math.round(urgencyScore * 100),
        rating: Math.round(ratingScore * 100),
        performance: Math.round(perfScore * 100),
      },
      eta: Math.round(distance * 2.5 + 10), // minutes estimate
      matchReason: distanceScore > 0.7 ? 'Closest available' :
        capacityScore > 0.7 ? 'Best capacity' :
          ratingScore > 0.8 ? 'Highest rated' : 'Best overall match',
    };
  });

  return results.sort((a, b) => b.score - a.score);
}

export function matchVolunteers(pickupLocation, volunteers, urgency = 'medium') {
  const results = volunteers
    .filter(v => v.available)
    .map(v => {
      const distance = haversineDistance(pickupLocation.lat, pickupLocation.lng, v.lat, v.lng);
      const distanceScore = normalize(distance, 0, 100, true);
      const ratingScore = normalize(v.rating, 3, 5);
      const expScore = normalize(v.deliveries, 0, 200);
      const urgencyBonus = urgency === 'high' ? 0.2 : urgency === 'medium' ? 0.1 : 0;

      const score = (distanceScore * 0.45 + ratingScore * 0.25 + expScore * 0.15 + urgencyBonus * 0.15);

      return {
        volunteer: v,
        distance: Math.round(distance * 10) / 10,
        score: Math.round(score * 100),
        eta: Math.round(distance * 3 + 5),
        matchReason: distanceScore > 0.8 ? 'Nearest available' :
          ratingScore > 0.8 ? 'Top rated' : 'Best fit',
      };
    });

  return results.sort((a, b) => b.score - a.score);
}

export function getMatchExplanation(match) {
  const { breakdown } = match;
  const factors = [];
  if (breakdown.distance > 70) factors.push('Very close proximity');
  if (breakdown.capacity > 70) factors.push('Excellent capacity available');
  if (breakdown.urgency > 70) factors.push('High urgency match');
  if (breakdown.rating > 70) factors.push('Top-rated organization');
  if (breakdown.performance > 70) factors.push('Strong track record');
  return factors.length > 0 ? factors : ['Good overall balance of factors'];
}
