'use client';
import { useMemo } from 'react';
import { SUSTAINABILITY_METRICS } from '@/data/extendedData';
import { calculateCarbonImpact, getSDGImpact } from '@/ai/sustainability';
import StatsCard from '@/components/StatsCard';
import { LineChart, BarChart, DoughnutChart } from '@/components/Charts';

export default function SustainabilityDashboard() {
  const metrics = useMemo(() => calculateCarbonImpact(SUSTAINABILITY_METRICS.foodWasteReduced), []);
  const sdgImpact = useMemo(() => getSDGImpact(metrics), [metrics]);

  const carbonTrendData = {
    labels: SUSTAINABILITY_METRICS.monthlyCarbon.map(m => m.month),
    datasets: [
      { label: 'CO₂ Saved (kg)', data: SUSTAINABILITY_METRICS.monthlyCarbon.map(m => m.saved), borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', fill: true, tension: 0.4 },
      { label: 'Waste Generated (kg)', data: SUSTAINABILITY_METRICS.monthlyCarbon.map(m => m.waste), borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', fill: true, tension: 0.4 },
    ],
  };

  const impactBarData = {
    labels: SUSTAINABILITY_METRICS.impactBreakdown.map(i => i.category.split(' ').slice(0, 2).join(' ')),
    datasets: [
      { label: 'Food Saved (kg)', data: SUSTAINABILITY_METRICS.impactBreakdown.map(i => i.kg), backgroundColor: '#10b981', borderRadius: 6 },
      { label: 'CO₂ Prevented (kg)', data: SUSTAINABILITY_METRICS.impactBreakdown.map(i => i.co2), backgroundColor: '#8b5cf6', borderRadius: 6 },
    ],
  };

  const waterDoughnut = {
    labels: SUSTAINABILITY_METRICS.impactBreakdown.map(i => i.category.split(' ').slice(0, 2).join(' ')),
    datasets: [{
      data: SUSTAINABILITY_METRICS.impactBreakdown.map(i => i.water),
      backgroundColor: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#8b5cf6'],
      borderWidth: 0,
    }],
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🌍 Carbon Impact & Sustainability</h1>
        <p>Environmental metrics, SDG alignment, and sustainability scorecard</p>
      </div>

      {/* Hero Impact Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { icon: '🌿', value: metrics.co2Saved.toLocaleString('en-US'), label: 'Kg CO₂ Saved', sub: 'Greenhouse gas prevented', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
          { icon: '💧', value: (metrics.waterSaved / 1000).toFixed(0) + 'K', label: 'Liters Water Saved', sub: 'Clean water preserved', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
          { icon: '🌳', value: metrics.treesEquivalent, label: 'Trees Equivalent', sub: 'Annual CO₂ absorption', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
        ].map((card, i) => (
          <div key={i} style={{ background: card.bg, borderRadius: 'var(--radius-xl)', padding: '2rem', textAlign: 'center', border: `1px solid ${card.color}20`, transition: 'all var(--transition-base)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{card.icon}</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: card.color }}>{card.value}</div>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{card.label}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <StatsCard icon="♻️" value={metrics.landfillDiverted} label="Kg Landfill Diverted" color="#10b981" />
        <StatsCard icon="🔥" value={metrics.methanePrevented} label="Kg Methane Prevented" color="#f59e0b" />
        <StatsCard icon="🍛" value={metrics.mealsEquivalent} label="Meals Equivalent" color="#06b6d4" />
        <StatsCard icon="📦" value={SUSTAINABILITY_METRICS.foodWasteReduced} label="Kg Food Waste Reduced" color="#8b5cf6" />
      </div>

      {/* SDG Goals */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="section-card-header">
          <h2>🎯 UN Sustainable Development Goals Impact</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {SUSTAINABILITY_METRICS.sdgGoals.map(goal => (
            <div key={goal.number} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border-light)', transition: 'all var(--transition-base)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: goal.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1rem' }}>
                  {goal.number}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{goal.name}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                <span style={{ fontWeight: 700, color: goal.color }}>{goal.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${goal.progress}%`, background: goal.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div className="section-card-header">
            <h2>📈 Carbon Savings vs Waste Trend</h2>
          </div>
          <LineChart data={carbonTrendData} />
        </div>
        <div className="card">
          <div className="section-card-header">
            <h2>📊 Impact by Food Category</h2>
          </div>
          <BarChart data={impactBarData} />
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="section-card-header">
            <h2>💧 Water Savings Distribution</h2>
          </div>
          <DoughnutChart data={waterDoughnut} />
        </div>
        <div className="card">
          <div className="section-card-header">
            <h2>📋 Real-World Equivalents</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem 0' }}>
            {[
              ['🚗', `${Math.round(metrics.co2Saved / 0.21)} km`, 'Car rides eliminated', 'Based on avg 0.21 kg CO₂/km'],
              ['🏠', `${Math.round(metrics.co2Saved / 5000)} homes`, 'Annual home energy saved', 'Avg Indian household CO₂ output'],
              ['✈️', `${Math.round(metrics.co2Saved / 90)} flights`, 'Delhi-Mumbai flights offset', '90 kg CO₂ per passenger'],
              ['🌳', `${metrics.treesEquivalent} trees`, 'Annual CO₂ absorption equivalent', 'Avg tree absorbs 22 kg CO₂/year'],
              ['🚿', `${Math.round(metrics.waterSaved / 80)} showers`, 'Water saved equivalent', 'Avg shower uses 80 liters'],
              ['🍔', `${metrics.mealsEquivalent.toLocaleString('en-US')} meals`, 'Meals that reached people', 'Instead of ending in landfill'],
            ].map(([icon, value, label, desc], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '1.8rem' }}>{icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{label}</div>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', maxWidth: '140px', textAlign: 'right' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
