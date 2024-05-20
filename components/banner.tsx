import React from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "border text-center text-sm flex p-4 items-center  w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200 border-yello-30 text-primary",
        success: "bg-green-500 border-green-30 text-white ",
      },
      defaultVariants: {
        variant: "warning",
      },
    },
  }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle,
};

const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="w-4 h-4 mr-4" />
      {label}
    </div>
  );
};

export default Banner;
