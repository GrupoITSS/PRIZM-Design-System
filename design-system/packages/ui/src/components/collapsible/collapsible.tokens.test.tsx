import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import {
  collapsibleContentStyles,
  collapsibleIconStyles,
  collapsibleTriggerStyles,
} from "./collapsible.styles";
import map from "./collapsible.tokens.json";

// Figma token → Tailwind: "color/accent" → "accent", "radius/md" → "md", "text/sm" → "sm",
// "width/4" → "4", "opacity/50" → "50", "font/sans" → "sans".
const step = (token: string) => token.split("/")[1];
const cls = (s: string) => s.split(/\s+/);
const p = map.parts;
const s = map.states;
const ICON = "[&_[data-slot=collapsible-icon]]";

describe("Collapsible × mapa de tokens (collapsible.tokens.json)", () => {
  it("gatilho: texto, tamanho, peso, espaço, raio e gap até o ícone", () => {
    const c = cls(collapsibleTriggerStyles);
    expect(c).toContain(`text-${step(p.trigger.text)}`);
    expect(c).toContain(`text-${step(p.trigger.fontSize)}`);
    expect(c).toContain(`font-${step(p.trigger.fontWeight)}`);
    expect(c).toContain(`px-${step(p.trigger.paddingX)}`);
    expect(c).toContain(`py-${step(p.trigger.paddingY)}`);
    expect(c).toContain(`gap-${step(p.trigger.gap)}`);
    expect(c).toContain(`rounded-${step(p.trigger.radius)}`);
  });

  it("hover (e pressed, igual): fundo, texto e ícone", () => {
    const c = cls(collapsibleTriggerStyles);
    expect(s.pressed.background).toBe(s.hover.background);
    expect(s.pressed.text).toBe(s.hover.text);
    expect(c).toContain(`hover:bg-${step(s.hover.background)}`);
    expect(c).toContain(`hover:text-${step(s.hover.text)}`);
    expect(c).toContain(`hover:${ICON}:text-${step(s.hover.icon)}`);
  });

  it("foco: anel ring de 2px com offset ring-offset de 2px", () => {
    const c = cls(collapsibleTriggerStyles);
    expect(c).toContain(`focus-visible:ring-${s.focus.ringWidth}`);
    expect(c).toContain(`focus-visible:ring-${step(s.focus.ring)}`);
    expect(c).toContain(`focus-visible:ring-offset-${s.focus.ringOffsetWidth}`);
    expect(c).toContain(`focus-visible:ring-offset-${step(s.focus.ringOffset)}`);
  });

  it("disabled: 50% e sem clique", () => {
    const c = cls(collapsibleTriggerStyles);
    expect(c).toContain(`disabled:opacity-${step(s.disabled.opacity)}`);
    expect(c).toContain(`disabled:pointer-events-${s.disabled.pointerEvents}`);
  });

  it("ícone: cor, tamanho e rotação com o painel aberto", () => {
    expect(cls(collapsibleTriggerStyles)).toContain(`${ICON}:text-${step(p.icon.color)}`);
    const c = cls(collapsibleIconStyles);
    expect(c).toContain(`[&_svg]:size-${step(p.icon.size)}`);
    expect(c).toContain(`group-data-[state=open]/collapsible:rotate-${p.icon.openRotation}`);
  });

  it("conteúdo: sem estilo de cor nem espaço, só a animação", () => {
    const c = cls(collapsibleContentStyles);
    expect(c).toContain("overflow-hidden");
    expect(c.some((x) => /^(p[xytb]?|text|bg)-/.test(x))).toBe(false);
  });
});
