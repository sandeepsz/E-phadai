import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import ChapterTitle from "./_components/chapter-title";
import ChapterDescription from "./_components/chapter-description";
import AccessForm from "./_components/access-form";
import ChapterVideoForm from "./_components/chapter-video";
import Banner from "@/components/banner";

const ChapterEditPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  console.log(userId);

  if (!userId) {
    return redirect("/");
  }
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;

  const completeFields = requiredFields.filter(Boolean).length;

  const completeSteps = `${completeFields}/${totalFields}`;

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is not publish so this is Not visible."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center gap-2  text-sm hover:opacity-80 transition-all mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to course
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter setup</h1>
                <span className="text-sm text-slate-600">
                  Complete all fields {completeSteps}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2 ">
                <LayoutDashboard className="w-5 h-5 text-[#5417d7]" />
                <h2 className="font-semibold">
                  Customize your course chapters
                </h2>
              </div>
            </div>
            <div>
              <ChapterTitle
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescription
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <Eye className="w-4 h-4  text-[#5417d7]" />
                <h2 className="font-semibold">Access setting</h2>
              </div>
              <AccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2">
                <Video className="w-5 h-5  text-[#5417d7]" />
                <h2 className="font-semibold">Video for chapter</h2>
              </div>
            </div>
            <div>
              <ChapterVideoForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterEditPage;
