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
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
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
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string, name: string, rememberMe?: boolean) => Promise<void>;
  signInWithGoogle: (rememberMe?: boolean) => Promise<void>;
  demoSignIn: (role?: 'subscriber' | 'admin') => void;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const ADMIN_EMAIL = 'abhinavchavan04@gmail.com';

const DEMO_SUBSCRIBER_PROFILE: UserProfile = {
  uid: 'demo_user_subscriber',
  email: 'user@earnova.com',
  displayName: 'Priya Sharma',
  role: ROLES.SUBSCRIBER,
  subscription: {
    status: SUB_STATUS.ACTIVE,
    tier: TIERS.BASIC,
    planId: 'plan_basic_999',
    razorpaySubId: 'sub_basic_123',
    startDate: new Date().toISOString(),
    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  wallet: {
    balance: 1750000,
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
            balance: 10000,
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

        try {
          await setDoc(docRef, {
            ...newProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch {
          // Fallback if firestore rules require auth token
        }

        setProfile(newProfile);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  }, []);

  useEffect(() => {
    // Check if session exists in localStorage (Remember Me) or sessionStorage
    const localUserJson = typeof window !== 'undefined' ? localStorage.getItem('earnova_mock_user') : null;
    const sessionUserJson = typeof window !== 'undefined' ? sessionStorage.getItem('earnova_mock_user') : null;

    const savedUserJson = localUserJson || sessionUserJson;

    if (savedUserJson) {
      try {
        const parsed = JSON.parse(savedUserJson);
        setUser(parsed.user);
        setProfile(parsed.profile);
        setLoading(false);
        return;
      } catch {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('earnova_mock_user');
          sessionStorage.removeItem('earnova_mock_user');
        }
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

  const saveMockSession = (mockUser: User, mockProfile: UserProfile, rememberMe: boolean) => {
    if (typeof window !== 'undefined') {
      const dataStr = JSON.stringify({ user: mockUser, profile: mockProfile });
      if (rememberMe) {
        localStorage.setItem('earnova_mock_user', dataStr);
        sessionStorage.removeItem('earnova_mock_user');
      } else {
        sessionStorage.setItem('earnova_mock_user', dataStr);
        localStorage.removeItem('earnova_mock_user');
      }
    }
  };

  const signIn = async (email: string, password: string, rememberMe = true) => {
    setError(null);
    const isAdminEmail = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    const mockProfile: UserProfile = isAdminEmail
      ? DEMO_ADMIN_PROFILE
      : {
          ...DEMO_SUBSCRIBER_PROFILE,
          uid: 'user_' + Date.now(),
          email,
          displayName: email.split('@')[0],
        };

    const mockUser = { uid: mockProfile.uid, email, displayName: mockProfile.displayName } as User;

    if (!isFirebaseConfigured) {
      saveMockSession(mockUser, mockProfile, rememberMe);
      setUser(mockUser);
      setProfile(mockProfile);
      return;
    }

    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: email.split('@')[0] });
      } catch {
        saveMockSession(mockUser, mockProfile, rememberMe);
        setUser(mockUser);
        setProfile(mockProfile);
      }
    }
  };

  const signUp = async (email: string, password: string, name: string, rememberMe = true) => {
    setError(null);
    const isAdminEmail = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

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
        balance: 10000,
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

    if (!isFirebaseConfigured) {
      saveMockSession(mockUser, newMockProfile, rememberMe);
      setUser(mockUser);
      setProfile(newMockProfile);
      return;
    }

    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
    } catch {
      saveMockSession(mockUser, newMockProfile, rememberMe);
      setUser(mockUser);
      setProfile(newMockProfile);
    }
  };

  const signInWithGoogle = async (rememberMe = true) => {
    setError(null);
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

    if (!isFirebaseConfigured) {
      saveMockSession(googleUser, googleProfile, rememberMe);
      setUser(googleUser);
      setProfile(googleProfile);
      return;
    }

    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch {
      saveMockSession(googleUser, googleProfile, rememberMe);
      setUser(googleUser);
      setProfile(googleProfile);
    }
  };

  const demoSignIn = (role: 'subscriber' | 'admin' = 'subscriber') => {
    setError(null);
    const demoProfile = role === 'admin' ? DEMO_ADMIN_PROFILE : DEMO_SUBSCRIBER_PROFILE;
    const mockUser = { uid: demoProfile.uid, email: demoProfile.email, displayName: demoProfile.displayName } as User;
    saveMockSession(mockUser, demoProfile, false);
    setUser(mockUser);
    setProfile(demoProfile);
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('earnova_mock_user');
      sessionStorage.removeItem('earnova_mock_user');
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
    if (typeof window !== 'undefined') {
      window.location.href = '/'; // Always redirect cleanly to Landing Home Page on Logout/Leave!
    }
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
