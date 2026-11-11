import { describe, expect, it } from "vitest";
import {
  sidebarFocusRing,
  sidebarGroupActionStyles,
  sidebarGroupLabelStyles,
  sidebarMenuBadgeStyles,
  sidebarMenuButtonVariants,
  sidebarMenuSubButtonStyles,
  sidebarMenuSubStyles,
} from "./sidebar.styles";
import map from "./sidebar.tokens.json";

// Figma token name → Tailwind class suffix: "color/sidebar-primary" → "sidebar-primary",
// "height/8" → "8", "text/xs" → "xs", "font-weight/medium" → "medium".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1];

const split = (classes: string) => classes.split(" ");
const button = (size: "default" | "lg" = "default") =>
  split(sidebarMenuButtonVariants({ size }));

describe("Sidebar × mapa de tokens (sidebar.tokens.json)", () => {
  it("cobre todos os tamanhos do SidebarMenuButton no código", () => {
    expect(Object.keys(map.sizes).sort()).toEqual(["default", "lg"]);
  });

  it("item: hover do mapa está nas classes", () => {
    const classes = button();
    expect(classes).toContain(`hover:bg-${color(map.states.hover.background)}`);
    expect(classes).toContain(`hover:text-${color(map.states.hover.text)}`);
  });

  it("item ativo: fundo, texto e peso do mapa estão nas classes", () => {
    const classes = button();
    const s = map.states.active;
    expect(classes).toContain(`data-[active=true]:bg-${color(s.background)}`);
    expect(classes).toContain(`data-[active=true]:text-${color(s.text)}`);
    expect(classes).toContain(`data-[active=true]:font-${step(s.fontWeight)}`);
  });

  it("foco: anel e espaço do mapa estão no anel de todas as peças interativas", () => {
    const s = map.states.focus;
    const ring = split(sidebarFocusRing);
    expect(ring).toContain(`focus-visible:ring-${color(s.ring)}`);
    expect(ring).toContain(`focus-visible:ring-[${s.ringWidth}px]`);
    expect(ring).toContain(`focus-visible:ring-offset-${color(s.ringOffset)}`);
    expect(ring).toContain(`focus-visible:ring-offset-${s.ringOffsetWidth}`);
    for (const peca of [
      sidebarMenuButtonVariants(),
      sidebarGroupLabelStyles,
      sidebarGroupActionStyles,
      sidebarMenuSubButtonStyles,
    ]) {
      expect(peca).toContain(sidebarFocusRing);
      expect(split(peca)).not.toContain("focus-visible:ring-ring");
    }
  });

  it("disabled: a opacidade do mapa, sem trocar cores", () => {
    const classes = button();
    expect(classes).toContain(`disabled:opacity-${step(map.states.disabled.opacity)}`);
    expect(classes).toContain(`aria-disabled:opacity-${step(map.states.disabled.opacity)}`);
    expect(classes.some((c) => /^disabled:(bg|text)-/.test(c))).toBe(false);
  });

  for (const [size, tokens] of Object.entries(map.sizes)) {
    it(`${size}: altura, padding, gap, raio e texto do mapa estão nas classes`, () => {
      const classes = button(size as "default" | "lg");
      const altura = typeof tokens.height === "number" ? String(tokens.height / 4) : step(tokens.height);
      expect(classes).toContain(`h-${altura}`);
      expect(classes).toContain(`p-${step(tokens.padding)}`);
      expect(classes).toContain(`gap-${step(tokens.gap)}`);
      expect(classes).toContain(`rounded-${step(tokens.radius)}`);
      expect(classes).toContain(`text-${step(tokens.fontSize)}`);
    });
  }

  it("rótulo do grupo: texto a 70%, tamanho, peso, altura e padding do mapa", () => {
    const p = map.parts.groupLabel;
    const classes = split(sidebarGroupLabelStyles);
    expect(classes).toContain(`text-${color(p.text)}/${p.textOpacity * 100}`);
    expect(classes).toContain(`text-${step(p.fontSize)}`);
    expect(classes).toContain(`font-${step(p.fontWeight)}`);
    expect(classes).toContain(`h-${step(p.height)}`);
    expect(classes).toContain(`px-${step(p.paddingX)}`);
  });

  it("ação do grupo: ícone, hover e tamanho do mapa", () => {
    const p = map.parts.groupAction;
    const classes = split(sidebarGroupActionStyles);
    expect(classes).toContain(`text-${color(p.icon)}`);
    expect(classes).toContain(`hover:bg-${color(p.hoverBackground)}`);
    expect(classes).toContain(`hover:text-${color(p.hoverIcon)}`);
    expect(classes).toContain(`w-${step(p.size)}`);
  });

  it("subitem: texto, hover, ativo e medidas do mapa", () => {
    const p = map.parts.subButton;
    const classes = split(sidebarMenuSubButtonStyles);
    expect(classes).toContain(`text-${color(p.text)}`);
    expect(classes).toContain(`hover:bg-${color(p.hoverBackground)}`);
    expect(classes).toContain(`data-[active=true]:bg-${color(p.activeBackground)}`);
    expect(classes).toContain(`data-[active=true]:text-${color(p.activeText)}`);
    expect(classes).toContain(`h-${step(p.height)}`);
    expect(classes).toContain(`px-${step(p.paddingX)}`);
    expect(classes).toContain(`gap-${step(p.gap)}`);
    expect(classes).toContain(`rounded-${step(p.radius)}`);
  });

  it("submenu: borda do mapa", () => {
    expect(split(sidebarMenuSubStyles)).toContain(`border-${color(map.parts.sub.border)}`);
  });

  it("contador: texto, tamanho e peso do mapa", () => {
    const p = map.parts.badge;
    const classes = split(sidebarMenuBadgeStyles);
    expect(classes).toContain(`text-${color(p.text)}`);
    expect(classes).toContain(`text-${step(p.fontSize)}`);
    expect(classes).toContain(`font-${step(p.fontWeight)}`);
  });

  it("toda divergência está registrada como aberta, com Figma e código", () => {
    for (const d of map.divergences) {
      expect(d.status).toBe("aberta");
      expect(d.figma).not.toBe("");
      expect(d.code).not.toBe("");
    }
  });
});
