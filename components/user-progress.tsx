import React from "react";
import { Progress } from "./ui/progress";
import { BreakdownValuesBasePage } from "@mux/mux-node/resources/data/metrics.mjs";

interface UserCourseProgressProps {
  varient?: "default" | "success";
  value: number;
  size: "default" | "sm";
}

const colorByVariant = {
  default: "text-purple-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  success: "text-xs",
};
const UserCourseProgress = ({
  value,
  varient,
  size,
}: UserCourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2 w-60 bg-slate-300" value={value} />
    </div>
  );
};

export default UserCourseProgress;
