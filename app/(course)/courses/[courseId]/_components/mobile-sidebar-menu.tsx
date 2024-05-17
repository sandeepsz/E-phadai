import React from "react";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import CourseSidebar from "./course-sidebar";

interface MobileSideBarMenuProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  userProgressCount: number;
}

const MobileSideBarMenu = ({
  course,
  userProgressCount,
}: MobileSideBarMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-white p-0 w-72">
        <CourseSidebar course={course} userProgressCount={userProgressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBarMenu;
