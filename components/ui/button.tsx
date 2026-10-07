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
        "bg-black dark:bg-[#5B7CFF] text-white border-2 border-black dark:border-[#6F94FF] hover:bg-[#5B7CFF] dark:hover:bg-[#4A6FE8] hover:border-[#5B7CFF] dark:hover:border-[#8BA8FF] dark:hover:shadow-[0_0_15px_rgba(111,148,255,0.35)] active:translate-y-px transition-all",
      secondary:
        "bg-white dark:bg-[#081331] text-foreground border-2 border-black dark:border-[#263B70] hover:border-[#5B7CFF] hover:text-[#5B7CFF] dark:hover:border-[#6F94FF] dark:hover:text-[#6F94FF] dark:hover:shadow-[0_0_12px_rgba(111,148,255,0.2)] active:translate-y-px transition-all",
      outline:
        "bg-transparent text-foreground border-2 border-black dark:border-[#263B70] hover:border-[#5B7CFF] dark:hover:border-[#6F94FF] active:translate-y-px transition-all",
      ghost:
        "bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/5 border-2 border-transparent active:translate-y-px transition-all",
      link:
        "text-foreground underline-offset-4 hover:text-[#5B7CFF] dark:hover:text-[#6F94FF] hover:underline p-0 h-auto border-0",
      success:
        "bg-black dark:bg-[#5B7CFF] text-white border-2 border-black dark:border-[#6F94FF] hover:bg-[#5B7CFF] active:translate-y-px transition-all",
      destructive:
        "bg-[#FF4B2B] text-white border-2 border-[#FF4B2B] hover:bg-black dark:hover:bg-[#101D42] active:translate-y-px transition-all",
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
