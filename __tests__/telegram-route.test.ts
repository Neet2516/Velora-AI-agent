import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST, GET } from "@/app/api/telegram/route";

describe("app/api/telegram/route - Webhook Skeleton", () => {
  it("returns 200 and acknowledges valid JSON payload", async () => {
    const fakeUpdate = {
      update_id: 12345,
      message: {
        message_id: 1,
        text: "NEW SIGNAL\nSymbol: BTCUSDT\nType: BUY",
      },
    };

    const req = new NextRequest("http://localhost:3000/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fakeUpdate),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.status).toBe("received");
    expect(json.update_id).toBe(12345);
  });

  it("returns 400 when request body is not valid JSON", async () => {
    const req = new NextRequest("http://localhost:3000/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.error).toContain("Invalid request body");
  });

  it("returns 405 Method Not Allowed on GET request", async () => {
    const res = await GET();
    expect(res.status).toBe(405);
  });
});
