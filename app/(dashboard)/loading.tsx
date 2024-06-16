import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-[40px] w-[150px]" />
          <Skeleton className="h-[40px] w-[150px]" />
          <Skeleton className="h-[40px] w-[150px]" />
          <Skeleton className="h-[40px] w-[150px]" />
          <Skeleton className="h-[40px] w-[150px]" />
          <Skeleton className="h-[40px] w-[150px]" />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 mt-6 gap-6">
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
