"use client";
import { Button } from "@/components/ui/button";
import formatPrice from "@/lib/price-format";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const payload = {
        return_url: "https://e-phadai.vercel.app/successful",
        website_url: "https://e-phadai.vercel.app/",
        amount: 1000,
        purchase_order_id: "testy",
        purchase_order_name: "test",
        customer_info: {
          name: "Sandip Nepali",
          email: "codesandip@gmail.com",
          phone: "9800000123",
        },
      };
      const res = await axios.post(
        `https://khalti-api-pvem.onrender.com/khalti-pay`,
        payload
      );
      console.log("👨‍💻👨‍💻", res.data.data.payment_url);
      router.push(res?.data?.data?.payment_url);

      await axios.post(`/api/courses/${courseId}/checkout`);
    } catch (error) {
      console.error("🍾🍾", error);
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button onClick={onClick} disabled={isLoading}>
      Go for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollmentButton;
