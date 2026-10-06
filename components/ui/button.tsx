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
        "bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm active:translate-y-px",
      secondary:
        "bg-muted text-foreground hover:bg-muted/80 border border-border active:translate-y-px",
      outline:
        "border border-border bg-transparent hover:bg-muted text-foreground active:translate-y-px",
      ghost:
        "hover:bg-muted text-foreground hover:text-foreground",
      link:
        "text-primary underline-offset-4 hover:underline p-0 h-auto",
      success:
        "bg-success text-success-foreground hover:bg-success/90 active:translate-y-px",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:translate-y-px",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 rounded-lg px-6 text-base font-medium",
      icon: "h-10 w-10 p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
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
