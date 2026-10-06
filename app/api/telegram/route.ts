import { NextRequest, NextResponse } from "next/server";
import { validateWebhookSecret } from "@/lib/telegram/config";
import { parseTelegramMessage } from "@/lib/telegram/parser";
import { signalStore } from "@/lib/store/signals";

interface TelegramChat {
  id: number;
  title?: string;
  type: string;
}

interface TelegramMessage {
  message_id: number;
  date: number;
  text?: string;
  caption?: string;
  chat?: TelegramChat;
  reply_to_message?: {
    message_id: number;
    text?: string;
  };
}

interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
  channel_post?: TelegramMessage;
  edited_message?: TelegramMessage;
  edited_channel_post?: TelegramMessage;
}

/**
 * Telegram Bot Webhook Receiver Endpoint for @VlgSignal_bot
 * Server-Side Only: Receives update dispatches from Telegram Bot API.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verify Webhook Secret Token
    const incomingSecret = req.headers.get("x-telegram-bot-api-secret-token");

    // If TELEGRAM_WEBHOOK_SECRET is configured, enforce strict validation
    if (process.env.TELEGRAM_WEBHOOK_SECRET) {
      const isValid = validateWebhookSecret(incomingSecret);
      if (!isValid) {
        return NextResponse.json(
          { error: "Unauthorized: invalid webhook secret" },
          { status: 401 }
        );
      }
    }

    // 2. Parse Request Body
    const body = (await req.json().catch(() => null)) as TelegramUpdate | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body: expected JSON object" },
        { status: 400 }
      );
    }

    // 3. Extract Message or Channel Post
    const msg =
      body.message ||
      body.channel_post ||
      body.edited_message ||
      body.edited_channel_post;

    if (!msg) {
      return NextResponse.json(
        {
          ok: true,
          status: "ignored",
          reason: "no_message_payload",
          update_id: body.update_id,
        },
        { status: 200 }
      );
    }

    const text = msg.text || msg.caption;
    if (!text || text.trim() === "") {
      return NextResponse.json(
        {
          ok: true,
          status: "ignored",
          reason: "no_text_payload",
          update_id: body.update_id,
        },
        { status: 200 }
      );
    }

    // Format ISO timestamp from Telegram's Unix epoch seconds
    const timestamp = msg.date
      ? new Date(msg.date * 1000).toISOString()
      : new Date().toISOString();

    // 4. Parse Transmission via pure parser
    const parsed = parseTelegramMessage(text, {
      messageId: msg.message_id,
      replyToMessageId: msg.reply_to_message?.message_id,
      timestamp,
    });

    // 5. Ingestion Handling
    if (parsed.kind === "NEW_SIGNAL" || parsed.kind === "UNPARSED") {
      const stored = signalStore.add(parsed.signal);
      return NextResponse.json(
        {
          ok: true,
          status: "processed",
          action: parsed.kind === "NEW_SIGNAL" ? "created" : "unparsed",
          signalId: stored.id,
        },
        { status: 200 }
      );
    }

    if (parsed.kind === "STATUS_UPDATE") {
      // Find candidate active signal to mutate in place
      const candidate = signalStore.findLatestActive(parsed.symbol);

      if (candidate) {
        const updated = signalStore.update(candidate.id, {
          status: parsed.targetStatus,
          updated_at: timestamp,
        });

        return NextResponse.json(
          {
            ok: true,
            status: "processed",
            action: "updated",
            signalId: updated?.id || candidate.id,
            targetStatus: parsed.targetStatus,
          },
          { status: 200 }
        );
      }

      // If no candidate matches, store as unparsed update so event is not lost
      const unparsedFallback = signalStore.add({
        id: `unmatched-update-${msg.message_id}`,
        symbol: parsed.symbol || "UNKNOWN",
        asset: parsed.symbol || "UNKNOWN",
        direction: null,
        entry: null,
        entry_price: null,
        sl: null,
        tp1: null,
        tp2: null,
        tp3: null,
        status: "UNPARSED",
        raw_text: parsed.rawText,
        created_at: timestamp,
        source: "telegram",
      });

      return NextResponse.json(
        {
          ok: true,
          status: "processed",
          action: "unparsed_update",
          signalId: unparsedFallback.id,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true, status: "completed" }, { status: 200 });
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
