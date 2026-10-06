import { Signal, SignalStatus } from "@/lib/types/signal";
import { SignalStore } from "@/lib/store/signals";

export interface StatusUpdatePayload {
  targetStatus: SignalStatus;
  symbol?: string;
  replyToMessageId?: number;
  timestamp: string;
  rawText: string;
}

/**
 * Validates whether a state transition is legal per SIGNAL_STATE_MACHINE.md
 */
export function isTransitionAllowed(
  currentStatus: SignalStatus,
  targetStatus: SignalStatus
): boolean {
  // Terminal states cannot transition to anything
  if (currentStatus === "SL_HIT" || currentStatus === "TP3_HIT") {
    return false;
  }

  // UNPARSED signals are not active trades and cannot transition
  if (currentStatus === "UNPARSED") {
    return false;
  }

  // Backwards transitions or re-activating are forbidden
  if (targetStatus === "ACTIVE") {
    return false;
  }

  switch (currentStatus) {
    case "ACTIVE":
      return (
        targetStatus === "TP1_HIT" ||
        targetStatus === "TP2_HIT" ||
        targetStatus === "TP3_HIT" ||
        targetStatus === "SL_HIT"
      );
    case "TP1_HIT":
      return (
        targetStatus === "TP2_HIT" ||
        targetStatus === "TP3_HIT" ||
        targetStatus === "SL_HIT"
      );
    case "TP2_HIT":
      return targetStatus === "TP3_HIT" || targetStatus === "SL_HIT";
    default:
      return false;
  }
}

/**
 * Executes the Stable Signal Identity Strategy:
 * 1. Checks reply_to_message_id mapping
 * 2. Checks symbol-matched active signals
 * 3. Falls back to latest active signal
 * Mutates matched signal in-place and returns it, or returns null if no target.
 */
export function matchAndUpdateSignal(
  update: StatusUpdatePayload,
  store: SignalStore
): { signal: Signal; wasMutated: boolean } | null {
  let candidate: Signal | undefined;

  // Resolution Priority 1: Telegram Reply-To Message ID
  if (update.replyToMessageId) {
    const directId = `tg-${update.replyToMessageId}`;
    candidate = store.getById(directId);
  }

  // Resolution Priority 2: Match by Symbol among active signals
  if (!candidate && update.symbol) {
    candidate = store.findLatestActive(update.symbol);
  }

  // Resolution Priority 3: Most recent active signal
  if (!candidate) {
    candidate = store.findLatestActive();
  }

  // No active trade matches this update
  if (!candidate) {
    return null;
  }

  // Check state machine validity
  if (!isTransitionAllowed(candidate.status, update.targetStatus)) {
    console.warn(
      `[Signal State Machine] Disallowed transition from ${candidate.status} to ${update.targetStatus} for signal ${candidate.id}`
    );
    return { signal: candidate, wasMutated: false };
  }

  // Mutate in place
  const updated = store.update(candidate.id, {
    status: update.targetStatus,
    updated_at: update.timestamp,
  });

  return updated ? { signal: updated, wasMutated: true } : null;
}
