import CourseId from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/page";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const user = currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    const premium = (await db.premium.findUnique({
      where: {
        id: params.courseId,
        userId: userId!,
        courseId: params.courseId,
      },
    })) as any;

    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (premium) {
      return new NextResponse("Already Purchased", { status: 400 });
    }

    const createPayment = await db.premium.create({
      data: {
        userId: userId!,
        courseId: params.courseId,
      },
    });

    return NextResponse.json(createPayment);
  } catch (error) {
    console.log("Course_Checkout Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
