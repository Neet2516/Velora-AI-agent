import { describe, it, expect } from "vitest";
import { parseTelegramMessage } from "@/lib/telegram/parser";

describe("lib/telegram/parser - parseTelegramMessage", () => {
  it("successfully parses a canonical BUY signal with all 3 TPs", () => {
    const raw = `NEW SIGNAL
Symbol: XAUUSD
Type: BUY
Entry: 2650.50
SL: 2645.00
TP1: 2656.00
TP2: 2661.00
TP3: 2666.00`;

    const result = parseTelegramMessage(raw, { messageId: 101 });
    expect(result.kind).toBe("NEW_SIGNAL");

    if (result.kind === "NEW_SIGNAL") {
      expect(result.signal.id).toBe("tg-101");
      expect(result.signal.asset).toBe("XAUUSD");
      expect(result.signal.direction).toBe("BUY");
      expect(result.signal.entry).toBe(2650.5);
      expect(result.signal.sl).toBe(2645.0);
      expect(result.signal.tp1).toBe(2656.0);
      expect(result.signal.tp2).toBe(2661.0);
      expect(result.signal.tp3).toBe(2666.0);
      expect(result.signal.status).toBe("ACTIVE");
      expect(result.signal.raw_text).toBe(raw);
    }
  });

  it("successfully parses a SELL signal with only TP1", () => {
    const raw = `NEW SIGNAL
Symbol: BTCUSDT
Type: SELL
Entry: 98500
SL: 99500
TP1: 97000`;

    const result = parseTelegramMessage(raw);
    expect(result.kind).toBe("NEW_SIGNAL");

    if (result.kind === "NEW_SIGNAL") {
      expect(result.signal.symbol).toBe("BTC/USDT");
      expect(result.signal.direction).toBe("SELL");
      expect(result.signal.tp1).toBe(97000);
      expect(result.signal.tp2).toBeNull();
      expect(result.signal.tp3).toBeNull();
    }
  });

  it("successfully parses signal with TP1 and TP2", () => {
    const raw = `NEW SIGNAL
Symbol: ETH/USDT
Type: LONG
Entry: 3200
SL: 3100
TP1: 3300
TP2: 3400`;

    const result = parseTelegramMessage(raw);
    expect(result.kind).toBe("NEW_SIGNAL");

    if (result.kind === "NEW_SIGNAL") {
      expect(result.signal.symbol).toBe("ETH/USDT");
      expect(result.signal.tp1).toBe(3300);
      expect(result.signal.tp2).toBe(3400);
      expect(result.signal.tp3).toBeNull();
    }
  });

  it("identifies status update: TP1 HIT", () => {
    const raw = "TP1 HIT";
    const result = parseTelegramMessage(raw, { replyToMessageId: 101 });
    expect(result.kind).toBe("STATUS_UPDATE");

    if (result.kind === "STATUS_UPDATE") {
      expect(result.targetStatus).toBe("TP1_HIT");
      expect(result.replyToMessageId).toBe(101);
    }
  });

  it("identifies status update with symbol: XAUUSD TP2 HIT", () => {
    const raw = "XAUUSD TP2 HIT";
    const result = parseTelegramMessage(raw);
    expect(result.kind).toBe("STATUS_UPDATE");

    if (result.kind === "STATUS_UPDATE") {
      expect(result.targetStatus).toBe("TP2_HIT");
      expect(result.symbol).toBe("XAUUSD");
    }
  });

  it("identifies status update: TP3 HIT", () => {
    const result = parseTelegramMessage("TP3 HIT");
    expect(result.kind).toBe("STATUS_UPDATE");
    if (result.kind === "STATUS_UPDATE") {
      expect(result.targetStatus).toBe("TP3_HIT");
    }
  });

  it("identifies status update: SL HIT", () => {
    const result = parseTelegramMessage("SL HIT");
    expect(result.kind).toBe("STATUS_UPDATE");
    if (result.kind === "STATUS_UPDATE") {
      expect(result.targetStatus).toBe("SL_HIT");
    }
  });

  it("returns UNPARSED for unrecognized marketing message", () => {
    const raw = "Join our VIP channel for 50% discount this weekend only!";
    const result = parseTelegramMessage(raw);
    expect(result.kind).toBe("UNPARSED");

    if (result.kind === "UNPARSED") {
      expect(result.signal.status).toBe("UNPARSED");
      expect(result.signal.raw_text).toBe(raw);
      expect(result.signal.entry).toBeNull();
    }
  });

  it("returns UNPARSED when NEW SIGNAL is missing required entry or TP", () => {
    const raw = `NEW SIGNAL
Symbol: SOLUSDT
Type: BUY
Entry: 240`;

    const result = parseTelegramMessage(raw);
    expect(result.kind).toBe("UNPARSED");
    if (result.kind === "UNPARSED") {
      expect(result.signal.status).toBe("UNPARSED");
    }
  });

  it("handles null and empty string safely without throwing", () => {
    const result1 = parseTelegramMessage(null);
    expect(result1.kind).toBe("UNPARSED");

    const result2 = parseTelegramMessage("");
    expect(result2.kind).toBe("UNPARSED");

    const result3 = parseTelegramMessage("   ");
    expect(result3.kind).toBe("UNPARSED");
  });
});
