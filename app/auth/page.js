'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '../../context/AppContext';

const ROLES = [
  { value: 'donor', label: 'Donor / Restaurant', icon: '🍽️', desc: 'Donate surplus food from your kitchen', color: '#10b981' },
  { value: 'ngo', label: 'NGO', icon: '🏥', desc: 'Manage food distribution to communities', color: '#3b82f6' },
  { value: 'volunteer', label: 'Volunteer', icon: '🚴', desc: 'Pick up & deliver food to those in need', color: '#f59e0b' },
  { value: 'beneficiary', label: 'Beneficiary', icon: '🤲', desc: 'Access meals and community resources', color: '#8b5cf6' },
  { value: 'corporate', label: 'Corporate / CSR', icon: '🏢', desc: 'Sponsor meals and track CSR impact', color: '#06b6d4' },
];

const ROLE_REDIRECTS = {
  donor: '/donor',
  ngo: '/ngo',
  volunteer: '/volunteer',
  admin: '/admin',
  beneficiary: '/beneficiary',
  corporate: '/corporate',
};

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // login | signup
  const [selectedRole, setSelectedRole] = useState('donor');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', org: '', city: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup, state } = useApp();
  const router = useRouter();

  // If already logged in, redirect
  useEffect(() => {
    if (state.user) {
      router.push(ROLE_REDIRECTS[state.user.role] || '/');
    }
  }, [state.user, router]);

  if (state.user) return null;

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const result = login(formData.email, formData.password);
      if (result.success) {
        router.push(ROLE_REDIRECTS[result.user.role] || '/');
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 800); // Simulate API delay
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and email are required');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const result = signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        org: formData.org || 'Independent',
        city: formData.city || 'Delhi',
        phone: formData.phone || '',
      });
      if (result.success) {
        router.push(ROLE_REDIRECTS[result.user.role] || '/');
      } else {
        setError(result.error);
      }
      setLoading(false);
    }, 800);
  };

  const fillDemo = (role) => {
    const demoAccounts = {
      donor: { email: 'donor@feedlink.in', password: 'password' },
      ngo: { email: 'ngo@feedlink.in', password: 'password' },
      volunteer: { email: 'volunteer@feedlink.in', password: 'password' },
      admin: { email: 'admin@feedlink.in', password: 'admin123' },
    };
    const demo = demoAccounts[role];
    if (demo) {
      setFormData({ ...formData, email: demo.email, password: demo.password });
      setMode('login');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: mode === 'signup' ? '780px' : '480px', width: '100%', transition: 'max-width 0.3s ease' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🍱</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.25rem' }}>
            FeedLink <span style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1rem', fontWeight: 900 }}>X</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* Toggle Login/Signup */}
        <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', padding: '4px', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
          {['login', 'signup'].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); }}
              style={{
                flex: 1, padding: '0.7rem', borderRadius: 'var(--radius-md)', border: 'none',
                background: mode === m ? 'var(--primary)' : 'transparent',
                color: mode === m ? '#fff' : 'var(--text-muted)',
                fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
                transition: 'all var(--transition-fast)',
              }}>
              {m === 'login' ? '🔐 Sign In' : '✨ Sign Up'}
            </button>
          ))}
        </div>

        <div className="card" style={{ padding: '2rem' }}>

          {/* Error Message */}
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#ef4444', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚠️ {error}
            </div>
          )}

          {mode === 'login' ? (
            /* === LOGIN FORM === */
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInput} required placeholder="e.g. donor@feedlink.in"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none', transition: 'border-color 0.2s' }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleInput} required placeholder="Enter your password"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none' }} />
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={loading}
                style={{ padding: '0.85rem', fontSize: '1rem', fontWeight: 700, opacity: loading ? 0.7 : 1 }}>
                {loading ? '⏳ Signing In...' : '🚀 Sign In'}
              </button>

              {/* Demo Accounts */}
              <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>🎯 Quick Demo Login:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {[
                    { role: 'donor', label: '🍽️ Donor', email: 'donor@feedlink.in' },
                    { role: 'ngo', label: '🏥 NGO', email: 'ngo@feedlink.in' },
                    { role: 'volunteer', label: '🚴 Volunteer', email: 'volunteer@feedlink.in' },
                    { role: 'admin', label: '📊 Admin', email: 'admin@feedlink.in' },
                  ].map(demo => (
                    <button key={demo.role} type="button" onClick={() => fillDemo(demo.role)}
                      className="btn btn-secondary btn-sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.6rem', gap: '2px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{demo.label}</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{demo.email}</span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            /* === SIGNUP FORM === */
            <form onSubmit={handleSignup}>
              {/* Role Selection */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>I want to join as:</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem' }}>
                  {ROLES.map(role => (
                    <button key={role.value} type="button" onClick={() => setSelectedRole(role.value)}
                      style={{
                        padding: '0.75rem 0.5rem', borderRadius: 'var(--radius-md)', border: selectedRole === role.value ? `2px solid ${role.color}` : '1px solid var(--border-light)',
                        background: selectedRole === role.value ? `${role.color}10` : 'var(--bg-secondary)',
                        cursor: 'pointer', textAlign: 'center', transition: 'all var(--transition-fast)',
                      }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{role.icon}</div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: selectedRole === role.value ? role.color : 'var(--text-primary)' }}>{role.label}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>{role.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInput} required placeholder="Your full name"
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInput} required placeholder="you@email.com"
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Password *</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInput} required placeholder="Min. 6 characters"
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Confirm Password *</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInput} required placeholder="Re-enter password"
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    {selectedRole === 'donor' ? 'Restaurant / Org Name' : selectedRole === 'ngo' ? 'NGO Name' : selectedRole === 'corporate' ? 'Company Name' : 'Organization (Optional)'}
                  </label>
                  <input type="text" name="org" value={formData.org} onChange={handleInput} placeholder={selectedRole === 'donor' ? 'e.g. Taj Palace Kitchen' : selectedRole === 'ngo' ? 'e.g. Akshaya Patra' : 'e.g. Company name'}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>City</label>
                  <select name="city" value={formData.city} onChange={handleInput}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none' }}>
                    <option value="">Select City</option>
                    {['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Bhopal', 'Kochi', 'Guwahati', 'Patna'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInput} placeholder="+91 98XXX XXXXX"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.92rem', outline: 'none' }} />
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={loading}
                style={{ padding: '0.85rem', fontSize: '1rem', fontWeight: 700, opacity: loading ? 0.7 : 1 }}>
                {loading ? '⏳ Creating Account...' : `✨ Create ${ROLES.find(r => r.value === selectedRole)?.label} Account`}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '1.5rem' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            style={{ color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
