import NavbarLinks from "@/components/navbar-routes";
import { Course, Chapter, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";
import React from "react";
import MobileSideBarMenu from "./mobile-sidebar-menu";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  userProgressCount: number;
}

const CourseNavbar = ({ course, userProgressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b shadow-sm h-full bg-white flex items-center">
      <MobileSideBarMenu
        course={course}
        userProgressCount={userProgressCount}
      />
      <NavbarLinks />
    </div>
  );
};

export default CourseNavbar;
