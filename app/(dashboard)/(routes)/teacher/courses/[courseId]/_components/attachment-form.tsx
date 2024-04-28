"use client";
import React, { useState } from "react";
import * as z from "zod";
import { CircleX, File, Loader2, PenIcon, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Course, Attachment } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import { NextResponse } from "next/server";

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
  const [isDelete, setDelete] = useState<string | null>(null);

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

  const onDelete = async (id: string) => {
    try {
      setDelete(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted !!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!!!");
    } finally {
      setDelete(null);
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
            <div className="space-y-4">
              {initialData.attachments.map((attachment) => (
                <div
                  className=" flex items-center mt-2 p-2 w-full bg-[#c1b1e4] text-[#6926fc] border-[#6926fc] border rounded-md"
                  key={attachment.courseId}
                >
                  <File className="mr-2 w-4 h-4 flex-shrink-0 " />
                  <p className="text-xs line-clamp-1">{attachment.courseId}</p>
                  {isDelete === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}

                  {isDelete !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover-opacity-75 transition"
                    >
                      <CircleX className="h-6 w-6 hover:text-red-400 " />
                    </button>
                  )}
                </div>
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
