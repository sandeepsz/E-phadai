import React from "react";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";

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
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent></SheetContent>
    </Sheet>
  );
};

export default MobileSideBarMenu;
