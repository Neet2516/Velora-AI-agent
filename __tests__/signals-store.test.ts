import { describe, it, expect, beforeEach } from "vitest";
import { SignalStore } from "@/lib/store/signals";
import { Signal } from "@/lib/types/signal";

describe("lib/store/signals - SignalStore", () => {
  let store: SignalStore;

  const mockSignalA: Signal = {
    id: "sig-store-1",
    asset: "BTC/USDT",
    symbol: "BTC/USDT",
    direction: "BUY",
    entry: 98000,
    entry_price: 98000,
    sl: 97000,
    tp1: 99000,
    tp2: 100000,
    tp3: null,
    status: "ACTIVE",
    created_at: "2026-10-06T10:00:00.000Z",
    source: "telegram",
    raw_text: null,
  };

  const mockSignalB: Signal = {
    id: "sig-store-2",
    asset: "ETH/USDT",
    symbol: "ETH/USDT",
    direction: "SELL",
    entry: 3200,
    entry_price: 3200,
    sl: 3300,
    tp1: 3100,
    tp2: null,
    tp3: null,
    status: "ACTIVE",
    created_at: "2026-10-06T11:00:00.000Z",
    source: "telegram",
    raw_text: null,
  };

  beforeEach(() => {
    store = new SignalStore([]);
  });

  it("adds signals and orders them newest-first", () => {
    store.add(mockSignalA); // 10:00
    store.add(mockSignalB); // 11:00

    const signals = store.getAll();
    expect(signals).toHaveLength(2);
    expect(signals[0].id).toBe("sig-store-2"); // Newest first
    expect(signals[1].id).toBe("sig-store-1");
  });

  it("updates existing signal in-place without creating duplicate card", () => {
    store.add(mockSignalA);
    expect(store.count()).toBe(1);

    const updated = store.update("sig-store-1", { status: "TP1_HIT" });
    expect(updated).not.toBeNull();
    expect(updated?.status).toBe("TP1_HIT");

    // Total count remains 1
    expect(store.count()).toBe(1);
    expect(store.getById("sig-store-1")?.status).toBe("TP1_HIT");
  });

  it("deduplicates automatically when add() is called with existing ID", () => {
    store.add(mockSignalA);

    const mutatedA: Signal = {
      ...mockSignalA,
      status: "SL_HIT",
    };

    store.add(mutatedA);
    expect(store.count()).toBe(1);
    expect(store.getById("sig-store-1")?.status).toBe("SL_HIT");
  });

  it("finds latest active signal by symbol", () => {
    store.add(mockSignalA); // BTC 10:00 ACTIVE
    store.add(mockSignalB); // ETH 11:00 ACTIVE

    const latestBtc = store.findLatestActive("BTC/USDT");
    expect(latestBtc?.id).toBe("sig-store-1");

    const latestEth = store.findLatestActive("ETH/USDT");
    expect(latestEth?.id).toBe("sig-store-2");
  });

  it("finds overall latest active signal when symbol is omitted", () => {
    store.add(mockSignalA); // 10:00
    store.add(mockSignalB); // 11:00

    const latest = store.findLatestActive();
    expect(latest?.id).toBe("sig-store-2");
  });

  it("ignores terminal signals (SL_HIT, TP3_HIT) when looking for latest active", () => {
    store.add({
      ...mockSignalB,
      status: "SL_HIT",
    });
    store.add(mockSignalA); // ACTIVE

    const latest = store.findLatestActive();
    expect(latest?.id).toBe("sig-store-1");
  });
});
