import React from "react";
import { ShieldAlert } from "lucide-react";

export function RiskDisclaimer() {
  return (
    <section
      id="disclaimer"
      aria-label="Risk Disclosure"
      className="py-14 border-t border-border/60 bg-card/30"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border/80 bg-background/60 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning-10 text-warning border border-warning/20">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <h3 className="font-semibold text-foreground text-sm sm:text-base">
                Important Regulatory & Risk Disclaimer
              </h3>
              <p>
                Velora AI is an algorithmic intelligence research platform. All signals, trade setups,
                target levels, and timestamps mirrored on this website or in the Telegram channel are
                provided strictly for informational and educational purposes. Velora AI does not provide
                financial, investment, legal, or tax advice.
              </p>
              <p>
                Trading cryptocurrencies, forex, commodities, and derivatives carries a high level of risk
                and may not be suitable for all participants. You could lose some or all of your capital.
                Never risk funds you cannot afford to lose. Past signal performance or simulated historical
                setups are never a guarantee of future market outcomes. This website is strictly read-only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
