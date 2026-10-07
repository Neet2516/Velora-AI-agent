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
  is_demo: z.boolean().optional(),
});

export type Signal = z.infer<typeof SignalSchema>;

/**
 * Validates buy/sell trade parameters for mathematical consistency.
 * For BUY: SL < Entry < TP1 < TP2 < TP3
 * For SELL: TP3 < TP2 < TP1 < Entry < SL
 */
export function validateSignalMetrics(signal: Partial<Signal>): { isValid: boolean; reason?: string } {
  const dir = normalizeDirection(signal.direction);
  const { entry, sl, tp1, tp2, tp3 } = signal;

  if (entry == null || sl == null) {
    return { isValid: true };
  }

  if (dir === "BUY") {
    if (sl >= entry) {
      return { isValid: false, reason: "SL must be below Entry for BUY signals." };
    }
    if (tp1 != null && tp1 <= entry) {
      return { isValid: false, reason: "TP1 must be above Entry for BUY signals." };
    }
    if (tp2 != null && tp1 != null && tp2 <= tp1) {
      return { isValid: false, reason: "TP2 must be above TP1 for BUY signals." };
    }
    if (tp3 != null && tp2 != null && tp3 <= tp2) {
      return { isValid: false, reason: "TP3 must be above TP2 for BUY signals." };
    }
  } else if (dir === "SELL") {
    if (sl <= entry) {
      return { isValid: false, reason: "SL must be above Entry for SELL signals." };
    }
    if (tp1 != null && tp1 >= entry) {
      return { isValid: false, reason: "TP1 must be below Entry for SELL signals." };
    }
    if (tp2 != null && tp1 != null && tp2 >= tp1) {
      return { isValid: false, reason: "TP2 must be below TP1 for SELL signals." };
    }
    if (tp3 != null && tp2 != null && tp3 >= tp2) {
      return { isValid: false, reason: "TP3 must be below TP2 for SELL signals." };
    }
  }

  return { isValid: true };
}

/**
 * Calculates dynamic mathematical Risk-to-Reward ratio
 * Risk = abs(Entry - SL)
 * Reward = abs(Target - Entry)
 * R:R = Reward / Risk
 */
export function calculateRR(
  entry?: number | null,
  sl?: number | null,
  target?: number | null
): string | null {
  if (entry == null || sl == null || target == null) return null;
  const risk = Math.abs(entry - sl);
  const reward = Math.abs(target - entry);
  if (risk === 0) return null;
  const ratio = reward / risk;
  const formatted = Math.abs(ratio - Math.round(ratio)) < 0.05 ? Math.round(ratio).toString() : ratio.toFixed(1);
  return `1:${formatted}`;
}

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

