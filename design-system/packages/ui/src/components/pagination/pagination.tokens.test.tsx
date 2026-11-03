import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buttonVariants } from "../button";
import { Pagination } from "./pagination";
import {
  paginationEllipsisVariants,
  paginationListVariants,
  paginationPageVariants,
  paginationSizes,
} from "./pagination.styles";
import map from "./pagination.tokens.json";

// Figma token → Tailwind: "spacing/1" → "1", "control-height/md" → "control-height-md".
const step = (token: string) => token.split("/")[1].replace("-", ".");
const ch = (token: string) => token.replace("/", "-");
const classes = (s: string) => s.split(/\s+/);
const has = (el: HTMLElement, cls: string) =>
  cls.split(" ").every((c) => el.className.split(/\s+/).includes(c));

describe("Pagination × mapa de tokens (pagination.tokens.json)", () => {
  it("cobre os tamanhos do código", () => {
    expect(Object.keys(map.sizes)).toEqual([...paginationSizes]);
  });

  it("lista: espaço entre os itens", () => {
    expect(classes(paginationListVariants())).toContain(`gap-${step(map.parts.list.gap)}`);
  });

  it("página e página atual: Button ghost e outline, com a largura mínima do mapa", () => {
    render(<Pagination page={2} totalPages={5} />);
    const atual = screen.getByRole("button", { name: "2" });
    const outra = screen.getByRole("button", { name: "3" });
    expect(has(atual, buttonVariants({ variant: map.parts.currentPage.button as "outline" }))).toBe(
      true,
    );
    expect(has(outra, buttonVariants({ variant: map.parts.page.button as "ghost" }))).toBe(true);
    for (const [size, token] of Object.entries(map.parts.page.minWidth)) {
      expect(classes(paginationPageVariants({ size: size as "default" }))).toContain(
        `min-w-${ch(token)}`,
      );
    }
  });

  it("tamanhos icon e icon-sm: páginas e setas quadradas (Button icon)", () => {
    for (const [size, btn] of [
      ["icon", "icon"],
      ["icon-sm", "icon-sm"],
    ] as const) {
      const { unmount } = render(<Pagination page={2} totalPages={5} size={size} />);
      expect(
        has(
          screen.getByRole("button", { name: "3" }),
          buttonVariants({ variant: "ghost", size: btn }),
        ),
      ).toBe(true);
      expect(
        has(
          screen.getByRole("button", { name: "Ir para a página anterior" }),
          buttonVariants({ variant: "ghost", size: btn }),
        ),
      ).toBe(true);
      unmount();
    }
  });

  it("reticências: cor e tamanho do mapa em cada size", () => {
    for (const [size, token] of Object.entries(map.parts.ellipsis.size)) {
      const c = classes(paginationEllipsisVariants({ size: size as "default" }));
      expect(c).toContain(`size-${ch(token)}`);
      expect(c).toContain(`text-${map.parts.ellipsis.text.replace("color/", "")}`);
    }
    expect(classes(paginationEllipsisVariants({ size: "default" }))).toContain(
      `[&_svg]:size-${step(map.parts.ellipsis.iconSize.default)}`,
    );
    expect(classes(paginationEllipsisVariants({ size: "sm" }))).toContain(
      `[&_svg]:size-${step(map.parts.ellipsis.iconSize.sm)}`,
    );
  });

  it("estados: indisponível com aria-disabled", () => {
    render(<Pagination page={1} totalPages={5} />);
    expect(screen.getByRole("button", { name: "Ir para a página anterior" })).toHaveAttribute(
      map.states.unavailable.attribute,
      "true",
    );
  });
});
