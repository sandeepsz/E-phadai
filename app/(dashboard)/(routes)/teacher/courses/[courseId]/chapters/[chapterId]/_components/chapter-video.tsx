"use client";
import React, { useState } from "react";
import * as z from "zod";
import { PenIcon, PlusCircle, Video } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import MuxPlayer from "@mux/mux-player-react";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string | null;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  console.log(isEditing);

  const toggle = () => setIsEditing((value) => !value);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toggle();
      toast.success("Chapter video is uploaded!");
      router.refresh();
    } catch {
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100  rounded-md p-4">
      <div className="font-medium flex  items-center justify-between">
        Course video
        <Button onClick={toggle} variant="ghost">
          {isEditing && <>Cancel</>}

          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a Video
            </>
          )}

          {!isEditing && initialData.videoUrl && (
            <>
              <PenIcon className="h-4 w-4 mr-2" />
              Edit Video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className=" flex items-center justify-center rounded-md h-52 bg-slate-400">
            <Video className="h-10 w-10 text-slate-700" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData.muxData?.playbackId} />
          </div>
        ))}

      {isEditing && (
        <FileUpload
          endpoint="chapterVideo"
          onChange={(url) => {
            if (url) {
              onSubmit({ videoUrl: url });
            }
          }}
        />
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-sm text-slate-600">
          Videos can take few minutes to process. Please wait few seconds....
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
