import { CheckCircle2Icon, MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentSuccessfull = () => {
  return (
    <div className="flex  flex-col gap-2 justify-center items-center text-center mt-40 ">
      <p className=" text-4xl font-bold text-green-600">PaymentSuccessfull</p>
      <div className="p-4 rounded-full bg-emerald-100">
        <CheckCircle2Icon />
      </div>
      <div className="flex gap-2 items-center">
        <Link href="/">Check Your Course</Link>
        <MoveRight />
      </div>
    </div>
  );
};

export default PaymentSuccessfull;
