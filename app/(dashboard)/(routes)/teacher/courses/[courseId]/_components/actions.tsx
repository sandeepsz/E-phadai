"use client";
import React, { useState } from "react";

import ChapterActionModal from "@/components/modal/chapter-action-modal";

import { LucideTrash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const Actions = ({ courseId, disabled, isPublished }: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onPublish = async () => {
    try {
      setIsLoading(true);
      if (!isPublished) {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("course is published");
        router.refresh();
      } else {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("course is unpublished");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted successfully");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch {
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
          <LucideTrash2 className="w-4 h-4" />
        </Button>
      </ChapterActionModal>
    </div>
  );
};

export default Actions;
