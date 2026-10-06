import { Signal } from "@/lib/types/signal";

/**
 * Isolated Development & Fallback Fixture Boundary
 * Conforms strictly to /agent/API_CONTRACT.md and /agent/SIGNAL_STATE_MACHINE.md
 * Used ONLY when live backend is unreachable during local development or offline testing.
 */
export const INITIAL_MOCK_SIGNALS: Signal[] = [
  {
    id: "sig_xauusd_01",
    symbol: "XAUUSD",
    asset: "XAUUSD",
    direction: "BUY",
    entry: 2650.5,
    sl: 2645.0,
    tp1: 2656.0,
    tp2: 2661.0,
    tp3: 2666.0,
    status: "ACTIVE",
    raw_text: null,
    created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 mins ago
    updated_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    confidence: 0.94,
    source: "Velora Telegram Feed",
  },
  {
    id: "sig_btcusdt_02",
    symbol: "BTC/USDT",
    asset: "BTC/USDT",
    direction: "BUY",
    entry: 64800.0,
    sl: 63900.0,
    tp1: 65800.0,
    tp2: 66900.0,
    tp3: 68500.0,
    status: "TP1_HIT",
    raw_text: null,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    updated_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    confidence: 0.91,
    source: "Velora Telegram Feed",
  },
  {
    id: "sig_ethusdt_03",
    symbol: "ETH/USDT",
    asset: "ETH/USDT",
    direction: "SELL",
    entry: 2680.0,
    sl: 2735.0,
    tp1: 2620.0,
    tp2: 2560.0,
    tp3: null,
    status: "TP2_HIT",
    raw_text: null,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hrs ago
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    confidence: 0.88,
    source: "Velora Telegram Feed",
  },
  {
    id: "sig_solusdt_04",
    symbol: "SOL/USDT",
    asset: "SOL/USDT",
    direction: "BUY",
    entry: 148.5,
    sl: 144.0,
    tp1: 154.0,
    tp2: 159.0,
    tp3: 168.0,
    status: "TP3_HIT",
    raw_text: null,
    created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hrs ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    confidence: 0.96,
    source: "Velora Telegram Feed",
  },
  {
    id: "sig_eurusd_05",
    symbol: "EURUSD",
    asset: "EURUSD",
    direction: "SELL",
    entry: 1.0895,
    sl: 1.0945,
    tp1: 1.0845,
    tp2: 1.081,
    tp3: null,
    status: "SL_HIT",
    raw_text: null,
    created_at: new Date(Date.now() - 1000 * 60 * 420).toISOString(), // 7 hrs ago
    updated_at: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    confidence: 0.82,
    source: "Velora Telegram Feed",
  },
  {
    id: "sig_unparsed_06",
    symbol: null,
    asset: null,
    direction: null,
    entry: null,
    sl: null,
    tp1: null,
    tp2: null,
    tp3: null,
    status: "UNPARSED",
    raw_text:
      "⚠️ MARKET UPDATE: High volatility expected ahead of FOMC. Watching Gold & Silver rejection zones closely. Tighten risk.",
    created_at: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hrs ago
    updated_at: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    confidence: null,
    source: "Velora Telegram Feed",
  },
];
