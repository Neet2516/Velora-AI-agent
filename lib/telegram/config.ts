import crypto from "crypto";

export interface TelegramConfig {
  botToken: string | null;
  webhookSecret: string | null;
  botUsername: string;
  isConfigured: boolean;
}

/**
 * Server-only Telegram bot configuration helper for @VlgSignal_bot.
 * Strictly forbidden from running in browser/client components.
 */
export function getTelegramConfig(): TelegramConfig {
  if (typeof window !== "undefined") {
    throw new Error(
      "[Security Violation] Attempted to access Telegram server configuration from client context."
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim() || null;
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET?.trim() || null;

  return {
    botToken,
    webhookSecret,
    botUsername: "VlgSignal_bot",
    isConfigured: Boolean(botToken && botToken.length > 0),
  };
}

/**
 * Constant-time comparison for incoming Telegram webhook secret headers.
 * Protects against timing side-channel attacks.
 */
export function validateWebhookSecret(
  incomingSecret: string | null | undefined
): boolean {
  const { webhookSecret } = getTelegramConfig();

  // If no secret is configured in the environment, reject all requests in production
  if (!webhookSecret || !incomingSecret) {
    return false;
  }

  const expectedBuffer = Buffer.from(webhookSecret, "utf8");
  const incomingBuffer = Buffer.from(incomingSecret, "utf8");

  if (expectedBuffer.length !== incomingBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, incomingBuffer);
}
