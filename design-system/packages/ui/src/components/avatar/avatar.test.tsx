import "@testing-library/jest-dom/vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  clearAvatarSrcCache,
} from "./avatar";

describe("Avatar (PRIZM / shadcn)", () => {
  afterEach(() => {
    clearAvatarSrcCache();
    vi.restoreAllMocks();
  });

  it("renderiza Avatar com fallback quando não há imagem", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("API simplificada mostra letra antes do preload e troca após onload", async () => {
    const pendingLoads: Array<() => void> = [];

    vi.spyOn(window, "Image").mockImplementation(function MockImage() {
      // radix-ui 1.8+ reads event.currentTarget (complete, naturalWidth) in
      // the load listener.
      const listeners = new Map<string, Set<(event: Event) => void>>();
      const img = {
        complete: false,
        naturalWidth: 0,
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
        addEventListener(type: string, listener: (event: Event) => void) {
          const set = listeners.get(type) ?? new Set();
          set.add(listener);
          listeners.set(type, set);
        },
        removeEventListener(type: string, listener: (event: Event) => void) {
          listeners.get(type)?.delete(listener);
        },
        set src(_value: string) {
          pendingLoads.push(() => {
            img.complete = true;
            img.naturalWidth = 64;
            img.onload?.();
            const event = { currentTarget: img, target: img } as unknown as Event;
            listeners.get("load")?.forEach((listener) => listener(event));
          });
        },
        get src() {
          return "";
        },
      };
      return img as unknown as HTMLImageElement;
    });

    render(<Avatar src="https://example.com/avatar.png" alt="User" fallback="US" size="md" />);

    expect(screen.getByText("US")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(pendingLoads).toHaveLength(1);

    act(() => {
      pendingLoads[0]?.();
    });

    act(() => {
      pendingLoads[1]?.();
    });

    await waitFor(() => {
      expect(screen.getByRole("img", { name: "User" })).toBeInTheDocument();
    });
  });

  it("API simplificada mantém letra se o preload falhar", () => {
    let triggerError: (() => void) | null = null;

    vi.spyOn(window, "Image").mockImplementation(function MockImage() {
      const listeners = new Map<string, Set<() => void>>();
      const img = {
        onload: null as (() => void) | null,
        onerror: null as (() => void) | null,
        addEventListener(type: string, listener: () => void) {
          const set = listeners.get(type) ?? new Set();
          set.add(listener);
          listeners.set(type, set);
        },
        removeEventListener(type: string, listener: () => void) {
          listeners.get(type)?.delete(listener);
        },
        set src(_value: string) {
          triggerError = () => {
            img.onerror?.();
            listeners.get("error")?.forEach((listener) => listener());
          };
        },
        get src() {
          return "";
        },
      };
      return img as unknown as HTMLImageElement;
    });

    render(<Avatar src="https://example.com/broken.png" alt="User" fallback="US" size="md" />);

    act(() => {
      triggerError?.();
    });

    expect(screen.getByText("US")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renderiza Avatar com imagem e fallback", () => {
    render(
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>,
    );
    // No jsdom a imagem não carrega; Radix mostra o fallback. Garantimos que o fallback está visível.
    expect(screen.getByText("CN")).toBeInTheDocument();
  });

  it("aplica classes de size corretamente", () => {
    const { rerender } = render(
      <Avatar size="xs">
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("XS").closest("[data-slot='avatar']")).toHaveClass("size-5");

    rerender(
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("SM").closest("[data-slot='avatar']")).toHaveClass("size-6");

    rerender(
      <Avatar size="md">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("MD").closest("[data-slot='avatar']")).toHaveClass("size-8");

    rerender(
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("LG").closest("[data-slot='avatar']")).toHaveClass("size-10");

    rerender(
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("XL").closest("[data-slot='avatar']")).toHaveClass("size-12");
  });

  it("AvatarGroup renderiza filhos", () => {
    render(
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+2</AvatarGroupCount>
      </AvatarGroup>,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
  });
});
