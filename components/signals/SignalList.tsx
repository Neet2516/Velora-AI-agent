"use client";

import React, { useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Signal } from "@/lib/types/signal";
import { SignalCard } from "./SignalCard";
import { SignalCardSkeleton } from "./SignalCardSkeleton";
import { SignalListEmpty } from "./SignalListEmpty";

interface SignalListProps {
  signals?: Signal[];
  isLoading?: boolean;
  className?: string;
}

export function SignalList({ signals = [], isLoading = false, className }: SignalListProps) {
  // Sort signals newest first by created_at timestamp
  const sortedSignals = useMemo(() => {
    return [...signals].sort((a, b) => {
      const timeA = new Date(a.created_at).getTime() || 0;
      const timeB = new Date(b.created_at).getTime() || 0;
      return timeB - timeA;
    });
  }, [signals]);

  if (isLoading && sortedSignals.length === 0) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 ${className || ""}`}>
        <SignalCardSkeleton />
        <SignalCardSkeleton />
        <SignalCardSkeleton />
      </div>
    );
  }

  if (sortedSignals.length === 0) {
    return <SignalListEmpty />;
  }

  return (
    <div
      className={`grid grid-cols-1 xl:grid-cols-2 gap-6 ${
        className || ""
      }`}
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {sortedSignals.map((signal) => (
          /* Critical Invariant: key must ALWAYS be signal.id to preserve state and avoid duplication */
          <SignalCard key={signal.id} signal={signal} />
        ))}
      </AnimatePresence>
    </div>
  );
}
