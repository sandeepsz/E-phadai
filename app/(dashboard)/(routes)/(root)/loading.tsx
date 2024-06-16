import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div>
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </>
  );
};

export default Loading;
