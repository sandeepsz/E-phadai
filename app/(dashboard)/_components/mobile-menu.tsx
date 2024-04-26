import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import Sidebar from "./side-bar";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="top">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
