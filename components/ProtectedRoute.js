'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

/**
 * Wraps a page to require authentication.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {string[]} props.allowedRoles - Roles that can access this page (e.g. ['donor', 'admin'])
 * @param {string} props.pageTitle - Page name for access denied message
 */
export default function ProtectedRoute({ children, allowedRoles = [], pageTitle = 'this page' }) {
  const { state, hydrated } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !state.user) {
      router.push('/auth');
    }
  }, [hydrated, state.user, router]);

  // Still loading session from localStorage
  if (!hydrated) {
    return (
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }}>🍱</div>
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!state.user) {
    return (
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="card" style={{ textAlign: 'center', padding: '3rem', maxWidth: '400px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>Login Required</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Please sign in to access {pageTitle}</p>
          <button className="btn btn-primary" onClick={() => router.push('/auth')}>🔐 Sign In</button>
        </div>
      </div>
    );
  }

  // Check role access (admin can access everything, empty allowedRoles = open to all logged-in users)
  if (allowedRoles.length > 0 && !allowedRoles.includes(state.user.role) && state.user.role !== 'admin') {
    return (
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="card" style={{ textAlign: 'center', padding: '3rem', maxWidth: '450px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚫</div>
          <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem', color: '#ef4444' }}>Access Denied</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            Your role <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>{state.user.role}</span> does not have access to {pageTitle}.
          </p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.82rem' }}>
            Required role: {allowedRoles.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => router.back()}>← Go Back</button>
            <button className="btn btn-primary" onClick={() => router.push('/')}>🏠 Home</button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
