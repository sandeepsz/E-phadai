"use client";
import React from "react";

import * as z from "zod";

import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be required!!",
    })
    .max(50),
});

const Create = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("course created");
    } catch {
      toast.error("something went wrong!!!");
    }
  };

  const { isSubmitting, isValid, isLoading } = form.formState;

  return (
    <div className="max-w-5xl  mx-auto flex items-center md:justify-center h-full p-6">
      <div className=" bg-[#e9e8ea] border  border-[#5417d7] md:p-20  p-10 rounded-lg ">
        <h2 className="text-2xl">Add Course Title</h2>
        <p className="text-sm text-slate-600">
          Write your suitable title for your course !!!
        </p>
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
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: Advance Python Course" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/courses">
                <Button type="button" variant="ghost" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button
                disabled={!isValid || isSubmitting}
                className="bg-[#5417d7]"
                type="submit"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Create;
