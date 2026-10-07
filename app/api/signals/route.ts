import { NextRequest, NextResponse } from "next/server";
import { signalStore } from "@/lib/store/signals";

/**
 * Public Signals Feed API Endpoint for Velora AI Website
 * Serves real-time signals populated by the Telegram webhook pipeline.
 * Returns the latest 50 received signals by default in newest-first order.
 */
export async function GET(req?: NextRequest) {
  let limit = 50;

  if (req && req.url) {
    try {
      const url = new URL(req.url);
      const limitParam = url.searchParams.get("limit");
      if (limitParam) {
        const parsedLimit = parseInt(limitParam, 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0) {
          limit = parsedLimit;
        }
      }
    } catch {
      // Fallback to default limit
    }
  }

  const allSignals = signalStore.getAll();
  const signals = allSignals.slice(0, limit);

  return NextResponse.json(
    {
      data: signals,
      meta: {
        total: allSignals.length,
        limit,
        returned: signals.length,
        timestamp: new Date().toISOString(),
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}
