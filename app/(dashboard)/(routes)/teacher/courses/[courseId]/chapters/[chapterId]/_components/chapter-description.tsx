"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PenIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chapter } from "@prisma/client";
import Editor from "@/components/editor";
import Preview from "@/components/preview";

interface ChapterDescriptionProps {
  initialData: Chapter;
  courseId: string | null;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(2),
});

const ChapterDescription = ({
  initialData,
  courseId,
  chapterId,
}: ChapterDescriptionProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggle = () => setIsEditing((value) => !value);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toggle();
      toast.success("Chapter Description updated !");
      router.refresh();
    } catch {
      toast.error("Something went wrong!!!");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex  items-center justify-between">
        Chapter Description
        <Button onClick={toggle} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PenIcon className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>

      {!initialData.description ? (
        <p className="mt-2 text-sm text-slate-600">No description</p>
      ) : (
        <div className="mt-2 text-sm">
          <Preview value={initialData.description} />
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8 "
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                className="bg-[#5417d7]"
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterDescription;
