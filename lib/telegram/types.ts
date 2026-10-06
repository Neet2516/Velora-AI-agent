import { Signal, SignalStatus } from "@/lib/types/signal";

export type ParsedTelegramResult =
  | {
      kind: "NEW_SIGNAL";
      signal: Signal;
    }
  | {
      kind: "STATUS_UPDATE";
      targetStatus: SignalStatus;
      symbol?: string;
      rawText: string;
      replyToMessageId?: number;
      timestamp: string;
    }
  | {
      kind: "UNPARSED";
      signal: Signal;
    };
