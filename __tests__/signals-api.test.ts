import { describe, it, expect } from "vitest";
import { deduplicateSignals } from "@/hooks/useSignals";
import { Signal } from "@/lib/types/signal";

describe("deduplicateSignals logic", () => {
  const signal1: Signal = {
    id: "sig-1",
    asset: "BTC/USDT",
    direction: "BUY",
    entry_price: 98000,
    tp1: 99000,
    tp2: 100000,
    tp3: 101000,
    sl: 97000,
    status: "ACTIVE",
    created_at: "2026-10-06T12:00:00Z",
    raw_text: null,
  };

  const signal2: Signal = {
    id: "sig-2",
    asset: "ETH/USDT",
    direction: "BUY",
    entry_price: 3200,
    tp1: 3300,
    tp2: null,
    tp3: null,
    sl: 3100,
    status: "ACTIVE",
    created_at: "2026-10-06T12:10:00Z",
    raw_text: null,
  };

  it("preserves newest-first ordering based on created_at", () => {
    const incoming = [signal1, signal2];
    const result = deduplicateSignals([], incoming);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("sig-2"); // 12:10:00 > 12:00:00
    expect(result[1].id).toBe("sig-1");
  });

  it("replaces existing signals in-place with updated status without duplicating cards", () => {
    const existing = [signal2, signal1];

    const updatedSignal1: Signal = {
      ...signal1,
      status: "TP1_HIT",
    };

    const result = deduplicateSignals(existing, [updatedSignal1]);

    expect(result).toHaveLength(2);
    const updatedFound = result.find((s) => s.id === "sig-1");
    expect(updatedFound).toBeDefined();
    expect(updatedFound?.status).toBe("TP1_HIT");
  });

  it("handles empty arrays gracefully", () => {
    expect(deduplicateSignals([], [])).toEqual([]);
    expect(deduplicateSignals([signal1], [])).toHaveLength(1);
  });
});
