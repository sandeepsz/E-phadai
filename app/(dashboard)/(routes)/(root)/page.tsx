import { getCourse } from "@/actions/get-course";
import { getDashboardCourses } from "@/actions/get-dashboard-chapter";
import CoursesList from "@/components/courses-list";
import { auth } from "@clerk/nextjs";
import { Loader, SquareCheckBig } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TotalCourseCard from "./_components/total-course-card";

const Dashboard = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, inProgressCourse } = await getDashboardCourses(
    userId
  );

  return (
    <>
      <div className="p-6 space-y-4">
        <h1 className="font-semibold text-purple-700 underline">
          Your Courses
        </h1>
        <div className="grid grid-col-1 sm:grid-cols-2  gap-4">
          <TotalCourseCard
            icon={SquareCheckBig}
            label="Completed"
            numberOfCourses={completedCourses.length}
          />

          <TotalCourseCard
            icon={Loader}
            label="Still Learning "
            numberOfCourses={inProgressCourse.length}
          />
        </div>

        <CoursesList items={[...completedCourses, ...inProgressCourse]} />
      </div>
    </>
  );
};

export default Dashboard;
