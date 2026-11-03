import Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string };
  }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findFirst({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    if (!course || !course.price) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const premium = await db.premium.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (premium) {
      return new NextResponse("Already Purchased", { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title,
            description: course.description ?? undefined,
          },
          // Stripe expects the amount in cents
          unit_amount: Math.round(course.price * 100),
        },
      },
    ];

    const origin = new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: user.emailAddresses?.[0]?.emailAddress,
      success_url: `${origin}/successful?courseId=${course.id}`,
      cancel_url: `${origin}/courses/${course.id}?canceled=1`,
      // Read back in the webhook to know who bought what
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("Course_Checkout Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
