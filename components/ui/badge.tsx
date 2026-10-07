import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "destructive"
    | "beta";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-black dark:bg-[#5B7CFF] text-white border-2 border-black dark:border-[#6F94FF]",
    secondary:
      "bg-[#F2F4F8] dark:bg-[#0D1838] text-foreground border-2 border-black dark:border-[#263B70]",
    outline:
      "border-2 border-black dark:border-[#263B70] text-foreground bg-transparent",
    success:
      "bg-black dark:bg-[#101D42] text-[#5B7CFF] dark:text-[#6F94FF] border-2 border-black dark:border-[#263B70]",
    warning:
      "bg-[#F2F4F8] dark:bg-[#0D1838] text-foreground border-2 border-black dark:border-[#263B70]",
    destructive:
      "bg-[#FF4B2B] text-white border-2 border-[#FF4B2B]",
    beta:
      "bg-[#FF5722] text-white border border-[#FF5722] rounded-md uppercase tracking-widest font-mono text-[10px] px-2 py-0.5 font-black shadow-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-none border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
