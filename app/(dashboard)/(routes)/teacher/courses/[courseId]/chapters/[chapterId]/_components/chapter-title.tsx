"use client";
import React, { useState } from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { PenIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CourseTitleProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Chapter title  must be required !!",
  }),
});

const ChapterTitle = ({
  initialData,
  courseId,
  chapterId,
}: CourseTitleProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggle = () => setIsEditing((value) => !value);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toggle();
      toast.success("Chapter Title updated !");
      router.refresh();
    } catch {
      toast.error("Something went wrong!!!");
    }
  };
  return (
    <div className="mt-6 border  bg-slate-100 rounded-md p-4">
      <div className="font-medium flex  items-center justify-between">
        Chapter Title
        <Button onClick={toggle} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <PenIcon className="h-4 w-4 mr-2" />
              Edit Title
            </>
          )}
        </Button>
      </div>

      {!isEditing && <p className="mt-2 text-sm">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8 "
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg: Introduction of chapter"
                      {...field}
                    />
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

export default ChapterTitle;
