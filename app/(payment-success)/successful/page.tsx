import Logo from "@/app/(dashboard)/_components/logo";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon, MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentSuccessfull = () => {
  return (
    <div className="flex  flex-col gap-2 justify-center items-center text-center mt-40 ">
      <div className="flex p-6 gap-2">
        <Logo />
        <span className="font-bold text-2xl text-[#5417d7]">E-Padhai</span>
      </div>
      <div className="p-4 rounded-full bg-green-500">
        <CheckCircle2Icon className="text-white" />
      </div>
      <p className=" text-4xl font-bold text-green-500">
        Your payment was successful
      </p>
      <div className="flex gap-2  mt-2 items-center">
        <Link href="/">
          <Button className="bg-green-500 hover:bg-green-300 hover:text-green-800 transition-all">
            Done
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessfull;
