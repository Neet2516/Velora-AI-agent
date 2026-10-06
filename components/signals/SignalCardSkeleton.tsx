import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SignalCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/70 bg-card/60 p-5 sm:p-6 space-y-4">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-28 rounded-md" />
          <Skeleton className="h-3 w-36 rounded-md" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Price row skeletons */}
      <div className="space-y-2 pt-2">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </Card>
  );
}
