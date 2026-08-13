'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase-client';
import { UserProfile } from '@/types';
import { ROLES, KYC_STATUS, SUB_STATUS, TIERS } from '@/lib/constants';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  demoSignIn: (role?: 'subscriber' | 'admin') => void;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_SUBSCRIBER_PROFILE: UserProfile = {
  uid: 'demo_user_subscriber',
  email: 'subscriber@earnova.demo',
  displayName: 'Priya Sharma (Demo User)',
  role: ROLES.SUBSCRIBER,
  subscription: {
    status: SUB_STATUS.ACTIVE,
    tier: TIERS.ADVANCED,
    planId: 'plan_advanced_demo',
    razorpaySubId: 'sub_demo_123',
    startDate: new Date().toISOString(),
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  wallet: {
    balance: 1750000, // ₹17,500
    totalEarned: 2750000, // ₹27,500
  },
  profile: {
    skills: ['Graphic Design', 'Figma', 'UI/UX'],
    categories: ['graphic_design', 'web_dev'],
    kycStatus: KYC_STATUS.VERIFIED,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const DEMO_ADMIN_PROFILE: UserProfile = {
  uid: 'demo_user_admin',
  email: 'admin@earnova.demo',
  displayName: 'Abhinav (Super Admin)',
  role: ROLES.ADMIN,
  subscription: {
    status: SUB_STATUS.ACTIVE,
    tier: TIERS.ULTRA,
    planId: 'plan_ultra_admin',
    razorpaySubId: 'sub_admin_demo',
    startDate: new Date().toISOString(),
    renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  wallet: {
    balance: 5000000,
    totalEarned: 10000000,
  },
  profile: {
    skills: ['Platform Management', 'Operations'],
    categories: ['graphic_design', 'web_dev', 'copywriting'],
    kycStatus: KYC_STATUS.VERIFIED,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (firebaseUser: User) => {
    try {
      const docRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      } else {
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          role: ROLES.SUBSCRIBER,
          subscription: {
            status: SUB_STATUS.PENDING,
            tier: null,
            planId: null,
            razorpaySubId: null,
            startDate: null,
            renewalDate: null,
          },
          wallet: {
            balance: 0,
            totalEarned: 0,
          },
          profile: {
            skills: [],
            categories: [],
            kycStatus: KYC_STATUS.NOT_SUBMITTED,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await setDoc(docRef, {
          ...newProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        setProfile(newProfile);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  }, []);

  useEffect(() => {
    // Check if demo user is stored in localStorage
    const savedDemoRole = typeof window !== 'undefined' ? localStorage.getItem('earnova_demo_role') : null;
    if (savedDemoRole === 'admin') {
      setUser({ uid: DEMO_ADMIN_PROFILE.uid, email: DEMO_ADMIN_PROFILE.email, displayName: DEMO_ADMIN_PROFILE.displayName } as User);
      setProfile(DEMO_ADMIN_PROFILE);
      setLoading(false);
      return;
    } else if (savedDemoRole === 'subscriber') {
      setUser({ uid: DEMO_SUBSCRIBER_PROFILE.uid, email: DEMO_SUBSCRIBER_PROFILE.email, displayName: DEMO_SUBSCRIBER_PROFILE.displayName } as User);
      setProfile(DEMO_SUBSCRIBER_PROFILE);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchProfile(firebaseUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [fetchProfile]);

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign in failed';
      setError(mapFirebaseError(message));
      throw err;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setError(null);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setError(mapFirebaseError(message));
      throw err;
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign in failed';
      setError(mapFirebaseError(message));
      throw err;
    }
  };

  const demoSignIn = (role: 'subscriber' | 'admin' = 'subscriber') => {
    setError(null);
    const demoProfile = role === 'admin' ? DEMO_ADMIN_PROFILE : DEMO_SUBSCRIBER_PROFILE;
    if (typeof window !== 'undefined') {
      localStorage.setItem('earnova_demo_role', role);
    }
    setUser({ uid: demoProfile.uid, email: demoProfile.email, displayName: demoProfile.displayName } as User);
    setProfile(demoProfile);
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('earnova_demo_role');
    }
    try {
      await signOut(auth);
    } catch {
      // Ignore if not signed in with Firebase
    }
    setUser(null);
    setProfile(null);
  };

  const clearError = () => setError(null);

  const refreshProfile = async () => {
    if (user && !user.uid.startsWith('demo_user_')) {
      await fetchProfile(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        signIn,
        signUp,
        signInWithGoogle,
        demoSignIn,
        logout,
        clearError,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

function mapFirebaseError(message: string): string {
  if (message.includes('auth/email-already-in-use')) {
    return 'An account with this email already exists.';
  }
  if (message.includes('auth/invalid-email')) {
    return 'Please enter a valid email address.';
  }
  if (message.includes('auth/weak-password')) {
    return 'Password must be at least 6 characters.';
  }
  if (message.includes('auth/user-not-found') || message.includes('auth/wrong-password') || message.includes('auth/invalid-credential')) {
    return 'Invalid email or password.';
  }
  if (message.includes('auth/too-many-requests')) {
    return 'Too many attempts. Please try again later.';
  }
  if (message.includes('auth/popup-closed-by-user')) {
    return 'Sign in cancelled.';
  }
  return 'Something went wrong. Please try again.';
}
