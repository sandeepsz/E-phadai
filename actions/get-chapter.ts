import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterCourseProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  chapterId,
  courseId,
}: GetChapterCourseProps) => {
  try {
    const premium = await db.premium.findUnique({
      where: {
        userId_courseId: {
          userId: userId!,
          courseId: courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!course || !chapter) {
      throw new Error("Chapter or course is not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (!premium) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }

    if (premium) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    if (chapter.isFree) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId,
        chapterId,
      },
    });

    return {
      chapter,
      course,
      muxData,
      attachments,
      userProgress,
      nextChapter,
      premium,
    };
  } catch (error) {
    console.log("ERROR:", error);
    return {
      course: null,
      chapter: null,
      attachments: null,
      muxData: null,
      nextChapter: null,
      userProgress: null,
      primium: null,
    };
  }
};
