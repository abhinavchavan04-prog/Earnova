import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

/**
 * Set Firebase custom claims (roles) for a user.
 * Admin-only endpoint — verifies the caller is an admin before setting claims.
 */
export async function POST(req: NextRequest) {
  try {
    // Verify the caller is authenticated and is an admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const callerToken = await adminAuth.verifyIdToken(idToken);

    // Check if the caller has admin role
    if (callerToken.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 });
    }

    const { targetUid, role } = await req.json();

    if (!targetUid || !role) {
      return NextResponse.json({ error: 'Missing targetUid or role' }, { status: 400 });
    }

    const validRoles = ['subscriber', 'admin', 'ops'];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Set custom claims on the target user
    await adminAuth.setCustomUserClaims(targetUid, { role });

    return NextResponse.json({
      success: true,
      message: `Role '${role}' set for user ${targetUid}`,
    });
  } catch (error) {
    console.error('Set claims error:', error);
    return NextResponse.json(
      { error: 'Failed to set claims' },
      { status: 500 }
    );
  }
}
