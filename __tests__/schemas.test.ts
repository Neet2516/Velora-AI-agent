import { describe, it, expect } from "vitest";
import {
  SignalSchema,
  SignalListResponseSchema,
  normalizeSymbol,
  normalizeDirection,
  validateSignalMetrics,
  calculateRR,
} from "@/lib/schemas/signal";

describe("SignalSchema validation", () => {
  it("successfully parses a valid ACTIVE signal", () => {
    const raw = {
      id: "sig-001",
      asset: "BTC/USDT",
      direction: "BUY",
      entry_price: 98500,
      tp1: 99500,
      tp2: 101000,
      tp3: 103000,
      sl: 97200,
      status: "ACTIVE",
      created_at: "2026-10-06T12:00:00Z",
      raw_text: null,
    };

    const parsed = SignalSchema.parse(raw);
    expect(parsed.id).toBe("sig-001");
    expect(parsed.asset).toBe("BTC/USDT");
    expect(parsed.status).toBe("ACTIVE");
    expect(parsed.direction).toBe("BUY");
    expect(parsed.tp1).toBe(99500);
  });

  it("successfully parses an UNPARSED signal with null pricing fields", () => {
    const raw = {
      id: "sig-unparsed-1",
      asset: "UNKNOWN",
      direction: "LONG",
      entry_price: null,
      tp1: null,
      tp2: null,
      tp3: null,
      sl: null,
      status: "UNPARSED",
      created_at: "2026-10-06T12:05:00Z",
      raw_text: "Unrecognized market voice note transcription",
    };

    const parsed = SignalSchema.parse(raw);
    expect(parsed.status).toBe("UNPARSED");
    expect(parsed.raw_text).toBe("Unrecognized market voice note transcription");
    expect(parsed.entry_price).toBeNull();
  });

  it("throws validation error when required id is missing", () => {
    const invalid = {
      asset: "ETH/USDT",
      direction: "BUY",
      entry_price: 3200,
      status: "ACTIVE",
      created_at: "2026-10-06T12:00:00Z",
    };

    expect(() => SignalSchema.parse(invalid)).toThrow();
  });

  it("throws validation error on invalid status value", () => {
    const invalid = {
      id: "sig-bad-status",
      asset: "SOL/USDT",
      direction: "BUY",
      entry_price: 240,
      status: "COMPLETED", // Invalid status enum
      created_at: "2026-10-06T12:00:00Z",
    };

    expect(() => SignalSchema.parse(invalid)).toThrow();
  });

  it("throws validation error on invalid direction value", () => {
    const invalid = {
      id: "sig-bad-dir",
      asset: "SOL/USDT",
      direction: "HOLD", // Invalid direction enum
      entry_price: 240,
      status: "ACTIVE",
      created_at: "2026-10-06T12:00:00Z",
    };

    expect(() => SignalSchema.parse(invalid)).toThrow();
  });

  it("throws validation error on malformed created_at timestamp", () => {
    const invalid = {
      id: "sig-bad-time",
      asset: "BTC/USDT",
      direction: "BUY",
      entry_price: 98000,
      status: "ACTIVE",
      created_at: "not-a-date",
    };

    expect(() => SignalSchema.parse(invalid)).toThrow();
  });
});

describe("SignalListResponseSchema validation", () => {
  it("parses valid array of signals", () => {
    const rawList = [
      {
        id: "s1",
        asset: "BTC/USDT",
        direction: "BUY",
        entry_price: 98000,
        status: "ACTIVE",
        created_at: "2026-10-06T12:00:00Z",
      },
      {
        id: "s2",
        asset: "ETH/USDT",
        direction: "SELL",
        entry_price: 3100,
        status: "TP1_HIT",
        created_at: "2026-10-06T11:00:00Z",
      },
    ];

    const parsed = SignalListResponseSchema.parse(rawList);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].id).toBe("s1");
    expect(parsed[1].status).toBe("TP1_HIT");
  });

  it("parses empty signal list", () => {
    const parsed = SignalListResponseSchema.parse([]);
    expect(parsed).toEqual([]);
  });

  it("rejects list if any element fails schema validation", () => {
    const badList = [
      {
        id: "s1",
        asset: "BTC/USDT",
        direction: "BUY",
        entry_price: 98000,
        status: "ACTIVE",
        created_at: "2026-10-06T12:00:00Z",
      },
      {
        id: "s2",
        // missing required fields
      },
    ];

    expect(() => SignalListResponseSchema.parse(badList)).toThrow();
  });
});

describe("Signal normalizers", () => {
  it("normalizes symbols correctly", () => {
    expect(normalizeSymbol("btcusdt")).toBe("BTC/USDT");
    expect(normalizeSymbol("ETH_USDT")).toBe("ETH/USDT");
    expect(normalizeSymbol("sol-usdt")).toBe("SOL/USDT");
    expect(normalizeSymbol("XAU/USD")).toBe("XAU/USD");
  });

  it("normalizes direction aliases correctly", () => {
    expect(normalizeDirection("BUY")).toBe("BUY");
    expect(normalizeDirection("LONG")).toBe("BUY");
    expect(normalizeDirection("sell")).toBe("SELL");
    expect(normalizeDirection("short")).toBe("SELL");
    expect(normalizeDirection(null)).toBe("UNKNOWN");
  });
});

describe("Signal mathematical validation and R:R calculations", () => {
  it("validates a mathematically sound BUY signal (SL < Entry < TP1 < TP2 < TP3)", () => {
    const buySignal = {
      direction: "BUY" as const,
      entry: 4112.5,
      sl: 4103.5,
      tp1: 4121.5,
      tp2: 4130.5,
      tp3: 4139.5,
    };
    const res = validateSignalMetrics(buySignal);
    expect(res.isValid).toBe(true);
  });

  it("invalidates a corrupted BUY signal where SL >= Entry", () => {
    const corrupted = {
      direction: "BUY" as const,
      entry: 4112.5,
      sl: 4115.0, // Invalid!
      tp1: 4121.5,
    };
    const res = validateSignalMetrics(corrupted);
    expect(res.isValid).toBe(false);
    expect(res.reason).toContain("SL must be below Entry");
  });

  it("validates a mathematically sound SELL signal (TP3 < TP2 < TP1 < Entry < SL)", () => {
    const sellSignal = {
      direction: "SELL" as const,
      entry: 4118.0,
      sl: 4127.0,
      tp1: 4109.0,
      tp2: 4100.0,
      tp3: 4091.0,
    };
    const res = validateSignalMetrics(sellSignal);
    expect(res.isValid).toBe(true);
  });

  it("invalidates a corrupted SELL signal where TP1 >= Entry", () => {
    const corrupted = {
      direction: "SELL" as const,
      entry: 4118.0,
      sl: 4127.0,
      tp1: 4120.0, // Invalid!
    };
    const res = validateSignalMetrics(corrupted);
    expect(res.isValid).toBe(false);
    expect(res.reason).toContain("TP1 must be below Entry");
  });

  it("calculates exact dynamic R:R ratios matching market math", () => {
    // Risk = 9.00
    // TP1 = 4121.50 -> Reward = 9.00 -> 1:1
    // TP2 = 4130.50 -> Reward = 18.00 -> 1:2
    // TP3 = 4139.50 -> Reward = 27.00 -> 1:3
    expect(calculateRR(4112.5, 4103.5, 4121.5)).toBe("1:1");
    expect(calculateRR(4112.5, 4103.5, 4130.5)).toBe("1:2");
    expect(calculateRR(4112.5, 4103.5, 4139.5)).toBe("1:3");
  });
});
