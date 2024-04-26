"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ href, icon: Icon, label }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname === href;
  pathname.startsWith(`${href}`);

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-700 hover:bg-slate-300/25 ",
        isActive &&
          "text-[#5417d7] bg-purple-200/20 hover:bg-purple-200/20 hover:text-[#5417d7]"
      )}
    >
      <div
        className={cn(
          "opacity-0 border-2 border-[#5417d7] h-[10px] w-[10px] rounded-full transition-all",
          isActive && "opacity-100"
        )}
      />
      <div className="flex items-center gap-x-2 py-2">
        <Icon
          className={cn(
            "text-slate-500",
            isActive && "text-[#5417d7] transition-all"
          )}
        />
        {label}
      </div>
    </button>
  );
};

export default SidebarItem;
