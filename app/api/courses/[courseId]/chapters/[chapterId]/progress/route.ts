import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const isComplete = await req.json();

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId: userId!,
          chapterId: params.chapterId,
        },
      },
      update: {
        isComplete,
      },
      create: {
        userId: userId!,
        chapterId: params.chapterId,
        isComplete,
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("PROGRESS ERROR;", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
