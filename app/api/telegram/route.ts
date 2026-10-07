import { NextRequest, NextResponse } from "next/server";
import { validateWebhookSecret } from "@/lib/telegram/config";
import { parseTelegramMessage } from "@/lib/telegram/parser";
import { matchAndUpdateSignal } from "@/lib/telegram/matcher";
import { signalStore } from "@/lib/store/signals";
import { Signal } from "@/lib/types/signal";

interface TelegramChat {
  id: number;
  title?: string;
  type: string;
  username?: string;
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
  update_id?: number;
  message?: TelegramMessage;
  channel_post?: TelegramMessage;
  edited_message?: TelegramMessage;
  edited_channel_post?: TelegramMessage;
  // Option B: direct signal payload support if generated directly by Velora bot/engine
  symbol?: string;
  asset?: string;
  direction?: "BUY" | "SELL" | "LONG" | "SHORT";
  entry?: number;
  entry_price?: number;
  sl?: number;
  tp1?: number;
  tp2?: number | null;
  tp3?: number | null;
  raw_text?: string;
}

/**
 * Telegram Bot Webhook Receiver Endpoint for Velora AI Signals (@VlgSignal_bot)
 * Server-Side Only: Receives update dispatches from Telegram Bot API via HTTPS POST.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verify Webhook Secret Token header
    const incomingSecret =
      req.headers.get("x-telegram-bot-api-secret-token") ||
      req.headers.get("X-Telegram-Bot-Api-Secret-Token");

    // When TELEGRAM_WEBHOOK_SECRET is configured, enforce strict verification
    if (process.env.TELEGRAM_WEBHOOK_SECRET) {
      const isValid = validateWebhookSecret(incomingSecret);
      if (!isValid) {
        console.warn(
          "[Telegram Webhook] 401 Unauthorized: Invalid or missing X-Telegram-Bot-Api-Secret-Token."
        );
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

    // OPTION B: Direct Signal Ingestion from Bot Engine / Pipeline
    // If the Velora bot or algorithmic pipeline dispatches signals directly via API:
    if (body.symbol && (body.entry !== undefined || body.direction !== undefined)) {
      const isoTime = new Date().toISOString();
      const directSignal: Signal = {
        id: `sig-direct-${Date.now()}`,
        symbol: body.symbol,
        asset: body.asset || body.symbol,
        direction: body.direction || null,
        entry: body.entry ?? body.entry_price ?? null,
        entry_price: body.entry ?? body.entry_price ?? null,
        sl: body.sl ?? null,
        tp1: body.tp1 ?? null,
        tp2: body.tp2 ?? null,
        tp3: body.tp3 ?? null,
        status: "ACTIVE",
        raw_text:
          body.raw_text ||
          `Direct signal: ${body.symbol} ${body.direction || ""} @ ${body.entry}`,
        created_at: isoTime,
        source: "direct_engine",
      };

      const stored = signalStore.add(directSignal);
      console.log(
        `New signal: ${stored.symbol} ${stored.direction || ""} Entry: ${stored.entry} SL: ${stored.sl} TP1: ${stored.tp1} (source: direct_engine, id: ${stored.id})`
      );

      return NextResponse.json(
        {
          ok: true,
          status: "processed",
          action: "created",
          signalId: stored.id,
        },
        { status: 200 }
      );
    }

    // OPTION A: Standard Telegram Webhook Dispatch (channel_post or message)
    // Telegram sends channel_post for channel broadcasts, or message for groups/DMs
    const msg =
      body.channel_post ||
      body.message ||
      body.edited_channel_post ||
      body.edited_message;

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

    // Extract message_id, text, and Telegram message date (Unix epoch seconds)
    const messageId = msg.message_id;
    const text = msg.text || msg.caption;
    const date = msg.date;

    if (!text || text.trim() === "") {
      return NextResponse.json(
        {
          ok: true,
          status: "ignored",
          reason: "no_text_payload",
          update_id: body.update_id,
          message_id: messageId,
        },
        { status: 200 }
      );
    }

    // Format ISO timestamp from Telegram's Unix epoch seconds (or fallback to now)
    const timestamp = date
      ? new Date(date * 1000).toISOString()
      : new Date().toISOString();

    // 3. Parse Transmission into structured Signal or Status Update
    const parsed = parseTelegramMessage(text, {
      messageId,
      replyToMessageId: msg.reply_to_message?.message_id,
      timestamp,
    });

    // 4. Ingestion & Storage in SignalStore
    if (parsed.kind === "NEW_SIGNAL") {
      const stored = signalStore.add(parsed.signal);
      console.log(
        `New signal: ${stored.symbol} ${stored.direction || ""} Entry: ${stored.entry} SL: ${stored.sl} TP1: ${stored.tp1} (message_id: ${messageId})`
      );

      return NextResponse.json(
        {
          ok: true,
          status: "processed",
          action: "created",
          signalId: stored.id,
          message_id: messageId,
        },
        { status: 200 }
      );
    }

    if (parsed.kind === "STATUS_UPDATE") {
      const matchResult = matchAndUpdateSignal(
        {
          targetStatus: parsed.targetStatus,
          symbol: parsed.symbol,
          replyToMessageId: parsed.replyToMessageId,
          timestamp,
          rawText: parsed.rawText,
        },
        signalStore
      );

      if (matchResult && matchResult.wasMutated) {
        console.log(
          `New signal status update: ${matchResult.signal.symbol} -> ${parsed.targetStatus} (message_id: ${messageId}, signalId: ${matchResult.signal.id})`
        );

        return NextResponse.json(
          {
            ok: true,
            status: "processed",
            action: "updated",
            signalId: matchResult.signal.id,
            targetStatus: parsed.targetStatus,
            message_id: messageId,
          },
          { status: 200 }
        );
      }

      if (matchResult && !matchResult.wasMutated) {
        console.log(
          `[Telegram Webhook] Ignored forbidden status transition for ${matchResult.signal.symbol} (${matchResult.signal.status} -> ${parsed.targetStatus})`
        );

        return NextResponse.json(
          {
            ok: true,
            status: "processed",
            action: "ignored_forbidden_transition",
            signalId: matchResult.signal.id,
            currentStatus: matchResult.signal.status,
          },
          { status: 200 }
        );
      }

      // If no open candidate matches, store as unparsed update so event is recorded
      const unparsedFallback = signalStore.add({
        id: `unmatched-update-${messageId}`,
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

      console.log(
        `New signal (unmatched status update stored): ${parsed.rawText} (message_id: ${messageId})`
      );

      return NextResponse.json(
        {
          ok: true,
          status: "processed",
          action: "unparsed_update",
          signalId: unparsedFallback.id,
          message_id: messageId,
        },
        { status: 200 }
      );
    }

    // Fallback: UNPARSED non-conforming messages stored with raw payload intact
    if (parsed.kind === "UNPARSED") {
      const stored = signalStore.add(parsed.signal);
      console.log(
        `New signal (unparsed payload): "${text.slice(0, 80).replace(/\n/g, " ")}" (message_id: ${messageId})`
      );

      return NextResponse.json(
        {
          ok: true,
          status: "processed",
          action: "unparsed",
          signalId: stored.id,
          message_id: messageId,
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
