import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

interface SignalListErrorProps {
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function SignalListError({
  message = "Failed to synchronize signals from the Velora pipeline.",
  onRetry,
  isRetrying = false,
}: SignalListErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/30 bg-destructive-10/40 py-12 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive-10 border border-destructive/30 text-destructive mb-3">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-foreground">Pipeline Sync Interrupted</h3>
      <p className="mt-1.5 max-w-md text-sm text-muted-foreground leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            disabled={isRetrying}
            className="gap-2 border-destructive/30 hover:bg-destructive-10 text-foreground"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isRetrying ? "animate-spin" : ""}`} />
            <span>{isRetrying ? "Retrying..." : "Retry Connection"}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
