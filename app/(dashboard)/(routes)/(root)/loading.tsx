import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="p-6 space-y-4">
        <div className="grid grid-col-1 sm:grid-cols-2 mt-2 gap-4">
          <Skeleton className="h-[70px] w-[490px]" />
          <Skeleton className="h-[70px] w-[490px]" />
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
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
