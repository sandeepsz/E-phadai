import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    console.log("Title", title);

    if (!userId) {
      return new NextResponse("Not allowed ! please login first", {
        status: 401,
      });
    }

    const courseMalik = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseMalik) {
      return new NextResponse("Unauthorized user", { status: 401 });
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;
    const createChapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      },
    });

    return NextResponse.json(createChapter);
  } catch (error) {
    console.log("CHAPTER:", error);
    return new NextResponse("Internal Erro", { status: 500 });
  } finally {
  }
}
