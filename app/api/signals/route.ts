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

/**
 * Clear the signals buffer so users can wait for fresh Telegram dispatches.
 */
export async function DELETE() {
  signalStore.clear();
  return NextResponse.json({
    ok: true,
    message: "Signal buffer cleared. Telemetry engine is now waiting for live Telegram messages.",
    total: signalStore.count(),
  });
}

/**
 * Direct control API for simulating signals or re-seeding fixtures.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action || "simulate_xauusd";

    if (action === "clear") {
      signalStore.clear();
      return NextResponse.json({ ok: true, message: "Buffer cleared", total: 0 });
    }

    if (action === "simulate_xauusd") {
      const now = new Date().toISOString();
      const rawText = `NEW SIGNAL\nSymbol: XAUUSD\nType: BUY\nEntry: 2650.50\nSL: 2645.00\nTP1: 2656.00\nTP2: 2661.00\nTP3: 2666.00`;
      const signal = signalStore.add({
        id: `tg-sim-${Date.now()}`,
        symbol: "XAUUSD",
        asset: "XAUUSD",
        direction: "BUY",
        entry: 2650.5,
        entry_price: 2650.5,
        sl: 2645.0,
        tp1: 2656.0,
        tp2: 2661.0,
        tp3: 2666.0,
        status: "ACTIVE",
        raw_text: rawText,
        created_at: now,
        source: "Velora Telegram Channel",
      });
      return NextResponse.json({ ok: true, action: "created", signal });
    }

    if (action === "simulate_tp1") {
      const latest = signalStore.findLatestActive("XAUUSD") || signalStore.findLatestActive();
      if (latest) {
        signalStore.update(latest.id, { status: "TP1_HIT" });
        return NextResponse.json({ ok: true, action: "updated", status: "TP1_HIT", signalId: latest.id });
      }
      return NextResponse.json({ ok: false, error: "No active signal to update" }, { status: 400 });
    }

    return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Failed to process request" }, { status: 500 });
  }
}

