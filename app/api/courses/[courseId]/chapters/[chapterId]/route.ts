import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const {} = req.json();

    if (!userId) {
      return new NextResponse("Access denied!", { status: 401 });
    }

    const courseMalik = db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseMalik) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  } catch (error) {
    console.log("CHAPTER ID:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
