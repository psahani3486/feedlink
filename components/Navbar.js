'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

// All navigation items with role restrictions
const ALL_NAV_ITEMS = [
  { href: '/', label: 'Home', icon: '🏠', roles: [] },
  { href: '/donor', label: 'Donor', icon: '🍽️', roles: ['donor'] },
  { href: '/ngo', label: 'NGO', icon: '🏥', roles: ['ngo'] },
  { href: '/volunteer', label: 'Volunteer', icon: '🚴', roles: ['volunteer'] },
  { href: '/fridge', label: 'Fridges', icon: '🧊', roles: ['ngo', 'admin', 'volunteer'] },
  { href: '/beneficiary', label: 'Beneficiary', icon: '🤲', roles: ['beneficiary'] },
  { href: '/corporate', label: 'CSR', icon: '🏢', roles: ['corporate'] },
  { href: '/emergency', label: 'Emergency', icon: '🚨', roles: ['ngo', 'admin'] },
  { href: '/sustainability', label: 'Impact', icon: '🌍', roles: [] },
  { href: '/admin', label: 'Admin', icon: '📊', roles: ['admin'] },
  { href: '/map', label: 'Map', icon: '📍', roles: [] },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { state, logout } = useApp();

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setShowProfileMenu(false);
  }, [pathname]);

  // Prevent body scroll when profile sheet is open on mobile
  useEffect(() => {
    if (showProfileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showProfileMenu]);

  if (pathname === '/auth') return null;

  const user = state.user;

  const visibleNavItems = ALL_NAV_ITEMS.filter(item => {
    if (item.roles.length === 0) return true;
    if (!user) return false;
    if (user.role === 'admin') return true;
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

  const dashboardLinks = {
    donor: '/donor', ngo: '/ngo', volunteer: '/volunteer',
    admin: '/admin', beneficiary: '/beneficiary', corporate: '/corporate',
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="navbar-brand">
            <span style={{ fontSize: '1.6rem' }}>🍱</span>
            <span>FeedLink</span>
            <span style={{ fontSize: '0.6rem', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', padding: '2px 6px', borderRadius: '4px', color: 'white', fontWeight: 700, letterSpacing: '0.5px', marginLeft: '-4px', WebkitTextFillColor: 'white' }}>X</span>
          </Link>

          {/* Desktop nav links */}
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

            {/* Sign In link (inside menu for mobile) — only when not logged in */}
            {!user && (
              <Link href="/auth" className="btn btn-primary btn-sm" style={{ marginLeft: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.82rem' }}>
                🔐 Sign In
              </Link>
            )}
          </div>

          {/* Right side — always visible */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Profile button — always in header, even on mobile */}
            {user && (
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.35rem 0.75rem',
                  background: 'var(--bg-secondary)', border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-full)', cursor: 'pointer', color: 'var(--text-primary)',
                  transition: 'all var(--transition-fast)',
                }}
                aria-label="Profile menu"
              >
                <span style={{ fontSize: '1.1rem' }}>{user.avatar}</span>
                <span style={{ fontWeight: 600, fontSize: '0.8rem', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="hide-xs">
                  {user.name.split(' ')[0]}
                </span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: roleColors[user.role] || '#94a3b8', flexShrink: 0 }} />
              </button>
            )}

            {/* Sign In button in header for non-logged-in users on mobile */}
            {!user && (
              <Link href="/auth" className="btn btn-primary btn-sm hide-on-open" style={{ padding: '0.4rem 1rem', fontSize: '0.82rem' }}>
                🔐 Sign In
              </Link>
            )}

            {/* Hamburger */}
            <button
              className="navbar-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Sheet — fixed overlay, works perfectly on all screen sizes */}
      {showProfileMenu && user && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowProfileMenu(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 199,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              animation: 'fadeIn 0.2s ease',
            }}
          />

          {/* Profile panel — bottom sheet on mobile, dropdown on desktop */}
          <div style={{
            position: 'fixed',
            zIndex: 200,
            // Desktop: top-right corner
            top: 'var(--profile-top, 72px)',
            right: 'var(--profile-right, 1rem)',
            width: 'min(300px, calc(100vw - 2rem))',
            // Mobile override via CSS class
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-light)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            animation: 'fadeInUp 0.25s ease',
          }}
          className="profile-dropdown"
          >
            {/* User Info */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 'var(--radius-md)',
                  background: `${roleColors[user.role] || '#94a3b8'}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem', flexShrink: 0,
                  border: `2px solid ${roleColors[user.role] || '#94a3b8'}40`,
                }}>
                  {user.avatar}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                    <span className="badge" style={{ background: `${roleColors[user.role]}15`, color: roleColors[user.role], border: `1px solid ${roleColors[user.role]}30`, textTransform: 'capitalize', fontSize: '0.68rem' }}>
                      {user.role}
                    </span>
                    {user.verified && <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>✅ Verified</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div style={{ padding: '0.5rem' }}>
              {[
                { label: '📊 My Dashboard', href: dashboardLinks[user.role] || '/' },
                { label: '🌍 Impact', href: '/sustainability' },
                { label: '📍 Live Map', href: '/map' },
              ].map((item, i) => (
                <button key={i}
                  onClick={() => { router.push(item.href); setShowProfileMenu(false); }}
                  style={{
                    width: '100%', padding: '0.75rem 1rem', textAlign: 'left',
                    background: 'none', border: 'none', color: 'var(--text-primary)',
                    cursor: 'pointer', borderRadius: 'var(--radius-md)',
                    fontSize: '0.9rem', transition: 'background 0.15s',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Logout */}
            <div style={{ padding: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%', padding: '0.75rem 1rem', textAlign: 'left',
                  background: 'none', border: 'none', color: '#ef4444',
                  cursor: 'pointer', borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem', fontWeight: 700, transition: 'background 0.15s',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                🚪 Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
