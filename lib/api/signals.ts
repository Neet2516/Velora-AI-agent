import { Signal, SignalListResponseSchema } from "@/lib/types/signal";
import { apiClient } from "./client";
import { INITIAL_MOCK_SIGNALS } from "./mockSignals";

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
        signals: parseResult.data.data,
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
          signals: arrayParse.data.data,
          isFallback: false,
        };
      }
    }

    // Graceful fallback to initial mock fixtures when API shape is incomplete
    return {
      signals: INITIAL_MOCK_SIGNALS,
      isFallback: true,
    };
  } catch (err) {
    // When backend API is offline during development, utilize the development boundary
    console.info(
      "[Velora API] Backend API currently unreachable. Using development telemetry feed."
    );
    return {
      signals: INITIAL_MOCK_SIGNALS,
      isFallback: true,
    };
  }
}
