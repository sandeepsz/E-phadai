import React from "react";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseSidebarItems from "./course-sidebar-items";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import UserCourseProgress from "@/components/user-progress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  userProgressCount: number;
}

const CourseSidebar = async ({
  course,
  userProgressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.premium.findUnique({
    where: {
      id: course.id,
      userId: userId,
      courseId: course.id,
    },
  });
  return (
    <div className="h-full border-r w-80 flex flex-col over-y-auto shadow-md  ">
      <div className="p-8 flex flex-col items-center border-b">
        <h1>{course.title}</h1>
        <div className="mt-4">
          <UserCourseProgress
            varient="success"
            value={userProgressCount}
            size="default"
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItems
            id={chapter.id}
            key={chapter.id}
            label={chapter.title}
            courseId={chapter.courseId}
            isComplete={!!chapter.userProgress?.[0]?.isComplete}
            isLocked={!chapter.isFree}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
