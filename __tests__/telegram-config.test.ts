import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getTelegramConfig, validateWebhookSecret } from "@/lib/telegram/config";

describe("lib/telegram/config", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("reads server environment variables correctly", () => {
    process.env.TELEGRAM_BOT_TOKEN = "test_token_123";
    process.env.TELEGRAM_WEBHOOK_SECRET = "secret_xyz";

    const config = getTelegramConfig();
    expect(config.botToken).toBe("test_token_123");
    expect(config.webhookSecret).toBe("secret_xyz");
    expect(config.botUsername).toBe("VlgSignal_bot");
    expect(config.isConfigured).toBe(true);
  });

  it("returns null when environment variables are missing", () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_WEBHOOK_SECRET;

    const config = getTelegramConfig();
    expect(config.botToken).toBeNull();
    expect(config.webhookSecret).toBeNull();
    expect(config.isConfigured).toBe(false);
  });

  it("validates webhook secret using constant-time check", () => {
    process.env.TELEGRAM_WEBHOOK_SECRET = "super_secure_webhook_secret";

    expect(validateWebhookSecret("super_secure_webhook_secret")).toBe(true);
    expect(validateWebhookSecret("wrong_secret")).toBe(false);
    expect(validateWebhookSecret("")).toBe(false);
    expect(validateWebhookSecret(null)).toBe(false);
    expect(validateWebhookSecret(undefined)).toBe(false);
  });

  it("rejects all webhook attempts when TELEGRAM_WEBHOOK_SECRET is not configured", () => {
    delete process.env.TELEGRAM_WEBHOOK_SECRET;

    expect(validateWebhookSecret("any_token")).toBe(false);
  });
});
