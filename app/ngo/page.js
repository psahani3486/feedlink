'use client';
import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { NGOS, FOOD_CATEGORIES } from '@/data/mockData';
import { forecastWeekly } from '@/ai/demandPredict';
import StatsCard from '@/components/StatsCard';
import { BarChart, LineChart } from '@/components/Charts';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function NGODashboard() {
  const { state, dispatch } = useApp();
  const [selectedNGO] = useState(NGOS[0]);
  const [activeTab, setActiveTab] = useState('incoming');

  const pendingDonations = state.donations.filter(d => d.status === 'pending').slice(0, 8);
  const acceptedDonations = state.donations.filter(d => ['accepted', 'picked_up', 'in_transit'].includes(d.status)).slice(0, 8);
  const deliveredDonations = state.donations.filter(d => d.status === 'delivered').slice(0, 10);

  const forecast = useMemo(() => forecastWeekly(selectedNGO.city), [selectedNGO.city]);
  const capacityPercent = Math.round((selectedNGO.currentLoad / selectedNGO.capacity) * 100);

  const handleAccept = (donationId) => {
    dispatch({ type: 'ACCEPT_DONATION', payload: { donationId, ngoId: selectedNGO.id, ngoName: selectedNGO.name } });
  };

  const forecastChartData = {
    labels: forecast.map(f => f.day),
    datasets: [{
      label: 'Predicted Meals Needed',
      data: forecast.map(f => f.totalMeals),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16,185,129,0.1)',
      fill: true,
      tension: 0.4,
    }],
  };

  const categoryData = {
    labels: ['Cooked', 'Rice', 'Dal', 'Bread', 'Fruits', 'Dairy'],
    datasets: [{
      label: 'Donations Received',
      data: [35, 22, 18, 15, 8, 12],
      backgroundColor: ['#10b981', '#06b6d4', '#f59e0b', '#8b5cf6', '#ec4899', '#ef4444'],
      borderRadius: 6,
    }],
  };

  const statusColors = { pending: '#f59e0b', accepted: '#3b82f6', picked_up: '#06b6d4', in_transit: '#8b5cf6', delivered: '#22c55e' };

  return (
    <ProtectedRoute allowedRoles={['ngo']} pageTitle="NGO Dashboard">
    <div className="page-container">
      <div className="page-header">
        <h1>🏥 NGO Dashboard</h1>
        <p>{state.user?.org || selectedNGO.name} • {state.user?.city || selectedNGO.city} • {selectedNGO.speciality}</p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <StatsCard icon="📥" value={pendingDonations.length} label="Incoming Requests" color="#f59e0b" />
        <StatsCard icon="🚚" value={acceptedDonations.length} label="Active Deliveries" color="#06b6d4" />
        <StatsCard icon="👥" value={selectedNGO.beneficiaries} label="Beneficiaries Served" trend="+340 this week" color="#10b981" />
        <StatsCard icon="⭐" value={selectedNGO.rating} label="Rating" color="#f59e0b" />
      </div>

      {/* Capacity + Demand Forecast */}
      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div className="section-card-header">
            <h2>📊 Storage Capacity</h2>
            <span className="badge" style={{ background: capacityPercent > 80 ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)', color: capacityPercent > 80 ? '#ef4444' : '#10b981', border: `1px solid ${capacityPercent > 80 ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}` }}>
              {capacityPercent}% used
            </span>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Current: {selectedNGO.currentLoad}</span>
              <span style={{ color: 'var(--text-muted)' }}>Max: {selectedNGO.capacity}</span>
            </div>
            <div className="progress-bar" style={{ height: '12px' }}>
              <div className="progress-fill" style={{
                width: `${capacityPercent}%`,
                background: capacityPercent > 80 ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'var(--primary-gradient)',
              }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {['Refrigerated', 'Dry Storage', 'Hot Holding', 'Frozen'].map((type, i) => (
              <div key={type} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '0.75rem', border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{type}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{[65, 78, 42, 30][i]}%</div>
                <div className="progress-bar" style={{ height: '4px', marginTop: '4px' }}>
                  <div className="progress-fill" style={{ width: `${[65, 78, 42, 30][i]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-card-header">
            <h2>🧠 AI Demand Forecast</h2>
            <span className="badge badge-info">7-Day Prediction</span>
          </div>
          <LineChart data={forecastChartData} />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: '1.5rem', width: 'fit-content' }}>
        {[['incoming', '📥 Incoming'], ['active', '🚚 Active'], ['completed', '✅ Completed']].map(([key, label]) => (
          <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
        ))}
      </div>

      {/* Donation Lists */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        {activeTab === 'incoming' && (
          <>
            <div className="section-card-header">
              <h2>📥 Incoming Donation Requests</h2>
              <span className="badge badge-warning">{pendingDonations.length} pending</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {pendingDonations.map(d => (
                <div className="donation-item" key={d.id} style={{ flexWrap: 'wrap' }}>
                  <div className="donation-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>{d.foodEmoji}</div>
                  <div className="donation-info" style={{ flex: 1, minWidth: '180px' }}>
                    <h4>{d.foodName} — {d.quantity} {d.unit}</h4>
                    <p>{d.donorName} • {d.donorCity}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className="badge" style={{ background: d.urgency === 'high' ? 'rgba(239,68,68,0.15)' : d.urgency === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(34,197,94,0.15)', color: d.urgency === 'high' ? '#ef4444' : d.urgency === 'medium' ? '#f59e0b' : '#22c55e', border: '1px solid transparent' }}>
                      {d.urgency} urgency
                    </span>
                    <button className="btn btn-success btn-sm" onClick={() => handleAccept(d.id)}>✓ Accept</button>
                    <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>✕</button>
                  </div>
                </div>
              ))}
              {pendingDonations.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No pending donations</p>}
            </div>
          </>
        )}

        {activeTab === 'active' && (
          <>
            <div className="section-card-header">
              <h2>🚚 Active Deliveries</h2>
              <span className="badge badge-info">{acceptedDonations.length} active</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {acceptedDonations.map(d => (
                <div className="donation-item" key={d.id}>
                  <div className="donation-icon" style={{ background: `${statusColors[d.status]}15`, color: statusColors[d.status] }}>{d.foodEmoji}</div>
                  <div className="donation-info">
                    <h4>{d.foodName} — {d.quantity} {d.unit}</h4>
                    <p>{d.donorName} {d.volunteerName ? `• Volunteer: ${d.volunteerName}` : ''}</p>
                  </div>
                  <span className="badge" style={{ background: `${statusColors[d.status]}15`, color: statusColors[d.status], border: `1px solid ${statusColors[d.status]}30` }}>
                    {d.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'completed' && (
          <>
            <div className="section-card-header">
              <h2>✅ Completed Deliveries</h2>
            </div>
            <div className="table-container">
              <table>
                <thead><tr><th>ID</th><th>Food</th><th>Donor</th><th>Qty</th><th>Volunteer</th></tr></thead>
                <tbody>
                  {deliveredDonations.map(d => (
                    <tr key={d.id}>
                      <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{d.id}</td>
                      <td>{d.foodEmoji} {d.foodName}</td>
                      <td>{d.donorName}</td>
                      <td>{d.quantity} {d.unit}</td>
                      <td>{d.volunteerName || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Category Distribution */}
      <div className="card">
        <div className="section-card-header">
          <h2>📊 Food Category Distribution</h2>
        </div>
        <BarChart data={categoryData} />
      </div>
    </div>
    </ProtectedRoute>
  );
}
