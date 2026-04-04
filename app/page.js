'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatsCard from '../components/StatsCard';
import { generateActivityFeed, ANALYTICS } from '../data/mockData';

const IMPACT_STATS = [
  { icon: '🍛', value: 128940, label: 'Meals Delivered', trend: '+12% this month', color: '#10b981' },
  { icon: '📦', value: 45678, label: 'Kg Food Saved', trend: '+8% this month', color: '#06b6d4' },
  { icon: '🌍', value: 12340, label: 'Kg CO₂ Reduced', trend: '+15% this month', color: '#8b5cf6' },
  { icon: '🤝', value: 487, label: 'Active Volunteers', trend: '+23 this week', color: '#f59e0b' },
];

const STEPS = [
  { icon: '🍽️', title: 'Restaurant Adds Surplus', desc: 'Donors list surplus food with quantity, type, and expiry details', num: 1 },
  { icon: '🤖', title: 'AI Matches & Notifies', desc: 'Smart engine finds the best NGO-volunteer pair based on distance, urgency & capacity', num: 2 },
  { icon: '🚴', title: 'Volunteer Picks Up', desc: 'Assigned volunteer navigates optimized route and verifies pickup via QR scan', num: 3 },
  { icon: '✅', title: 'Delivered & Verified', desc: 'Food reaches those in need. QR verification ensures accountability', num: 4 },
];

const FEATURES = [
  { icon: '🧠', title: 'AI Shelf-Life Prediction', desc: 'ML model predicts food safety window based on type, temperature & time' },
  { icon: '📍', title: 'Live GPS Tracking', desc: 'Real-time volunteer tracking with ETA and route visualization on maps' },
  { icon: '🔐', title: 'QR Verification', desc: 'Unique QR codes for each donation ensure fraud-proof pickup & delivery' },
  { icon: '📊', title: 'Impact Analytics', desc: 'Comprehensive dashboards showing meals served, waste reduced & volunteer efficiency' },
  { icon: '🎮', title: 'Gamification', desc: 'Points, badges & leaderboards motivate volunteers and drive engagement' },
  { icon: '🗺️', title: 'Demand Heatmaps', desc: 'AI-powered hunger zone predictions help NGOs allocate resources effectively' },
];

