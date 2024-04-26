import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const Courses = () => {
  return (
    <div className="p-8">
      <Link href="/teacher/courses/create">
        <Button>Create Course</Button>
      </Link>
    </div>
  );
};

export default Courses;
