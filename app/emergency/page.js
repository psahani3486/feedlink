'use client';
import { useState } from 'react';
import { DISASTER_EVENTS, EMERGENCY_CAMPS } from '../../data/extendedData';
import StatsCard from '../../components/StatsCard';
import { BarChart } from '../../components/Charts';
import ProtectedRoute from '../../components/ProtectedRoute';

const DISASTER_ICONS = { flood: '🌊', heatwave: '🔥', earthquake: '🏚️', cyclone: '🌀', pandemic: '🦠', riot: '⚠️' };
const SEVERITY_COLORS = { critical: '#ef4444', high: '#f59e0b', medium: '#06b6d4', low: '#22c55e' };

export default function EmergencyDashboard() {
  const [selectedEvent, setSelectedEvent] = useState(DISASTER_EVENTS[0]);
  const relatedCamps = EMERGENCY_CAMPS.filter(c => c.eventId === selectedEvent.id);
  const totalAffected = DISASTER_EVENTS.reduce((s, e) => s + e.affectedPeople, 0);
  const totalMeals = DISASTER_EVENTS.reduce((s, e) => s + e.mealsServed, 0);
  const totalVolunteers = DISASTER_EVENTS.reduce((s, e) => s + e.volunteersDeployed, 0);

  const campSupplyData = {
    labels: relatedCamps.map(c => c.name.split(' ').slice(-2).join(' ')),
    datasets: [
      { label: 'Water %', data: relatedCamps.map(c => c.supplies.water), backgroundColor: '#3b82f6', borderRadius: 4 },
      { label: 'Food %', data: relatedCamps.map(c => c.supplies.food), backgroundColor: '#10b981', borderRadius: 4 },
      { label: 'Medical %', data: relatedCamps.map(c => c.supplies.medical), backgroundColor: '#f59e0b', borderRadius: 4 },
    ],
  };

  return (
    <ProtectedRoute allowedRoles={['ngo', 'admin']} pageTitle="Emergency Relief">
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>🚨 Emergency Relief Mode</h1>
          <p>Disaster response coordination — food camps, mass distribution & rescue dispatch</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ background: 'rgba(239,68,68,0.15)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(239,68,68,0.3)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', animation: 'pulse 1.5s infinite' }} />
            <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.85rem' }}>EMERGENCY MODE ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <StatsCard icon="🚨" value={DISASTER_EVENTS.filter(e => e.status === 'active').length} label="Active Emergencies" color="#ef4444" />
        <StatsCard icon="👥" value={totalAffected} label="People Affected" color="#f59e0b" />
        <StatsCard icon="🍛" value={totalMeals} label="Meals Served" trend="+5,200 today" color="#10b981" />
        <StatsCard icon="🤝" value={totalVolunteers} label="Volunteers Deployed" color="#8b5cf6" />
      </div>

      {/* Active Disasters */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="section-card-header">
          <h2>🌍 Active Disaster Events</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {DISASTER_EVENTS.map(event => (
            <div key={event.id} onClick={() => setSelectedEvent(event)}
              style={{
                background: selectedEvent.id === event.id ? 'var(--bg-elevated)' : 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)', padding: '1.25rem',
                border: selectedEvent.id === event.id ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                cursor: 'pointer', transition: 'all var(--transition-fast)',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{DISASTER_ICONS[event.type]}</span>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{event.title}</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>📍 {event.city}</p>
                  </div>
                </div>
                <span className="badge" style={{ background: `${SEVERITY_COLORS[event.severity]}15`, color: SEVERITY_COLORS[event.severity], border: `1px solid ${SEVERITY_COLORS[event.severity]}30`, textTransform: 'uppercase' }}>
                  {event.severity}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{event.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem' }}>
                <div><span style={{ color: 'var(--text-muted)' }}>Affected:</span> <strong>{event.affectedPeople.toLocaleString('en-US')}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Meals:</span> <strong style={{ color: '#10b981' }}>{event.mealsServed.toLocaleString('en-US')}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Camps:</span> <strong>{event.campsSetup}</strong></div>
                <div><span style={{ color: 'var(--text-muted)' }}>Volunteers:</span> <strong style={{ color: '#8b5cf6' }}>{event.volunteersDeployed}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Event Detail */}
      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        {/* Relief Camps */}
        <div className="card">
          <div className="section-card-header">
            <h2>⛺ Relief Camps — {selectedEvent.title}</h2>
            <span className="badge badge-warning">{relatedCamps.length} camps</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {relatedCamps.map(camp => (
              <div key={camp.id} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>{camp.name}</h4>
                  <span className="badge" style={{
                    background: camp.status === 'full' ? 'rgba(239,68,68,0.15)' : camp.status === 'active' ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.15)',
                    color: camp.status === 'full' ? '#ef4444' : camp.status === 'active' ? '#22c55e' : '#3b82f6',
                    border: '1px solid transparent'
                  }}>{camp.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Occupancy: {camp.current}/{camp.capacity}</span>
                  <span style={{ color: 'var(--text-muted)' }}>Meals today: {camp.mealsToday}</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: '0.75rem' }}>
                  <div className="progress-fill" style={{ width: `${(camp.current / camp.capacity) * 100}%`, background: camp.current / camp.capacity > 0.9 ? '#ef4444' : 'var(--primary-gradient)' }} />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {Object.entries(camp.supplies).map(([key, val]) => (
                    <div key={key} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key}</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: val < 40 ? '#ef4444' : val < 60 ? '#f59e0b' : '#22c55e' }}>{val}%</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {relatedCamps.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No camps for this event yet</p>}
          </div>
        </div>

        {/* Supply Levels Chart */}
        <div className="card">
          <div className="section-card-header">
            <h2>📊 Camp Supply Levels</h2>
          </div>
          {relatedCamps.length > 0 ? <BarChart data={campSupplyData} /> : <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '4rem' }}>Select an event with camps</p>}

          {/* Quick Actions */}
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>⚡ Quick Actions</h3>
            <button className="btn btn-primary w-full" style={{ justifyContent: 'flex-start' }}>📢 Broadcast Emergency Alert</button>
            <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start' }}>🤝 Deploy More Volunteers</button>
            <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start' }}>📦 Request Supply Airdrop</button>
            <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start' }}>🏥 Coordinate with Govt Agencies</button>
            <button className="btn btn-secondary w-full" style={{ justifyContent: 'flex-start' }}>📍 Setup New Relief Camp</button>
          </div>
        </div>
      </div>

      {/* Priority Families */}
      <div className="card">
        <div className="section-card-header">
          <h2>👨‍👩‍👧‍👦 Priority Families & Groups</h2>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Group</th><th>Members</th><th>Location</th><th>Priority</th><th>Meals Needed</th><th>Status</th></tr>
            </thead>
            <tbody>
              {[
                ['Pregnant Women Group', 23, selectedEvent.city, 'Critical', 69, 'Served'],
                ['Elderly (65+)', 45, selectedEvent.city, 'Critical', 135, 'Scheduled'],
                ['Children Under 5', 67, selectedEvent.city, 'Critical', 201, 'Served'],
                ['Disabled Persons', 18, selectedEvent.city, 'High', 54, 'In Queue'],
                ['General Population', 250, selectedEvent.city, 'Medium', 750, 'Partially Served'],
              ].map(([group, members, loc, priority, meals, status], i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{group}</td>
                  <td>{members}</td>
                  <td>{loc}</td>
                  <td><span className="badge" style={{ background: priority === 'Critical' ? 'rgba(239,68,68,0.15)' : priority === 'High' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)', color: priority === 'Critical' ? '#ef4444' : priority === 'High' ? '#f59e0b' : '#3b82f6', border: '1px solid transparent' }}>{priority}</span></td>
                  <td>{meals}/day</td>
                  <td><span className="badge badge-success">{status}</span></td>
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
