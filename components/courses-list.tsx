import { Course, Category } from "@prisma/client";

import React from "react";
import CourseCard from "./course-card";

type CoursesWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  items: CoursesWithProgressWithCategory[];
}

const CoursesList = ({ items }: CourseListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <CourseCard
            id={item.id}
            key={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            price={item.price!}
            chapterLength={item.chapters.length}
            userProgress={item.progress}
            category={item?.category?.name!}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center font-mono text-xl text-muted-foreground mt-20">
          No Course Found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
