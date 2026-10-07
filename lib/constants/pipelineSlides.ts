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
      "From raw market data to a risk-checked trade signal. A team of AI agents analyses, debates, and verifies every signal before it reaches you.",
    bullets: [
      "Multi-agent architecture with autonomous specialist roles",
      "Transforms unfiltered market tick streams into risk-checked trading setups",
      "Comprehensive pipeline: Development → Beta Testing → Delivery",
    ],
    tags: ["Agentic AI", "Telemetry", "Beta Spec"],
  },
  {
    id: 2,
    title: "Project Status",
    subtitle: "Where We Are Today (Beta Phase)",
    badge: "02 / STATUS",
    imageSrc: "/docs/pipeline-slides/slide-2.png",
    summary:
      "Velora is currently in Beta Testing (Stage 2). Agents, rules, and risk thresholds are undergoing continuous validation and tuning before delivery and full launch.",
    bullets: [
      "Stage 1: Development complete (agent pipeline designed & bot created)",
      "Stage 2: Beta Testing active (testing agents, rules, thresholds & tuning accuracy)",
      "Stage 3 & 4: Delivery (Telegram to website feed) and verified public launch",
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
      "Collect: Data Agent captures live prices, candles, volume, and spread",
      "Analyse: Technical, Sentiment, News, and Quant models run concurrently",
      "Debate & Verify: Debate Agent bull vs bear synthesis, 6-point Risk Check gate",
    ],
    tags: ["Collect", "Analyse", "Debate", "Verify", "Deliver"],
  },
  {
    id: 4,
    title: "The Analyst Team",
    subtitle: "Meet the Specialist Agents",
    badge: "04 / AGENTS",
    imageSrc: "/docs/pipeline-slides/slide-4.png",
    summary:
      "Four analysts, one shared data feed. Each works independently so no single indicator decides the trade.",
    bullets: [
      "Data Agent: Clean live prices, candles, volume, spread, session timing & health checks",
      "Technical Agent: Trend, momentum, S/R, RSI, MACD across multiple timeframes",
      "Sentiment Agent: Market mood, positioning, fear/greed metrics, and mood divergences",
      "News Agent: Economic calendar, rates, inflation headlines & big-news warnings",
      "Quant Agent: Volatility (ATR), correlations, backtest probabilities & suggested SL/TP",
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
      "The Debate Agent pits the strongest Bull Case arguments directly against Bear Case counter-arguments. If agents cannot agree, the system enforces NO TRADE.",
    bullets: [
      "Bull Case vs Bear Case: Strongest reasons to BUY vs SELL or wait",
      "Calculates definitive entry price, stop loss, and tiered TP1, TP2, TP3 targets",
      "Forces a transparent, written reason for every single trade setup",
      "Enforces a strict 'NO TRADE' rule if agents cannot reach conclusive agreement",
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
      "Every proposed trade must pass all six risk checks simultaneously. Failing even a single check results in instant rejection and logging for review.",
    bullets: [
      "Check 1: Agent Agreement — Minimum required consensus across analyst models",
      "Check 2: Confidence — Combined confidence score must clear required floor",
      "Check 3: Reward : Risk — Target profit must be at least twice the stop loss distance (≥ 1:2)",
      "Check 4: News Filter — Blackouts around high-impact macroeconomic announcements",
      "Check 5: Market Conditions — Spread and volatility must remain within safety limits",
      "Check 6: Signal Control — Daily signal quotas and open-trade deduplication",
    ],
    tags: ["Risk Filters", "1:2 Reward/Risk", "News Filter", "Capital Protection"],
  },
  {
    id: 7,
    title: "Delivery",
    subtitle: "Anatomy of a Signal & Distribution",
    badge: "07 / DELIVERY",
    imageSrc: "/docs/pipeline-slides/slide-7.png",
    summary:
      "Approved signals follow a canonical format with clear entry, SL, TP1-TP3, and written reason, delivered simultaneously to Telegram and the live website feed.",
    bullets: [
      "Telegram Channel: Instant alert the millisecond a setup clears the risk gate",
      "Website Live Feed: In-place streaming updates with zero page reloads required",
      "Status Updates: Dynamic tracking of TP1, TP2, TP3 hits and SL triggers in-place",
      "Why this signal (Beta): Expander shows each agent's verdict and debate summary",
    ],
    tags: ["Canonical Schema", "Real-Time Feed", "In-Place Updates"],
  },
  {
    id: 8,
    title: "Quality",
    subtitle: "Testing and Accuracy Loop",
    badge: "08 / QUALITY",
    imageSrc: "/docs/pipeline-slides/slide-8.png",
    summary:
      "A disciplined testing loop: Backtest → Demo Trading → Review Logs → Tune Rules → Re-test. Continuous empirical measurement for better accuracy step by step.",
    bullets: [
      "Replays past market tick data & live forward demo account trading",
      "Continuous tracking of win rate, average reward:risk, and maximum drawdown",
      "Review of rejected signals to analyze hypothetical market outcomes",
      "Empirical rule tuning based on real outcome vs agent consensus analysis",
    ],
    tags: ["Testing Loop", "Win Rate", "Reward:Risk", "Drawdown", "Rule Tuning"],
  },
  {
    id: 9,
    title: "What You Get",
    subtitle: "How It Works and Your Benefits",
    badge: "09 / BENEFITS",
    imageSrc: "/docs/pipeline-slides/slide-9.png",
    summary:
      "A complete end-to-end overview of how the Velora Bot thinks and the tangible benefits delivered to traders.",
    bullets: [
      "Many angles, one view: Technical, sentiment, news, and quant combined",
      "Clear trade levels: Exact entry, stop loss, and up to three take profits",
      "A reason with every signal: Transparent written justification on every setup",
      "Filtered for quality: Only signals passing all 6 risk checks are broadcasted",
      "Instant delivery: Immediate Telegram alert + live streaming website feed",
      "Live status updates: In-place TP/SL progression so you always see where trades stand",
    ],
    tags: ["Multi-Agent Synergy", "Clear Levels", "Full Rationale", "Real-Time Alerts"],
  },
];
