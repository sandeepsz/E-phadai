import React from "react";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { getProgress } from "@/actions/get-user-progress";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId: userId!,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    redirect("/");
  }

  const userProgressCount = await getProgress(userId, params.courseId);

  return (
    <div className="h-full">
      <div className="h-[80px] w-full inset-y-0 md:pl-80 z-50 ">
        <CourseNavbar course={course} userProgressCount={userProgressCount} />
      </div>
      <div className="hidden md:flex h-full flex-col fixed inset-y-0 z-100">
        <CourseSidebar course={course} userProgressCount={userProgressCount} />
      </div>
      <main className="md:pl-80 top-[80px] h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
