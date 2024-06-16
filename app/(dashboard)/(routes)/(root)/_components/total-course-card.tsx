import { LucideIcon } from "lucide-react";
import React from "react";

interface TotalCourseCardProps {
  numberOfCourses: number;
  label: string;
  icon: LucideIcon;
}

const TotalCourseCard = ({
  icon: Icon,
  numberOfCourses,
  label,
}: TotalCourseCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-3 p-3">
      <div className=" bg-[#c9b3f3] rounded-full text-[#5417d7] p-3">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-purple-950 text-sm">
          {numberOfCourses}
          {numberOfCourses === 1 ? " Course" : " Courses"}
        </p>
      </div>
    </div>
  );
};

export default TotalCourseCard;
