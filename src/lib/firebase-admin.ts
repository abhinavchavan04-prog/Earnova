import 'server-only';

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || 'earnova-placeholder';
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  // Attempt to initialize with service account credentials if real credentials exist
  if (
    clientEmail &&
    privateKey &&
    privateKey.includes('-----BEGIN PRIVATE KEY-----') &&
    !privateKey.includes('YOUR_PRIVATE_KEY_HERE')
  ) {
    try {
      return initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } catch (e) {
      console.warn('Failed to initialize Firebase Admin with cert, falling back to default:', e);
    }
  }

  // Fallback for build time or local dev without full admin service account credentials
  return initializeApp({ projectId });
}

const adminApp = getAdminApp();

export const adminAuth: Auth = getAuth(adminApp);
export const adminDb: Firestore = getFirestore(adminApp);
export const adminStorage: Storage = getStorage(adminApp);
export default adminApp;
