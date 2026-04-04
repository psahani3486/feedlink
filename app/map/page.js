'use client';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useApp } from '@/context/AppContext';
import { DONORS, NGOS, VOLUNTEERS, ANALYTICS } from '@/data/mockData';

const MapWrapper = dynamic(() => import('@/components/MapComponent'), { ssr: false });
const DynCircle = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });
const DynPopup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

const FILTERS = ['all', 'donors', 'ngos', 'volunteers', 'demand'];

export default function LiveMap() {
  const { state } = useApp();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const donorCount = DONORS.length;
  const ngoCount = NGOS.length;
  const volCount = VOLUNTEERS.filter(v => v.available).length;
  const activeDeliveries = state.donations.filter(d => ['picked_up', 'in_transit'].includes(d.status)).length;

  return (
    <div className="map-page">
      {/* Sidebar */}
      <div className="map-sidebar">
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', marginBottom: '1rem' }}>
          📍 Live Map
        </h2>

        {/* Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {FILTERS.map(f => (
            <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter(f)} style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }}>
              {f === 'all' ? '🗺️' : f === 'donors' ? '🍽️' : f === 'ngos' ? '🏥' : f === 'volunteers' ? '🚴' : '🔥'} {f}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '0.75rem', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>🍽️ Donors</span>
            <span style={{ fontWeight: 700, color: '#10b981' }}>{donorCount}</span>
          </div>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '0.75rem', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>🏥 NGOs</span>
            <span style={{ fontWeight: 700, color: '#06b6d4' }}>{ngoCount}</span>
          </div>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '0.75rem', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>🚴 Online Volunteers</span>
            <span style={{ fontWeight: 700, color: '#f59e0b' }}>{volCount}</span>
          </div>
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: '0.75rem', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>🚚 Active Deliveries</span>
            <span style={{ fontWeight: 700, color: '#8b5cf6' }}>{activeDeliveries}</span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Legend</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              { color: '#10b981', label: 'Restaurants / Donors' },
              { color: '#3b82f6', label: 'NGOs' },
              { color: '#f59e0b', label: 'Volunteers (Online)' },
              { color: '#ef4444', label: 'High Demand Zone' },
              { color: '#8b5cf6', label: 'Active Delivery' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Detail */}
        {selected && (
          <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1rem', border: '1px solid var(--border-accent)', animation: 'fadeInUp 0.3s ease' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>{selected.name}</h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {selected.city && <span>📍 {selected.city}</span>}
              {selected.type && <span>🏷️ {selected.type}</span>}
              {selected.speciality && <span>🎯 {selected.speciality}</span>}
              {selected.rating && <span>⭐ {selected.rating}</span>}
              {selected.deliveries !== undefined && <span>📦 {selected.deliveries} deliveries</span>}
              {selected.capacity && <span>📊 Capacity: {selected.currentLoad}/{selected.capacity}</span>}
            </div>
          </div>
        )}

        {/* Demand Zones */}
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔥 Demand Zones</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {ANALYTICS.demandZones.slice(0, 6).map(zone => (
              <div key={zone.city} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', flex: 1 }}>{zone.city}</span>
                <div className="progress-bar" style={{ width: '60px', height: '4px' }}>
                  <div className="progress-fill" style={{ width: `${zone.demand}%`, background: zone.demand > 80 ? '#ef4444' : zone.demand > 60 ? '#f59e0b' : '#10b981' }} />
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', width: '28px', textAlign: 'right' }}>{zone.demand}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="map-container">
        <MapWrapper center={[22.5, 78.9]} zoom={5}>
          {/* Donors */}
          {(filter === 'all' || filter === 'donors') && DONORS.map(d => (
            <DynCircle key={d.id} center={[d.lat, d.lng]} radius={6} pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.8 }}
              eventHandlers={{ click: () => setSelected(d) }}>
              <DynPopup>
                <div style={{ color: '#1a2332' }}>
                  <strong>🍽️ {d.name}</strong><br />
                  <span>{d.type} • {d.city}</span><br />
                  <span>⭐ {d.rating} • {d.totalDonations} donations</span>
                </div>
              </DynPopup>
            </DynCircle>
          ))}

          {/* NGOs */}
          {(filter === 'all' || filter === 'ngos') && NGOS.map(n => (
            <DynCircle key={n.id} center={[n.lat, n.lng]} radius={8} pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.8 }}
              eventHandlers={{ click: () => setSelected(n) }}>
              <DynPopup>
                <div style={{ color: '#1a2332' }}>
                  <strong>🏥 {n.name}</strong><br />
                  <span>{n.speciality} • {n.city}</span><br />
                  <span>Capacity: {n.currentLoad}/{n.capacity}</span>
                </div>
              </DynPopup>
            </DynCircle>
          ))}

          {/* Volunteers */}
          {(filter === 'all' || filter === 'volunteers') && VOLUNTEERS.filter(v => v.available).map(v => (
            <DynCircle key={v.id} center={[v.lat, v.lng]} radius={5} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.9 }}
              eventHandlers={{ click: () => setSelected(v) }}>
              <DynPopup>
                <div style={{ color: '#1a2332' }}>
                  <strong>🚴 {v.name}</strong><br />
                  <span>{v.city} • ⭐ {v.rating}</span><br />
                  <span>{v.deliveries} deliveries • {v.points} pts</span>
                </div>
              </DynPopup>
            </DynCircle>
          ))}

          {/* Demand Heatmap */}
          {(filter === 'all' || filter === 'demand') && ANALYTICS.demandZones.map(zone => (
            <DynCircle key={zone.city} center={[zone.lat, zone.lng]} radius={zone.demand / 4}
              pathOptions={{ color: zone.demand > 80 ? '#ef4444' : zone.demand > 60 ? '#f59e0b' : '#10b981', fillColor: zone.demand > 80 ? '#ef4444' : zone.demand > 60 ? '#f59e0b' : '#10b981', fillOpacity: 0.2, weight: 2 }}>
              <DynPopup>
                <div style={{ color: '#1a2332' }}>
                  <strong>🔥 {zone.city}</strong><br />
                  <span>Demand Index: {zone.demand}%</span>
                </div>
              </DynPopup>
            </DynCircle>
          ))}
        </MapWrapper>
      </div>
    </div>
  );
}
