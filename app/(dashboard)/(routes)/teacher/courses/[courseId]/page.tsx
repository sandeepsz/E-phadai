import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { LayoutDashboard, ListChecks, CoinsIcon, Files } from "lucide-react";
import CourseTitle from "./_components/course-title";
import CourseDescription from "./_components/course-description";
import CourseImage from "./_components/image-form";
import Category from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChapterForm from "./_components/chapter-form";
import Banner from "@/components/banner";
import { Button } from "@/components/ui/button";
import Actions from "./_components/actions";

const CourseId = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const isComplete = requiredFields.every(Boolean);

  const completedText = `(${completedFields}/${totalFields})`;

  return (
    <>
      {!course.isPublished && (
        <Banner
          label="This course is unpublished. It will be hidden from users. Please fill in all fields to enable the publish action, and at least one chapter must be published"
          variant="warning"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-600">
              Complete all fields {completedText}
            </span>
          </div>

          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          <div>
            <div className="flex items-center gap-x-2">
              <LayoutDashboard className="w-5 h-5 text-[#5417d7]" />
              <h2 className="font-semibold">Customize your course details</h2>
            </div>
          </div>
        </div>

        <div className="md:flex gap-6 ">
          <div className="w-full">
            <CourseTitle initialData={course} courseId={params.courseId} />
            <CourseDescription
              initialData={course}
              courseId={params.courseId}
            />
            <CourseImage initialData={course} courseId={params.courseId} />
            <Category
              initialData={course}
              courseId={params.courseId}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6 w-full">
            <div className="mt-4">
              <div className="flex items-center space-y-2">
                <ListChecks className="w-5 h-5 text-[#5417d7]" />
                <h2 className="font-semibold">Course Chapters</h2>
              </div>
              <div>
                <ChapterForm initialData={course} courseId={params.courseId} />
              </div>
            </div>

            <div>
              <div className="flex items-center space-y-2">
                <CoinsIcon className="w-5 h-5 text-[#5417d7]" />
                <h2 className="font-semibold">Course Price</h2>
              </div>
              <div>
                <PriceForm initialData={course} courseId={params.courseId} />
              </div>
            </div>
            <div>
              <div className="flex items-center space-y-2">
                <Files className="w-5 h-5 text-[#5417d7]" />
                <h2 className="font-semibold">Course Resources</h2>
              </div>
              <div>
                <AttachmentForm
                  initialData={course}
                  courseId={params.courseId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseId;
