import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Category, Course } from "@prisma/client";
import { NextResponse } from "next/server";
import { getProgress } from "./get-user-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type CoursesProps = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourse = async ({
  userId,
  categoryId,
  title,
}: CoursesProps): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },

        categoryId,
      },

      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },

        premiums: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.premiums.length === 0) {
            return {
              ...course,
              progress: 0,
            };
          }

          const progressPercentage = await getProgress(userId, course.id);
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("Eror from get course", error);
    return [];
  }
};
