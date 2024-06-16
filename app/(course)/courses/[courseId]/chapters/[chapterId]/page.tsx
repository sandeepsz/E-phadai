import React from "react";
import { Chapter, Course } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import VideoPlayer from "./_components/video-player";
import CourseEnrollmentButton from "./_components/course-enrollment";
import Preview from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/course-progress-button";

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId, user } = auth();

  if (!userId) {
    redirect("/");
  }

  const {
    chapter,
    course,
    attachments,
    muxData,
    userProgress,
    premium,
    nextChapter,
  } = await getChapter({
    userId: String(userId),
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    redirect("/");
  }

  const BooleanPremium = !!premium;
  const isLocked = !chapter.isFree && !BooleanPremium;
  const isComplete = !!premium && !userProgress?.isComplete;

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
          <div className="p-4 flex flex-col md:flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">{chapter.title}</h2>
            {premium ? (
              <CourseProgressButton
                courseId={params.courseId}
                chapterId={params.chapterId}
                nextChapterId={nextChapter?.id!}
                isComplete={!!userProgress?.isComplete}
              />
            ) : (
              <div className="mt-2">
                <CourseEnrollmentButton
                  courseId={params.courseId}
                  price={course.price!}
                />
              </div>
            )}
          </div>

          <Separator />

          <div>
            <Preview value={chapter.description!} />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold underline">
              Course Resources
            </h2>
            {attachments.map((item) => (
              <a
                href={item.url!}
                key={item.id}
                target="_blank"
                className="flex items-center rounded-sm gap-x-2  mt-4 p-3 w-full bg-purple-200 text-[#303030]"
              >
                <File />
                {item.name}
              </a>
            ))}
          </div>

          <Separator />
        </div>
      </div>
    </div>
  );
};

export default ChapterId;
