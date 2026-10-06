import React from "react";
import { Radio } from "lucide-react";

export function SignalListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-none border-2 border-black bg-[#F2F2F2] py-16 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-white mb-4">
        <Radio className="h-5 w-5 text-[#FF3000]" />
      </div>
      <h3 className="text-xl font-black uppercase text-black tracking-tight">
        NO SIGNALS IN TELEMETRY BUFFER
      </h3>
      <p className="mt-2 max-w-md text-sm text-[#555555] font-medium leading-relaxed">
        The automated intelligence pipeline is actively monitoring price action and volatility.
        New setups will appear here automatically in real time without refreshing the page.
      </p>
    </div>
  );
}
