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

// Mock user database (simulated)
const MOCK_USERS = [
  { id: 'u1', email: 'donor@feedlink.in', password: 'password', name: 'Raj Sharma', role: 'donor', avatar: '🍽️', org: 'Taj Palace Kitchen', city: 'Delhi', phone: '+91 98100 11111', verified: true },
  { id: 'u2', email: 'ngo@feedlink.in', password: 'password', name: 'Priya Singh', role: 'ngo', avatar: '🏥', org: 'Akshaya Patra Foundation', city: 'Bangalore', phone: '+91 98808 22222', verified: true },
  { id: 'u3', email: 'volunteer@feedlink.in', password: 'password', name: 'Arjun Patel', role: 'volunteer', avatar: '🚴', org: 'Independent', city: 'Mumbai', phone: '+91 98200 33333', verified: true },
  { id: 'u4', email: 'admin@feedlink.in', password: 'admin123', name: 'Admin User', role: 'admin', avatar: '👨‍💼', org: 'FeedLink HQ', city: 'Delhi', phone: '+91 98100 00000', verified: true },
];

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  // Initialize data + restore session from localStorage
  useEffect(() => {
    if (!state.initialized) {
      const donations = generateDonations(50);
      dispatch({ type: 'INIT_DATA', payload: donations });
    }

    // Restore user session
    try {
      const savedUser = localStorage.getItem('feedlink_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN', payload: user });
      }
    } catch (e) { /* ignore */ }
    setHydrated(true);
  }, [state.initialized]);

  // Persist user session
  useEffect(() => {
    if (hydrated) {
      if (state.user) {
        localStorage.setItem('feedlink_user', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('feedlink_user');
      }
    }
  }, [state.user, hydrated]);

  const login = (email, password) => {
    // Check mock database
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...safeUser } = user;
      dispatch({ type: 'LOGIN', payload: safeUser });
      return { success: true, user: safeUser };
    }
    // Check localStorage registered users
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('feedlink_registered') || '[]');
      const regUser = registeredUsers.find(u => u.email === email && u.password === password);
      if (regUser) {
        const { password: _, ...safeUser } = regUser;
        dispatch({ type: 'LOGIN', payload: safeUser });
        return { success: true, user: safeUser };
      }
    } catch (e) { /* ignore */ }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (userData) => {
    // Check if email exists
    const exists = MOCK_USERS.some(u => u.email === userData.email);
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('feedlink_registered') || '[]');
      const regExists = registeredUsers.some(u => u.email === userData.email);
      if (exists || regExists) {
        return { success: false, error: 'Email already registered' };
      }
      const newUser = {
        id: `u_${Date.now()}`,
        ...userData,
        verified: false,
        avatar: { donor: '🍽️', ngo: '🏥', volunteer: '🚴', admin: '👨‍💼', beneficiary: '🤲', corporate: '🏢' }[userData.role] || '👤',
      };
      registeredUsers.push(newUser);
      localStorage.setItem('feedlink_registered', JSON.stringify(registeredUsers));
      const { password: _, ...safeUser } = newUser;
      dispatch({ type: 'LOGIN', payload: safeUser });
      return { success: true, user: safeUser };
    } catch (e) {
      return { success: false, error: 'Registration failed' };
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
