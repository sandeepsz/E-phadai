"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Coins } from "lucide-react";
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
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface AcessFormProps {
  initialData: Chapter;
  courseId: string | null;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

const PurchaseChapter = ({
  initialData,
  courseId,
  chapterId,
}: AcessFormProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isEditing, setIsEditing] = useState(false);

  const toggle = () => setIsEditing((value) => !value);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // isFree.Boolean(initialData.isFree)
      isFree: !!initialData.isFree,
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
      toast.success("Chapter is purchase !");
      confetti.onOpen();
      router.refresh();
    } catch {
      toast.error("Something went wrong!!!");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex  items-center justify-between">
        Purchase chapter
        <Button onClick={toggle} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Coins className="h-4 w-4 mr-2" />
              <Button>{!initialData.isFree ? "Purchase" : "Cancel"}</Button>
            </>
          )}
        </Button>
      </div>

      {!initialData.isFree ? (
        <p className="mt-2 text-md text-slate-600 italic">
          This Chapter is not free you need to purchase it.
        </p>
      ) : (
        <p className="mt-2 text-md text-slate-600 italic">
          This chapter is free now you can watch video
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8 "
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      {!initialData.isFree
                        ? "Do you want to purchase chapter?"
                        : "Do you want to cancel purchase?"}
                    </FormDescription>
                  </div>
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

export default PurchaseChapter;
