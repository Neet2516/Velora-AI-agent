# Velora AI — Telegram Webhook & Live Signals Setup Guide

Pura step-by-step documentation on how to configure, deploy, test, aur monitor the Telegram Bot Webhook integration for Velora AI (`@VlgSignal_bot`).

---

## 📑 Index
1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Step 1: Add Bot to Telegram Channel as Admin](#step-1-add-bot-to-telegram-channel-as-admin)
4. [Step 2: Environment Variables Configuration](#step-2-environment-variables-configuration)
5. [Step 3: Expose Localhost over HTTPS (Tunneling)](#step-3-expose-localhost-over-https-tunneling)
6. [Step 4: Register Webhook with Telegram](#step-4-register-webhook-with-telegram)
7. [Step 5: Verify Webhook Status](#step-5-verify-webhook-status)
8. [Step 6: Test Signals & Verify Backend Logs](#step-6-test-signals--verify-backend-logs)
9. [Signal Formats Supported](#signal-formats-supported)
10. [CLI Helper Commands Reference](#cli-helper-commands-reference)
11. [Troubleshooting & Common Issues](#troubleshooting--common-issues)

---

## 1. Architecture Overview

Telegram directly signals website tak dispatch nahi karta; humara Next.js server-side backend endpoint Telegram ke webhook events receive karta hai aur frontend dashboard ko serve karta hai:

```
┌─────────────────────────────────┐
│ Telegram Channel / Admin Group   │
│ (https://t.me/+SUyvL9H24dtmOGQ9)│
└────────────────┬────────────────┘
                 │ Admin/User posts signal
                 ▼
┌─────────────────────────────────┐
│ Telegram Bot API Cloud Server   │
└────────────────┬────────────────┘
                 │ HTTPS POST (Webhook)
                 │ Header: X-Telegram-Bot-Api-Secret-Token
                 ▼
┌────────────────────────────────────────────────────────┐
│ Velora AI Backend: POST /api/telegram                  │
│ 1. Verifies timing-safe secret token                   │
│ 2. Extracts message_id, text/caption, date             │
│ 3. Parses canonical signal or TP/SL status update      │
│ 4. Mutates state machine in-place in SignalStore       │
│ 5. Logs "New signal: ..." to backend console           │
│ 6. Returns HTTP 200 { ok: true }                       │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│ Velora AI Public API: GET /api/signals                 │
│ Serves latest 50 signals (newest-first) to website     │
└────────────────┬───────────────────────────────────────┘
                 │ React Query Polling (5s interval)
                 ▼
┌────────────────────────────────────────────────────────┐
│ Velora AI Live Streaming Web Dashboard                │
│ Real-time in-place status transitions (TP hits / SL)   │
└────────────────────────────────────────────────────────┘
```

---

## 2. Prerequisites

1. **Telegram Bot**: `@VlgSignal_bot` (Bot ID: `8812111901`)
2. **Telegram Group/Channel**: [https://t.me/+SUyvL9H24dtmOGQ9](https://t.me/+SUyvL9H24dtmOGQ9)
3. **Node.js**: v20+ or v24+
4. **Local Port**: `http://localhost:3000` (Next.js server)

---

## Step 1: Add Bot to Telegram Channel as Admin

Telegram bots can only read channel posts or group messages if they have admin privileges:

1. Open your Telegram Channel: **[https://t.me/+SUyvL9H24dtmOGQ9](https://t.me/+SUyvL9H24dtmOGQ9)**.
2. Tap on the Channel / Group Name at the top to open settings.
3. Click **Administrators** → **Add Administrator**.
4. Search for: **`@VlgSignal_bot`** (Name: *Signal Terminal*).
5. Give the bot the following permissions:
   * **Post Messages**: Allowed
   * **Edit Messages of Others**: Allowed (recommended)
6. Tap **Save / Done**.

> **Note on Privacy Mode**: If using a Group/Supergroup instead of a Broadcast Channel, making `@VlgSignal_bot` an **Admin** automatically bypasses Telegram Privacy Mode so it receives all text updates. Alternatively, send `/setprivacy` to `@BotFather` and set it to **Disable**.

---

## Step 2: Environment Variables Configuration

Keep `TELEGRAM_BOT_TOKEN` and `TELEGRAM_WEBHOOK_SECRET` **only** in server-side `.env.local` or `.env` files. **Never commit them to git or prefix with `NEXT_PUBLIC_`**.

Create/Update your `.env.local`:

```env
# Public Client Variables
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Server-Only Telegram Bot Variables (@VlgSignal_bot)
TELEGRAM_BOT_TOKEN=8812111901:AAE5w3h0nfEDjJZ9ZV_ijJuWIZjW5uDs3BA
TELEGRAM_WEBHOOK_SECRET=your_secure_webhook_secret_here
```

*(For local testing, default secret `dev_webhook_secret_placeholder` is already configured in `.env.local`).*

---

## Step 3: Expose Localhost over HTTPS (Tunneling)

Telegram requires a publicly reachable **HTTPS** endpoint. Local `http://localhost:3000` direct access nahi ho sakta. Use Cloudflare Tunnel or ngrok:

### Option A: Cloudflare Tunnel (Free & No Account Needed)

Download/run `cloudflared`:
```bash
cloudflared tunnel --url http://localhost:3000
```
Output me ek public HTTPS URL aayegi:
```text
https://random-subdomain.trycloudflare.com
```

### Option B: ngrok

```bash
ngrok http 3000
```
Output me ek public HTTPS URL aayegi:
```text
https://random-subdomain.ngrok-free.app
```

---

## Step 4: Register Webhook with Telegram

Apne public HTTPS URL ko Telegram ke saath register karein:

### Method 1: Using the Built-In Project CLI (Recommended)

```bash
npm run webhook:set -- https://YOUR_TUNNEL_URL.trycloudflare.com
```

Agar custom secret pass karna ho:
```bash
npm run webhook:set -- https://YOUR_TUNNEL_URL.trycloudflare.com your_secure_webhook_secret_here
```

### Method 2: Direct cURL / Browser Call

```bash
curl -X POST "https://api.telegram.org/bot8812111901:AAE5w3h0nfEDjJZ9ZV_ijJuWIZjW5uDs3BA/setWebhook" \
  -d "url=https://YOUR_TUNNEL_URL.trycloudflare.com/api/telegram" \
  -d "secret_token=your_secure_webhook_secret_here" \
  -d 'allowed_updates=["message","channel_post","edited_message","edited_channel_post"]'
```

**Expected Telegram Response:**
```json
{
  "ok": true,
  "result": true,
  "description": "Webhook was set"
}
```

---

## Step 5: Verify Webhook Status

Verify karo ki Telegram webhook active hai ya nahi:

### CLI Command:
```bash
npm run webhook:info
```

### Or Open in Browser:
```text
https://api.telegram.org/bot8812111901:AAE5w3h0nfEDjJZ9ZV_ijJuWIZjW5uDs3BA/getWebhookInfo
```

**Expected Response:**
```json
{
  "ok": true,
  "result": {
    "url": "https://YOUR_TUNNEL_URL.trycloudflare.com/api/telegram",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

---

## Step 6: Test Signals & Verify Backend Logs

### 1. Post a Canonical Trade Signal in Telegram Channel

Channel me ye message send karein:
```text
NEW SIGNAL
Symbol: XAUUSD
Type: BUY
Entry: 2650.50
SL: 2645.00
TP1: 2656.00
TP2: 2661.00
TP3: 2666.00
```

### 2. Verify Backend Server Logs
Next.js server terminal par turant ye log aayega:
```text
New signal: XAUUSD BUY Entry: 2650.5 SL: 2645 TP1: 2656 (message_id: 12345)
POST /api/telegram 200 in 20ms
```

### 3. Verify Signals API
Browser ya terminal me check karein:
```bash
curl http://localhost:3000/api/signals
```
Output me latest 50 signals list hogi, aur top par `XAUUSD` signal visible hoga!

### 4. Test In-Place Status Update (TP1 Hit)
Channel me post karein:
```text
XAUUSD TP1 HIT
```
Backend logs:
```text
New signal status update: XAUUSD -> TP1_HIT (message_id: 12346, signalId: tg-12345)
```
Dashboard par card duplicate nahi hoga, balki existing card par **TARGET 01 (TP1) HIT** highlight ho jaayega!

---

## Signal Formats Supported

### 1. Canonical Trade Signal
```text
NEW SIGNAL
Symbol: BTCUSDT
Type: SELL
Entry: 98000
SL: 99000
TP1: 97000
TP2: 96000
TP3: 95000
```
*Aliases supported: `Symbol:`, `Pair:`, `Asset:`; `Type:`, `Direction:`, `Side:` (`BUY`, `SELL`, `LONG`, `SHORT`).*

### 2. Status Updates (In-Place State Transition)
* `TP1 HIT` or `BTC/USDT TP1 HIT` → Moves state to `TP1_HIT`
* `TP2 HIT` or `XAUUSD TP2 HIT` → Moves state to `TP2_HIT`
* `TP3 HIT` → Moves state to `TP3_HIT`
* `SL HIT` → Moves state to `SL_HIT`

### 3. Direct API Ingestion (Option B)
Agar bot khud direct generate kar raha ho bina Telegram webhook round-trip ke:
```bash
curl -X POST http://localhost:3000/api/telegram \
  -H "Content-Type: application/json" \
  -H "X-Telegram-Bot-Api-Secret-Token: dev_webhook_secret_placeholder" \
  -d '{
    "symbol": "SOL/USDT",
    "direction": "BUY",
    "entry": 240.0,
    "sl": 230.0,
    "tp1": 250.0
  }'
```

---

## CLI Helper Commands Reference

Hamare project ke `package.json` me ready-made commands added hain:

| Command | Description |
|---|---|
| `npm run webhook:info` | Bot profile aur current registered webhook URL check karta hai |
| `npm run webhook:set -- <URL> [SECRET]` | Telegram ko bolta hai ki webhook updates <URL>/api/telegram par bheje |
| `npm run webhook:delete` | Webhook hata kar bot ko normal polling mode me switch karta hai |
| `npm run webhook:test` | Local server par synthetic Telegram update post karke test karta hai |

---

## Troubleshooting & Common Issues

### Issue 1: HTTP 401 Unauthorized
* **Reason**: Webhook secret mismatch.
* **Fix**: Ensure that the `secret_token` passed during `setWebhook` exactly matches `TELEGRAM_WEBHOOK_SECRET` in your `.env.local` / `.env`.

### Issue 2: Bot messages send ho rahe hain par webhook par nahi aa rahe
* **Reason A**: Bot channel/group me Admin nahi hai.
  * **Fix**: Go to Channel Info → Administrators → Add `@VlgSignal_bot` as Admin.
* **Reason B**: Bot ne khud message send kiya.
  * **Fix**: Telegram bot API apne khud ke messages webhook par echo **nahi** karta. Use Option B (direct API dispatch) ya channel me kisi doosre admin/user account se post karein.

### Issue 3: Webhook URL par SSL error
* **Reason**: Telegram strictly requires valid HTTPS with trusted SSL certificate.
* **Fix**: Use Cloudflare Tunnel or ngrok (self-signed certs plain HTTP nahi chalenge).

---

## Production Deployment Checklist (e.g. Vercel / Railway)
1. Set `TELEGRAM_BOT_TOKEN` in your hosting dashboard environment variables.
2. Set `TELEGRAM_WEBHOOK_SECRET` in your hosting dashboard environment variables.
3. Deploy the project.
4. Run:
   ```bash
   node scripts/telegram-webhook.mjs set https://your-production-domain.com your_secret
   ```
5. Confirm with:
   ```bash
   node scripts/telegram-webhook.mjs info
   ```
All set! Signals posted in the Telegram channel will stream live to the Velora AI website within seconds.
