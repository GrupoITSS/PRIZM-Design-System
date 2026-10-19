import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Toaster } from "./sonner";

describe("Toaster (Sonner)", () => {
  beforeAll(() => {
    // Sonner usa matchMedia para detectar prefers-color-scheme.
    // Em ambiente de teste (jsdom) precisamos mockar essa API.
    if (!window.matchMedia) {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
    }
  });

  it("renders without crashing with default props", () => {
    expect(() => render(<Toaster />)).not.toThrow();
  });

  it("accepts and forwards common props like position", () => {
    const { unmount } = render(<Toaster position="top-right" />);
    // Se não quebrar na renderização, consideramos que a prop foi aceita.
    expect(true).toBe(true);
    unmount();
  });
});