export default function Home() {
  const [feed, setFeed] = useState([]);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Connecting surplus food to those who need it most.';

  useEffect(() => {
    setFeed(generateActivityFeed(10));
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // Simulate live feed
  useEffect(() => {
    const interval = setInterval(() => {
      setFeed(prev => {
        const newItems = generateActivityFeed(1);
        return [...newItems, ...prev.slice(0, 9)];
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div>
            <h1 className="hero-title" style={{ animation: 'fadeInUp 0.8s ease' }}>
              Stop Food Waste.<br />
              <span className="highlight">Feed India.</span>
            </h1>
            <p className="hero-subtitle" style={{ animation: 'fadeInUp 0.8s ease 0.2s both' }}>
              {typedText}<span style={{ opacity: typedText.length < fullText.length ? 1 : 0, transition: 'opacity 0.3s' }}>|</span>
            </p>
            <div className="hero-actions" style={{ animation: 'fadeInUp 0.8s ease 0.4s both' }}>
              <Link href="/donor" className="btn btn-primary btn-lg">
                🍽️ Donate Food
              </Link>
              <Link href="/volunteer" className="btn btn-secondary btn-lg">
                🚴 Volunteer Now
              </Link>
              <Link href="/ngo" className="btn btn-secondary btn-lg">
                🏥 NGO Portal
              </Link>
            </div>
          </div>

          <div className="hero-visual" style={{ animation: 'fadeInUp 0.8s ease 0.3s both' }}>
            <div style={{
              width: '340px', height: '340px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', animation: 'float 6s ease-in-out infinite',
            }}>
              <span style={{ fontSize: '8rem' }}>🍱</span>
              <div style={{
                position: 'absolute', top: '10%', right: '5%',
                animation: 'float 4s ease-in-out infinite 1s', fontSize: '2.5rem',
              }}>🚴</div>
              <div style={{
                position: 'absolute', bottom: '15%', left: '5%',
                animation: 'float 5s ease-in-out infinite 0.5s', fontSize: '2.5rem',
              }}>🏥</div>
              <div style={{
                position: 'absolute', top: '20%', left: '10%',
                animation: 'float 4.5s ease-in-out infinite 1.5s', fontSize: '2rem',
              }}>❤️</div>
              <div style={{
                position: 'absolute', bottom: '10%', right: '10%',
                animation: 'float 5s ease-in-out infinite 2s', fontSize: '2rem',
              }}>🌱</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <div className="impact-grid">
        {IMPACT_STATS.map((stat, i) => (
          <div className="impact-card" key={i} style={{ animation: `fadeInUp 0.6s ease ${i * 0.1}s both` }}>
            <div className="impact-icon">{stat.icon}</div>
            <div className="impact-number">{stat.value.toLocaleString('en-US')}</div>
            <div className="impact-label">{stat.label}</div>
            <div className="stat-trend up" style={{ marginTop: '8px' }}>{stat.trend}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <section className="section">
        <h2 className="section-title">How <span className="text-gradient">FeedLink</span> Works</h2>
        <p className="section-subtitle">From surplus to salvation in 4 simple steps, powered by AI</p>
        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <div className="step-card" key={i} style={{ animation: `fadeInUp 0.6s ease ${i * 0.15}s both` }}>
              <div className="step-number">{step.num}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: 'rgba(16,185,129,0.02)' }}>
        <h2 className="section-title">Powered by <span className="text-gradient">Intelligence</span></h2>
        <p className="section-subtitle">AI & ML features that make FeedLink a premium-grade platform</p>
        <div className="grid-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {FEATURES.map((feat, i) => (
            <div className="card" key={i} style={{ animation: `fadeInUp 0.6s ease ${i * 0.1}s both`, textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feat.icon}</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>{feat.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="section">
        <h2 className="section-title">🔴 Live <span className="text-gradient">Activity Feed</span></h2>
        <p className="section-subtitle">See real-time donations and deliveries happening across India</p>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="feed-list">
            {feed.map((item, i) => (
              <div className="feed-item" key={`${item.id}-${i}`} style={{ animation: `slideInLeft 0.4s ease ${i * 0.05}s both` }}>
                <div className="feed-dot" style={{
                  background: item.type === 'donation' ? '#10b981' : item.type === 'delivered' ? '#22c55e' : item.type === 'pickup' ? '#f59e0b' : '#06b6d4',
                }} />
                <span className="feed-text">{item.emoji} {item.message}</span>
                <span className="feed-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <h2 className="section-title">Ready to Make a <span className="text-gradient">Difference</span>?</h2>
        <p className="section-subtitle">Join thousands of restaurants, NGOs, and volunteers fighting hunger</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
          <Link href="/donor" className="btn btn-primary btn-lg">🍽️ Start Donating</Link>
          <Link href="/volunteer" className="btn btn-secondary btn-lg">🚴 Become a Volunteer</Link>
          <Link href="/admin" className="btn btn-secondary btn-lg">📊 View Impact</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand"><span className="text-gradient">🍱 FeedLink</span></div>
            <p className="footer-desc">AI-powered platform connecting surplus food from restaurants to NGOs and communities across India. Every meal counts.</p>
          </div>
          <div>
            <h4 className="footer-title">Platform</h4>
            <div className="footer-links">
              <Link href="/donor">Donor Dashboard</Link>
              <Link href="/ngo">NGO Portal</Link>
              <Link href="/volunteer">Volunteer App</Link>
              <Link href="/admin">Analytics</Link>
            </div>
          </div>
          <div>
            <h4 className="footer-title">Features</h4>
            <div className="footer-links">
              <a>AI Matching</a>
              <a>Live Tracking</a>
              <a>QR Verification</a>
              <a>Demand Heatmap</a>
            </div>
          </div>
          <div>
            <h4 className="footer-title">Contact</h4>
            <div className="footer-links">
              <a>hello@feedlink.in</a>
              <a>+91 1800 FEED LINK</a>
              <a>Delhi, India</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 FeedLink. Built with ❤️ to fight hunger across India.
        </div>
      </footer>
    </>
  );
}
