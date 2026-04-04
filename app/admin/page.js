'use client';
import { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { ANALYTICS, NGOS } from '@/data/mockData';
import { FRAUD_ALERTS_DETAILED, TRUST_SCORES, REDISTRIBUTION_REQUESTS } from '@/data/extendedData';
import { generateFraudReport } from '@/ai/fraudDetection';
import StatsCard from '@/components/StatsCard';
import { BarChart, LineChart, DoughnutChart } from '@/components/Charts';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminDashboard() {
  const { state } = useApp();
  const fraudReport = generateFraudReport(FRAUD_ALERTS_DETAILED);

  const donationLineData = {
    labels: ANALYTICS.monthlyData.map(m => m.month),
    datasets: [
      { label: 'Donations', data: ANALYTICS.monthlyData.map(m => m.donations), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.4 },
      { label: 'Meals Delivered', data: ANALYTICS.monthlyData.map(m => m.meals / 10), borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', fill: true, tension: 0.4 },
    ],
  };
  const ngoBarData = {
    labels: ANALYTICS.topNGOs.map(n => n.name),
    datasets: [
      { label: 'Meals Delivered', data: ANALYTICS.topNGOs.map(n => n.meals / 100), backgroundColor: '#10b981', borderRadius: 6 },
      { label: 'Efficiency %', data: ANALYTICS.topNGOs.map(n => n.efficiency), backgroundColor: '#06b6d4', borderRadius: 6 },
    ],
  };
  const categoryDoughnut = {
    labels: ANALYTICS.foodCategories.map(c => c.name),
    datasets: [{ data: ANALYTICS.foodCategories.map(c => c.percentage), backgroundColor: ANALYTICS.foodCategories.map(c => c.color), borderWidth: 0 }],
  };
  const volunteerData = {
    labels: ANALYTICS.monthlyData.map(m => m.month),
    datasets: [{ label: 'Active Volunteers', data: ANALYTICS.monthlyData.map(m => m.volunteers), borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', fill: true, tension: 0.4 }],
  };

  return (
    <ProtectedRoute allowedRoles={['admin']} pageTitle="Admin Dashboard">
    <div className="page-container">
      <div className="page-header">
        <h1>📊 Admin Analytics Dashboard</h1>
        <p>Platform-wide metrics, fraud detection & redistribution monitoring</p>
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <StatsCard icon="🍛" value={ANALYTICS.totalMealsDelivered} label="Meals Delivered" trend="+12% vs last month" color="#10b981" delay={0} />
        <StatsCard icon="📦" value={ANALYTICS.totalFoodSaved} label="Kg Food Saved" trend="+8%" color="#06b6d4" delay={100} />
        <StatsCard icon="🌍" value={ANALYTICS.co2Reduced} label="Kg CO₂ Reduced" trend="+15%" color="#8b5cf6" delay={200} />
        <StatsCard icon="🤝" value={ANALYTICS.activeVolunteers} label="Active Volunteers" trend="+23 this week" color="#f59e0b" delay={300} />
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {[
          ['📉', `${ANALYTICS.wasteReduction}%`, 'Waste Reduction', '#22c55e'],
          ['⏱️', `${ANALYTICS.avgDeliveryTime} min`, 'Avg Delivery Time', 'var(--text-primary)'],
          ['🏥', ANALYTICS.activeNGOs, 'Active NGOs', 'var(--text-primary)'],
          ['⚠️', fraudReport.unresolved, 'Fraud Alerts', '#ef4444'],
        ].map(([icon, val, label, color], i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: `${color}15`, color }}>{icon}</div>
            <div className="stat-info"><h3 style={{ color }}>{val}</h3><p>{label}</p></div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div className="section-card-header"><h2>📈 Donations & Meals Trend</h2><span className="badge badge-primary">12 months</span></div>
          <LineChart data={donationLineData} />
        </div>
        <div className="card">
          <div className="section-card-header"><h2>🏥 Top NGO Performance</h2></div>
          <BarChart data={ngoBarData} />
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div className="section-card-header"><h2>🍽️ Food Category Distribution</h2></div>
          <DoughnutChart data={categoryDoughnut} />
        </div>
        <div className="card">
          <div className="section-card-header"><h2>🚴 Volunteer Growth</h2></div>
          <LineChart data={volunteerData} />
        </div>
      </div>

      {/* Enhanced Fraud Detection */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="section-card-header">
          <h2>🛡️ AI Fraud Detection Engine</h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="badge badge-danger">{fraudReport.unresolved} unresolved</span>
            <span className="badge" style={{ background: fraudReport.riskScore > 60 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: fraudReport.riskScore > 60 ? '#22c55e' : '#ef4444', border: '1px solid transparent' }}>
              Platform Risk: {fraudReport.riskScore}%
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[['🍽️ Donors', TRUST_SCORES.donors], ['🏥 NGOs', TRUST_SCORES.ngos], ['🚴 Volunteers', TRUST_SCORES.volunteers]].map(([label, data]) => (
            <div key={label} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: data.avg > 85 ? '#22c55e' : '#f59e0b' }}>
                {data.avg}% <span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'var(--text-muted)' }}>avg trust</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.72rem' }}>
                <span style={{ color: '#22c55e' }}>✅ {data.high}</span>
                <span style={{ color: '#f59e0b' }}>⚠️ {data.medium}</span>
                <span style={{ color: '#ef4444' }}>🚫 {data.flagged}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FRAUD_ALERTS_DETAILED.map(alert => (
            <div className="donation-item" key={alert.id} style={{ opacity: alert.resolved ? 0.5 : 1 }}>
              <div className="donation-icon" style={{ background: alert.severity === 'critical' ? 'rgba(239,68,68,0.15)' : alert.severity === 'high' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)', color: alert.severity === 'critical' ? '#ef4444' : alert.severity === 'high' ? '#f59e0b' : '#3b82f6' }}>⚠️</div>
              <div className="donation-info" style={{ flex: 1 }}>
                <h4 style={{ color: alert.severity === 'critical' ? '#ef4444' : alert.severity === 'high' ? '#f59e0b' : '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {alert.type.replace(/_/g, ' ').toUpperCase()}
                  <span className="badge" style={{ background: `${alert.severity === 'critical' ? '#ef4444' : '#f59e0b'}15`, color: alert.severity === 'critical' ? '#ef4444' : '#f59e0b', border: '1px solid transparent', fontSize: '0.6rem' }}>
                    Trust: {alert.score}/100
                  </span>
                </h4>
                <p>{alert.detail}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{alert.entity}: {alert.name} • {alert.timestamp}</p>
              </div>
              {alert.resolved ? <span className="badge badge-success">Resolved</span> : <button className="btn btn-sm btn-secondary" style={{ textTransform: 'capitalize' }}>{alert.action}</button>}
            </div>
          ))}
        </div>
      </div>

      {/* Redistribution Pipeline */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="section-card-header">
          <h2>🔄 Smart Inventory Redistribution</h2>
          <span className="badge badge-info">NGO → NGO Pipeline</span>
        </div>
        <div className="table-container">
          <table>
            <thead><tr><th>From</th><th>To</th><th>Food</th><th>Qty</th><th>Urgency</th><th>Expires</th><th>Status</th></tr></thead>
            <tbody>
              {REDISTRIBUTION_REQUESTS.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.fromNGO}</strong><br /><span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.fromCity}</span></td>
                  <td><strong>{r.toNGO}</strong><br /><span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.toCity}</span></td>
                  <td>{r.food}</td>
                  <td>{r.quantity} {r.unit}</td>
                  <td><span className="badge" style={{ background: r.urgency === 'critical' ? 'rgba(239,68,68,0.15)' : r.urgency === 'high' ? 'rgba(245,158,11,0.15)' : 'rgba(34,197,94,0.15)', color: r.urgency === 'critical' ? '#ef4444' : r.urgency === 'high' ? '#f59e0b' : '#22c55e', border: '1px solid transparent' }}>{r.urgency}</span></td>
                  <td style={{ color: parseFloat(r.expiresIn) <= 3 ? '#ef4444' : 'var(--text-secondary)', fontWeight: 600 }}>{r.expiresIn}</td>
                  <td><span className="badge" style={{ background: r.status === 'completed' ? 'rgba(34,197,94,0.15)' : r.status === 'in_transit' ? 'rgba(139,92,246,0.15)' : 'rgba(245,158,11,0.15)', color: r.status === 'completed' ? '#22c55e' : r.status === 'in_transit' ? '#8b5cf6' : '#f59e0b', border: '1px solid transparent' }}>{r.status.replace('_', ' ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NGO Performance */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="section-card-header"><h2>📋 NGO Performance</h2></div>
        <div className="table-container">
          <table>
            <thead><tr><th>NGO</th><th>City</th><th>Speciality</th><th>Capacity</th><th>Load</th><th>Beneficiaries</th><th>Rating</th></tr></thead>
            <tbody>
              {NGOS.map(ngo => (
                <tr key={ngo.id}>
                  <td style={{ fontWeight: 600 }}>{ngo.name}</td>
                  <td>{ngo.city}</td>
                  <td><span className="badge badge-primary">{ngo.speciality}</span></td>
                  <td>{ngo.capacity}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="progress-bar" style={{ width: '60px', height: '6px' }}><div className="progress-fill" style={{ width: `${(ngo.currentLoad / ngo.capacity) * 100}%` }} /></div>
                      <span style={{ fontSize: '0.78rem' }}>{Math.round((ngo.currentLoad / ngo.capacity) * 100)}%</span>
                    </div>
                  </td>
                  <td>{ngo.beneficiaries.toLocaleString('en-US')}</td>
                  <td><span style={{ color: 'var(--accent)', fontWeight: 700 }}>⭐ {ngo.rating}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Activity */}
      <div className="card">
        <div className="section-card-header"><h2>🔴 Live Platform Activity</h2></div>
        <div className="feed-list" style={{ maxHeight: '300px' }}>
          {state.donations.slice(0, 12).map(d => (
            <div className="feed-item" key={d.id}>
              <div className="feed-dot" style={{ background: d.status === 'delivered' ? '#22c55e' : d.status === 'pending' ? '#f59e0b' : '#06b6d4' }} />
              <span className="feed-text">{d.foodEmoji} {d.donorName} — {d.quantity} {d.unit} of {d.foodName} {d.ngoName ? `→ ${d.ngoName}` : ''}</span>
              <span className="badge" style={{ background: `${{'pending':'#f59e0b','accepted':'#3b82f6','picked_up':'#06b6d4','in_transit':'#8b5cf6','delivered':'#22c55e'}[d.status]}15`, color: {'pending':'#f59e0b','accepted':'#3b82f6','picked_up':'#06b6d4','in_transit':'#8b5cf6','delivered':'#22c55e'}[d.status], border: '1px solid transparent', fontSize: '0.65rem' }}>{d.status.replace('_',' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
