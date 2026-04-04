'use client';
import { useState } from 'react';
import { BENEFICIARY_PROFILES, MEAL_SLOTS, COMMUNITY_FRIDGES } from '@/data/extendedData';
import StatsCard from '@/components/StatsCard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function BeneficiaryDashboard() {
  const [selectedProfile] = useState(BENEFICIARY_PROFILES[0]);
  const [reservedSlot, setReservedSlot] = useState(null);
  const [showOTP, setShowOTP] = useState(false);

  const totalBeneficiaries = BENEFICIARY_PROFILES.reduce((s, b) => s + b.members, 0);
  const totalNeeds = BENEFICIARY_PROFILES.reduce((s, b) => s + b.needsPerDay, 0);
  const criticalCount = BENEFICIARY_PROFILES.filter(b => b.priority === 'critical').length;
  const nearbyFridges = COMMUNITY_FRIDGES.filter(f => f.status === 'active').slice(0, 4);

  const typeIcons = { shelter: '🏠', orphanage: '👶', labor_camp: '👷', students: '🎓', elderly: '👴', women: '👩', slum: '🏘️', tribal: '🏕️' };
  const typeLabels = { shelter: 'Shelter', orphanage: 'Orphanage', labor_camp: 'Labor Camp', students: 'Students', elderly: 'Elderly Home', women: 'Women Shelter', slum: 'Slum Community', tribal: 'Tribal Settlement' };
  const priorityColors = { critical: '#ef4444', high: '#f59e0b', medium: '#3b82f6', low: '#22c55e' };

  const handleReserve = (slotId) => {
    setReservedSlot(slotId);
    setShowOTP(true);
  };

  return (
    <ProtectedRoute allowedRoles={['beneficiary']} pageTitle="Beneficiary Portal">
    <div className="page-container">
      <div className="page-header">
        <h1>🤲 Beneficiary Portal</h1>
        <p>Find nearby meals, reserve food slots, and access community resources</p>
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <StatsCard icon="👥" value={totalBeneficiaries} label="Registered Beneficiaries" color="#10b981" />
        <StatsCard icon="🍛" value={totalNeeds} label="Daily Meals Needed" color="#f59e0b" />
        <StatsCard icon="🚨" value={criticalCount} label="Critical Priority" color="#ef4444" />
        <StatsCard icon="🧊" value={nearbyFridges.length} label="Nearby Active Fridges" color="#06b6d4" />
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        {/* Meal Slots */}
        <div className="card">
          <div className="section-card-header">
            <h2>🕐 Available Meal Slots</h2>
            <span className="badge badge-primary">Today</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {MEAL_SLOTS.map(slot => (
              <div key={slot.id} style={{
                background: slot.status === 'full' ? 'rgba(239,68,68,0.05)' : 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)', padding: '1.25rem',
                border: `1px solid ${reservedSlot === slot.id ? 'var(--primary)' : 'var(--border-light)'}`,
                opacity: slot.status === 'full' ? 0.6 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>{slot.label}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>⏰ {slot.time}</p>
                  </div>
                  <span className="badge" style={{
                    background: slot.status === 'available' ? 'rgba(34,197,94,0.15)' : slot.status === 'filling' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                    color: slot.status === 'available' ? '#22c55e' : slot.status === 'filling' ? '#f59e0b' : '#ef4444',
                    border: '1px solid transparent',
                  }}>{slot.status === 'full' ? 'Full' : `${slot.available} slots left`}</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: '0.75rem' }}>
                  <div className="progress-fill" style={{
                    width: `${((slot.total - slot.available) / slot.total) * 100}%`,
                    background: slot.status === 'full' ? '#ef4444' : slot.status === 'filling' ? '#f59e0b' : '#22c55e',
                  }} />
                </div>
                <button
                  className={`btn ${reservedSlot === slot.id ? 'btn-success' : 'btn-primary'} btn-sm w-full`}
                  disabled={slot.status === 'full'}
                  onClick={() => handleReserve(slot.id)}
                >
                  {reservedSlot === slot.id ? '✅ Reserved' : slot.status === 'full' ? 'No Slots' : '📝 Reserve Slot'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Resources */}
        <div className="card">
          <div className="section-card-header">
            <h2>📍 Nearby Food Resources</h2>
          </div>

          {/* Nearby Fridges */}
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.75rem' }}>🧊 Community Fridges</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {nearbyFridges.map(fridge => (
              <div key={fridge.id} className="donation-item">
                <div className="donation-icon" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>🧊</div>
                <div className="donation-info">
                  <h4>{fridge.name}</h4>
                  <p>{fridge.city} • {fridge.currentItems} items available</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span style={{ fontSize: '0.78rem', color: fridge.fillLevel > 30 ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                    {fridge.fillLevel > 30 ? '✅ Available' : '⚠️ Low'}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Fill: {fridge.fillLevel}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dietary Preferences */}
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.75rem' }}>🥗 Dietary Preferences</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {['Vegetarian', 'Non-Veg', 'Vegan', 'Halal', 'Jain', 'No Dairy', 'Soft Food'].map(pref => (
              <button key={pref} className="btn btn-secondary btn-sm" style={{ borderRadius: 'var(--radius-full)' }}>{pref}</button>
            ))}
          </div>

          {/* Priority Info */}
          <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.5rem' }}>ℹ️ Priority Groups</h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <p>🔴 <strong>Critical:</strong> Pregnant women, children under 5, elderly 70+</p>
              <p>🟡 <strong>High:</strong> Homeless shelters, orphanages, labor camps</p>
              <p>🔵 <strong>Medium:</strong> Students in need, low-income families</p>
              <p>🟢 <strong>General:</strong> Community members</p>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOTP && (
        <div className="modal-overlay" onClick={() => setShowOTP(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <button className="modal-close" onClick={() => setShowOTP(false)}>✕</button>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>Reservation Confirmed!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Show this OTP at the pickup point</p>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--border)', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-display)', letterSpacing: '8px', color: 'var(--primary)' }}>
                {Math.floor(1000 + Math.random() * 9000)}
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Valid for 2 hours • Family size: {selectedProfile.members} members</p>
          </div>
        </div>
      )}

      {/* Registered Beneficiaries */}
      <div className="card">
        <div className="section-card-header">
          <h2>📋 Registered Beneficiary Groups</h2>
        </div>
        <div className="table-container">
          <table>
            <thead><tr><th>Type</th><th>Name</th><th>City</th><th>Members</th><th>Needs/Day</th><th>Priority</th><th>Dietary</th></tr></thead>
            <tbody>
              {BENEFICIARY_PROFILES.map(b => (
                <tr key={b.id}>
                  <td style={{ fontSize: '1.2rem' }}>{typeIcons[b.type]}</td>
                  <td style={{ fontWeight: 600 }}>{b.name}</td>
                  <td>{b.city}</td>
                  <td>{b.members}</td>
                  <td>{b.needsPerDay}</td>
                  <td><span className="badge" style={{ background: `${priorityColors[b.priority]}15`, color: priorityColors[b.priority], border: '1px solid transparent', textTransform: 'capitalize' }}>{b.priority}</span></td>
                  <td style={{ textTransform: 'capitalize', fontSize: '0.82rem' }}>{b.dietary.replace('_', ' ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
