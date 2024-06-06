"use client";
import { Button } from "@/components/ui/button";
import formatPrice from "@/lib/price-format";
import React from "react";

interface CourseEnrollmentButtonProps {
  courseId: string;
  price: number;
}
const CourseEnrollmentButton = ({
  price,
  courseId,
}: CourseEnrollmentButtonProps) => {
  return <Button>Go for {formatPrice(price)}</Button>;
};

export default CourseEnrollmentButton;
