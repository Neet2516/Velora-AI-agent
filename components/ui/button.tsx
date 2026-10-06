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
        "bg-black text-white border-2 border-black hover:bg-[#FF3000] hover:border-[#FF3000] active:translate-y-px",
      secondary:
        "bg-white text-black border-2 border-black hover:bg-black hover:text-white active:translate-y-px",
      outline:
        "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white active:translate-y-px",
      ghost:
        "bg-transparent text-black hover:bg-muted border-2 border-transparent active:translate-y-px",
      link:
        "text-black underline-offset-4 hover:text-[#FF3000] hover:underline p-0 h-auto border-0",
      success:
        "bg-black text-white border-2 border-black hover:bg-[#FF3000] hover:border-[#FF3000] active:translate-y-px",
      destructive:
        "bg-[#FF3000] text-white border-2 border-[#FF3000] hover:bg-black hover:border-black active:translate-y-px",
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
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-bold transition-all duration-150 ease-linear focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3000] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
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
