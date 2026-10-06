import { NextRequest, NextResponse } from "next/server";

/**
 * Telegram Bot Webhook Receiver Endpoint for @VlgSignal_bot
 * Server-Side Only: Receives update dispatches from Telegram Bot API.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body: expected JSON object" },
        { status: 400 }
      );
    }

    // Acknowledge update receipt
    return NextResponse.json(
      {
        ok: true,
        status: "received",
        update_id: (body as { update_id?: number }).update_id ?? null,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Telegram Webhook] Unexpected error handling update:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST for Telegram webhook updates." },
    { status: 405 }
  );
}
