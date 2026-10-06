import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST as telegramWebhookPost } from "@/app/api/telegram/route";
import { GET as signalsFeedGet } from "@/app/api/signals/route";
import { signalStore } from "@/lib/store/signals";

describe("TASK-029: Telegram Bot Integration Test Suite (15 Scenarios)", () => {
  const SECRET = "test_phase6_webhook_secret";
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, TELEGRAM_WEBHOOK_SECRET: SECRET };
    signalStore.clear();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  function createWebhookReq(body: unknown, secretToken: string | null = SECRET): NextRequest {
    return new NextRequest("http://localhost:3000/api/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secretToken ? { "x-telegram-bot-api-secret-token": secretToken } : {}),
      },
      body: JSON.stringify(body),
    });
  }

  // 1. Valid BUY signal
  it("Scenario 1: processes valid BUY signal with complete parameters", async () => {
    const update = {
      update_id: 1001,
      message: {
        message_id: 1,
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

    const res = await telegramWebhookPost(createWebhookReq(update));
    expect(res.status).toBe(200);

    const feed = await (await signalsFeedGet()).json();
    expect(feed.data).toHaveLength(1);
    expect(feed.data[0].id).toBe("tg-1");
    expect(feed.data[0].asset).toBe("XAUUSD");
    expect(feed.data[0].direction).toBe("BUY");
    expect(feed.data[0].entry).toBe(2650.5);
    expect(feed.data[0].status).toBe("ACTIVE");
  });

  // 2. Valid SELL signal
  it("Scenario 2: processes valid SELL signal", async () => {
    const update = {
      update_id: 1002,
      message: {
        message_id: 2,
        date: 1728216010,
        text: `NEW SIGNAL
Symbol: BTCUSDT
Type: SELL
Entry: 98000
SL: 99000
TP1: 97000`,
      },
    };

    const res = await telegramWebhookPost(createWebhookReq(update));
    expect(res.status).toBe(200);

    const feed = await (await signalsFeedGet()).json();
    expect(feed.data[0].symbol).toBe("BTC/USDT");
    expect(feed.data[0].direction).toBe("SELL");
    expect(feed.data[0].status).toBe("ACTIVE");
  });

  // 3. Signal with only TP1
  it("Scenario 3: processes signal with only TP1 populated", async () => {
    const update = {
      update_id: 1003,
      message: {
        message_id: 3,
        date: 1728216020,
        text: `NEW SIGNAL
Symbol: ETH/USDT
Type: BUY
Entry: 3200
SL: 3100
TP1: 3300`,
      },
    };

    await telegramWebhookPost(createWebhookReq(update));
    const feed = await (await signalsFeedGet()).json();

    expect(feed.data[0].tp1).toBe(3300);
    expect(feed.data[0].tp2).toBeNull();
    expect(feed.data[0].tp3).toBeNull();
  });

  // 4. Signal with TP1 + TP2
  it("Scenario 4: processes signal with TP1 + TP2 populated", async () => {
    const update = {
      update_id: 1004,
      message: {
        message_id: 4,
        date: 1728216030,
        text: `NEW SIGNAL
Symbol: SOLUSDT
Type: LONG
Entry: 240
SL: 230
TP1: 250
TP2: 260`,
      },
    };

    await telegramWebhookPost(createWebhookReq(update));
    const feed = await (await signalsFeedGet()).json();

    expect(feed.data[0].tp1).toBe(250);
    expect(feed.data[0].tp2).toBe(260);
    expect(feed.data[0].tp3).toBeNull();
  });

  // 5. Signal with TP1 + TP2 + TP3
  it("Scenario 5: processes signal with all 3 take profits", async () => {
    const update = {
      update_id: 1005,
      message: {
        message_id: 5,
        date: 1728216040,
        text: `NEW SIGNAL
Symbol: EURUSD
Type: SHORT
Entry: 1.0850
SL: 1.0900
TP1: 1.0800
TP2: 1.0750
TP3: 1.0700`,
      },
    };

    await telegramWebhookPost(createWebhookReq(update));
    const feed = await (await signalsFeedGet()).json();

    expect(feed.data[0].tp1).toBe(1.08);
    expect(feed.data[0].tp2).toBe(1.075);
    expect(feed.data[0].tp3).toBe(1.07);
  });

  // 6. TP1 HIT update
  it("Scenario 6: mutates active signal to TP1_HIT without duplicate cards", async () => {
    // Initial signal
    await telegramWebhookPost(
      createWebhookReq({
        update_id: 1006,
        message: {
          message_id: 6,
          date: 1728216000,
          text: `NEW SIGNAL\nSymbol: XAUUSD\nType: BUY\nEntry: 2650\nSL: 2640\nTP1: 2660`,
        },
      })
    );

    // Follow-up TP1 HIT
    const updateRes = await telegramWebhookPost(
      createWebhookReq({
        update_id: 1007,
        message: {
          message_id: 7,
          date: 1728216050,
          text: "TP1 HIT",
        },
      })
    );
    expect(updateRes.status).toBe(200);

    const feed = await (await signalsFeedGet()).json();
    expect(feed.data).toHaveLength(1); // EXACTLY ONE CARD
    expect(feed.data[0].id).toBe("tg-6");
    expect(feed.data[0].status).toBe("TP1_HIT");
  });

  // 7. TP2 HIT update
  it("Scenario 7: advances state to TP2_HIT in place", async () => {
    await telegramWebhookPost(
      createWebhookReq({
        update_id: 1008,
        message: {
          message_id: 8,
          date: 1728216000,
          text: `NEW SIGNAL\nSymbol: BTCUSDT\nType: BUY\nEntry: 98000\nSL: 97000\nTP1: 99000\nTP2: 100000`,
        },
      })
    );

    await telegramWebhookPost(
      createWebhookReq({
        update_id: 1009,
        message: {
          message_id: 9,
          date: 1728216020,
          text: "BTC/USDT TP2 HIT",
        },
      })
    );

    const feed = await (await signalsFeedGet()).json();
    expect(feed.data).toHaveLength(1);
    expect(feed.data[0].status).toBe("TP2_HIT");
  });

  // 8. TP3 HIT update
  it("Scenario 8: advances state to TP3_HIT in place", async () => {
    await telegramWebhookPost(
      createWebhookReq({
        update_id: 1010,
        message: {
          message_id: 10,
          date: 1728216000,
          text: `NEW SIGNAL\nSymbol: XAUUSD\nType: BUY\nEntry: 2650\nSL: 2640\nTP1: 2660`,
        },
      })
    );

    await telegramWebhookPost(
      createWebhookReq({
        update_id: 1011,
        message: {
          message_id: 11,
          date: 1728216050,
          text: "TP3 HIT",
        },
      })
    );

    const feed = await (await signalsFeedGet()).json();
    expect(feed.data).toHaveLength(1);
    expect(feed.data[0].status).toBe("TP3_HIT");
  });

  // 9. SL HIT update
  it("Scenario 9: mutates signal to SL_HIT in place", async () => {
    await telegramWebhookPost(
      createWebhookReq({
        update_id: 1012,
        message: {
          message_id: 12,
          date: 1728216000,
          text: `NEW SIGNAL\nSymbol: ETHUSDT\nType: BUY\nEntry: 3200\nSL: 3100\nTP1: 3300`,
        },
      })
    );

    await telegramWebhookPost(
      createWebhookReq({
        update_id: 1013,
        message: {
          message_id: 13,
          date: 1728216060,
          text: "SL HIT",
        },
      })
    );

    const feed = await (await signalsFeedGet()).json();
    expect(feed.data).toHaveLength(1);
    expect(feed.data[0].status).toBe("SL_HIT");
  });

  // 10. Malformed signal
  it("Scenario 10: does not drop malformed signals; stores as UNPARSED", async () => {
    const update = {
      update_id: 1014,
      message: {
        message_id: 14,
        date: 1728216070,
        text: "Whale alert: 50,000 BTC moved to unknown wallet",
      },
    };

    const res = await telegramWebhookPost(createWebhookReq(update));
    expect(res.status).toBe(200);

    const feed = await (await signalsFeedGet()).json();
    expect(feed.data).toHaveLength(1);
    expect(feed.data[0].status).toBe("UNPARSED");
    expect(feed.data[0].raw_text).toContain("Whale alert");
  });

  // 11. Empty Telegram message
  it("Scenario 11: handles empty message update without throwing", async () => {
    const update = {
      update_id: 1015,
      message: {
        message_id: 15,
        date: 1728216080,
        text: "   ",
      },
    };

    const res = await telegramWebhookPost(createWebhookReq(update));
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.status).toBe("ignored");
  });

  // 12. Duplicate message
  it("Scenario 12: handles duplicate messages idempotently without card duplication", async () => {
    const duplicateUpdate = {
      update_id: 1016,
      message: {
        message_id: 16,
        date: 1728216090,
        text: `NEW SIGNAL\nSymbol: SOLUSDT\nType: BUY\nEntry: 240\nSL: 230\nTP1: 250`,
      },
    };

    // First post
    await telegramWebhookPost(createWebhookReq(duplicateUpdate));
    // Identical second post (retransmission)
    await telegramWebhookPost(createWebhookReq(duplicateUpdate));

    const feed = await (await signalsFeedGet()).json();
    expect(feed.data).toHaveLength(1); // STILL ONE CARD
    expect(feed.data[0].id).toBe("tg-16");
  });

  // 13. Invalid webhook secret
  it("Scenario 13: rejects invalid webhook secret with 401 Unauthorized", async () => {
    const update = {
      update_id: 1017,
      message: { message_id: 17, text: "NEW SIGNAL..." },
    };

    const res = await telegramWebhookPost(createWebhookReq(update, "invalid_secret_token"));
    expect(res.status).toBe(401);

    const feed = await (await signalsFeedGet()).json();
    expect(feed.data).toHaveLength(0); // Nothing saved
  });

  // 14. Unexpected Telegram update
  it("Scenario 14: handles non-message updates gracefully with 200 ignored", async () => {
    const update = {
      update_id: 1018,
      my_chat_member: {
        chat: { id: 123 },
        status: "member",
      },
    };

    const res = await telegramWebhookPost(createWebhookReq(update));
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.status).toBe("ignored");
  });

  // 15. Rapid consecutive signals
  it("Scenario 15: processes rapid consecutive signals preserving order and stable keys", async () => {
    const symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XAUUSD", "BNBUSDT"];

    for (let i = 0; i < symbols.length; i++) {
      const update = {
        update_id: 2000 + i,
        message: {
          message_id: 100 + i,
          date: 1728216000 + i * 10,
          text: `NEW SIGNAL\nSymbol: ${symbols[i]}\nType: BUY\nEntry: 100\nSL: 90\nTP1: 110`,
        },
      };
      await telegramWebhookPost(createWebhookReq(update));
    }

    const feed = await (await signalsFeedGet()).json();
    expect(feed.data).toHaveLength(5);
    // Newest signal (BNBUSDT at 1728216040) must be first
    expect(feed.data[0].symbol).toBe("BNB/USDT");
    expect(feed.data[4].symbol).toBe("BTC/USDT");

    // All IDs must be unique
    const idSet = new Set(feed.data.map((s: { id: string }) => s.id));
    expect(idSet.size).toBe(5);
  });
});
