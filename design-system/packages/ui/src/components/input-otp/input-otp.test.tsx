import "@testing-library/jest-dom/vitest";
import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { InputOTP } from "./input-otp";

beforeAll(() => {
  if (typeof window !== "undefined" && !("ResizeObserver" in window)) {
    (window as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});

// O componente base `input-otp` usa `setTimeout` internamente.
// Para evitar erros de "window is not defined" após o teardown do jsdom,
// garantimos que todos os timeouts sejam executados e limpos antes de cada teardown.
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe("InputOTP (PRIZM / props-based)", () => {
  it("renderiza container e input com length", () => {
    const { container } = render(
      <InputOTP length={6} value="" onChange={() => {}} aria-label="OTP" />,
    );
    const wrapper = container.querySelector("[data-input-otp-container]");
    expect(wrapper).toBeInTheDocument();
    const input = container.querySelector("[data-input-otp]");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("maxlength", "6");
  });

  it("aceita value controlado e exibe nos slots", () => {
    const { container } = render(
      <InputOTP length={6} value="12" onChange={() => {}} aria-label="OTP" />,
    );
    const wrapper = container.querySelector("[data-input-otp-container]");
    expect(wrapper).toBeInTheDocument();
    const input = container.querySelector("[data-input-otp]");
    expect(input).toHaveValue("12");
  });

  it("chama onChange quando o valor muda", () => {
    const onChange = vi.fn();
    const { container } = render(
      <InputOTP length={6} value="" onChange={onChange} aria-label="OTP" />,
    );
    const input = container.querySelector<HTMLInputElement>("input[data-input-otp]");
    expect(input).toBeInTheDocument();
    fireEvent.change(input!, { target: { value: "1" } });
    expect(onChange).toHaveBeenCalledWith("1");
  });

  it("prop disabled desabilita o input", () => {
    const { container } = render(
      <InputOTP length={6} value="" onChange={() => {}} disabled aria-label="OTP" />,
    );
    const input = container.querySelector("[data-input-otp]");
    expect(input).toBeDisabled();
  });

  it("aceita aria-label para acessibilidade", () => {
    const { container } = render(
      <InputOTP length={6} value="" onChange={() => {}} aria-label="Código de verificação" />,
    );
    const input = container.querySelector("[data-input-otp]");
    expect(input).toHaveAttribute("aria-label", "Código de verificação");
  });

  it("renderiza com length 4", () => {
    const { container } = render(
      <InputOTP length={4} value="" onChange={() => {}} aria-label="PIN" />,
    );
    const input = container.querySelector("[data-input-otp]");
    expect(input).toHaveAttribute("maxlength", "4");
  });

  it("aplica containerClassName ao container", () => {
    const { container } = render(
      <InputOTP
        length={6}
        value=""
        onChange={() => {}}
        containerClassName="custom-container"
        aria-label="OTP"
      />,
    );
    const wrapper = container.querySelector("[data-input-otp-container]");
    expect(wrapper).toHaveClass("custom-container");
  });
});
