import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("Access to denied", { status: 401 });
    }

    const courseMalik = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseMalik) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        courseId: courseId,
        name: url.split("/").pop(),
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("Attachment-->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
