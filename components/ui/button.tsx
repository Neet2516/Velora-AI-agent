import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "success"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      type = "button",
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default:
        "bg-black text-white hover:bg-gray-800 active:translate-y-px transition-all rounded-lg shadow-sm",
      secondary:
        "bg-white text-black border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:translate-y-px transition-all rounded-lg shadow-sm",
      outline:
        "bg-transparent text-black border border-gray-300 hover:bg-gray-50 active:translate-y-px transition-all rounded-lg",
      ghost:
        "bg-transparent text-black hover:bg-gray-100 active:translate-y-px transition-all rounded-lg",
      link:
        "text-black underline-offset-4 hover:text-[#5B7CFF] hover:underline p-0 h-auto border-0",
      success:
        "bg-emerald-600 text-white hover:bg-emerald-700 active:translate-y-px transition-all rounded-lg shadow-sm",
      destructive:
        "bg-[#FF4B2B] text-white hover:bg-red-700 active:translate-y-px transition-all rounded-lg shadow-sm",
    };

    const sizeStyles = {
      default: "min-h-[44px] px-6 py-2.5 text-xs tracking-wider uppercase font-bold",
      sm: "min-h-[36px] px-4 py-1.5 text-[11px] tracking-wider uppercase font-bold",
      lg: "min-h-[52px] px-8 py-3.5 text-sm tracking-widest uppercase font-extrabold",
      icon: "min-h-[44px] min-w-[44px] p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-bold transition-all duration-150 ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B7CFF] dark:focus-visible:ring-[#6F94FF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
