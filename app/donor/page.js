'use client';
import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { FOOD_CATEGORIES, DONORS, NGOS } from '@/data/mockData';
import { predictShelfLife, getPackagingInstructions } from '@/ai/shelfLife';
import { matchDonorToNGOs } from '@/ai/smartMatch';
import StatsCard from '@/components/StatsCard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DonorDashboard() {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ foodCategory: 'cooked_meals', quantity: 30, unit: 'servings', temperature: 28, timeSinceCooked: 1, notes: '' });
  const [selectedDonor] = useState(DONORS[0]);

  const shelfPrediction = useMemo(() =>
    predictShelfLife(form.foodCategory, form.temperature, form.timeSinceCooked),
    [form.foodCategory, form.temperature, form.timeSinceCooked]
  );

  const ngoMatches = useMemo(() => {
    const food = FOOD_CATEGORIES.find(f => f.id === form.foodCategory);
    return matchDonorToNGOs(selectedDonor, NGOS, { urgency: food?.shelfHours <= 4 ? 'high' : food?.shelfHours <= 12 ? 'medium' : 'low' }).slice(0, 5);
  }, [form.foodCategory, selectedDonor]);

  const packagingTips = useMemo(() => getPackagingInstructions(form.foodCategory), [form.foodCategory]);

  const myDonations = state.donations.filter((_, i) => i < 12);
  const statusCounts = { pending: 0, accepted: 0, picked_up: 0, in_transit: 0, delivered: 0 };
  myDonations.forEach(d => { if (statusCounts[d.status] !== undefined) statusCounts[d.status]++; });

  const handleSubmit = () => {
    const food = FOOD_CATEGORIES.find(f => f.id === form.foodCategory);
    const newDonation = {
      id: `DON-${String(state.donations.length + 1).padStart(4, '0')}`,
      donorId: selectedDonor.id, donorName: selectedDonor.name, donorCity: selectedDonor.city,
      foodCategory: form.foodCategory, foodName: food.name, foodEmoji: food.emoji,
      quantity: parseInt(form.quantity), unit: form.unit, status: 'pending',
      qrCode: `FL-QR-NEW-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(), temperature: form.temperature,
      shelfLifeHours: shelfPrediction?.estimatedHours || food.shelfHours,
      lat: selectedDonor.lat, lng: selectedDonor.lng,
      urgency: food.shelfHours <= 4 ? 'high' : food.shelfHours <= 12 ? 'medium' : 'low',
      notes: form.notes,
    };
    dispatch({ type: 'ADD_DONATION', payload: newDonation });
    setShowForm(false);
    setForm({ foodCategory: 'cooked_meals', quantity: 30, unit: 'servings', temperature: 28, timeSinceCooked: 1, notes: '' });
  };

  const statusColors = { pending: '#f59e0b', accepted: '#3b82f6', picked_up: '#06b6d4', in_transit: '#8b5cf6', delivered: '#22c55e' };
  const statusLabels = { pending: 'Pending', accepted: 'Accepted', picked_up: 'Picked Up', in_transit: 'In Transit', delivered: 'Delivered' };

  return (
    <ProtectedRoute allowedRoles={['donor']} pageTitle="Donor Dashboard">
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>🍽️ Donor Dashboard</h1>
          <p>Welcome, {state.user?.name || selectedDonor.name} • {state.user?.city || selectedDonor.city}</p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Close' : '+ New Donation'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <StatsCard icon="📦" value={selectedDonor.totalDonations} label="Total Donations" trend="+12 this week" color="#10b981" />
        <StatsCard icon="🍛" value={statusCounts.pending} label="Pending" color="#f59e0b" />
        <StatsCard icon="🚚" value={statusCounts.in_transit + statusCounts.picked_up} label="In Transit" color="#06b6d4" />
        <StatsCard icon="✅" value={statusCounts.delivered} label="Delivered" color="#22c55e" />
      </div>

      {/* New Donation Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: '2rem', animation: 'fadeInUp 0.4s ease' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '1.5rem' }}>📝 New Food Donation</h2>
          <div className="dashboard-grid">
            {/* Left: Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label>Food Category</label>
                <select className="form-input" value={form.foodCategory} onChange={e => setForm({ ...form, foodCategory: e.target.value })}>
                  {FOOD_CATEGORIES.map(f => <option key={f.id} value={f.id}>{f.emoji} {f.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Quantity</label>
                  <input className="form-input" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <select className="form-input" value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })}>
                    <option value="servings">Servings</option>
                    <option value="kg">Kilograms</option>
                    <option value="packets">Packets</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Temperature (°C)</label>
                  <input className="form-input" type="number" value={form.temperature} onChange={e => setForm({ ...form, temperature: parseInt(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label>Hours Since Cooked</label>
                  <input className="form-input" type="number" value={form.timeSinceCooked} step="0.5" onChange={e => setForm({ ...form, timeSinceCooked: parseFloat(e.target.value) })} />
                </div>
              </div>
              <div className="form-group">
                <label>Notes (optional)</label>
                <textarea className="form-input" rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any special instructions..." />
              </div>
              <button className="btn btn-primary btn-lg" onClick={handleSubmit} style={{ marginTop: '0.5rem' }}>
                🚀 Submit Donation
              </button>
            </div>

            {/* Right: AI Predictions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Shelf Life Prediction */}
              {shelfPrediction && (
                <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🧠 AI Shelf-Life Prediction
                    <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>AI</span>
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: shelfPrediction.riskColor }}>{shelfPrediction.estimatedHours}h</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Remaining</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span>Quality</span><span>{shelfPrediction.qualityScore}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${shelfPrediction.qualityScore}%`, background: shelfPrediction.riskColor }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge" style={{ background: `${shelfPrediction.riskColor}20`, color: shelfPrediction.riskColor, border: `1px solid ${shelfPrediction.riskColor}30` }}>
                      Risk: {shelfPrediction.riskLevel}
                    </span>
                    <span className="badge badge-info">Confidence: {shelfPrediction.confidence}%</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>{shelfPrediction.recommendation}</p>
                </div>
              )}

              {/* Packaging Tips */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>📦 Smart Packaging Tips</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {packagingTips.map((tip, i) => (
                    <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--primary)' }}>•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* NGO Suggestions */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>🎯 AI-Recommended NGOs</h3>
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {ngoMatches.map((match, i) => (
                <div key={match.ngo.id} style={{
                  minWidth: '220px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)',
                  padding: '1rem', border: '1px solid var(--border)', position: 'relative',
                }}>
                  {i === 0 && <span className="badge badge-primary" style={{ position: 'absolute', top: '8px', right: '8px' }}>BEST MATCH</span>}
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{match.ngo.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{match.ngo.city} • {match.distance} km</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Score: {match.score}%</span>
                    <span style={{ color: 'var(--text-muted)' }}>ETA: {match.eta} min</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>{match.matchReason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Donations */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="section-card-header">
          <h2>📋 Active Donations</h2>
          <span className="badge badge-primary">{myDonations.filter(d => d.status !== 'delivered').length} active</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {myDonations.slice(0, 8).map(donation => (
            <div className="donation-item" key={donation.id}>
              <div className="donation-icon" style={{ background: `${statusColors[donation.status]}15`, color: statusColors[donation.status] }}>
                {donation.foodEmoji}
              </div>
              <div className="donation-info">
                <h4>{donation.foodName} — {donation.quantity} {donation.unit}</h4>
                <p>{donation.id} • {donation.donorCity} {donation.ngoName ? `→ ${donation.ngoName}` : ''}</p>
              </div>
              <div className="donation-meta">
                <span className="badge" style={{ background: `${statusColors[donation.status]}15`, color: statusColors[donation.status], border: `1px solid ${statusColors[donation.status]}30` }}>
                  {statusLabels[donation.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation History Table */}
      <div className="card">
        <div className="section-card-header">
          <h2>📊 Donation History</h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Food</th><th>Qty</th><th>City</th><th>NGO</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myDonations.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{d.id}</td>
                  <td>{d.foodEmoji} {d.foodName}</td>
                  <td>{d.quantity} {d.unit}</td>
                  <td>{d.donorCity}</td>
                  <td>{d.ngoName || '—'}</td>
                  <td><span className="badge" style={{ background: `${statusColors[d.status]}15`, color: statusColors[d.status], border: `1px solid ${statusColors[d.status]}30` }}>{statusLabels[d.status]}</span></td>
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
