import { describe, expect, it } from "vitest";
import { matchesConfirmText, normalizeConfirmText } from "./dialog.utils";

describe("dialog confirm input utils", () => {
  it("normalizes case, accents and spaces", () => {
    expect(normalizeConfirmText("  Léo  ")).toBe("leo");
    expect(normalizeConfirmText("ROBOT TESTE")).toBe("robotteste");
  });

  it("matches expected value with flexible comparison", () => {
    expect(matchesConfirmText("leo", "Leo")).toBe(true);
    expect(matchesConfirmText("  lé o ", "Leo")).toBe(true);
    expect(matchesConfirmText("Leo", "Robot")).toBe(false);
  });

  it("returns false when expected value is empty", () => {
    expect(matchesConfirmText("anything", "")).toBe(false);
    expect(matchesConfirmText("anything", "   ")).toBe(false);
  });
});
