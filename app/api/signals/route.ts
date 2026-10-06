import { NextResponse } from "next/server";
import { signalStore } from "@/lib/store/signals";

/**
 * Public Signals Feed API Endpoint for Velora AI Website
 * Serves real-time signals populated by the Telegram webhook pipeline.
 */
export async function GET() {
  const signals = signalStore.getAll();

  return NextResponse.json(
    {
      data: signals,
      meta: {
        total: signals.length,
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
