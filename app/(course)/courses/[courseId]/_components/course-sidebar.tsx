import React from "react";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseSidebarItems from "./course-sidebar-items";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  userProgressCount: number;
}

const CourseSidebar = ({ course, userProgressCount }: CourseSidebarProps) => {
  return (
    <div className="h-full border-r w-80 flex flex-col over-y-auto shadow-md  ">
      <div className="p-8 flex flex-col items-center border-b">
        <h1>{course.title}</h1>
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
