import React from "react";
import { Chapter, Course } from "@prisma/client";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import VideoPlayer from "./_components/video-player";
import PurchaseChapter from "./_components/purchase-chapter";
import CourseEnrollmentButton from "./_components/course-enrollment";
import Preview from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";

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

  const isLocked = !chapter.isFree && !primiumCourse;
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
          {/* <PurchaseChapter
            initialData={chapter}
            chapterId={params.chapterId}
            courseId={params.courseId}
          /> */}
          <div className="p-4 flex flex-col md:flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">{chapter.title}</h2>
            {primiumCourse ? (
              <div>userProgress</div>
            ) : (
              <div>
                <CourseEnrollmentButton
                  courseId={params.chapterId}
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
            <h2 className="text-xl font-semibold underline">Attachments</h2>
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
        </div>
      </div>
    </div>
  );
};

export default ChapterId;
