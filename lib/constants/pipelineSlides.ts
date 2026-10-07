export interface PipelineSlide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  imageSrc: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

export const PIPELINE_SLIDES: PipelineSlide[] = [
  {
    id: 1,
    title: "Agentic AI Signal Engine",
    subtitle: "How the Velora Bot Thinks",
    badge: "01 / SPEC OVERVIEW",
    imageSrc: "/docs/pipeline-slides/slide-1.png",
    summary:
      "From raw market data to a risk-checked trade signal. A collaborative team of specialized AI agents analyses, debates, and verifies every signal before it reaches users.",
    bullets: [
      "Multi-agent architecture with autonomous specialist roles",
      "Transforms unfiltered market tick streams into verified trading setups",
      "Comprehensive pipeline: Development → Beta Testing → Live Delivery",
    ],
    tags: ["Agentic AI", "Telemetry", "Beta Spec"],
  },
  {
    id: 2,
    title: "Project Status & Roadmap",
    subtitle: "Where We Are Today (Beta Phase)",
    badge: "02 / STATUS",
    imageSrc: "/docs/pipeline-slides/slide-2.png",
    summary:
      "Velora is currently in active Beta Testing (Stage 2). Agents, risk thresholds, and execution filters are undergoing continuous validation before general availability.",
    bullets: [
      "Stage 1: Development complete (pipeline and bot built)",
      "Stage 2: Beta Testing active (testing agents, logs & accuracy tuning)",
      "Stage 3 & 4: Delivery and verified public release",
    ],
    tags: ["Roadmap", "Beta Testing", "Validation"],
  },
  {
    id: 3,
    title: "System Overview",
    subtitle: "The Pipeline: From Data to Signal",
    badge: "03 / PIPELINE",
    imageSrc: "/docs/pipeline-slides/slide-3.png",
    summary:
      "A 5-stage sequential processing pipeline: Collect → Analyse → Debate → Verify → Deliver. Four analysts work in parallel, each returning direction bias and confidence.",
    bullets: [
      "Data collection of live prices, candles, spread, and volume",
      "Parallel analysis across technical, sentiment, news, and quantitative metrics",
      "Debate consensus with strict risk verification gate",
    ],
    tags: ["Collect", "Analyse", "Debate", "Verify", "Deliver"],
  },
  {
    id: 4,
    title: "The Analyst Team",
    subtitle: "Meet the 5 Specialized Agents",
    badge: "04 / AGENTS",
    imageSrc: "/docs/pipeline-slides/slide-4.png",
    summary:
      "Five independent specialist agents collaborate on one shared data feed. Independence guarantees that no single indicator or rogue metric can trigger an unvetted trade.",
    bullets: [
      "Data Agent: Collects live prices, spreads, session timing, and health checks",
      "Technical Agent: Evaluates multi-timeframe trend, support/resistance, RSI & MACD",
      "Sentiment Agent: Gauges market positioning, fear/greed metrics, and mood divergences",
      "News Agent: Monitors calendar events, rate decisions, and high-impact headlines",
      "Quant Agent: Calculates ATR volatility, correlation matrices, and SL/TP probabilities",
    ],
    tags: ["Data", "Technical", "Sentiment", "News", "Quant"],
  },
  {
    id: 5,
    title: "Decision Making",
    subtitle: "The Debate Agent (Bull vs Bear)",
    badge: "05 / CONSENSUS",
    imageSrc: "/docs/pipeline-slides/slide-5.png",
    summary:
      "The Debate Agent pits the strongest Bull Case arguments directly against Bear Case counter-arguments. If agents cannot reach conclusive agreement, the system enforces NO TRADE.",
    bullets: [
      "Pits multi-agent bullish arguments against bearish counter-arguments",
      "Calculates definitive entry price, stop loss, and tiered TP1, TP2, TP3 targets",
      "Demands a transparent, written rationale for every single trade setup",
      "Enforces a strict 'NO TRADE' rule in contentious market conditions",
    ],
    tags: ["Debate Engine", "Bull vs Bear", "Strict Consensus", "No Trade Rule"],
  },
  {
    id: 6,
    title: "Quality Gate",
    subtitle: "The 6 Rigorous Risk Checks",
    badge: "06 / RISK GATE",
    imageSrc: "/docs/pipeline-slides/slide-6.png",
    summary:
      "Every proposed trade must pass all six risk checks simultaneously. Failing even a single check results in instant rejection and logging for audit review.",
    bullets: [
      "Check 1: Agent Agreement — Minimum required consensus across analyst models",
      "Check 2: Confidence Threshold — Combined score must exceed calibrated minimum floor",
      "Check 3: Reward-to-Risk — Target profit must be at least 2× the stop loss distance (≥ 1:2)",
      "Check 4: High-Impact News Filter — Blackouts around volatile macroeconomic announcements",
      "Check 5: Market Conditions — Spread and volatility must remain within safety limits",
      "Check 6: Signal Control — Daily signal quotas and open-trade deduplication",
    ],
    tags: ["Risk Filters", "1:2 Reward/Risk", "News Filter", "Capital Protection"],
  },
  {
    id: 7,
    title: "Delivery Mechanics",
    subtitle: "Anatomy of a Signal & Distribution",
    badge: "07 / DELIVERY",
    imageSrc: "/docs/pipeline-slides/slide-7.png",
    summary:
      "Approved signals follow a canonical schema (Asset, Direction, Entry, SL, TP1, TP2, TP3, Rationale) and are dual-broadcasted in real time with lifecycle status updates.",
    bullets: [
      "Telegram Channel: Instant alerts the millisecond a setup clears the risk gate",
      "Website Live Feed: In-place streaming updates with zero page reloads required",
      "Status Transitions: Dynamic tracking of TP1, TP2, TP3 hits and SL triggers",
      "Audit Trail: Optional inspection of agent individual votes and debate logs",
    ],
    tags: ["Canonical Schema", "Sub-10s Latency", "Lifecycle Tracking"],
  },
  {
    id: 8,
    title: "Architecture & Infrastructure",
    subtitle: "System Structure & Topology",
    badge: "08 / ARCHITECTURE",
    imageSrc: "/docs/pipeline-slides/slide-8.png",
    summary:
      "Engineered with distinct separation of concerns: Agent Layer → Backend Signal Engine → Telegram Bot & Website API → Dedicated Database & Telemetry Logs.",
    bullets: [
      "Agent Layer: 7 specialist agents executing on schedule at candle closes",
      "Signal Engine: Orchestrator, formatter, and secured server secrets",
      "Distribution: Telegram Bot API and REST/streaming API for web clients",
      "Telemetry & Logs: 100% of signals and rejections logged for performance review",
    ],
    tags: ["System Architecture", "Microservices", "Telemetry Logging"],
  },
  {
    id: 9,
    title: "Quality Assurance Loop",
    subtitle: "Testing and Accuracy Optimization",
    badge: "09 / QUALITY",
    imageSrc: "/docs/pipeline-slides/slide-9.png",
    summary:
      "A closed-loop engineering cycle: Backtest → Demo Trading → Review Logs → Tune Rules → Re-test. No unverified accuracy percentages are claimed during Beta.",
    bullets: [
      "Replays years of tick-level historical data across multiple market regimes",
      "Live forward demo testing against actual broker liquidity feeds",
      "Continuous tracking of win rate, average reward:risk, and maximum drawdown",
      "Empirical rule tuning based on real outcome vs agent consensus analysis",
    ],
    tags: ["Backtesting", "Accuracy Loop", "Drawdown Metrics", "Empirical Testing"],
  },
  {
    id: 10,
    title: "What's Next & Notice",
    subtitle: "Milestones & Beta Risk Disclosure",
    badge: "10 / ROADMAP",
    imageSrc: "/docs/pipeline-slides/slide-10.png",
    summary:
      "Finalizing agent rules, connecting the Telegram bot to website live telemetry, and rolling out the public beta. Clear educational and risk disclosure.",
    bullets: [
      "Finalize agent rules and threshold calibrations during beta testing",
      "Connect Telegram bot directly to live web stream for sub-10 second latency",
      "Public beta signals feed release with complete verification dashboard",
      "Strict Beta Notice: Signals are educational/informational, not financial advice",
    ],
    tags: ["Next Steps", "Public Beta", "Risk Disclosure", "Transparency"],
  },
];
