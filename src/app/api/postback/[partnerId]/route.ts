import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebase-admin';

/**
 * Ad-network postback receiver.
 * Each partner has a unique postback URL: /api/postback/[partnerId]
 * The partner sends a GET/POST request when a user completes an offer.
 * 
 * Expected query params (varies by partner):
 *   ?user_id=xxx&offer_id=yyy&payout=zzz&sig=aaa
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ partnerId: string }> }
) {
  try {
    const { partnerId } = await params;
    const searchParams = req.nextUrl.searchParams;

    const userId = searchParams.get('user_id');
    const offerId = searchParams.get('offer_id');
    const payoutStr = searchParams.get('payout');
    const signature = searchParams.get('sig');

    if (!userId || !offerId || !payoutStr) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Fetch partner config to verify signature
    const partnerDoc = await adminDb.collection('adNetworkPartners').doc(partnerId).get();
    if (!partnerDoc.exists) {
      return NextResponse.json({ error: 'Unknown partner' }, { status: 404 });
    }

    const partner = partnerDoc.data();
    
    // Verify postback signature (partner-specific logic)
    if (partner?.postbackSecret && signature) {
      const expectedSig = crypto
        .createHmac('sha256', partner.postbackSecret)
        .update(`${userId}${offerId}${payoutStr}`)
        .digest('hex');

      if (signature !== expectedSig) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payoutAmount = parseInt(payoutStr, 10); // in paise

    // Check for duplicate completions
    const existingCompletion = await adminDb
      .collection('taskCompletions')
      .where('userId', '==', userId)
      .where('offerId', '==', offerId)
      .where('status', '==', 'verified')
      .limit(1)
      .get();

    if (!existingCompletion.empty) {
      return NextResponse.json({ status: 'duplicate', message: 'Already credited' });
    }

    // Create task completion record
    await adminDb.collection('taskCompletions').add({
      userId,
      offerId,
      categoryId: '',
      status: 'verified',
      completedAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString(),
    });

    // Credit user wallet
    const userRef = adminDb.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      await userRef.update({
        'wallet.balance': (userData?.wallet?.balance || 0) + payoutAmount,
        'wallet.totalEarned': (userData?.wallet?.totalEarned || 0) + payoutAmount,
        updatedAt: new Date().toISOString(),
      });
    }

    // Create transaction record
    await adminDb.collection('transactions').add({
      userId,
      type: 'credit',
      amount: payoutAmount,
      source: 'bucket1',
      referenceId: offerId,
      referenceType: 'task_completion',
      description: `Postback from ${partner?.name || partnerId}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
    });

    // Update partner stats
    await partnerDoc.ref.update({
      totalPayouts: (partner?.totalPayouts || 0) + payoutAmount,
      lastPostbackAt: new Date().toISOString(),
    });

    return NextResponse.json({ status: 'ok', credited: payoutAmount });
  } catch (error) {
    console.error('Postback processing error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}

// Some partners use POST
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ partnerId: string }> }
) {
  return GET(req, context);
}
