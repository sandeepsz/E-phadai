import { db } from "@/lib/db";
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

    if (!course) {
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

    await db.premium.create({
      data: {
        courseId: course.id,
        userId: user.id,
      },
    });

    return new NextResponse("Premium Created", { status: 200 });
  } catch (error) {
    console.log("Course_Checkout Error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
