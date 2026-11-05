import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Accordion } from "./accordion";
import {
  accordionContentInnerStyles,
  accordionContentStyles,
  accordionItemStyles,
  accordionTriggerStyles,
} from "./accordion.styles";
import map from "./accordion.tokens.json";

// Figma token → Tailwind: "color/accent" → "accent", "spacing/1-5" → "1.5", "radius/md" → "md",
// "text/sm" → "sm", "width/4" → "4", "opacity/50" → "50".
const step = (token: string) => {
  const v = token.split("/")[1];
  return /^\d+-\d+$/.test(v) ? v.replace("-", ".") : v;
};
const cls = (s: string) => s.split(/\s+/);
const p = map.parts;
const s = map.states;

describe("Accordion × mapa de tokens (accordion.tokens.json)", () => {
  it("item: linha de baixo em border", () => {
    const c = cls(accordionItemStyles);
    expect(c).toContain("border-b");
    expect(c).toContain(`border-${step(p.item.border)}`);
    expect(c).toContain("last:border-b-0");
  });

  it("título: texto, tamanho, peso, espaço, raio e gap até o chevron", () => {
    const c = cls(accordionTriggerStyles);
    expect(c).toContain(`text-${step(p.trigger.text)}`);
    expect(c).toContain(`text-${step(p.trigger.fontSize)}`);
    expect(c).toContain(`font-${step(p.trigger.fontWeight)}`);
    expect(c).toContain(`px-${step(p.trigger.paddingX)}`);
    expect(c).toContain(`py-${step(p.trigger.paddingY)}`);
    expect(c).toContain(`gap-${step(p.trigger.gap)}`);
    expect(c).toContain(`rounded-${step(p.trigger.radius)}`);
  });

  it("hover (e pressed, igual): fundo, texto e chevron", () => {
    const c = cls(accordionTriggerStyles);
    expect(s.pressed.background).toBe(s.hover.background);
    expect(c).toContain(`hover:bg-${step(s.hover.background)}`);
    expect(c).toContain(`hover:text-${step(s.hover.text)}`);
    expect(c).toContain(`hover:[&>svg]:text-${step(s.hover.icon)}`);
  });

  it("foco: anel ring de 2px com offset ring-offset de 2px", () => {
    const c = cls(accordionTriggerStyles);
    expect(c).toContain(`focus-visible:ring-${s.focus.ringWidth}`);
    expect(c).toContain(`focus-visible:ring-${step(s.focus.ring)}`);
    expect(c).toContain(`focus-visible:ring-offset-${s.focus.ringOffsetWidth}`);
    expect(c).toContain(`focus-visible:ring-offset-${step(s.focus.ringOffset)}`);
  });

  it("disabled: item a 50% e título sem clique", () => {
    expect(cls(accordionItemStyles)).toContain(
      `data-[disabled]:opacity-${step(s.disabled.opacity)}`,
    );
    expect(cls(accordionTriggerStyles)).toContain(
      `disabled:pointer-events-${s.disabled.pointerEvents}`,
    );
  });

  it("chevron: cor e tamanho do mapa (classe no accordion.tsx)", () => {
    const { container } = render(
      <Accordion type="single" items={[{ value: "a", trigger: "A", content: "x" }]} />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass(`text-${step(p.icon.color)}`, `size-${step(p.icon.size)}`);
  });

  it("conteúdo: texto, tamanho e espaço", () => {
    const c = cls(accordionContentStyles);
    expect(c).toContain(`text-${step(p.content.text)}`);
    expect(c).toContain(`text-${step(p.content.fontSize)}`);
    const inner = cls(accordionContentInnerStyles);
    expect(inner).toContain(`px-${step(p.content.paddingX)}`);
    expect(inner).toContain(`pt-${step(p.content.paddingTop)}`);
    expect(inner).toContain(`pb-${step(p.content.paddingBottom)}`);
  });
});
