import { z } from "zod";

/**
 * Signal Status Lifecycle States
 * Defined in /agent/SIGNAL_STATE_MACHINE.md
 */
export const SignalStatusSchema = z.enum([
  "ACTIVE",
  "TP1_HIT",
  "TP2_HIT",
  "TP3_HIT",
  "SL_HIT",
  "UNPARSED",
]);

export type SignalStatus = z.infer<typeof SignalStatusSchema>;

/**
 * Trade Direction
 * Supports both BUY/SELL and LONG/SHORT notations
 */
export const SignalDirectionSchema = z.enum(["BUY", "SELL", "LONG", "SHORT"]);
export type SignalDirection = z.infer<typeof SignalDirectionSchema>;

/**
 * Canonical Signal Object Schema
 */
export const SignalSchema = z.object({
  id: z.string().min(1, "Signal ID is required"),
  // Asset pair / ticker (e.g. BTC/USDT, XAUUSD)
  symbol: z.string().nullable().optional(),
  asset: z.string().nullable().optional(), // alias support
  direction: SignalDirectionSchema.nullable().optional(),
  entry: z.number().nullable().optional(),
  entry_price: z.number().nullable().optional(),
  sl: z.number().nullable().optional(),
  tp1: z.number().nullable().optional(),
  tp2: z.number().nullable().optional().default(null),
  tp3: z.number().nullable().optional().default(null),
  status: SignalStatusSchema,
  raw_text: z.string().nullable().optional(),
  created_at: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid ISO timestamp"),
  updated_at: z.string().optional(),
  confidence: z.number().nullable().optional(),
  source: z.string().optional(),
});

export type Signal = z.infer<typeof SignalSchema>;

/**
 * Normalized getter helper to resolve symbol/asset
 */
export function getSignalSymbol(signal: Signal): string {
  return signal.symbol || signal.asset || "UNKNOWN";
}

/**
 * Normalizes trading pair strings into standard unified TICKER/BASE format
 */
export function normalizeSymbol(symbol?: string | null): string {
  if (!symbol) return "UNKNOWN";
  const cleaned = symbol.trim().toUpperCase().replace(/[-_]/g, "/");
  if (cleaned.includes("/")) return cleaned;
  if (cleaned.endsWith("USDT") && cleaned.length > 4) {
    return `${cleaned.slice(0, -4)}/USDT`;
  }
  return cleaned;
}

/**
 * Normalized getter helper for direction
 */
export function normalizeDirection(direction?: string | null): "BUY" | "SELL" | "UNKNOWN" {
  if (!direction) return "UNKNOWN";
  const upper = direction.toUpperCase();
  if (upper === "BUY" || upper === "LONG") return "BUY";
  if (upper === "SELL" || upper === "SHORT") return "SELL";
  return "UNKNOWN";
}

/**
 * API Response Envelope Schema - accepts both direct array and wrapped envelope
 */
export const SignalListResponseSchema = z.union([
  z.array(SignalSchema),
  z
    .object({
      data: z.array(SignalSchema),
      meta: z
        .object({
          total: z.number().optional(),
          limit: z.number().optional(),
          offset: z.number().optional(),
        })
        .optional(),
    })
    .transform((val) => val.data),
]);

export type SignalListResponse = z.infer<typeof SignalListResponseSchema>;

