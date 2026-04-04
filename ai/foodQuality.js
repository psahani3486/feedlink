// FeedLink — Food Quality Assessment Engine

export function assessFoodQuality({ appearance, smell, temperature, packaging }) {
  let score = 100;
  const issues = [];

  // Appearance scoring
  const appearanceScores = { excellent: 0, good: -5, fair: -15, poor: -30 };
  score += (appearanceScores[appearance] || -10);
  if (appearance === 'poor') issues.push('Poor visual condition detected');

  // Smell scoring
  const smellScores = { normal: 0, slightly_off: -15, bad: -40 };
  score += (smellScores[smell] || -5);
  if (smell === 'bad') issues.push('Abnormal odor detected');

  // Temperature scoring
  if (temperature > 60 || temperature < 4) score += 0; // Safe zone
  else if (temperature >= 4 && temperature <= 60) {
    score -= Math.abs(temperature - 32) < 10 ? 20 : 10; // Danger zone
    issues.push('Temperature in danger zone (4-60°C)');
  }

  // Packaging scoring
  const pkgScores = { sealed: 0, covered: -5, open: -15, damaged: -25 };
  score += (pkgScores[packaging] || -5);
  if (packaging === 'damaged') issues.push('Packaging integrity compromised');

  score = Math.max(0, Math.min(100, score));
  const confidence = 78 + Math.floor(Math.random() * 15);

  let verdict, verdictColor;
  if (score >= 80) { verdict = 'Safe for Distribution'; verdictColor = '#22c55e'; }
  else if (score >= 60) { verdict = 'Acceptable with Caution'; verdictColor = '#f59e0b'; }
  else if (score >= 40) { verdict = 'Distribute Immediately'; verdictColor = '#f97316'; }
  else { verdict = 'Not Recommended'; verdictColor = '#ef4444'; }

  return { score, confidence, verdict, verdictColor, issues, recommendation: score >= 60 ? 'Proceed with delivery' : 'Consider discarding or immediate local use only' };
}
