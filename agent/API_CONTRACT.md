# API_CONTRACT.md — Frontend-Facing API Contract

## Status

```
UNSPECIFIED — The Velora API has not yet been built or documented.
This document defines the EXPECTED contract from the frontend's perspective.
The backend must implement this contract or the frontend must be updated
to match the actual backend contract before TASK-014 begins.
```

---

## Base URL

```
${NEXT_PUBLIC_API_URL}
```

Loaded from the `NEXT_PUBLIC_API_URL` environment variable.

Example (development):
```
http://localhost:8000
```

Example (production):
```
https://api.velora.ai
```

---

## Authentication

```
UNSPECIFIED
```

The frontend does not know whether the Velora API requires authentication.

**Possibilities:**
- No authentication (public API — acceptable for Beta read-only display)
- API key in `X-API-Key` header (server-side env var required if secret)
- JWT Bearer token

> **Action required:** Backend team must confirm before TASK-014.  
> If the API key must be kept secret, all signal fetching must be proxied through a Next.js Route Handler — it must NOT be exposed to the browser via `NEXT_PUBLIC_`.

---

## Endpoints

### GET /api/signals

Retrieve a list of trading signals.

#### Request

```
GET /api/signals
```

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `limit` | integer | No | 50 | Maximum number of signals to return |
| `offset` | integer | No | 0 | Pagination offset |
| `status` | string | No | — | Filter by signal status (e.g., `ACTIVE`) |
| `since` | ISO 8601 | No | — | Return only signals updated after this timestamp |

> **UNSPECIFIED**: Exact pagination and filtering parameters. The above is the expected contract. Backend must confirm.

#### Response — Success (200 OK)

```json
{
  "data": [
    {
      "id": "sig_01J9XYZ...",
      "asset": "BTC/USDT",
      "direction": "LONG",
      "entry": 65000.00,
      "tp1": 67000.00,
      "tp2": 69000.00,
      "tp3": 72000.00,
      "sl": 63000.00,
      "status": "ACTIVE",
      "raw_text": null,
      "created_at": "2026-10-06T12:00:00.000Z",
      "updated_at": "2026-10-06T12:00:00.000Z"
    },
    {
      "id": "sig_01J9ABC...",
      "asset": "ETH/USDT",
      "direction": "SHORT",
      "entry": 2600.00,
      "tp1": 2500.00,
      "tp2": 2400.00,
      "tp3": null,
      "sl": 2700.00,
      "status": "TP1_HIT",
      "raw_text": null,
      "created_at": "2026-10-06T10:00:00.000Z",
      "updated_at": "2026-10-06T11:30:00.000Z"
    },
    {
      "id": "sig_01J9DEF...",
      "asset": null,
      "direction": null,
      "entry": null,
      "tp1": null,
      "tp2": null,
      "tp3": null,
      "sl": null,
      "status": "UNPARSED",
      "raw_text": "🚀 BTC looking bullish, entering here. SL below 60k. TP open.",
      "created_at": "2026-10-06T09:45:00.000Z",
      "updated_at": "2026-10-06T09:45:00.000Z"
    }
  ],
  "meta": {
    "total": 42,
    "limit": 50,
    "offset": 0
  }
}
```

#### Response — Error (4xx/5xx)

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred."
  }
}
```

Common error codes:

| HTTP Status | Code | Meaning |
|---|---|---|
| 400 | `BAD_REQUEST` | Invalid query parameters |
| 401 | `UNAUTHORIZED` | Missing or invalid auth (if auth is required) |
| 403 | `FORBIDDEN` | Access denied |
| 404 | `NOT_FOUND` | Endpoint not found |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_SERVER_ERROR` | Server error |
| 503 | `SERVICE_UNAVAILABLE` | Server temporarily down |

---

## Signal Object Schema

Full signal object specification:

| Field | Type | Nullable | Description |
|---|---|---|---|
| `id` | `string` | No | Unique signal identifier (UUID or ULID) |
| `asset` | `string` | Yes (UNPARSED only) | Trading pair, e.g., `"BTC/USDT"` |
| `direction` | `"LONG" \| "SHORT"` | Yes (UNPARSED only) | Signal direction |
| `entry` | `number` | Yes (UNPARSED only) | Entry price |
| `tp1` | `number` | Yes (UNPARSED only) | Take Profit 1 |
| `tp2` | `number \| null` | Yes | Take Profit 2 (optional even for parsed) |
| `tp3` | `number \| null` | Yes | Take Profit 3 (optional even for parsed) |
| `sl` | `number` | Yes (UNPARSED only) | Stop Loss price |
| `status` | `SignalStatus` | No | One of: `ACTIVE`, `TP1_HIT`, `TP2_HIT`, `TP3_HIT`, `SL_HIT`, `UNPARSED` |
| `raw_text` | `string \| null` | Yes | Original Telegram message (always present for UNPARSED) |
| `created_at` | `string` (ISO 8601) | No | Signal creation timestamp |
| `updated_at` | `string` (ISO 8601) | No | Last update timestamp |

> **UNSPECIFIED**: Additional fields such as `source`, `confidence`, or `channel_id` may be included by the backend. The frontend schema should be designed to allow extra fields (using `.passthrough()` or `.strip()` in Zod).

---

## Signal List Response Schema

```ts
// Zod-style pseudocode
const SignalListResponseSchema = z.object({
  data: z.array(SignalSchema),
  meta: z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
  }).optional(),
})
```

---

## Live Update Payload (SSE — UNSPECIFIED)

If the backend implements Server-Sent Events (SSE), the expected event format:

### Endpoint (Hypothetical)

```
GET /api/signals/stream
```

### Event Types

#### `signal.created` — New Signal

```
event: signal.created
data: { ...Signal object... }
```

#### `signal.updated` — Status Update

```
event: signal.updated
data: { ...Signal object with new status... }
```

The frontend must:
1. On `signal.created`: prepend the new signal to the list
2. On `signal.updated`: find the existing signal by `id` and update it in place (NO new card)

> **UNSPECIFIED**: Whether SSE will be implemented. The frontend will use polling until confirmed.

---

## Error Handling Contract

The frontend API layer must:

1. **Catch all network errors** — wrap in a typed `ApiError` object
2. **Validate all responses** — run through Zod schema before returning data
3. **Never surface raw error objects to components** — components receive typed error states
4. **Log validation failures** — with the raw response included for debugging
5. **Not silently drop malformed signals** — UNPARSED signals must reach the UI

---

## Versioning

> **UNSPECIFIED**: Whether the API will be versioned (e.g., `/api/v1/signals`).  
> The frontend should use `NEXT_PUBLIC_API_URL` as the complete base, allowing the version to be included there: `https://api.velora.ai/v1`.

---

## CORS

> **UNSPECIFIED**: The backend must configure CORS to allow requests from the website's domain.  
> In development: `http://localhost:3000` must be allowed.  
> In production: the deployed domain must be in the CORS allowlist.

---

## Rate Limits

> **UNSPECIFIED**: No rate limit information provided. With 5-second polling, the frontend makes ~12 requests/minute per user. The backend must be capable of handling this load times the number of concurrent users.

---

*Last updated: Initial planning phase — contract is EXPECTED, not confirmed.*
