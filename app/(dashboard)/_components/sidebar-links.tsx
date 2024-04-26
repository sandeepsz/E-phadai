"use client";
import { Globe, Layout, Book, List, BarChart } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import SidebarItem from "./sidebar-item";

const studentLinks = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Globe,
    label: "Search",
    href: "/search",
  },
];

const teacherLinks = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const SidebarLinks = () => {
  const pathname = usePathname();
  const isTeacher = pathname.includes("/teacher");

  const links = isTeacher ? teacherLinks : studentLinks;

  return (
    <div className="flex flex-col w-full gap-2">
      {links.map((link) => (
        <SidebarItem
          key={link.href}
          icon={link.icon}
          label={link.label}
          href={link.href}
        />
      ))}
    </div>
  );
};

export default SidebarLinks;
