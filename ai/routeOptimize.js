// FeedLink — Route Optimization Engine

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function optimizeRoute(startLocation, stops) {
  if (!stops.length) return { route: [], totalDistance: 0, totalTime: 0 };
  const visited = new Set();
  const route = [];
  let current = startLocation;
  let totalDist = 0;

  while (visited.size < stops.length) {
    let nearest = null, nearestDist = Infinity, nearestIdx = -1;
    stops.forEach((stop, idx) => {
      if (visited.has(idx)) return;
      const d = haversineDistance(current.lat, current.lng, stop.lat, stop.lng);
      if (d < nearestDist) { nearestDist = d; nearest = stop; nearestIdx = idx; }
    });
    if (nearest) {
      visited.add(nearestIdx);
      totalDist += nearestDist;
      route.push({ ...nearest, order: route.length + 1, distance: Math.round(nearestDist * 10) / 10, eta: Math.round(totalDist * 3 + 5 * route.length + 5) });
      current = nearest;
    }
  }
  return { route, totalDistance: Math.round(totalDist * 10) / 10, totalTime: route.length ? route[route.length - 1].eta : 0, stopsCount: route.length };
}

export function calculateETA(distance) {
  return Math.round((distance / 25) * 60 + 5);
}

export function generateRouteCoordinates(start, end, numPoints = 10) {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const curve = Math.sin(t * Math.PI) * 0.002;
    points.push({ lat: start.lat + (end.lat - start.lat) * t + curve, lng: start.lng + (end.lng - start.lng) * t + curve * 0.5 });
  }
  return points;
}
