#!/usr/bin/env node
/**
 * Velora AI - Telegram Webhook Management & Verification Utility
 * Usage:
 *   node scripts/telegram-webhook.mjs info
 *   node scripts/telegram-webhook.mjs set <https://your-domain.com> [optional-secret]
 *   node scripts/telegram-webhook.mjs delete
 *   node scripts/telegram-webhook.mjs test-signal [optional-url] [optional-secret]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

// Load .env.local or .env
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  const env = {};
  for (const file of envFiles) {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...rest] = trimmed.split("=");
          env[key.trim()] = rest.join("=").trim();
        }
      }
    }
  }
  return env;
}

const env = loadEnv();
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET || env.TELEGRAM_WEBHOOK_SECRET || "dev_webhook_secret_placeholder";

const command = process.argv[2] || "info";

if (!BOT_TOKEN) {
  console.error("❌ Error: TELEGRAM_BOT_TOKEN is not configured in .env or .env.local.");
  process.exit(1);
}

const TG_API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function getInfo() {
  console.log("\n📡 === VELORA AI TELEGRAM BOT & WEBHOOK STATUS ===");
  try {
    // 1. Get Bot identity
    const meRes = await fetch(`${TG_API_BASE}/getMe`);
    const meData = await meRes.json();
    if (meData.ok) {
      console.log(`🤖 Bot Identity: @${meData.result.username} (ID: ${meData.result.id}, Name: "${meData.result.first_name}")`);
      console.log(`   Can Join Groups: ${meData.result.can_join_groups}`);
      console.log(`   Privacy Mode (Read All Group Messages): ${meData.result.can_read_all_group_messages ? "Disabled (reads all)" : "Enabled (admin needed for group posts)"}`);
    } else {
      console.error("❌ Failed to query getMe:", meData);
    }

    // 2. Get Webhook status
    const whRes = await fetch(`${TG_API_BASE}/getWebhookInfo`);
    const whData = await whRes.json();
    if (whData.ok) {
      console.log("\n🌐 Webhook Info:");
      console.log(`   URL: ${whData.result.url || "(None set - using getUpdates/polling)"}`);
      console.log(`   Has Custom Cert: ${whData.result.has_custom_certificate}`);
      console.log(`   Pending Update Count: ${whData.result.pending_update_count}`);
      if (whData.result.last_error_date) {
        console.log(`   ⚠️ Last Error (${new Date(whData.result.last_error_date * 1000).toISOString()}): ${whData.result.last_error_message}`);
      }
      if (whData.result.max_connections) {
        console.log(`   Max Connections: ${whData.result.max_connections}`);
      }
    } else {
      console.error("❌ Failed to query getWebhookInfo:", whData);
    }
  } catch (err) {
    console.error("❌ Network or API error:", err);
  }
}

async function setWebhook() {
  let baseUrl = process.argv[3];
  const secret = process.argv[4] || WEBHOOK_SECRET;

  if (!baseUrl) {
    console.error("❌ Error: Please provide your public HTTPS domain URL.");
    console.log("   Example: node scripts/telegram-webhook.mjs set https://your-domain.vercel.app");
    console.log("   Or for local tunnel: node scripts/telegram-webhook.mjs set https://abc.trycloudflare.com");
    process.exit(1);
  }

  // Ensure trailing slash removed
  baseUrl = baseUrl.replace(/\/+$/, "");
  const webhookUrl = baseUrl.endsWith("/api/telegram") ? baseUrl : `${baseUrl}/api/telegram`;

  if (!webhookUrl.startsWith("https://")) {
    console.error("❌ Error: Telegram webhooks require an HTTPS URL.");
    process.exit(1);
  }

  console.log(`\n⚙️ Setting Telegram Webhook...`);
  console.log(`   Webhook URL: ${webhookUrl}`);
  console.log(`   Secret Token: ${secret ? `${secret.slice(0, 4)}...${secret.slice(-4)}` : "(None)"}`);

  try {
    const params = new URLSearchParams({
      url: webhookUrl,
      drop_pending_updates: "false",
    });

    if (secret) {
      params.append("secret_token", secret);
    }

    // Request updates for channel_post, message, edited_channel_post, edited_message
    params.append(
      "allowed_updates",
      JSON.stringify(["message", "channel_post", "edited_message", "edited_channel_post"])
    );

    const res = await fetch(`${TG_API_BASE}/setWebhook?${params.toString()}`, {
      method: "POST",
    });
    const data = await res.json();

    if (data.ok) {
      console.log("✅ SUCCESS: Telegram webhook configured successfully!");
      console.log(`   Telegram Response: ${data.description}`);
      console.log("\n👉 Next steps:");
      console.log(`   1. Ensure TELEGRAM_WEBHOOK_SECRET="${secret}" is set in your server's .env file.`);
      console.log("   2. Add the bot @VlgSignal_bot as an Admin to your Telegram channel: https://t.me/+SUyvL9H24dtmOGQ9");
      console.log("   3. Post a message to test that updates arrive at /api/telegram!");
    } else {
      console.error("❌ Telegram returned an error:", data);
    }
  } catch (err) {
    console.error("❌ Network or API error:", err);
  }
}

async function deleteWebhook() {
  console.log("\n🗑️ Deleting Telegram Webhook...");
  try {
    const res = await fetch(`${TG_API_BASE}/deleteWebhook?drop_pending_updates=true`, {
      method: "POST",
    });
    const data = await res.json();
    if (data.ok) {
      console.log("✅ Webhook deleted. Bot is now in polling mode.");
    } else {
      console.error("❌ Failed to delete webhook:", data);
    }
  } catch (err) {
    console.error("❌ Network or API error:", err);
  }
}

async function testSignal() {
  const targetHost = process.argv[3] || "http://localhost:3000";
  const secret = process.argv[4] || WEBHOOK_SECRET;
  const webhookEndpoint = `${targetHost.replace(/\/+$/, "")}/api/telegram`;
  const signalsEndpoint = `${targetHost.replace(/\/+$/, "")}/api/signals`;

  console.log(`\n🧪 Testing webhook pipeline at: ${webhookEndpoint}`);

  const mockUpdate = {
    update_id: Math.floor(Math.random() * 1000000),
    channel_post: {
      message_id: Math.floor(Math.random() * 90000) + 10000,
      date: Math.floor(Date.now() / 1000),
      chat: {
        id: -10022448899,
        title: "Velora AI VIP Signals",
        type: "channel",
      },
      text: `NEW SIGNAL\nSymbol: XAUUSD\nType: BUY\nEntry: 2650.50\nSL: 2645.00\nTP1: 2656.00\nTP2: 2661.00\nTP3: 2666.00`,
    },
  };

  try {
    const res = await fetch(webhookEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Telegram-Bot-Api-Secret-Token": secret,
      },
      body: JSON.stringify(mockUpdate),
    });

    const resData = await res.json();
    console.log(`📥 POST /api/telegram response (${res.status}):`, resData);

    if (res.status === 200 && resData.ok) {
      console.log("✅ Webhook accepted and processed signal successfully!");

      // Verify GET /api/signals
      console.log(`\n🔍 Verifying with GET ${signalsEndpoint}...`);
      const signalsRes = await fetch(signalsEndpoint);
      const signalsData = await signalsRes.json();
      console.log(`📊 GET /api/signals total signals: ${signalsData.meta?.total}`);
      const latest = signalsData.data?.[0];
      if (latest && latest.symbol === "XAUUSD") {
        console.log(`✅ Latest signal in feed: ${latest.symbol} ${latest.direction} @ ${latest.entry} (Status: ${latest.status})`);
      }
    } else {
      console.error("❌ Webhook returned failure:", resData);
    }
  } catch (err) {
    console.error("❌ Could not reach local endpoint. Ensure Next.js dev server is running on port 3000.", err.message);
  }
}

switch (command) {
  case "info":
  case "get-info":
    getInfo();
    break;
  case "set":
  case "set-webhook":
    setWebhook();
    break;
  case "delete":
  case "delete-webhook":
    deleteWebhook();
    break;
  case "test":
  case "test-signal":
    testSignal();
    break;
  default:
    console.log(`
Commands:
  node scripts/telegram-webhook.mjs info                           - Get bot & webhook info
  node scripts/telegram-webhook.mjs set <PUBLIC_URL> [SECRET]      - Set Telegram webhook URL
  node scripts/telegram-webhook.mjs delete                         - Remove Telegram webhook
  node scripts/telegram-webhook.mjs test-signal [HOST] [SECRET]    - Simulate Telegram signal POST
`);
}
