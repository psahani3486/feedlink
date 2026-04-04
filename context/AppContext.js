'use client';
import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { generateDonations, DONORS, NGOS, VOLUNTEERS, ANALYTICS, NOTIFICATIONS } from '../data/mockData';

const AppContext = createContext();

const initialState = {
  donations: [],
  donors: DONORS,
  ngos: NGOS,
  volunteers: VOLUNTEERS,
  analytics: ANALYTICS,
  notifications: NOTIFICATIONS,
  currentRole: null,
  user: null,
  initialized: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT_DATA':
      return { ...state, donations: action.payload, initialized: true };
    case 'ADD_DONATION':
      return { ...state, donations: [action.payload, ...state.donations] };
    case 'UPDATE_DONATION':
      return { ...state, donations: state.donations.map(d => d.id === action.payload.id ? { ...d, ...action.payload } : d) };
    case 'ACCEPT_DONATION':
      return { ...state, donations: state.donations.map(d => d.id === action.payload.donationId ? { ...d, status: 'accepted', ngoId: action.payload.ngoId, ngoName: action.payload.ngoName } : d) };
    case 'ASSIGN_VOLUNTEER':
      return { ...state, donations: state.donations.map(d => d.id === action.payload.donationId ? { ...d, status: 'picked_up', volunteerId: action.payload.volunteerId, volunteerName: action.payload.volunteerName } : d) };
    case 'UPDATE_STATUS':
      return { ...state, donations: state.donations.map(d => d.id === action.payload.donationId ? { ...d, status: action.payload.status } : d) };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'SET_ROLE':
      return { ...state, currentRole: action.payload };
    case 'LOGIN':
      return { ...state, user: action.payload, currentRole: action.payload.role };
    case 'LOGOUT':
      return { ...state, user: null, currentRole: null };
    case 'UPDATE_PROFILE':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  // Initialize data + restore session from localStorage
  useEffect(() => {
    if (!state.initialized) {
      const donations = generateDonations(50);
      dispatch({ type: 'INIT_DATA', payload: donations });
    }

    // Restore user session from localStorage (session persistence only)
    try {
      const savedUser = localStorage.getItem('feedlink_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN', payload: user });
      }
    } catch (e) { /* ignore */ }
    setHydrated(true);
  }, [state.initialized]);

  // Persist user session to localStorage (session persistence only)
  useEffect(() => {
    if (hydrated) {
      if (state.user) {
        localStorage.setItem('feedlink_user', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('feedlink_user');
      }
    }
  }, [state.user, hydrated]);

  // Login via PostgreSQL API
  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        dispatch({ type: 'LOGIN', payload: data.user });
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || 'Invalid email or password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Signup via PostgreSQL API
  const signup = async (userData) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (data.success) {
        dispatch({ type: 'LOGIN', payload: data.user });
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || 'Registration failed' };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, login, signup, logout, hydrated }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
