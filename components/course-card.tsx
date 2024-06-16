"use client";
import Image from "next/image";
import Link from "next/link";
import formatPrice from "@/lib/price-format";
import { Book } from "lucide-react";
import UserCourseProgress from "./user-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chapterLength: number;
  price: number;
  userProgress: number | null;
  category: string;
}

const CourseCard = ({
  id,
  title,
  imageUrl,
  chapterLength,
  price,
  userProgress,
  category,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group  hover:shadow-sm transition overflow-hidden border border-slate-300 rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden ">
          <Image fill alt={title} src={imageUrl} className="object-cover" />
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <div className="text-lg md:text-base font-medium hover:text-[#5417d7] transition line-clamp-2">
            {title}
          </div>
          <p className="text-sm text-muted-foreground">{category}</p>
          <div className="flex items-center mx-2 gap-x-1 md:w-[95px] w-[110px] p-1 rounded-md bg-purple-200 text-sm md:text-xs  ">
            <div className="flex items-center">
              <Book className="w-4 h-4 text-[#5417d7] backdrop-blur-lg " />
            </div>
            <div className="text-[#5417d7]">
              {chapterLength} {chapterLength == 1 ? "Chapter" : "Chapters"}
            </div>
          </div>
          <p className="text-md md:text-sm font-medium">
            {userProgress !== null ? (
              <div>
                <UserCourseProgress
                  varient="success"
                  value={userProgress}
                  size="sm"
                />
                <p className="text-sm mt-2 font-semibold text-emerald-800">
                  {Math.round(userProgress)}% Finish
                </p>
              </div>
            ) : (
              <p className="text-md md:text-sm font-medium text-slate-700">
                {formatPrice(price)}
              </p>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
