"use client";
import React, { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { set } from "zod";

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  playbackId: string;
  isComplete: boolean;
  isLocked: boolean;
}
const VideoPlayer = ({
  playbackId,
  chapterId,
  courseId,
  title,
  isComplete,
  isLocked,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  return (
    <div className="relative aspect-video">
      {!isLocked && !isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
          <Loader2 className="h-6 w-6 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex gap-x-2  items-center justify-center bg-slate-700">
          <Lock className="h-6 w-6 text-white " />
          <p className="text-white font-mono text-xl">
            This Chapter is not Free
          </p>
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(isReady && "hidden")}
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
