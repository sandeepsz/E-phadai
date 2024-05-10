"use client";
import React from "react";

import qs from "query-string";
import { IconType } from "react-icons";

import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { title } from "process";
interface CategoryItemProps {
  label: string;
  value?: string;
  icon: IconType;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-1 px-3 py-2 rounded-full text-sm text-[#5417d7] border border-[#5417d7] hover:bg-purple-700/20 transition-all",
        isSelected && "bg-purple-700/20"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />}
      {label}
    </button>
  );
};

export default CategoryItem;
