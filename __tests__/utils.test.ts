import { describe, it, expect } from "vitest";
import { cn, sanitizeRawText } from "@/lib/utils";

describe("lib/utils - cn", () => {
  it("merges simple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles falsy and undefined values", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("resolves conflicting Tailwind classes with tailwind-merge", () => {
    expect(cn("px-4", "px-2")).toBe("px-2");
    expect(cn("text-red-500", "text-emerald-500")).toBe("text-emerald-500");
  });
});

describe("lib/utils - sanitizeRawText", () => {
  it("returns fallback for empty or whitespace strings", () => {
    expect(sanitizeRawText("")).toBe("Message could not be parsed.");
    expect(sanitizeRawText("   ")).toBe("Message could not be parsed.");
  });

  it("escapes raw HTML tags to prevent XSS", () => {
    const dangerous = '<script>alert("xss")</script>';
    const sanitized = sanitizeRawText(dangerous);
    expect(sanitized).not.toContain("<script>");
    expect(sanitized).toContain("&lt;script&gt;");
  });

  it("neutralizes javascript: URIs", () => {
    const malicious = 'Click javascript:alert(1) for bonus';
    const sanitized = sanitizeRawText(malicious);
    expect(sanitized).toContain("[BLOCKED_URI]");
    expect(sanitized).not.toContain("javascript:");
  });

  it("truncates excessively long messages", () => {
    const longMsg = "a".repeat(2500);
    const sanitized = sanitizeRawText(longMsg);
    expect(sanitized.length).toBeLessThanOrEqual(2005);
    expect(sanitized.endsWith("...")).toBe(true);
  });
});
