import React from "react";
import { Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
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
