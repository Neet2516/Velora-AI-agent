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
      "bg-primary-10 text-primary border-primary/20",
    secondary:
      "bg-muted text-muted-foreground border-border",
    outline:
      "border-border text-foreground bg-transparent",
    success:
      "bg-success-10 text-success border-success/25",
    warning:
      "bg-warning-10 text-warning border-warning/25",
    destructive:
      "bg-destructive-10 text-destructive border-destructive/25",
    beta:
      "bg-primary-10 text-primary border-primary/30 uppercase tracking-widest font-mono text-[10px] px-2 py-0.5 rounded-full font-semibold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
