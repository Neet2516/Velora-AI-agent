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
    <div className="flex flex-col items-center justify-center rounded-none border-2 border-black bg-white py-12 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#FF3000] text-white mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-black uppercase text-black tracking-tight">
        PIPELINE SYNCHRONIZATION INTERRUPTED
      </h3>
      <p className="mt-2 max-w-md text-sm text-[#555555] font-medium leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <div className="mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={onRetry}
            disabled={isRetrying}
            className="gap-2"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isRetrying ? "animate-spin text-[#FF3000]" : ""}`} />
            <span>{isRetrying ? "RETRYING..." : "RETRY CONNECTION"}</span>
          </Button>
        </div>
      )}
    </div>
  );
}
