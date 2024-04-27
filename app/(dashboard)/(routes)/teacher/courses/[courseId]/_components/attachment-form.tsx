"use client";
import React, { useState } from "react";
import * as z from "zod";
import { PenIcon, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course, Attachment } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string | null;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggle = () => setIsEditing((value) => !value);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
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
        Course Attachment
        <Button onClick={toggle} variant="ghost">
          {isEditing && <>Cancel</>}

          {!isEditing && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Files
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm text-slate-500">No Attachments</p>
          )}

          {initialData.attachments.length >= 0 && (
            <div className="space-y-6">
              {initialData.attachments.map((attachment) => (
                <p
                  className="bg-slate-600 p-4 rounded-md"
                  key={attachment.courseId}
                >
                  {attachment.courseId}
                </p>
              ))}
            </div>
          )}
        </>
      )}

      {isEditing && (
        <FileUpload
          endpoint="courseImage"
          onChange={(url) => {
            if (url) {
              onSubmit({ url: url });
            }
          }}
        />
      )}
    </div>
  );
};

export default AttachmentForm;
