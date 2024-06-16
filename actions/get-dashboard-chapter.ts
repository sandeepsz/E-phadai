import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { NextResponse } from "next/server";
import { getProgress } from "./get-user-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  inProgressCourse: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchaseCourse = await db.premium.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purchaseCourse.map(
      (purchase) => purchase.course
    ) as CourseWithProgressWithCategory[];

    for (const course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );

    const inProgressCourse = courses.filter((course) => course.progress! < 100);

    return {
      completedCourses,
      inProgressCourse,
    };
  } catch (error) {
    console.log("DASHBOARD COURSE ERROR:", error);
    return {
      completedCourses: [],
      inProgressCourse: [],
    };
  }
};
