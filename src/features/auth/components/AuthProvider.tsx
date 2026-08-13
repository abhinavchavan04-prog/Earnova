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

// Default Admin Email specified by platform owner
export const ADMIN_EMAIL = 'abhinavchavan04@gmail.com';

const DEMO_SUBSCRIBER_PROFILE: UserProfile = {
  uid: 'demo_user_subscriber',
  email: 'user@earnova.com',
  displayName: 'Priya Sharma',
  role: ROLES.SUBSCRIBER,
  subscription: {
    status: SUB_STATUS.ACTIVE,
    tier: TIERS.BASIC, // Basic ₹999 plan — can do tasks, but withdrawal gated by Ultra (₹5,000)
    planId: 'plan_basic_999',
    razorpaySubId: 'sub_basic_123',
    startDate: new Date().toISOString(),
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  wallet: {
    balance: 1750000, // ₹17,500 = 1,750 NP calculated earnings
    totalEarned: 2750000,
  },
  profile: {
    skills: ['Graphic Design', 'Data Entry', 'Copywriting'],
    categories: ['graphic_design', 'virtual_assistant'],
    kycStatus: KYC_STATUS.VERIFIED,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const DEMO_ADMIN_PROFILE: UserProfile = {
  uid: 'admin_user_abhinav',
  email: ADMIN_EMAIL,
  displayName: 'Abhinav Chavan (Super Admin)',
  role: ROLES.ADMIN,
  subscription: {
    status: SUB_STATUS.ACTIVE,
    tier: TIERS.ULTRA,
    planId: 'plan_ultra_5000',
    razorpaySubId: 'sub_admin_ultra',
    startDate: new Date().toISOString(),
    renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  wallet: {
    balance: 5000000,
    totalEarned: 10000000,
  },
  profile: {
    skills: ['Platform Management', 'Operations', 'Super Admin'],
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

  const isFirebaseConfigured =
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== 'your_firebase_api_key';

  const fetchProfile = useCallback(async (firebaseUser: User) => {
    try {
      const docRef = doc(db, 'users', firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      const isAdminUser = firebaseUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        // Ensure admin user always gets ADMIN role
        if (isAdminUser && data.role !== ROLES.ADMIN) {
          data.role = ROLES.ADMIN;
        }
        setProfile(data);
      } else {
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Subscriber',
          role: isAdminUser ? ROLES.ADMIN : ROLES.SUBSCRIBER,
          subscription: {
            status: SUB_STATUS.ACTIVE,
            tier: isAdminUser ? TIERS.ULTRA : TIERS.BASIC,
            planId: isAdminUser ? 'plan_ultra' : 'plan_basic',
            razorpaySubId: null,
            startDate: new Date().toISOString(),
            renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          wallet: {
            balance: 10000, // ₹100 welcome bonus = 10 NP
            totalEarned: 10000,
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
    // Check if user session is stored in localStorage
    const savedUserJson = typeof window !== 'undefined' ? localStorage.getItem('earnova_mock_user') : null;

    if (savedUserJson) {
      try {
        const parsed = JSON.parse(savedUserJson);
        setUser(parsed.user);
        setProfile(parsed.profile);
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem('earnova_mock_user');
      }
    }

    if (!isFirebaseConfigured) {
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
  }, [fetchProfile, isFirebaseConfigured]);

  const signIn = async (email: string, password: string) => {
    setError(null);
    const isAdminEmail = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    if (!isFirebaseConfigured) {
      const mockProfile: UserProfile = isAdminEmail
        ? DEMO_ADMIN_PROFILE
        : {
            ...DEMO_SUBSCRIBER_PROFILE,
            uid: 'user_' + Date.now(),
            email,
            displayName: email.split('@')[0],
          };

      const mockUser = { uid: mockProfile.uid, email, displayName: mockProfile.displayName } as User;
      if (typeof window !== 'undefined') {
        localStorage.setItem('earnova_mock_user', JSON.stringify({ user: mockUser, profile: mockProfile }));
      }
      setUser(mockUser);
      setProfile(mockProfile);
      return;
    }

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
    const isAdminEmail = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    if (!isFirebaseConfigured) {
      const newMockProfile: UserProfile = {
        uid: 'user_' + Date.now(),
        email,
        displayName: name,
        role: isAdminEmail ? ROLES.ADMIN : ROLES.SUBSCRIBER,
        subscription: {
          status: SUB_STATUS.ACTIVE,
          tier: isAdminEmail ? TIERS.ULTRA : TIERS.BASIC,
          planId: isAdminEmail ? 'plan_ultra' : 'plan_basic',
          razorpaySubId: null,
          startDate: new Date().toISOString(),
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        wallet: {
          balance: 10000, // ₹100 bonus = 10 NP
          totalEarned: 10000,
        },
        profile: {
          skills: [],
          categories: [],
          kycStatus: KYC_STATUS.NOT_SUBMITTED,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const mockUser = { uid: newMockProfile.uid, email, displayName: name } as User;
      if (typeof window !== 'undefined') {
        localStorage.setItem('earnova_mock_user', JSON.stringify({ user: mockUser, profile: newMockProfile }));
      }
      setUser(mockUser);
      setProfile(newMockProfile);
      return;
    }

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
    if (!isFirebaseConfigured) {
      const googleUser = {
        uid: 'google_user_' + Date.now(),
        email: 'user@example.com',
        displayName: 'Subscriber User',
      } as User;
      const googleProfile: UserProfile = {
        ...DEMO_SUBSCRIBER_PROFILE,
        uid: googleUser.uid,
        email: googleUser.email || '',
        displayName: googleUser.displayName || 'Subscriber User',
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('earnova_mock_user', JSON.stringify({ user: googleUser, profile: googleProfile }));
      }
      setUser(googleUser);
      setProfile(googleProfile);
      return;
    }

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
      localStorage.setItem('earnova_mock_user', JSON.stringify({
        user: { uid: demoProfile.uid, email: demoProfile.email, displayName: demoProfile.displayName },
        profile: demoProfile
      }));
    }
    setUser({ uid: demoProfile.uid, email: demoProfile.email, displayName: demoProfile.displayName } as User);
    setProfile(demoProfile);
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('earnova_mock_user');
    }
    if (isFirebaseConfigured) {
      try {
        await signOut(auth);
      } catch {
        // Ignore
      }
    }
    setUser(null);
    setProfile(null);
  };

  const clearError = () => setError(null);

  const refreshProfile = async () => {
    if (user && isFirebaseConfigured && !user.uid.startsWith('demo_user_')) {
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
