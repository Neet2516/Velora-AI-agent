import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Defense-in-depth text sanitizer for Telegram transmission payloads.
 * Strips dangerous control chars, neutralizes dangerous protocol URIs,
 * escapes HTML entities, and enforces safety boundaries.
 */
export function sanitizeRawText(text?: string | null): string {
  if (!text || text.trim() === "") {
    return "Message could not be parsed.";
  }

  // Strip control characters except standard whitespace
  let sanitized = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();

  // Neutralize javascript: pseudo-protocols
  sanitized = sanitized.replace(/javascript:/gi, "[BLOCKED_URI]");

  // Escape HTML characters to protect against XSS injection
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // Enforce 2000 character length cap
  if (sanitized.length > 2000) {
    sanitized = sanitized.slice(0, 2000) + "...";
  }

  return sanitized;
}

