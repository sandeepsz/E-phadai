import { Course, Category } from "@prisma/client";

import React from "react";

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
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.title}</div>
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
