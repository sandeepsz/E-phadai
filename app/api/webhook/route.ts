import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log("Webhook signature error", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const courseId = session.metadata?.courseId;

    if (!userId || !courseId) {
      return new NextResponse("Webhook Error: Missing metadata", {
        status: 400,
      });
    }

    // upsert so a retried webhook doesn't fail on the unique constraint
    await db.premium.upsert({
      where: {
        userId_courseId: { userId, courseId },
      },
      update: {},
      create: { userId, courseId },
    });
  }

  return new NextResponse(null, { status: 200 });
}

export const runtime = "nodejs";
