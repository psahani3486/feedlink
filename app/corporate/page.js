'use client';
import { useState, useMemo } from 'react';
import { CORPORATE_SPONSORS, CSR_MONTHLY } from '@/data/extendedData';
import { generateESGReport } from '@/ai/sustainability';
import StatsCard from '@/components/StatsCard';
import { LineChart, BarChart, DoughnutChart } from '@/components/Charts';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CorporateDashboard() {
  const [selectedCompany, setSelectedCompany] = useState(CORPORATE_SPONSORS[0]);

  const esgReport = useMemo(() =>
    generateESGReport(selectedCompany.name, selectedCompany.mealsSponsored, selectedCompany.co2Saved),
    [selectedCompany]
  );

  const totalMeals = CORPORATE_SPONSORS.reduce((s, c) => s + c.mealsSponsored, 0);
  const totalCO2 = CORPORATE_SPONSORS.reduce((s, c) => s + c.co2Saved, 0);
  const totalBudget = CORPORATE_SPONSORS.reduce((s, c) => s + c.csrBudget, 0);

  const trendData = {
    labels: CSR_MONTHLY.map(m => m.month),
    datasets: [
      { label: 'Meals Sponsored', data: CSR_MONTHLY.map(m => m.meals / 1000), borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.4, yAxisID: 'y' },
      { label: 'CO₂ Saved (kg)', data: CSR_MONTHLY.map(m => m.co2), borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.1)', fill: true, tension: 0.4, yAxisID: 'y1' },
    ],
  };

  const trendOptions = {
    scales: {
      y: { type: 'linear', position: 'left', ticks: { color: '#64748b' }, grid: { color: 'rgba(148,163,184,0.06)' } },
      y1: { type: 'linear', position: 'right', ticks: { color: '#64748b' }, grid: { drawOnChartArea: false } },
    },
  };

  const sectorData = {
    labels: [...new Set(CORPORATE_SPONSORS.map(c => c.sector))],
    datasets: [{
      data: [...new Set(CORPORATE_SPONSORS.map(c => c.sector))].map(sector =>
        CORPORATE_SPONSORS.filter(c => c.sector === sector).reduce((s, c) => s + c.mealsSponsored, 0)
      ),
      backgroundColor: ['#10b981', '#06b6d4', '#f59e0b', '#8b5cf6', '#ec4899'],
      borderWidth: 0,
    }],
  };

  const tierColors = { diamond: '#06b6d4', platinum: '#8b5cf6', gold: '#f59e0b', silver: '#94a3b8' };

  return (
    <ProtectedRoute allowedRoles={['corporate']} pageTitle="CSR Dashboard">
    <div className="page-container">
      <div className="page-header">
        <h1>🏢 CSR & Corporate Dashboard</h1>
        <p>Enterprise sponsorship tracking, ESG reports, SDG scorecards & tax documentation</p>
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <StatsCard icon="🍛" value={totalMeals} label="Total Meals Sponsored" trend="+12% this quarter" color="#10b981" />
        <StatsCard icon="🌍" value={totalCO2} label="Kg CO₂ Saved" trend="+18%" color="#8b5cf6" />
        <StatsCard icon="💰" value={`₹${(totalBudget / 10000000).toFixed(1)}Cr`} label="Total CSR Budget" color="#f59e0b" />
        <StatsCard icon="🏢" value={CORPORATE_SPONSORS.length} label="Corporate Partners" trend="+2 this month" color="#06b6d4" />
      </div>

      {/* Sponsor Cards */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="section-card-header">
          <h2>🤝 Corporate Partners</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {CORPORATE_SPONSORS.map(company => (
            <div key={company.id} onClick={() => setSelectedCompany(company)}
              style={{
                background: selectedCompany.id === company.id ? 'var(--bg-elevated)' : 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)', padding: '1.25rem', cursor: 'pointer',
                border: selectedCompany.id === company.id ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                transition: 'all var(--transition-fast)', textAlign: 'center',
              }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{company.logo}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{company.name}</div>
              <span className="badge" style={{ background: `${tierColors[company.tier]}20`, color: tierColors[company.tier], border: `1px solid ${tierColors[company.tier]}30`, textTransform: 'uppercase', fontSize: '0.65rem' }}>
                {company.tier}
              </span>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {company.mealsSponsored.toLocaleString('en-US')} meals
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        {/* ESG Report */}
        <div className="card">
          <div className="section-card-header">
            <h2>📊 ESG Report — {selectedCompany.name}</h2>
            <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: esgReport.ratingColor }}>{esgReport.rating}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: esgReport.ratingColor }}>{esgReport.overallESG}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Overall ESG Score</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                ['🌿 Environmental', esgReport.environmental.score, '#22c55e'],
                ['👥 Social', esgReport.social.score, '#3b82f6'],
                ['⚖️ Governance', esgReport.governance.score, '#f59e0b'],
              ].map(([label, score, color]) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span style={{ fontWeight: 700, color }}>{score}/100</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${score}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.82rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ color: 'var(--text-muted)' }}>CO₂ Saved</div>
              <div style={{ fontWeight: 700, color: '#22c55e' }}>{esgReport.environmental.co2Saved.toLocaleString('en-US')} kg</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ color: 'var(--text-muted)' }}>Meals Sponsored</div>
              <div style={{ fontWeight: 700, color: '#3b82f6' }}>{esgReport.social.mealsSponsored.toLocaleString('en-US')}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ color: 'var(--text-muted)' }}>Communities</div>
              <div style={{ fontWeight: 700, color: '#8b5cf6' }}>{esgReport.social.communitiesServed}</div>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ color: 'var(--text-muted)' }}>SDG Score</div>
              <div style={{ fontWeight: 700, color: '#f59e0b' }}>{selectedCompany.sdgScore}/100</div>
            </div>
          </div>

          <button className="btn btn-primary w-full mt-lg">📄 Export Tax Report (PDF)</button>
        </div>

        {/* Trends */}
        <div className="card">
          <div className="section-card-header">
            <h2>📈 CSR Impact Trend</h2>
          </div>
          <LineChart data={trendData} options={trendOptions} />
        </div>
      </div>

      {/* Sector Distribution */}
      <div className="dashboard-grid">
        <div className="card">
          <div className="section-card-header">
            <h2>🏭 Sector Distribution</h2>
          </div>
          <DoughnutChart data={sectorData} />
        </div>
        <div className="card">
          <div className="section-card-header">
            <h2>📋 All Partners</h2>
          </div>
          <div className="table-container">
            <table>
              <thead><tr><th>Company</th><th>Tier</th><th>Meals</th><th>CO₂ Saved</th><th>SDG</th></tr></thead>
              <tbody>
                {CORPORATE_SPONSORS.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.logo} {c.name}</td>
                    <td><span className="badge" style={{ background: `${tierColors[c.tier]}20`, color: tierColors[c.tier], border: '1px solid transparent', textTransform: 'uppercase' }}>{c.tier}</span></td>
                    <td>{c.mealsSponsored.toLocaleString('en-US')}</td>
                    <td style={{ color: '#22c55e' }}>{c.co2Saved.toLocaleString('en-US')} kg</td>
                    <td><span style={{ fontWeight: 700, color: '#f59e0b' }}>{c.sdgScore}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
