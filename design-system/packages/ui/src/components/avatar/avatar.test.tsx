import "@testing-library/jest-dom/vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  Avatar,
  AvatarBadge,
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

describe("Avatar: decisões de 04/11/2026", () => {
  afterEach(() => {
    clearAvatarSrcCache();
    vi.restoreAllMocks();
  });

  const root = (text: string) => screen.getByText(text).closest("[data-slot='avatar']");

  it("2: tamanho padrão md (32 px)", () => {
    render(<Avatar fallback="MD" />);
    expect(root("MD")).toHaveClass("size-8");
    expect(root("MD")).toHaveAttribute("data-size", "md");
  });

  it("3: sem borda", () => {
    render(<Avatar fallback="SB" />);
    expect(root("SB")?.className).not.toMatch(/\bborder\b|border-border/);
  });

  it("4: iniciais em text-xs (xs, sm) e text-sm (md+)", () => {
    render(<Avatar fallback="TX" />);
    const fb = screen.getByText("TX").closest("[data-slot='avatar-fallback']");
    expect(fb).toHaveClass("text-sm");
    expect(fb?.className).toContain("group-data-[size=xs]/avatar:text-xs");
    expect(fb?.className).toContain("group-data-[size=sm]/avatar:text-xs");
  });

  it("P3: sem status, sem badge; com status, badge com a cor e o texto oculto em pt-BR", () => {
    const { container, rerender } = render(<Avatar fallback="ST" />);
    expect(container.querySelector("[data-slot='avatar-badge']")).toBeNull();
    const casos = [
      ["online", "bg-success", "Online"],
      ["away", "bg-warning", "Ausente"],
      ["busy", "bg-destructive", "Ocupado"],
      ["offline", "bg-muted-foreground", "Offline"],
    ] as const;
    for (const [status, cor, texto] of casos) {
      rerender(<Avatar fallback="ST" status={status} />);
      const badge = container.querySelector("[data-slot='avatar-badge']");
      expect(badge).toHaveClass(cor);
      expect(badge).toHaveAttribute("data-status", status);
      expect(screen.getByText(texto)).toHaveClass("sr-only");
    }
  });

  it("P3: status também na composição", () => {
    const { container } = render(
      <Avatar status="busy">
        <AvatarFallback>CP</AvatarFallback>
      </Avatar>,
    );
    expect(container.querySelector("[data-slot='avatar-badge']")).toHaveClass("bg-destructive");
  });

  it("5: badge no tamanho do avatar (6 a 14 px)", () => {
    render(<AvatarBadge />);
    const cls = screen.getByText("Online").parentElement?.className ?? "";
    for (const c of [
      "size-2.5",
      "group-data-[size=xs]/avatar:size-1.5",
      "group-data-[size=sm]/avatar:size-2",
      "group-data-[size=lg]/avatar:size-3",
      "group-data-[size=xl]/avatar:size-3.5",
      "border-2",
      "border-background",
    ]) {
      expect(cls.split(" ")).toContain(c);
    }
  });

  it("6: contador no tamanho do grupo", () => {
    render(<AvatarGroupCount aria-label="Mais 3 pessoas">+3</AvatarGroupCount>);
    const c = screen.getByLabelText("Mais 3 pessoas");
    expect(c).toHaveClass("size-8", "text-sm", "font-medium");
    for (const s of ["xs:size-5", "sm:size-6", "lg:size-10", "xl:size-12"]) {
      const [tam, cls] = s.split(":");
      expect(c.className).toContain(`group-has-data-[size=${tam}]/avatar-group:${cls}`);
    }
  });

  it("pendência 3: aviso no console quando há src sem alt", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { rerender } = render(<Avatar src="https://example.com/a.png" fallback="AA" />);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("src sem alt"));
    warn.mockClear();
    rerender(<Avatar src="https://example.com/a.png" alt="" fallback="AA" />);
    rerender(<Avatar fallback="AA" />);
    expect(warn).not.toHaveBeenCalled();
  });

  it("pendência 3: com alt, o leitor lê o nome e não as iniciais", () => {
    const { rerender } = render(<Avatar alt="Ana Souza" fallback="AS" />);
    expect(screen.getByText("AS")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Ana Souza")).toHaveClass("sr-only");
    rerender(<Avatar alt="" fallback="AS" />);
    expect(screen.getByText("AS")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByText("Ana Souza")).toBeNull();
    rerender(<Avatar fallback="AS" />);
    expect(screen.getByText("AS")).not.toHaveAttribute("aria-hidden");
  });
});
