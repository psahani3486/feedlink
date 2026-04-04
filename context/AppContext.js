'use client';
import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { ANALYTICS, FOOD_CATEGORIES, GAMIFICATION_BADGES, ACTIVITY_FEED_TEMPLATES, CITIES } from '../data/mockData';

const AppContext = createContext();

const initialState = {
  donations: [],
  donors: [],
  ngos: [],
  volunteers: [],
  analytics: ANALYTICS,
  notifications: [],
  fridges: [],
  beneficiaries: [],
  sponsors: [],
  disasters: [],
  camps: [],
  currentRole: null,
  user: null,
  initialized: false,
  dataLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT_DATA':
      return { ...state, ...action.payload, initialized: true, dataLoading: false };
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

  // Fetch all data from PostgreSQL on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/data');
        const json = await res.json();
        if (json.success) {
          dispatch({
            type: 'INIT_DATA',
            payload: {
              donations: json.data.donations,
              donors: json.data.donors,
              ngos: json.data.ngos,
              volunteers: json.data.volunteers,
              notifications: json.data.notifications,
              fridges: json.data.fridges,
              beneficiaries: json.data.beneficiaries,
              sponsors: json.data.sponsors,
              disasters: json.data.disasters,
              camps: json.data.camps,
            },
          });
        } else {
          // Fallback: mark as initialized even if API fails
          dispatch({ type: 'INIT_DATA', payload: { donations: [] } });
        }
      } catch (e) {
        console.error('Failed to load data from API:', e);
        dispatch({ type: 'INIT_DATA', payload: { donations: [] } });
      }
    }
    if (!state.initialized) {
      loadData();
    }

    // Restore user session from localStorage
    try {
      const savedUser = localStorage.getItem('feedlink_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN', payload: user });
      }
    } catch (e) { /* ignore */ }
    setHydrated(true);
  }, [state.initialized]);

  // Persist user session to localStorage
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
