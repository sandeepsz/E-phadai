import { auth } from "@clerk/nextjs";
import React from "react";

import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourse } from "@/actions/get-course";
import { redirect } from "next/navigation";
import CoursesList from "@/components/courses-list";

interface searchParamsProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const Searh = async ({ searchParams }: searchParamsProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourse({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="py-4 mx-6 md:hidden block ">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Searh;
