import { NextRequest, NextResponse } from 'next/server';
import { razorpay, PLANS, PlanKey } from '@/lib/razorpay';
import { adminAuth } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    // Verify the user is authenticated
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userId = decodedToken.uid;

    // Get the plan from request body
    const { planKey } = await req.json();
    if (!planKey || !PLANS[planKey as PlanKey]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const plan = PLANS[planKey as PlanKey];

    // Create Razorpay subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: plan.id,
      customer_notify: 1,
      total_count: 12, // 12 billing cycles
      notes: {
        userId,
        planKey,
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      planKey,
      planName: plan.name,
      price: plan.price,
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
