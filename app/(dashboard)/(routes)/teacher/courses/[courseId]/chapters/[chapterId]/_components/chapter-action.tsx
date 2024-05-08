"use client";
import React, { useState } from "react";

import ChapterActionModal from "@/components/modal/chapter-action-modal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

interface ChapterActionsProps {
  disabled: boolean;
  chapterId: string;
  courseId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  chapterId,
  courseId,
  disabled,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onPublish = async () => {
    try {
      setIsLoading(true);
      if (!isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success("course is published");
        router.refresh();
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success("course is unpublished");
        router.refresh();
      }
    } catch (error) {
      toast.error("something went wrong!!");
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast.success("Chapter deleted successfully");
      router.refresh();
      router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2 mt-4">
      <Button
        onClick={onPublish}
        disabled={disabled || isLoading}
        variant="default"
        size="sm"
        className="bg-[#5417d7]"
      >
        {!isPublished ? "Publish" : "UnPublish"}
      </Button>
      <ChapterActionModal onConfirm={onDelete}>
        <Button
          type="button"
          disabled={isLoading}
          variant="outline"
          size="icon"
        >
          <X className="w-4 h-4" />
        </Button>
      </ChapterActionModal>
    </div>
  );
};

export default ChapterActions;
