import { describe, it, expect, beforeEach } from "vitest";
import { GET } from "@/app/api/signals/route";
import { signalStore } from "@/lib/store/signals";
import { Signal } from "@/lib/types/signal";

describe("app/api/signals/route - Live Signals Endpoint", () => {
  beforeEach(() => {
    signalStore.clear();
  });

  it("returns 200 with empty list when store has no signals", async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.data).toEqual([]);
    expect(json.meta.total).toBe(0);
  });

  it("returns live signals added to the store in newest-first order", async () => {
    const sig1: Signal = {
      id: "sig-live-1",
      symbol: "BTC/USDT",
      asset: "BTC/USDT",
      direction: "BUY",
      entry: 98000,
      entry_price: 98000,
      sl: 97000,
      tp1: 99000,
      tp2: null,
      tp3: null,
      status: "ACTIVE",
      created_at: "2026-10-06T10:00:00.000Z",
      source: "telegram",
      raw_text: null,
    };

    const sig2: Signal = {
      id: "sig-live-2",
      symbol: "XAUUSD",
      asset: "XAUUSD",
      direction: "BUY",
      entry: 2650.5,
      entry_price: 2650.5,
      sl: 2645.0,
      tp1: 2656.0,
      tp2: null,
      tp3: null,
      status: "ACTIVE",
      created_at: "2026-10-06T10:05:00.000Z",
      source: "telegram",
      raw_text: null,
    };

    signalStore.add(sig1);
    signalStore.add(sig2);

    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.data).toHaveLength(2);
    expect(json.data[0].id).toBe("sig-live-2"); // Newest first
    expect(json.data[1].id).toBe("sig-live-1");
  });

  it("reflects in-place signal mutations without card duplicates", async () => {
    const sig: Signal = {
      id: "sig-sync-1",
      symbol: "ETH/USDT",
      asset: "ETH/USDT",
      direction: "BUY",
      entry: 3200,
      entry_price: 3200,
      sl: 3100,
      tp1: 3300,
      tp2: null,
      tp3: null,
      status: "ACTIVE",
      created_at: "2026-10-06T10:00:00.000Z",
      source: "telegram",
      raw_text: null,
    };

    signalStore.add(sig);

    // Update state to TP1_HIT
    signalStore.update("sig-sync-1", { status: "TP1_HIT" });

    const res = await GET();
    const json = await res.json();

    expect(json.data).toHaveLength(1);
    expect(json.data[0].id).toBe("sig-sync-1");
    expect(json.data[0].status).toBe("TP1_HIT");
  });
});
