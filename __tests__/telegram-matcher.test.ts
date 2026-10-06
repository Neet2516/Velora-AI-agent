import { describe, it, expect, beforeEach } from "vitest";
import { SignalStore } from "@/lib/store/signals";
import { matchAndUpdateSignal, isTransitionAllowed } from "@/lib/telegram/matcher";
import { Signal } from "@/lib/types/signal";

describe("lib/telegram/matcher - matchAndUpdateSignal & isTransitionAllowed", () => {
  let store: SignalStore;

  const btcSignal: Signal = {
    id: "tg-100",
    symbol: "BTC/USDT",
    asset: "BTC/USDT",
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

  const xauSignal: Signal = {
    id: "tg-200",
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
    created_at: "2026-10-06T11:00:00.000Z",
    source: "telegram",
    raw_text: null,
  };

  beforeEach(() => {
    store = new SignalStore([]);
  });

  describe("Transition Rules (isTransitionAllowed)", () => {
    it("allows valid forward transitions from ACTIVE", () => {
      expect(isTransitionAllowed("ACTIVE", "TP1_HIT")).toBe(true);
      expect(isTransitionAllowed("ACTIVE", "SL_HIT")).toBe(true);
    });

    it("allows transitions from TP1_HIT to TP2_HIT and SL_HIT", () => {
      expect(isTransitionAllowed("TP1_HIT", "TP2_HIT")).toBe(true);
      expect(isTransitionAllowed("TP1_HIT", "SL_HIT")).toBe(true);
    });

    it("forbids transitions from terminal states SL_HIT and TP3_HIT", () => {
      expect(isTransitionAllowed("SL_HIT", "TP1_HIT")).toBe(false);
      expect(isTransitionAllowed("TP3_HIT", "SL_HIT")).toBe(false);
      expect(isTransitionAllowed("TP3_HIT", "TP1_HIT")).toBe(false);
    });

    it("forbids backward transitions to ACTIVE or lower TPs", () => {
      expect(isTransitionAllowed("TP2_HIT", "ACTIVE")).toBe(false);
      expect(isTransitionAllowed("TP2_HIT", "TP1_HIT")).toBe(false);
    });
  });

  describe("Stable Signal Identity Strategy Matching", () => {
    beforeEach(() => {
      store.add(btcSignal); // 10:00
      store.add(xauSignal); // 11:00
    });

    it("Resolution Priority 1: matches by replyToMessageId directly", () => {
      const result = matchAndUpdateSignal(
        {
          targetStatus: "TP1_HIT",
          replyToMessageId: 100, // Points to tg-100 (BTC)
          timestamp: "2026-10-06T12:00:00.000Z",
          rawText: "TP1 HIT",
        },
        store
      );

      expect(result).not.toBeNull();
      expect(result?.signal.id).toBe("tg-100");
      expect(result?.signal.status).toBe("TP1_HIT");

      // Verify in store - NO duplicate card created!
      expect(store.count()).toBe(2);
      expect(store.getById("tg-100")?.status).toBe("TP1_HIT");
    });

    it("Resolution Priority 2: matches by explicit Symbol", () => {
      const result = matchAndUpdateSignal(
        {
          targetStatus: "SL_HIT",
          symbol: "BTC/USDT",
          timestamp: "2026-10-06T12:00:00.000Z",
          rawText: "BTC SL HIT",
        },
        store
      );

      expect(result?.signal.id).toBe("tg-100");
      expect(result?.signal.status).toBe("SL_HIT");
      expect(store.count()).toBe(2);
    });

    it("Resolution Priority 3: matches latest active signal when neither reply nor symbol provided", () => {
      const result = matchAndUpdateSignal(
        {
          targetStatus: "TP1_HIT",
          timestamp: "2026-10-06T12:00:00.000Z",
          rawText: "TP1 HIT",
        },
        store
      );

      // xauSignal is newest (11:00 vs 10:00)
      expect(result?.signal.id).toBe("tg-200");
      expect(result?.signal.status).toBe("TP1_HIT");
      expect(store.count()).toBe(2);
    });

    it("returns null when no active signal matches", () => {
      store.clear();
      const result = matchAndUpdateSignal(
        {
          targetStatus: "TP1_HIT",
          timestamp: "2026-10-06T12:00:00.000Z",
          rawText: "TP1 HIT",
        },
        store
      );

      expect(result).toBeNull();
    });
  });
});
