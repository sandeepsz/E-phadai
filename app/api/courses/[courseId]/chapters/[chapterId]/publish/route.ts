import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const courseMalik = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseMalik) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      },
    });
    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (
      !chapter ||
      !muxData ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return new NextResponse("Missing necessary fields", { status: 400 });
    }

    const publishChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishChapter);
  } catch (error) {
    console.log("Error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
