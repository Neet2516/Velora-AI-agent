import { Signal, SignalListResponseSchema } from "@/lib/types/signal";
import { apiClient } from "./client";
import { INITIAL_MOCK_SIGNALS } from "./mockSignals";

/**
 * Deduplicate signals by stable ID to strictly enforce the invariant:
 * TP/SL updates modify existing signals; duplicate cards are impossible.
 */
export function deduplicateSignals(signals: Signal[]): Signal[] {
  const map = new Map<string, Signal>();

  for (const signal of signals) {
    const existing = map.get(signal.id);
    if (!existing) {
      map.set(signal.id, signal);
    } else {
      // If duplicate ID exists, merge with latest status and timestamps
      map.set(signal.id, {
        ...existing,
        ...signal,
        updated_at: signal.updated_at || new Date().toISOString(),
      });
    }
  }

  return Array.from(map.values());
}

/**
 * Fetch Signals from Velora Backend API
 * Validates payload against Zod schema and handles fallback cleanly.
 */
export async function fetchSignals(): Promise<{ signals: Signal[]; isFallback: boolean }> {
  try {
    const rawData = await apiClient<unknown>("/api/signals");

    // Validate using Zod schema
    const parseResult = SignalListResponseSchema.safeParse(rawData);

    if (parseResult.success) {
      return {
        signals: deduplicateSignals(parseResult.data.data),
        isFallback: false,
      };
    }

    console.warn(
      "[Velora API] API response schema mismatch:",
      parseResult.error.format()
    );

    // If API returned an array directly without envelope
    if (Array.isArray(rawData)) {
      const arrayParse = SignalListResponseSchema.safeParse({ data: rawData });
      if (arrayParse.success) {
        return {
          signals: deduplicateSignals(arrayParse.data.data),
          isFallback: false,
        };
      }
    }

    // Graceful fallback to initial mock fixtures when API shape is incomplete
    return {
      signals: deduplicateSignals(INITIAL_MOCK_SIGNALS),
      isFallback: true,
    };
  } catch {
    // When backend API is offline during development, utilize the development boundary
    return {
      signals: deduplicateSignals(INITIAL_MOCK_SIGNALS),
      isFallback: true,
    };
  }
}
