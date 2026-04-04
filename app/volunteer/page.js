'use client';
import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { VOLUNTEERS, GAMIFICATION_BADGES } from '../../data/mockData';
import { QRCodeSVG } from 'qrcode.react';
import StatsCard from '../../components/StatsCard';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function VolunteerPanel() {
  const { state, dispatch } = useApp();
  const [volunteer] = useState(VOLUNTEERS[0]);
  const [isAvailable, setIsAvailable] = useState(volunteer.available);
  const [activeDeliveryStep, setActiveDeliveryStep] = useState(2);
  const [showQR, setShowQR] = useState(null);

  const nearbyPickups = state.donations.filter(d => d.status === 'accepted').slice(0, 5);
  const activeDelivery = state.donations.find(d => d.status === 'in_transit');
  const completedDeliveries = state.donations.filter(d => d.status === 'delivered').slice(0, 6);

  const topVolunteers = [...VOLUNTEERS].sort((a, b) => b.points - a.points).slice(0, 8);
  const myRank = topVolunteers.findIndex(v => v.id === volunteer.id) + 1;

  const earnedBadges = GAMIFICATION_BADGES.filter(b => volunteer.deliveries >= b.threshold);
  const lockedBadges = GAMIFICATION_BADGES.filter(b => volunteer.deliveries < b.threshold);

  const steps = ['Assigned', 'En Route', 'Picked Up', 'Delivering', 'Delivered'];

  const handlePickup = (donationId) => {
    dispatch({ type: 'ASSIGN_VOLUNTEER', payload: { donationId, volunteerId: volunteer.id, volunteerName: volunteer.name } });
  };

  return (
    <ProtectedRoute allowedRoles={['volunteer']} pageTitle="Volunteer Panel">
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>🚴 Volunteer Panel</h1>
          <p>{state.user?.name || volunteer.name} • {state.user?.city || volunteer.city} • ⭐ {volunteer.rating}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.88rem', color: isAvailable ? 'var(--success)' : 'var(--text-muted)' }}>
            {isAvailable ? '🟢 Online' : '🔴 Offline'}
          </span>
          <div className={`toggle ${isAvailable ? 'active' : ''}`} onClick={() => setIsAvailable(!isAvailable)} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <StatsCard icon="🏅" value={volunteer.points} label="Total Points" trend="+90 today" color="#f59e0b" />
        <StatsCard icon="📦" value={volunteer.deliveries} label="Deliveries" trend="+3 today" color="#10b981" />
        <StatsCard icon="🏆" value={myRank || '—'} label="Leaderboard Rank" color="#8b5cf6" />
        <StatsCard icon="⭐" value={volunteer.rating} label="Rating" color="#06b6d4" />
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        {/* Nearby Pickups */}
        <div className="card">
          <div className="section-card-header">
            <h2>📍 Nearby Pickups</h2>
            <span className="badge badge-warning">{nearbyPickups.length} available</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {nearbyPickups.map(d => (
              <div className="donation-item" key={d.id} style={{ flexWrap: 'wrap' }}>
                <div className="donation-icon" style={{ background: d.urgency === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)', color: d.urgency === 'high' ? '#ef4444' : '#f59e0b' }}>
                  {d.foodEmoji}
                </div>
                <div className="donation-info" style={{ flex: 1, minWidth: '120px' }}>
                  <h4>{d.foodName}</h4>
                  <p>{d.donorName} • {d.donorCity}</p>
                  <p style={{ color: d.urgency === 'high' ? '#ef4444' : 'var(--text-muted)' }}>
                    {d.urgency === 'high' ? '⚡ Urgent' : `${d.quantity} ${d.unit}`}
                  </p>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => handlePickup(d.id)}>Accept</button>
              </div>
            ))}
            {nearbyPickups.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No pickups available nearby</p>}
          </div>
        </div>

        {/* Active Delivery */}
        <div className="card">
          <div className="section-card-header">
            <h2>🚚 Active Delivery</h2>
            {activeDelivery && <span className="badge badge-info">In Progress</span>}
          </div>
          {activeDelivery ? (
            <>
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: 700 }}>{activeDelivery.foodEmoji} {activeDelivery.foodName}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {activeDelivery.donorName} → {activeDelivery.ngoName || 'Awaiting Assignment'}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {activeDelivery.quantity} {activeDelivery.unit} • {activeDelivery.id}
                </div>
              </div>

              {/* Tracker Steps */}
              <div className="tracker-steps">
                {steps.map((step, i) => (
                  <div key={step} className={`tracker-step ${i < activeDeliveryStep ? 'completed' : i === activeDeliveryStep ? 'active' : ''}`}>
                    <div className="tracker-dot">{i < activeDeliveryStep ? '✓' : i + 1}</div>
                    <span className="tracker-label">{step}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveDeliveryStep(Math.min(4, activeDeliveryStep + 1))}>
                  {activeDeliveryStep < 4 ? 'Next Step →' : '✓ Complete'}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowQR(activeDelivery.qrCode)}>
                  📱 Scan QR
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📦</div>
              <p>No active delivery. Accept a pickup to start!</p>
            </div>
          )}
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="modal-overlay" onClick={() => setShowQR(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <button className="modal-close" onClick={() => setShowQR(null)}>✕</button>
            <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>🔐 QR Verification</h2>
            <div className="qr-wrapper">
              <QRCodeSVG value={showQR} size={200} level="H" bgColor="#ffffff" fgColor="#0a0f1a" />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Code: {showQR}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Scan at pickup and delivery points for verification</p>
          </div>
        </div>
      )}

      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        {/* Gamification - Badges */}
        <div className="card">
          <div className="section-card-header">
            <h2>🏅 Badges & Achievements</h2>
            <span className="badge badge-primary">{earnedBadges.length}/{GAMIFICATION_BADGES.length}</span>
          </div>
          <div className="grid-4" style={{ gap: '0.75rem' }}>
            {earnedBadges.map(b => (
              <div className="badge-item" key={b.id}>
                <span className="badge-emoji">{b.emoji}</span>
                <span className="badge-name">{b.name}</span>
                <span className="badge-desc">{b.desc}</span>
              </div>
            ))}
            {lockedBadges.map(b => (
              <div className="badge-item locked" key={b.id}>
                <span className="badge-emoji">🔒</span>
                <span className="badge-name">{b.name}</span>
                <span className="badge-desc">{b.threshold} deliveries</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card">
          <div className="section-card-header">
            <h2>🏆 Leaderboard</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {topVolunteers.map((v, i) => (
              <div className="leaderboard-item" key={v.id} style={{ background: v.id === volunteer.id ? 'rgba(16,185,129,0.08)' : 'transparent', borderRadius: 'var(--radius-md)' }}>
                <div className={`leaderboard-rank ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}`}
                  style={i > 2 ? { background: 'var(--bg-elevated)', color: 'var(--text-muted)' } : {}}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{v.name} {v.id === volunteer.id ? '(You)' : ''}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.city} • {v.deliveries} deliveries</div>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '0.9rem' }}>{v.points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery History */}
      <div className="card">
        <div className="section-card-header">
          <h2>📋 Recent Deliveries</h2>
        </div>
        <div className="table-container">
          <table>
            <thead><tr><th>ID</th><th>Food</th><th>From</th><th>To</th><th>Status</th></tr></thead>
            <tbody>
              {completedDeliveries.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{d.id}</td>
                  <td>{d.foodEmoji} {d.foodName}</td>
                  <td>{d.donorName}</td>
                  <td>{d.ngoName || '—'}</td>
                  <td><span className="badge badge-success">Delivered</span></td>
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
