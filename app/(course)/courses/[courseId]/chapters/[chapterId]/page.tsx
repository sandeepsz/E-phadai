import React from "react";
import { Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const userId = auth();

  if (!userId) {
    redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {},
  });

  return (
    <div>
      <p>{params.courseId}</p>
      <p>{params.chapterId}</p>
    </div>
  );
};

export default ChapterId;
