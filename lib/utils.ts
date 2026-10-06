import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Defense-in-depth text sanitizer for Telegram transmission payloads
 * Strips dangerous control chars and ensures safe plaintext rendering.
 */
export function sanitizeRawText(text?: string | null): string {
  if (!text) return "Malformed message received with empty content.";
  // Strip control characters while preserving safe whitespace (\n, \r, \t)
  return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}
