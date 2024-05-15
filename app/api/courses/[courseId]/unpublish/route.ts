import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { courseId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const hasPublishedChapter = course?.chapters.some((chapter) => {
      chapter.isPublished;
    });

    console.log("🌟🌟🌟🌟", hasPublishedChapter);

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId
    ) {
      return new NextResponse("missing all fields", { status: 404 });
    }

    const publised = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publised);
  } catch (error) {
    console.log("Error PUBLISH:", error);
    return new NextResponse("Internal server error");
  }
}
