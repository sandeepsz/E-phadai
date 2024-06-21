import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="p-6 space-y-4">
        <Skeleton className="h-10 w-full" />
        <div></div>
        <div className="flex gap-2">
          <Skeleton className="h-[40px] w-[150px]" />
          <Skeleton className="h-[40px] w-[150px]" />
          <Skeleton className="h-[40px] w-[150px]" />
          <Skeleton className="h-[40px] w-[150px]" />
          <Skeleton className="h-[40px] w-[150px]" />
          <Skeleton className="h-[40px] w-[150px]" />
        </div>

        <div className="grid items-center justify-center sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 mt-6 gap-6">
          <Skeleton className="h-[310px] w-[320px]" />
          <Skeleton className="h-[310px] w-[320px]" />
          <Skeleton className="h-[310px] w-[320px]" />
          <Skeleton className="h-[310px] w-[320px]" />
          <Skeleton className="h-[310px] w-[320px]" />
        </div>
      </div>
    </>
  );
};

export default Loading;
