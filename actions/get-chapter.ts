import { db } from "@/lib/db";

interface GetChapterCourseProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getCourse = async ({
  userId,
  chapterId,
  courseId,
}: GetChapterCourseProps) => {
  try {
    const primiumCourse = await db.premium.findUnique({
      where: {
        id: chapterId,
        userId: userId,
        courseId: courseId,
      },
    });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });
  } catch (error) {
    console.log("ERROR:", error);
    return {
      course: null,
      chapter: null,
      attachments: null,
      muxData: null,
      nextChapter: null,
      userProgress: null,
      primiim: null,
    };
  }
};
