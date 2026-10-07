import React from "react";
import { ShieldAlert } from "lucide-react";

export function RiskDisclaimer() {
  return (
    <section
      id="disclaimer"
      aria-label="Risk Disclosure"
      className="py-16 md:py-20 border-b-2 border-black dark:border-[#263B70] bg-white dark:bg-[#050A1F]"
    >
      <div className="mx-auto max-w-7xl px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Structured Warning Block */}
        <div className="border-2 border-black dark:border-[#263B70] bg-[#F2F2F2] dark:bg-[#081331] p-6 sm:p-10 shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black dark:border-[#263B70] bg-black dark:bg-[#101D42] text-[#FF4B2B]">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
              <h3 className="font-black text-foreground text-base sm:text-lg uppercase tracking-tight">
                IMPORTANT REGULATORY & RISK DISCLOSURE
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
