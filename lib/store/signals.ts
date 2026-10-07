import { Signal } from "@/lib/types/signal";
import { INITIAL_MOCK_SIGNALS } from "@/lib/api/mockSignals";

/**
 * Global singleton reference for Node.js environments to maintain state across
 * Next.js hot reloads and Route Handler invocations.
 */
declare global {
  // eslint-disable-next-line no-var
  var __veloraSignalStore: SignalStore | undefined;
}

export class SignalStore {
  private signals: Map<string, Signal> = new Map();

  constructor(seedSignals: Signal[] = []) {
    this.seed(seedSignals);
  }

  /**
   * Seeds the store with default signals
   */
  public seed(seedSignals: Signal[]): void {
    this.signals.clear();
    for (const signal of seedSignals) {
      this.signals.set(signal.id, signal);
    }
  }

  /**
   * Resets the store back to initial mock signals
   */
  public reset(): void {
    this.seed(INITIAL_MOCK_SIGNALS);
  }

  /**
   * Clears all signals (primarily for isolated test assertions)
   */
  public clear(): void {
    this.signals.clear();
  }

  /**
   * Returns all stored signals, strictly ordered newest-first by created_at.
   */
  public getAll(): Signal[] {
    return Array.from(this.signals.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  /**
   * Finds a signal by its unique ID
   */
  public getById(id: string): Signal | undefined {
    return this.signals.get(id);
  }

  /**
   * Adds a new signal or updates existing signal if ID matches.
   * Guarantees zero duplicates for identical IDs.
   */
  public add(signal: Signal): Signal {
    const existing = this.signals.get(signal.id);
    if (existing) {
      const merged: Signal = {
        ...existing,
        ...signal,
        updated_at: signal.updated_at || new Date().toISOString(),
      };
      this.signals.set(signal.id, merged);
      return merged;
    }

    this.signals.set(signal.id, signal);
    return signal;
  }

  /**
   * Updates an existing signal in-place.
   * Returns null if ID is not found.
   */
  public update(id: string, updates: Partial<Signal>): Signal | null {
    const existing = this.signals.get(id);
    if (!existing) {
      return null;
    }

    const updated: Signal = {
      ...existing,
      ...updates,
      updated_at: updates.updated_at || new Date().toISOString(),
    };

    this.signals.set(id, updated);
    return updated;
  }

  /**
   * Locates the most recent active signal (candidate for TP/SL status update).
   * Optionally matches a specific trading symbol/pair.
   */
  public findLatestActive(symbol?: string): Signal | undefined {
    const sorted = this.getAll();

    return sorted.find((s) => {
      // Considered active if ACTIVE or has hit early TP stages (TP1, TP2) but not terminal
      const isActiveState =
        s.status === "ACTIVE" || s.status === "TP1_HIT" || s.status === "TP2_HIT";

      if (!isActiveState) return false;

      if (!symbol) return true;

      const normSymbol = symbol.toUpperCase().replace(/[-_]/g, "/");
      const sSymbol = (s.symbol || s.asset || "").toUpperCase().replace(/[-_]/g, "/");

      return sSymbol === normSymbol;
    });
  }

  /**
   * Current total signal count
   */
  public count(): number {
    return this.signals.size;
  }
}

// Export singleton instance attached to globalThis in development
export const signalStore: SignalStore =
  globalThis.__veloraSignalStore ?? new SignalStore();

if (process.env.NODE_ENV !== "production") {
  globalThis.__veloraSignalStore = signalStore;
}
