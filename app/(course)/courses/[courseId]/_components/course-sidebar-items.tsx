"use client";
import { cn } from "@/lib/utils";
import { Unlock, Lock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import React from "react";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  courseId: string;
  isComplete: Boolean;
  isLocked: Boolean;
}

const CourseSidebarItems = ({
  courseId,
  id,
  isComplete,
  isLocked,
  label,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  const Icon = isLocked ? Lock : Unlock;
  return (
    <button
      className={cn(
        "flex items-center gap-x-2 pl-4 text-sm text-purple-700/80 hover:text-purple-950 transition-all ",
        isActive && "bg-[#fbf7ff] text-[#5316d6] hover:text-purple-950",
        isComplete && isActive && "bg-[#bedcbe] text-green-950"
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-slate-600 h-full transition-all",
          isActive && "opacity-100",
          isComplete && "border-emerald-800"
        )}
      />
    </button>
  );
};

export default CourseSidebarItems;
