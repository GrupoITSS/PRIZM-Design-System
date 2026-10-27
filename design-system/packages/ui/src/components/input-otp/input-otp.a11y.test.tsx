import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { InputOTP } from "./input-otp";
import { inputOTPSlotVariants, inputOTPWrapper } from "./input-otp.styles";

beforeAll(() => {
  if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
    (window as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});

// O input-otp usa setTimeout internamente (ver input-otp.test.tsx).
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

// Os grupos de slots (o contêiner com borda), sem o input da biblioteca.
const groups = (container: HTMLElement) => [
  ...container.querySelectorAll("[data-input-otp-container] > div.border"),
];

// Decisões de 27/10/2026 (documentação do InputOTP): D1 a D5 e as pendências de acessibilidade 1 a 4.
describe("InputOTP: decisões de 27/10/2026", () => {
  it("D1: sm, md e lg em control-height, slot quadrado; md é o padrão", () => {
    expect(inputOTPSlotVariants().split(" ")).toContain("size-control-height-md");
    expect(inputOTPSlotVariants({ size: "sm" }).split(" ")).toEqual(
      expect.arrayContaining(["size-control-height-sm", "text-xs"]),
    );
    expect(inputOTPSlotVariants({ size: "lg" }).split(" ")).toEqual(
      expect.arrayContaining(["size-control-height-lg", "text-base", "md:text-sm"]),
    );
    expect(inputOTPSlotVariants().split(" ").some((c) => /^(h|w|min-w)-\d+$/.test(c))).toBe(false);
  });

  it("D2: contêiner com input-background e shadow-xs", () => {
    const classes = inputOTPWrapper.split(" ");
    expect(classes).toEqual(expect.arrayContaining(["bg-input-background", "shadow-xs", "border-input"]));
    expect(classes).not.toContain("bg-background");
  });

  it("D3: aria-invalid marca o input e a borda, sem anel destructive; invalid continua como apelido", () => {
    const { container, unmount } = render(<InputOTP aria-label="Código" aria-invalid />);
    expect(container.querySelector("input")).toHaveAttribute("aria-invalid", "true");
    const wrapper = groups(container)[0];
    expect(wrapper).toHaveClass("border-destructive");
    expect(wrapper.className).not.toMatch(/ring-destructive/);
    unmount();

    const alias = render(<InputOTP aria-label="Código" invalid />);
    expect(alias.container.querySelector("input")).toHaveAttribute("aria-invalid", "true");
  });

  it("D5: separator={true} desenha o traço (Minus) em muted-foreground", () => {
    const { container } = render(
      <InputOTP aria-label="Código" separator separatorEvery={3} />,
    );
    const seps = container.querySelectorAll("[data-input-otp-container] > div.text-muted-foreground");
    expect(seps).toHaveLength(1);
    expect(seps[0].querySelector("svg")).toHaveClass("lucide-minus");
  });

  it("pendência 1: avisa no console quando o campo não tem nome", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { unmount } = render(<InputOTP />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("InputOTP: campo sem nome acessível"));
    unmount();
    warn.mockClear();

    render(<InputOTP aria-label="Código de verificação" />);
    render(
      <>
        <label htmlFor="otp-rotulo">Código</label>
        <InputOTP id="otp-rotulo" />
      </>,
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it("pendência 2: o placeholder dos slots vazios sai em muted-foreground", () => {
    const { container } = render(<InputOTP aria-label="Código" placeholder="○○○○○○" />);
    const placeholder = container.querySelector("[aria-hidden] span");
    expect(placeholder).toHaveTextContent("○");
    expect(placeholder).toHaveClass("text-muted-foreground");
  });

  it("pendência 4: slots e separadores visuais ficam fora da árvore de acessibilidade", () => {
    const { container } = render(
      <InputOTP aria-label="Código" value="12" separator separatorEvery={2} />,
    );
    const visual = [...container.querySelectorAll("[data-input-otp-container] > div")].filter(
      (n) => !n.querySelector("input") && !n.hasAttribute("data-input-otp"),
    );
    expect(visual.length).toBeGreaterThan(0);
    for (const n of visual) expect(n).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("[role=separator]")).toBeNull();
  });
});
