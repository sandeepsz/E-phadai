import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const Courses = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <Suspense
      fallback={
        <div className="animate-bounce text-purple-700 ">Loading...</div>
      }
    >
      <div className="p-8">
        <DataTable columns={columns} data={courses} />
      </div>
    </Suspense>
  );
};

export default Courses;
