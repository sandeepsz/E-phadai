"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
const NavbarLinks = () => {
  const pathname = usePathname();

  const isInstructor = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  return (
    <div className="flex gap-x-2 ml-auto">
      <div>
        {isInstructor || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        )}
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarLinks;
