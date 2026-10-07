import { Signal } from "@/lib/types/signal";

/**
 * Isolated Development & Fallback Fixture Boundary
 * Conforms strictly to /agent/API_CONTRACT.md and /agent/SIGNAL_STATE_MACHINE.md
 * Used for local testing, demo exploration, and telemetry preview.
 * All prices reflect realistic 2026 spot market ranges (XAUUSD ~$4,100+) with mathematically consistent R:R ratios.
 */
export const INITIAL_MOCK_SIGNALS: Signal[] = [
  {
    id: "sig_xauusd_01",
    symbol: "XAUUSD",
    asset: "XAUUSD",
    direction: "BUY",
    entry: 4112.5,
    sl: 4103.5,
    tp1: 4121.5,
    tp2: 4130.5,
    tp3: 4139.5,
    status: "ACTIVE",
    raw_text: null,
    created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 mins ago
    updated_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    confidence: 0.94,
    source: "Velora Multi-Agent Feed",
    is_demo: true,
  },
  {
    id: "sig_btcusdt_02",
    symbol: "BTC/USDT",
    asset: "BTC/USDT",
    direction: "BUY",
    entry: 104250.0,
    sl: 102750.0,
    tp1: 105750.0,
    tp2: 107250.0,
    tp3: 109500.0,
    status: "TP1_HIT",
    raw_text: null,
    created_at: new Date(Date.now() - 1000 * 60 * 28).toISOString(), // 28 mins ago
    updated_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    confidence: 0.92,
    source: "Velora Multi-Agent Feed",
    is_demo: true,
  },
  {
    id: "sig_xauusd_sell_03",
    symbol: "XAUUSD",
    asset: "XAUUSD",
    direction: "SELL",
    entry: 4118.0,
    sl: 4127.0,
    tp1: 4109.0,
    tp2: 4100.0,
    tp3: 4091.0,
    status: "TP2_HIT",
    raw_text: null,
    created_at: new Date(Date.now() - 1000 * 60 * 65).toISOString(), // 1 hr ago
    updated_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    confidence: 0.89,
    source: "Velora Multi-Agent Feed",
    is_demo: true,
  },
  {
    id: "sig_eurusd_04",
    symbol: "EURUSD",
    asset: "EURUSD",
    direction: "SELL",
    entry: 1.085,
    sl: 1.088,
    tp1: 1.082,
    tp2: 1.079,
    tp3: null,
    status: "SL_HIT",
    raw_text: null,
    created_at: new Date(Date.now() - 1000 * 60 * 140).toISOString(), // ~2.3 hrs ago
    updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    confidence: 0.84,
    source: "Velora Multi-Agent Feed",
    is_demo: true,
  },
  {
    id: "sig_us100_05",
    symbol: "US100",
    asset: "US100",
    direction: "BUY",
    entry: 21450.0,
    sl: 21350.0,
    tp1: 21550.0,
    tp2: 21650.0,
    tp3: 21750.0,
    status: "ACTIVE",
    raw_text: null,
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hrs ago
    updated_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    confidence: 0.95,
    source: "Velora Multi-Agent Feed",
    is_demo: true,
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
      "⚠️ MULTI-AGENT MARKET BRIEF [SIMULATED]: Volatility cluster detected ahead of US open. Spot gold & Nasdaq consensus levels initialized. Risk parameters strictly enforced.",
    created_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hrs ago
    updated_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    confidence: null,
    source: "Velora Multi-Agent Feed",
    is_demo: true,
  },
];
