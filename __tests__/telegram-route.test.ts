import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST, GET } from "@/app/api/telegram/route";
import { signalStore } from "@/lib/store/signals";

describe("app/api/telegram/route - Webhook Secret Verification & Ingestion", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    signalStore.clear();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("rejects request with 401 when TELEGRAM_WEBHOOK_SECRET is set but header is missing/invalid", async () => {
    process.env.TELEGRAM_WEBHOOK_SECRET = "super_secret_webhook_token";

    const req = new NextRequest("http://localhost:3000/api/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-telegram-bot-api-secret-token": "wrong_token",
      },
      body: JSON.stringify({ update_id: 1 }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);

    const json = await res.json();
    expect(json.error).toContain("Unauthorized");
  });

  it("accepts and processes valid NEW SIGNAL update when secret matches", async () => {
    process.env.TELEGRAM_WEBHOOK_SECRET = "valid_secret_key";

    const fakeUpdate = {
      update_id: 9999,
      message: {
        message_id: 501,
        date: 1728216000,
        text: `NEW SIGNAL
Symbol: XAUUSD
Type: BUY
Entry: 2650.50
SL: 2645.00
TP1: 2656.00
TP2: 2661.00
TP3: 2666.00`,
      },
    };

    const req = new NextRequest("http://localhost:3000/api/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-telegram-bot-api-secret-token": "valid_secret_key",
      },
      body: JSON.stringify(fakeUpdate),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.action).toBe("created");

    // Signal must be persisted in SignalStore
    const stored = signalStore.getById("tg-501");
    expect(stored).toBeDefined();
    expect(stored?.asset).toBe("XAUUSD");
    expect(stored?.status).toBe("ACTIVE");
    expect(stored?.entry).toBe(2650.5);
  });

  it("accepts channel_post updates from Telegram channels", async () => {
    delete process.env.TELEGRAM_WEBHOOK_SECRET;

    const channelUpdate = {
      update_id: 10001,
      channel_post: {
        message_id: 701,
        date: 1728216050,
        text: `NEW SIGNAL
Symbol: BTCUSDT
Type: SELL
Entry: 98000
SL: 99000
TP1: 97000`,
      },
    };

    const req = new NextRequest("http://localhost:3000/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(channelUpdate),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.action).toBe("created");

    const stored = signalStore.getById("tg-701");
    expect(stored?.symbol).toBe("BTC/USDT");
    expect(stored?.direction).toBe("SELL");
  });

  it("gracefully ignores non-message updates (e.g. callback_query)", async () => {
    delete process.env.TELEGRAM_WEBHOOK_SECRET;

    const nonMessageUpdate = {
      update_id: 8888,
      callback_query: {
        id: "cb-123",
      },
    };

    const req = new NextRequest("http://localhost:3000/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nonMessageUpdate),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.status).toBe("ignored");
    expect(json.reason).toBe("no_message_payload");
  });

  it("stores unparsed messages without dropping them", async () => {
    delete process.env.TELEGRAM_WEBHOOK_SECRET;

    const chatUpdate = {
      update_id: 7777,
      message: {
        message_id: 801,
        date: 1728216100,
        text: "Weekly recap: our traders gained 1200 pips this week!",
      },
    };

    const req = new NextRequest("http://localhost:3000/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatUpdate),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.action).toBe("unparsed");

    const stored = signalStore.getById("tg-801");
    expect(stored).toBeDefined();
    expect(stored?.status).toBe("UNPARSED");
    expect(stored?.raw_text).toContain("Weekly recap");
  });

  it("returns 405 on GET request", async () => {
    const res = await GET();
    expect(res.status).toBe(405);
  });
});
