"use client";
import { Button } from "@/components/ui/button";
import formatPrice from "@/lib/price-format";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import React from "react";
import toast from "react-hot-toast";

interface CourseEnrollmentButtonProps {
  courseId: string;
  price: number;
}
const CourseEnrollmentButton = ({
  price,
  courseId,
}: CourseEnrollmentButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post(`/api/courses/${courseId}/checkout`);

      // Stripe Checkout is on another domain, so use a full page redirect
      window.location.assign(res.data.url);
    } catch (error) {
      console.error("🍾🍾", error);
      toast.error("Something Went Wrong");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button variant="outline" onClick={onClick}>
      {isLoading ? (
        <div className="px-20">
          <Loader2 className="animate-spin " />
        </div>
      ) : (
        <>
          <span>Enroll for {formatPrice(price)}</span>
        </>
      )}
    </Button>
  );
};

export default CourseEnrollmentButton;
