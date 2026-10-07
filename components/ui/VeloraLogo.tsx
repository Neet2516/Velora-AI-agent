import React from "react";

export function VeloraInfinityMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="veloraInfinityGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00D2FF" />
          <stop offset="35%" stopColor="#5B7CFF" />
          <stop offset="70%" stopColor="#9B51E0" />
          <stop offset="100%" stopColor="#FF4B8B" />
        </linearGradient>
      </defs>
      {/* Smooth geometric infinity path with gradient stroke */}
      <path
        d="M14 6 C8 6, 4 10, 4 14 C4 18, 8 22, 14 22 C20 22, 24 16, 24 14 C24 12, 28 6, 34 6 C40 6, 44 10, 44 14 C44 18, 40 22, 34 22 C28 22, 24 16, 24 14 C24 12, 20 6, 14 6 Z"
        stroke="url(#veloraInfinityGrad)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VeloraLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <VeloraInfinityMark className="h-7 w-12 shrink-0 drop-shadow-[0_2px_8px_rgba(91,124,255,0.35)]" />
      <div className="flex items-baseline">
        <span className="text-lg font-black tracking-tight text-black dark:text-foreground uppercase whitespace-nowrap">
          VELORA <span className="text-[#5B7CFF] dark:text-[#6F94FF]">AI</span>
        </span>
      </div>
      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#FF5722] text-white text-[10px] font-mono font-black uppercase tracking-wider shrink-0 shadow-sm">
        BETA
      </span>
    </div>
  );
}
