import "@testing-library/jest-dom/vitest";
import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { toast } from "sonner";
import { Toaster } from "./sonner";
import { toastActionButtonClassName, toastBaseClassName, toasterStyle } from "./sonner.styles";

const toastOf = (text: string) => screen.getByText(text).closest("[data-sonner-toast]");

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

  afterEach(() => {
    act(() => {
      toast.dismiss();
    });
  });

  it("renders without crashing with default props", () => {
    expect(() => render(<Toaster />)).not.toThrow();
  });

  describe("decisões de 13/11/2026", () => {
    it("tons do Prizm pelas variáveis do Sonner, com richColors ligado", async () => {
      render(<Toaster />);
      act(() => {
        toast.success("Alterações salvas");
      });
      const el = await screen.findByText("Alterações salvas");
      const item = el.closest("[data-sonner-toast]");
      expect(item).toHaveAttribute("data-type", "success");
      expect(item).toHaveAttribute("data-rich-colors", "true");
      const list = item?.closest("[data-sonner-toaster]") as HTMLElement;
      expect(list.style.getPropertyValue("--success-bg")).toBe("var(--prizm-color-success-weak)");
      expect(list.style.getPropertyValue("--success-text")).toBe(
        "var(--prizm-color-success-strong)",
      );
      expect(list.style.getPropertyValue("--normal-bg")).toBe("var(--prizm-color-card)");
    });

    it("info usa os tokens info, não primary", () => {
      expect(toasterStyle).toMatchObject({
        "--info-bg": "var(--prizm-color-info-weak)",
        "--info-border": "var(--prizm-color-info)",
        "--info-text": "var(--prizm-color-info-strong)",
      });
    });

    it("sem botão fechar por padrão", async () => {
      render(<Toaster />);
      act(() => {
        toast("Evento criado");
      });
      await screen.findByText("Evento criado");
      expect(toastOf("Evento criado")?.querySelector("[data-close-button]")).toBeNull();
    });

    it("botão fechar, quando ligado, com 24px (WCAG 2.5.8)", async () => {
      render(<Toaster closeButton />);
      act(() => {
        toast("Evento criado");
      });
      await screen.findByText("Evento criado");
      expect(toastOf("Evento criado")?.querySelector("[data-close-button]")).toHaveClass("!size-6");
    });

    it("ação com o Button outline sm do Prizm", async () => {
      render(<Toaster />);
      act(() => {
        toast("Item excluído", { action: { label: "Desfazer", onClick: () => {} } });
      });
      const button = await screen.findByRole("button", { name: "Desfazer" });
      for (const c of toastActionButtonClassName.split(" ")) expect(button).toHaveClass(c);
      expect(button).toHaveClass("!h-control-height-sm", "!border-input");
    });

    it("texto em text-sm e anel de foco do Prizm no toast", async () => {
      render(<Toaster />);
      act(() => {
        toast("Evento criado");
      });
      await screen.findByText("Evento criado");
      const item = toastOf("Evento criado");
      for (const c of toastBaseClassName.split(" ")) expect(item).toHaveClass(c);
      expect(item).toHaveClass("!text-sm", "focus-visible:!ring-ring");
    });
  });
});
