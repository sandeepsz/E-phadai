"use client";
import React from "react";
import { useAuth, UserButton } from "@clerk/nextjs";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { isTeacher } from "@/lib/teacher";

import SearchInput from "./search-input";

const NavbarLinks = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  const isInstructor = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearch = pathname?.includes("/search");
  return (
    <>
      {isSearch && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        <div>
          {isInstructor || isCoursePage ? (
            <Link href="/">
              <Button size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
          ) : isTeacher(userId!) ? (
            <Link href="/teacher/courses">
              <Button size="sm" variant="ghost">
                Teacher mode
              </Button>
            </Link>
          ) : null}
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarLinks;
