"use client";
import { Button } from "@/components/ui/button";
import formatPrice from "@/lib/price-format";
import axios from "axios";
import { Loader2 } from "lucide-react";
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
      console.log("🅿️🅿️🅿️---->", courseId);
      setIsLoading(true);
      await axios.post(`/api/courses/${courseId}/checkout`);
      const payload = {
        return_url: "http://localhost:3000/successful",
        website_url: "http://localhost:3000/",
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

      router.push(res?.data?.data?.payment_url);
    } catch (error) {
      console.error("🍾🍾", error);
      toast.error("Something Went Wrong");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button onClick={onClick}>
      {isLoading ? (
        <div className="px-20">
          <Loader2 className="animate-spin " />
        </div>
      ) : (
        <span> Pay with Khalti {formatPrice(price)}</span>
      )}
    </Button>
  );
};

export default CourseEnrollmentButton;
