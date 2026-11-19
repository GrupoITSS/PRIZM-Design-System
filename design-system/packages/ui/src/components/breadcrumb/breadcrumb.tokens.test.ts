import { describe, expect, it } from "vitest";
import {
  breadcrumbEllipsisStyles,
  breadcrumbLinkStyles,
  breadcrumbListStyles,
  breadcrumbPageStyles,
  breadcrumbSeparatorStyles,
} from "./breadcrumb.styles";
import map from "./breadcrumb.tokens.json";

// Figma token name → Tailwind class suffix: "color/foreground" → "foreground",
// "spacing/1-5" → "1.5", "radius/xs" → "xs", "width/9" → "9", "text/sm" → "sm".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => (token.split("/").pop() ?? token).replace("-", ".");
const split = (classes: string) => classes.split(" ");

describe("Breadcrumb × mapa de tokens (breadcrumb.tokens.json)", () => {
  it("lista: cor, tamanho do texto e espaço por tamanho", () => {
    const classes = split(breadcrumbListStyles);
    expect(classes).toContain(`text-${color(map.list.text)}`);
    expect(classes).toContain(`text-${step(map.list.fontSize)}`);
    expect(classes).toContain(`gap-${step(map.sizes.sm.gap)}`);
    expect(classes).toContain(`sm:gap-${step(map.sizes.md.gap)}`);
  });

  it("link: espaço, raio e hover do mapa", () => {
    const p = map.parts.link;
    const classes = split(breadcrumbLinkStyles);
    expect(classes).toContain(`gap-${step(p.gap)}`);
    expect(classes).toContain(`rounded-${step(p.radius)}`);
    expect(classes).toContain(`hover:text-${color(p.hover.text)}`);
  });

  it("página atual: cor, espaço e peso do mapa", () => {
    const p = map.parts.page;
    const classes = split(breadcrumbPageStyles);
    expect(classes).toContain(`text-${color(p.text)}`);
    expect(classes).toContain(`gap-${step(p.gap)}`);
    expect(classes).toContain(`font-${step(p.fontWeight)}`);
  });

  it("reticências: tamanho, raio, cor e hover do mapa", () => {
    const p = map.parts.ellipsis;
    const classes = split(breadcrumbEllipsisStyles);
    expect(classes).toContain(`w-${step(p.width)}`);
    expect(classes).toContain(`h-${step(p.height)}`);
    expect(classes).toContain(`rounded-${step(p.radius)}`);
    expect(classes).toContain(`text-${color(p.icon)}`);
    expect(classes).toContain(`hover:bg-${color(p.hover.background)}`);
    expect(classes).toContain(`hover:text-${color(p.hover.icon)}`);
  });

  it("separador: cor e tamanho do ícone do mapa", () => {
    const p = map.parts.separator;
    const classes = split(breadcrumbSeparatorStyles);
    expect(classes).toContain(`text-${color(p.icon)}`);
    // 14px = 3.5 na escala do Tailwind
    expect(classes).toContain(`[&>svg]:h-${p.size / 4}`);
    expect(classes).toContain(`[&>svg]:w-${p.size / 4}`);
  });

  it("foco: anel e espaço do mapa no link e nas reticências (o gatilho do menu usa o link)", () => {
    const f = map.states.focus;
    for (const classes of [breadcrumbLinkStyles, breadcrumbEllipsisStyles].map(split)) {
      expect(classes).toContain(`focus-visible:ring-[${f.ringWidth}px]`);
      expect(classes).toContain(`focus-visible:ring-${color(f.ring)}`);
      expect(classes).toContain(`focus-visible:ring-offset-${f.ringOffsetWidth}`);
      expect(classes).toContain(`focus-visible:ring-offset-${color(f.ringOffset)}`);
      expect(classes).toContain(`rounded-${step(f.radius)}`);
    }
  });

  it("ícone do item com o tamanho do mapa", () => {
    // 16px = 4 na escala do Tailwind
    for (const classes of [breadcrumbLinkStyles, breadcrumbPageStyles].map(split)) {
      expect(classes).toContain(`[&_svg]:size-${map.icon.size / 4}`);
    }
  });

  it("toda divergência está registrada como aberta, com Figma e código", () => {
    for (const d of map.divergences) {
      expect(d.status).toBe("aberta");
      expect(d.figma).not.toBe("");
      expect(d.code).not.toBe("");
    }
  });
});
