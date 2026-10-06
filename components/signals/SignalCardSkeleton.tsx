import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SignalCardSkeleton() {
  return (
    <div className="rounded-none border-2 border-black bg-white p-5 sm:p-6 space-y-4">
      {/* Top row */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-black">
        <div className="space-y-2">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Price row skeletons */}
      <div className="space-y-2 pt-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}
