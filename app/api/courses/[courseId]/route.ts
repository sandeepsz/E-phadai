import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const mux = new Mux({
  // tokenId: process.env.MUX_TOKEN_ID,
  // tokenSecret: process.env.MUX_TOKEN_SECRET,
  tokenId: "945ea2dd-5b55-4e05-9374-84416bb3f3ee",
  tokenSecret:
    "1jacunZ2JoDEOh5muBMfqOz03E5zzoP5ypC3yW9tvm7poh9A16M+VAcCSS+Uq/W9eUzPX7w65hM",
});

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    const { courseId } = params;

    const values = await req.json();

    if (!userId) {
      return new NextResponse("Access to denied", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("Course ID-->", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        //@ts-ignore
        userId: userId,
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
      return new NextResponse("Not Found", { status: 404 });
    }

    // for (const x of course.chapters) {
    //   if (x.muxData?.assetId) {
    //     await mux.video.assets.delete(x.muxData.assetId);
    //   }
    // }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("Error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
