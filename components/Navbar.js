'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

// All navigation items with role restrictions
const ALL_NAV_ITEMS = [
  { href: '/', label: 'Home', icon: '🏠', roles: [] }, // empty = visible to all
  { href: '/donor', label: 'Donor', icon: '🍽️', roles: ['donor'] },
  { href: '/ngo', label: 'NGO', icon: '🏥', roles: ['ngo'] },
  { href: '/volunteer', label: 'Volunteer', icon: '🚴', roles: ['volunteer'] },
  { href: '/fridge', label: 'Fridges', icon: '🧊', roles: ['ngo', 'admin', 'volunteer'] },
  { href: '/beneficiary', label: 'Beneficiary', icon: '🤲', roles: ['beneficiary'] },
  { href: '/corporate', label: 'CSR', icon: '🏢', roles: ['corporate'] },
  { href: '/emergency', label: 'Emergency', icon: '🚨', roles: ['ngo', 'admin'] },
  { href: '/sustainability', label: 'Impact', icon: '🌍', roles: [] }, // visible to all
  { href: '/admin', label: 'Admin', icon: '📊', roles: ['admin'] },
  { href: '/map', label: 'Map', icon: '📍', roles: [] }, // visible to all
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { state, logout } = useApp();

  // Don't show navbar on auth page
  if (pathname === '/auth') return null;

  const user = state.user;

  // Filter nav items based on user role
  const visibleNavItems = ALL_NAV_ITEMS.filter(item => {
    // Items with empty roles array are visible to everyone
    if (item.roles.length === 0) return true;
    // If not logged in, only show public items
    if (!user) return false;
    // Admin can see everything
    if (user.role === 'admin') return true;
    // Check if user's role is in allowed roles
    return item.roles.includes(user.role);
  });

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    router.push('/');
  };

  const roleColors = {
    donor: '#10b981', ngo: '#3b82f6', volunteer: '#f59e0b',
    admin: '#ef4444', beneficiary: '#8b5cf6', corporate: '#06b6d4',
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <span style={{ fontSize: '1.6rem' }}>🍱</span>
          <span>FeedLink</span>
          <span style={{ fontSize: '0.6rem', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '2px 6px', borderRadius: '4px', color: 'white', fontWeight: 700, letterSpacing: '0.5px', marginLeft: '-4px', WebkitTextFillColor: 'white' }}>X</span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {visibleNavItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
              style={{ padding: '0.4rem 0.65rem', fontSize: '0.82rem' }}
            >
              <span style={{ marginRight: '3px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          {/* Auth Section */}
          {user ? (
            <div style={{ position: 'relative', marginLeft: '0.5rem' }}>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem',
                  background: 'var(--bg-secondary)', border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-full)', cursor: 'pointer', color: 'var(--text-primary)',
                  transition: 'all var(--transition-fast)',
                }}>
                <span style={{ fontSize: '1.1rem' }}>{user.avatar}</span>
                <span style={{ fontWeight: 600, fontSize: '0.8rem', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name.split(' ')[0]}</span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: roleColors[user.role] || '#94a3b8' }} />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowProfileMenu(false)} />
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '260px', zIndex: 100,
                    background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-light)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                    overflow: 'hidden',
                  }}>
                    {/* User Info */}
                    <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-light)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: `${roleColors[user.role] || '#94a3b8'}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                          {user.avatar}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{user.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{user.email}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                        <span className="badge" style={{ background: `${roleColors[user.role]}15`, color: roleColors[user.role], border: `1px solid ${roleColors[user.role]}30`, textTransform: 'capitalize', fontSize: '0.7rem' }}>
                          {user.role}
                        </span>
                        {user.verified && <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>✅ Verified</span>}
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div style={{ padding: '0.5rem' }}>
                      {[
                        { label: '📊 My Dashboard', action: () => { router.push(({donor: '/donor', ngo: '/ngo', volunteer: '/volunteer', admin: '/admin', beneficiary: '/beneficiary', corporate: '/corporate'})[user.role] || '/'); setShowProfileMenu(false); } },
                        { label: '🌍 Impact', action: () => { router.push('/sustainability'); setShowProfileMenu(false); } },
                        { label: '📍 Live Map', action: () => { router.push('/map'); setShowProfileMenu(false); } },
                      ].map((item, i) => (
                        <button key={i} onClick={item.action}
                          style={{ width: '100%', padding: '0.6rem 0.75rem', textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.target.style.background = 'var(--bg-secondary)'}
                          onMouseLeave={e => e.target.style.background = 'none'}>
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Logout */}
                    <div style={{ padding: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
                      <button onClick={handleLogout}
                        style={{ width: '100%', padding: '0.6rem 0.75rem', textAlign: 'left', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: 600, transition: 'background 0.15s' }}
                        onMouseEnter={e => e.target.style.background = 'rgba(239,68,68,0.08)'}
                        onMouseLeave={e => e.target.style.background = 'none'}>
                        🚪 Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/auth" className="btn btn-primary btn-sm" style={{ marginLeft: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.82rem' }}>
              🔐 Sign In
            </Link>
          )}
        </div>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
