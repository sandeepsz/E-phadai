import React, { useState } from "react";
import { Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import VideoPlayer from "./_components/video-player";
import PurchaseChapter from "./_components/purchase-chapter";

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const userId = auth();

  if (!userId) {
    redirect("/");
  }

  const { chapter, course, attachments, muxData, userProgress, primiumCourse } =
    await getChapter({
      userId: String(userId),
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    redirect("/");
  }

  const isLocked = !chapter.isFree;
  const isComplete = userProgress?.isComplete;

  return (
    <div>
      {!isLocked && (
        <Banner
          variant="success"
          label="Horray!! Keep Learning Keep Exploring"
        />
      )}
      {isLocked && (
        <Banner variant="warning" label="It's not Free Please Purchase it." />
      )}
      <div className="flex flex-col max-w-4xl pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            isComplete={isComplete!}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
          />
          <PurchaseChapter
            initialData={chapter}
            chapterId={params.chapterId}
            courseId={params.courseId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterId;
