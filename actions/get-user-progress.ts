import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string,
  chapterId: string
): Promise<number> => {
  try {
    const publishedChapter = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const idsOfpublishedChapters = publishedChapter.map(
      (chapter) => chapter.id
    );

    const CompletedChapter = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: idsOfpublishedChapters,
        },
        isComplete: true,
      },
    });
    const userProgressPercentage =
      (CompletedChapter / idsOfpublishedChapters.length) * 100;
    return userProgressPercentage;
  } catch (error) {
    console.log("Progress error:", error);
    return 0;
  }
};
