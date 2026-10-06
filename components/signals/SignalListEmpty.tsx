import React from "react";
import { Radio } from "lucide-react";

export function SignalListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/40 py-16 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
        <Radio className="h-6 w-6 animate-pulse" />
      </div>
      <h3 className="text-xl font-bold text-foreground">No signals right now.</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
        The automated intelligence pipeline is actively monitoring price action and volatility.
        New setups will appear here automatically in real time without refreshing the page.
      </p>
    </div>
  );
}
