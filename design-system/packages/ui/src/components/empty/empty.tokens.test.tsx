import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Empty } from "./empty";
import {
  emptyContentStyles,
  emptyDescriptionStyles,
  emptyHeaderStyles,
  emptyMediaVariants,
  emptyPlainStyles,
  emptyRootStyles,
  emptyTitleStyles,
} from "./empty.styles";
import map from "./empty.tokens.json";

// Figma token → Tailwind: "color/muted" → "muted", "spacing/12" → "12", "max-width/sm" → "sm".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1];
const split = (s: string) => s.split(" ");

describe("Empty × mapa de tokens (empty.tokens.json)", () => {
  it("cobre as aparências e as mídias do código", () => {
    expect(Object.keys(map.appearances).sort()).toEqual(["dashed", "plain"]);
    expect(Object.keys(map.parts.media).sort()).toEqual(["default", "icon"]);
  });

  it("dashed: borda tracejada, raio, espaço e largura do texto", () => {
    const root = split(emptyRootStyles);
    const d = map.appearances.dashed;
    expect(root).toEqual(expect.arrayContaining(["border", `border-${d.borderStyle}`, `rounded-${step(d.radius)}`]));
    expect(root).toContain(`p-${step(d.paddingMobile)}`);
    expect(root).toContain(`md:p-${step(d.padding)}`);
    expect(split(emptyHeaderStyles)).toContain(`max-w-${step(d.headerMaxWidth)}`);
  });

  it("plain: sem borda nem espaço, texto sem limite e ícone secundário", () => {
    expect(split(emptyPlainStyles.root)).toEqual(expect.arrayContaining(["border-none", "p-0"]));
    expect(split(emptyPlainStyles.header)).toContain("max-w-none");
    expect(split(emptyPlainStyles.icon)).toContain(`text-${color(map.appearances.plain.mediaIcon)}`);
  });

  it("mídia icon: tamanho, raio, fundo e ícone; default sem fundo", () => {
    const icon = split(emptyMediaVariants({ mediaVariant: "icon" }));
    const m = map.parts.media.icon;
    expect(icon).toEqual(
      expect.arrayContaining([`size-${step(m.size)}`, `rounded-${step(m.radius)}`, `bg-${color(m.background)}`]),
    );
    expect(icon).toContain(`text-${color(map.appearances.dashed.mediaIcon)}`);
    expect(icon).toContain(`[&_svg:not([class*='size-'])]:size-${m.iconSize / 4}`);
    expect(split(emptyMediaVariants({ mediaVariant: "default" }))).toContain("bg-transparent");
  });

  it("título e descrição: cor e tamanho do mapa", () => {
    expect(split(emptyTitleStyles)).toEqual(expect.arrayContaining(["text-lg", "font-medium"]));
    const desc = split(emptyDescriptionStyles);
    expect(desc).toContain(`text-${color(map.parts.description.color)}`);
    expect(desc.some((c) => c.startsWith("text-sm"))).toBe(true);
  });

  it("link da descrição: sublinhado, 2px no hover, sem trocar a cor", () => {
    const desc = split(emptyDescriptionStyles);
    expect(desc).toContain("[&>a]:underline");
    expect(desc).toContain(`[&>a:hover]:decoration-${map.parts.description.link.hover.underlineThickness}`);
    expect(desc.some((c) => c.startsWith("[&>a:hover]:text-"))).toBe(false);
  });

  it("ações e espaçamento: largura e gaps do mapa", () => {
    expect(split(emptyContentStyles)).toEqual(
      expect.arrayContaining([`max-w-${step(map.parts.content.maxWidth)}`, `gap-${step(map.parts.content.gap)}`]),
    );
    expect(split(emptyRootStyles)).toContain(`gap-${step(map.layout.gap)}`);
    expect(split(emptyHeaderStyles)).toContain(`gap-${step(map.layout.titleGap)}`);
  });

  it(`papel ${map.role}`, () => {
    render(<Empty title="Nenhum resultado" />);
    expect(screen.getByRole(map.role as "status")).toBeInTheDocument();
  });
});
