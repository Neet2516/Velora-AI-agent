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
      "bg-black text-white border-2 border-black",
    secondary:
      "bg-[#F2F2F2] text-black border-2 border-black",
    outline:
      "border-2 border-black text-black bg-transparent",
    success:
      "bg-black text-white border-2 border-black",
    warning:
      "bg-[#F2F2F2] text-black border-2 border-black",
    destructive:
      "bg-[#FF3000] text-white border-2 border-[#FF3000]",
    beta:
      "bg-[#FF3000] text-white border-2 border-[#FF3000] uppercase tracking-widest font-mono text-[10px] px-2 py-0.5 font-bold",
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
