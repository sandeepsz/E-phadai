"use client";
import React, { useState } from "react";
import * as z from "zod";
import { PenIcon, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: Course;
  courseId: string | null;
}

const formSchema = z.object({
  imageUrl: z.string().min(2, {
    message: "Image must be required !!",
  }),
});

const CourseImage = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  console.log(isEditing);

  const toggle = () => setIsEditing((value) => !value);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toggle();
      toast.success("Course Description updated !");
      router.refresh();
    } catch {
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100  rounded-md p-4">
      <div className="font-medium   flex  items-center justify-between">
        Course Image
        <Button onClick={toggle} variant="ghost">
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add an image
            </>
          )}

          {!isEditing && initialData.imageUrl && (
            <>
              <PenIcon className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className=" flex items-center justify-center rounded-md h-52 bg-slate-400">
            <ImageIcon className="h-10 w-10 text-slate-700" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
              alt="Image of Course"
            />
          </div>
        ))}

      {isEditing && (
        <FileUpload
          endpoint="courseImage"
          onChange={(url) => {
            if (url) {
              onSubmit({ imageUrl: url });
            }
          }}
        />
      )}
    </div>
  );
};

export default CourseImage;
