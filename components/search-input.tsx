"use client";
import { Search } from "lucide-react";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useDebounce from "@/hooks/use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SearchInput = () => {
  const [value, setValue] = useState("");

  const deboucedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const handler = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: deboucedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(handler);
  }, [deboucedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        className="w-full pl-2 md:w-[400px] bg-slate-200 rounded-sm focus-visible:ring-1 text-md"
        placeholder="search for a course"
      />

      <Button className="absolute rounded-l-none bg-[#5325b5] top-0 right-0">
        <Search className=" w-4 h-4 text-white" />
      </Button>
    </div>
  );
};

export default SearchInput;
