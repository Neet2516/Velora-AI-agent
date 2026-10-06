import { Signal, SignalDirection, SignalStatus } from "@/lib/types/signal";
import { normalizeSymbol } from "@/lib/schemas/signal";
import { ParsedTelegramResult } from "./types";

/**
 * Pure parser function for Telegram signal pipeline.
 * Evaluates raw text dispatches into NEW_SIGNAL, STATUS_UPDATE, or UNPARSED.
 */
export function parseTelegramMessage(
  rawText?: string | null,
  options?: {
    messageId?: number;
    replyToMessageId?: number;
    timestamp?: string;
  }
): ParsedTelegramResult {
  const text = rawText ? rawText.trim() : "";
  const isoTime = options?.timestamp || new Date().toISOString();
  const idPrefix = options?.messageId ? `tg-${options.messageId}` : `tg-${Date.now()}`;

  // 1. Guard against empty/whitespace transmissions
  if (!text) {
    return {
      kind: "UNPARSED",
      signal: {
        id: idPrefix,
        symbol: "UNKNOWN",
        asset: "UNKNOWN",
        direction: null,
        entry: null,
        entry_price: null,
        sl: null,
        tp1: null,
        tp2: null,
        tp3: null,
        status: "UNPARSED",
        raw_text: "Message could not be parsed: empty content received.",
        created_at: isoTime,
        source: "telegram",
      },
    };
  }

  // 2. Check for Trade Status Updates (TP1/2/3 HIT, SL HIT)
  const updateMatch = checkStatusUpdate(text);
  if (updateMatch) {
    return {
      kind: "STATUS_UPDATE",
      targetStatus: updateMatch.status,
      symbol: updateMatch.symbol,
      rawText: text,
      replyToMessageId: options?.replyToMessageId,
      timestamp: isoTime,
    };
  }

  // 3. Check for Canonical NEW SIGNAL structure
  const isNewSignalHeader = /NEW\s+SIGNAL/i.test(text);

  if (isNewSignalHeader) {
    const parsedSignal = extractCanonicalSignal(text, idPrefix, isoTime);
    if (parsedSignal) {
      return {
        kind: "NEW_SIGNAL",
        signal: parsedSignal,
      };
    }
  }

  // 4. Fallback for unrecognized or partially malformed syntax
  return {
    kind: "UNPARSED",
    signal: {
      id: idPrefix,
      symbol: "UNKNOWN",
      asset: "UNKNOWN",
      direction: null,
      entry: null,
      entry_price: null,
      sl: null,
      tp1: null,
      tp2: null,
      tp3: null,
      status: "UNPARSED",
      raw_text: text,
      created_at: isoTime,
      source: "telegram",
    },
  };
}

/**
 * Checks if the message is a status milestone update.
 */
function checkStatusUpdate(
  text: string
): { status: SignalStatus; symbol?: string } | null {
  // Common update patterns: "TP1 HIT", "TP2 HIT", "TP3 HIT", "SL HIT"
  // Also supports optional symbol prefix: "XAUUSD TP1 HIT" or "BTC/USDT SL HIT"
  const patterns: Array<{ regex: RegExp; status: SignalStatus }> = [
    { regex: /(?:^|\s)(?:([A-Za-z0-9_/]+)\s+)?TP\s*1\s*HIT\b/i, status: "TP1_HIT" },
    { regex: /(?:^|\s)(?:([A-Za-z0-9_/]+)\s+)?TP\s*2\s*HIT\b/i, status: "TP2_HIT" },
    { regex: /(?:^|\s)(?:([A-Za-z0-9_/]+)\s+)?TP\s*3\s*HIT\b/i, status: "TP3_HIT" },
    { regex: /(?:^|\s)(?:([A-Za-z0-9_/]+)\s+)?SL\s*HIT\b/i, status: "SL_HIT" },
  ];

  for (const { regex, status } of patterns) {
    const match = text.match(regex);
    if (match) {
      const rawSymbol = match[1]?.trim();
      const symbol = rawSymbol ? normalizeSymbol(rawSymbol) : undefined;
      return { status, symbol };
    }
  }

  return null;
}

/**
 * Extracts and validates fields from canonical "NEW SIGNAL" format.
 */
function extractCanonicalSignal(
  text: string,
  id: string,
  created_at: string
): Signal | null {
  // Symbol / Asset (e.g. Symbol: XAUUSD, Pair: BTCUSDT)
  const symbolMatch = text.match(/(?:Symbol|Pair|Asset)\s*:\s*([A-Za-z0-9_/]+)/i);
  // Direction / Type (BUY, SELL, LONG, SHORT)
  const directionMatch = text.match(/(?:Type|Direction|Side|Action)\s*:\s*(BUY|SELL|LONG|SHORT)/i);
  // Entry price
  const entryMatch = text.match(/(?:Entry|Entry\s*Price)\s*:\s*([\d.]+)/i);
  // Stop Loss
  const slMatch = text.match(/(?:SL|Stop\s*Loss)\s*:\s*([\d.]+)/i);
  // Take Profit 1 (Required)
  const tp1Match = text.match(/(?:TP1|Take\s*Profit\s*1)\s*:\s*([\d.]+)/i);
  // Take Profit 2 (Optional)
  const tp2Match = text.match(/(?:TP2|Take\s*Profit\s*2)\s*:\s*([\d.]+)/i);
  // Take Profit 3 (Optional)
  const tp3Match = text.match(/(?:TP3|Take\s*Profit\s*3)\s*:\s*([\d.]+)/i);

  // Core required fields for a valid actionable trade
  if (!symbolMatch || !directionMatch || !entryMatch || !slMatch || !tp1Match) {
    return null;
  }

  const rawSymbol = symbolMatch[1].trim();
  const normalizedSymbol = normalizeSymbol(rawSymbol);
  const direction = directionMatch[1].toUpperCase() as SignalDirection;
  const entry = parseFloat(entryMatch[1]);
  const sl = parseFloat(slMatch[1]);
  const tp1 = parseFloat(tp1Match[1]);
  const tp2 = tp2Match ? parseFloat(tp2Match[1]) : null;
  const tp3 = tp3Match ? parseFloat(tp3Match[1]) : null;

  // Validate numeric values are valid finite positive numbers
  if (
    isNaN(entry) ||
    isNaN(sl) ||
    isNaN(tp1) ||
    (tp2 !== null && isNaN(tp2)) ||
    (tp3 !== null && isNaN(tp3))
  ) {
    return null;
  }

  return {
    id,
    symbol: normalizedSymbol,
    asset: normalizedSymbol,
    direction,
    entry,
    entry_price: entry,
    sl,
    tp1,
    tp2,
    tp3,
    status: "ACTIVE",
    raw_text: text,
    created_at,
    source: "telegram",
  };
}
