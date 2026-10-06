"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSignals } from "@/lib/api/signals";
import { PipelineConnectionStatus } from "@/components/signals/SignalStatusBanner";

export function useSignals() {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    dataUpdatedAt,
    refetch,
  } = useQuery({
    queryKey: ["signals"],
    queryFn: fetchSignals,
    refetchInterval: 5000, // 5s interval guarantees <10s latency target
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
    staleTime: 3000,
  });

  // Calculate connection telemetry status
  let connectionStatus: PipelineConnectionStatus = "connected";
  if (isError) {
    connectionStatus = "error";
  } else if (isFetching && !isLoading && data) {
    connectionStatus = "connected";
  }

  const signals = data?.signals || [];
  const isFallback = data?.isFallback || false;
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : null;

  return {
    signals,
    isLoading,
    isError,
    error,
    isRefetching: isFetching && !isLoading,
    connectionStatus,
    isFallback,
    lastUpdated,
    refetch,
  };
}
