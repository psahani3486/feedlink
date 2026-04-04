// FeedLink X — AI Fraud Detection & Trust Score Engine

export function calculateTrustScore(entity) {
  let score = 100;
  const flags = [];

  // Location consistency check
  if (entity.locationMismatch) {
    score -= 30;
    flags.push({ type: 'location_mismatch', severity: 'high', detail: 'GPS location differs from registered address' });
  }

  // Volume anomaly check
  if (entity.quantity && entity.avgQuantity) {
    const ratio = entity.quantity / entity.avgQuantity;
    if (ratio > 3) {
      score -= 20;
      flags.push({ type: 'volume_anomaly', severity: 'medium', detail: `${ratio.toFixed(1)}x above average` });
    }
  }

  // Timing pattern check
  if (entity.offHoursDonation) {
    score -= 10;
    flags.push({ type: 'timing_suspect', severity: 'low', detail: 'Donation submitted during unusual hours' });
  }

  // Identity verification
  if (!entity.verified) {
    score -= 15;
    flags.push({ type: 'unverified', severity: 'medium', detail: 'Identity not verified' });
  }

  // Historical reliability
  if (entity.completionRate) {
    if (entity.completionRate < 0.5) score -= 25;
    else if (entity.completionRate < 0.8) score -= 10;
  }

  // QR reuse detection
  if (entity.qrReused) {
    score -= 40;
    flags.push({ type: 'qr_reuse', severity: 'critical', detail: 'QR code used at multiple locations' });
  }

  score = Math.max(0, Math.min(100, score));

  let riskLevel, riskColor;
  if (score >= 80) { riskLevel = 'Trusted'; riskColor = '#22c55e'; }
  else if (score >= 60) { riskLevel = 'Moderate'; riskColor = '#f59e0b'; }
  else if (score >= 40) { riskLevel = 'Suspicious'; riskColor = '#f97316'; }
  else { riskLevel = 'High Risk'; riskColor = '#ef4444'; }

  return { score, riskLevel, riskColor, flags, recommendation: score < 40 ? 'Block & Investigate' : score < 60 ? 'Manual Review Required' : score < 80 ? 'Monitor Activity' : 'Approved' };
}

export function detectAnomalies(donations) {
  const anomalies = [];
  const donorHistory = {};

  donations.forEach(d => {
    if (!donorHistory[d.donorId]) donorHistory[d.donorId] = [];
    donorHistory[d.donorId].push(d);
  });

  Object.entries(donorHistory).forEach(([donorId, history]) => {
    // Frequency anomaly
    if (history.length > 10) {
      const recent = history.filter(h => {
        const created = new Date(h.createdAt);
        return (Date.now() - created.getTime()) < 3600000;
      });
      if (recent.length > 3) {
        anomalies.push({ donorId, type: 'rapid_submissions', detail: `${recent.length} donations in 1 hour`, severity: 'medium' });
      }
    }

    // Quantity spike
    const avgQty = history.reduce((s, h) => s + h.quantity, 0) / history.length;
    const spikes = history.filter(h => h.quantity > avgQty * 3);
    spikes.forEach(s => {
      anomalies.push({ donorId, type: 'quantity_spike', detail: `${s.quantity} vs avg ${Math.round(avgQty)}`, severity: 'low', donationId: s.id });
    });
  });

  return anomalies;
}

export function generateFraudReport(alerts) {
  const critical = alerts.filter(a => a.severity === 'critical').length;
  const high = alerts.filter(a => a.severity === 'high').length;
  const medium = alerts.filter(a => a.severity === 'medium').length;
  const resolved = alerts.filter(a => a.resolved).length;

  return {
    totalAlerts: alerts.length,
    critical, high, medium,
    resolved,
    unresolved: alerts.length - resolved,
    riskScore: Math.max(0, 100 - critical * 15 - high * 8 - medium * 3),
    recommendation: critical > 2 ? 'Platform integrity at risk — immediate action needed' : high > 3 ? 'Multiple high-risk alerts — review urgently' : 'Normal operations — continue monitoring',
  };
}
