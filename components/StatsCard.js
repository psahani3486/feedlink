'use client';
import { useEffect, useRef, useState } from 'react';

export default function StatsCard({ icon, value, label, trend, trendDir, color, delay = 0 }) {
  const [displayVal, setDisplayVal] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const num = typeof value === 'number' ? value : parseInt(value.replace(/[^0-9]/g, ''));
    if (isNaN(num)) { setDisplayVal(value); return; }
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(num / (duration / 16));
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += step;
        if (start >= num) { setDisplayVal(num); clearInterval(interval); }
        else setDisplayVal(start);
      }, 16);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  const bgColor = color ? `${color}15` : 'rgba(16,185,129,0.15)';
  const textColor = color || '#10b981';

  return (
    <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-icon" style={{ background: bgColor, color: textColor }}>{icon}</div>
      <div className="stat-info">
        <h3 style={{ color: textColor }}>{typeof value === 'number' ? displayVal.toLocaleString('en-US') : displayVal}</h3>
        <p>{label}</p>
        {trend && (
          <span className={`stat-trend ${trendDir || 'up'}`}>
            {trendDir === 'down' ? '↓' : '↑'} {trend}
          </span>
        )}
      </div>
    </div>
  );
}
