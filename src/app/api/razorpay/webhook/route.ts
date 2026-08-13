import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { RAZORPAY_WEBHOOK_SECRET } from '@/lib/razorpay';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);
    const eventType = event.event;
    const payload = event.payload;

    switch (eventType) {
      case 'subscription.activated':
      case 'subscription.charged': {
        const subscription = payload.subscription?.entity;
        const userId = subscription?.notes?.userId;
        const planKey = subscription?.notes?.planKey;

        if (userId) {
          await adminDb.collection('users').doc(userId).update({
            'subscription.status': 'active',
            'subscription.tier': planKey || 'basic',
            'subscription.razorpaySubId': subscription.id,
            'subscription.startDate': new Date().toISOString(),
            'subscription.renewalDate': new Date(subscription.current_end * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
          });

          // Log subscription event
          await adminDb.collection('subscriptionEvents').add({
            userId,
            event: eventType,
            razorpayPaymentId: payload.payment?.entity?.id,
            amount: payload.payment?.entity?.amount || 0,
            timestamp: new Date().toISOString(),
          });
        }
        break;
      }

      case 'subscription.cancelled':
      case 'subscription.halted': {
        const subscription = payload.subscription?.entity;
        const userId = subscription?.notes?.userId;

        if (userId) {
          await adminDb.collection('users').doc(userId).update({
            'subscription.status': eventType === 'subscription.cancelled' ? 'cancelled' : 'halted',
            updatedAt: new Date().toISOString(),
          });

          await adminDb.collection('subscriptionEvents').add({
            userId,
            event: eventType,
            amount: 0,
            timestamp: new Date().toISOString(),
          });
        }
        break;
      }

      default:
        console.log('Unhandled webhook event:', eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
