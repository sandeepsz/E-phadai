"use client";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
  courseId: string;
  chapterId: string;
  nextChapterId: string;
  isComplete: boolean;
}

const CourseProgressButton = ({
  chapterId,
  courseId,
  isComplete,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [loading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`
      );

      console.log("➡️➡️➡️", nextChapterId);

      if (!isComplete && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${chapterId}`);
      }

      if (!isComplete && !nextChapterId) {
        confetti.onOpen();
      }

      toast.success("Nice!! Keep learning");
      router.refresh();
    } catch {
      toast.error("Something Went to wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isComplete ? null : (
        <Button
          onClick={onClick}
          disabled={loading}
          className="w-full md:w-auto bg-emerald-700"
        >
          Finish and Next
        </Button>
      )}
    </>
  );
};
export default CourseProgressButton;
