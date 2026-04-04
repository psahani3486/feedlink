'use client';
import { useState } from 'react';
import { COMMUNITY_FRIDGES, FRIDGE_HISTORY } from '@/data/extendedData';
import StatsCard from '@/components/StatsCard';
import { LineChart, BarChart } from '@/components/Charts';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function FridgeDashboard() {
  const [selectedFridge, setSelectedFridge] = useState(COMMUNITY_FRIDGES[0]);

  const totalFridges = COMMUNITY_FRIDGES.length;
  const activeFridges = COMMUNITY_FRIDGES.filter(f => f.status === 'active').length;
  const needsRefill = COMMUNITY_FRIDGES.filter(f => f.fillLevel < 30).length;
  const totalMealsServed = COMMUNITY_FRIDGES.reduce((s, f) => s + f.dailyUsage, 0);

  const fillChartData = {
    labels: FRIDGE_HISTORY.map(h => h.time),
    datasets: [
      { label: 'Items in Fridge', data: FRIDGE_HISTORY.map(h => h.items), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.4 },
      { label: 'Temperature (°C)', data: FRIDGE_HISTORY.map(h => h.temperature * 10), borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', fill: false, tension: 0.4 },
    ],
  };

  const usageData = {
    labels: COMMUNITY_FRIDGES.slice(0, 8).map(f => f.city),
    datasets: [{
      label: 'Daily Usage (meals)',
      data: COMMUNITY_FRIDGES.slice(0, 8).map(f => f.dailyUsage),
      backgroundColor: COMMUNITY_FRIDGES.slice(0, 8).map(f => f.fillLevel > 60 ? '#10b981' : f.fillLevel > 30 ? '#f59e0b' : '#ef4444'),
      borderRadius: 6,
    }],
  };

  const statusColors = { active: '#22c55e', needs_refill: '#f59e0b', critical: '#ef4444' };
  const statusLabels = { active: 'Active', needs_refill: 'Needs Refill', critical: 'Critical' };

  return (
    <ProtectedRoute allowedRoles={['ngo', 'admin', 'volunteer']} pageTitle="Community Fridges">
    <div className="page-container">
      <div className="page-header">
        <h1>🧊 Smart Community Fridge Network</h1>
        <p>IoT-enabled public food fridges across India — real-time monitoring & AI spoilage alerts</p>
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <StatsCard icon="🧊" value={totalFridges} label="Total Fridges" trend="+3 this month" color="#06b6d4" />
        <StatsCard icon="✅" value={activeFridges} label="Active" color="#22c55e" />
        <StatsCard icon="⚠️" value={needsRefill} label="Needs Refill" color="#ef4444" />
        <StatsCard icon="🍛" value={totalMealsServed} label="Daily Meals Served" trend="+8%" color="#f59e0b" />
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        {/* Fridge List */}
        <div className="card">
          <div className="section-card-header">
            <h2>📋 All Fridges</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '500px', overflowY: 'auto' }}>
            {COMMUNITY_FRIDGES.map(fridge => (
              <div key={fridge.id} className="donation-item" onClick={() => setSelectedFridge(fridge)}
                style={{ cursor: 'pointer', border: selectedFridge.id === fridge.id ? '1px solid var(--primary)' : '1px solid var(--border-light)' }}>
                <div className="donation-icon" style={{ background: `${statusColors[fridge.status]}15`, color: statusColors[fridge.status], fontSize: '1.2rem' }}>🧊</div>
                <div className="donation-info" style={{ flex: 1 }}>
                  <h4>{fridge.name}</h4>
                  <p>{fridge.city} • {fridge.currentItems}/{fridge.capacity} items</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className="badge" style={{ background: `${statusColors[fridge.status]}15`, color: statusColors[fridge.status], border: `1px solid ${statusColors[fridge.status]}30` }}>
                    {statusLabels[fridge.status]}
                  </span>
                  <div className="progress-bar" style={{ width: '60px', height: '4px' }}>
                    <div className="progress-fill" style={{ width: `${fridge.fillLevel}%`, background: fridge.fillLevel > 60 ? '#22c55e' : fridge.fillLevel > 30 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Fridge Detail */}
        <div className="card">
          <div className="section-card-header">
            <h2>🔍 {selectedFridge.name}</h2>
            <span className="badge" style={{ background: `${statusColors[selectedFridge.status]}15`, color: statusColors[selectedFridge.status], border: `1px solid ${statusColors[selectedFridge.status]}30` }}>
              {statusLabels[selectedFridge.status]}
            </span>
          </div>

          {/* IoT Gauges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Fill Level</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: selectedFridge.fillLevel > 60 ? '#22c55e' : selectedFridge.fillLevel > 30 ? '#f59e0b' : '#ef4444' }}>
                {selectedFridge.fillLevel}%
              </div>
              <div className="progress-bar" style={{ marginTop: '8px' }}>
                <div className="progress-fill" style={{ width: `${selectedFridge.fillLevel}%`, background: selectedFridge.fillLevel > 60 ? '#22c55e' : selectedFridge.fillLevel > 30 ? '#f59e0b' : '#ef4444' }} />
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>🌡️ Temperature</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: selectedFridge.temperature <= 5 ? '#22c55e' : selectedFridge.temperature <= 7 ? '#f59e0b' : '#ef4444' }}>
                {selectedFridge.temperature}°C
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {selectedFridge.temperature <= 5 ? '✅ Optimal' : selectedFridge.temperature <= 7 ? '⚠️ Warm' : '🔴 Too Warm'}
              </div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Spoilage Risk</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: selectedFridge.spoilageRisk === 'low' ? '#22c55e' : selectedFridge.spoilageRisk === 'medium' ? '#f59e0b' : '#ef4444' }}>
                {selectedFridge.spoilageRisk === 'low' ? '🟢' : selectedFridge.spoilageRisk === 'medium' ? '🟡' : '🔴'}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: selectedFridge.spoilageRisk === 'low' ? '#22c55e' : selectedFridge.spoilageRisk === 'medium' ? '#f59e0b' : '#ef4444', marginTop: '4px', textTransform: 'capitalize' }}>
                {selectedFridge.spoilageRisk}
              </div>
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
            {[
              ['📍 City', selectedFridge.city],
              ['📦 Items', `${selectedFridge.currentItems}/${selectedFridge.capacity}`],
              ['🔄 Last Refill', selectedFridge.lastRefill],
              ['📊 Daily Usage', `${selectedFridge.dailyUsage} meals`],
              ['📅 Installed', selectedFridge.installDate],
              ['🔐 QR Access', 'Enabled'],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontWeight: 600 }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button className="btn btn-primary btn-sm">📲 Request Refill</button>
            <button className="btn btn-secondary btn-sm">🔐 Generate QR</button>
            <button className="btn btn-secondary btn-sm">📊 Full Report</button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="dashboard-grid">
        <div className="card">
          <div className="section-card-header">
            <h2>📈 Fridge Activity (24h)</h2>
          </div>
          <LineChart data={fillChartData} />
        </div>
        <div className="card">
          <div className="section-card-header">
            <h2>🏙️ City-wise Daily Usage</h2>
          </div>
          <BarChart data={usageData} />
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
