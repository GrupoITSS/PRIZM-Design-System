import { describe, expect, it } from "vitest";
import {
  buttonGroupSeparatorClass,
  buttonGroupTextClass,
  buttonGroupVariants,
} from "./button-group.styles";
import map from "./button-group.tokens.json";

// Figma token name → Tailwind class suffix: "color/border" → "border", "spacing/4" → "4",
// "text/sm" → "sm", "radius/md" → "md", "style/shadow/xs" → "shadow-xs".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/").pop() ?? token;
const split = (classes: string) => classes.split(" ");

describe("ButtonGroup × mapa de tokens (button-group.tokens.json)", () => {
  it("cobre as orientações do código", () => {
    const fromCode = ["horizontal", "vertical"].filter((o) =>
      buttonGroupVariants({ orientation: o as "horizontal" | "vertical" }),
    );
    expect(map.orientations).toEqual(fromCode);
  });

  it("horizontal: cantos de dentro retos e borda colada removida", () => {
    const classes = split(buttonGroupVariants({ orientation: "horizontal" }));
    expect(classes).toContain("[&>*:not(:first-child)]:rounded-l-none");
    expect(classes).toContain("[&>*:not(:last-child)]:rounded-r-none");
    expect(classes).toContain("[&>*:not(:first-child)]:border-l-0");
  });

  it("vertical: cantos de dentro retos e borda colada removida", () => {
    const classes = split(buttonGroupVariants({ orientation: "vertical" }));
    expect(classes).toContain("flex-col");
    expect(classes).toContain("[&>*:not(:first-child)]:rounded-t-none");
    expect(classes).toContain("[&>*:not(:last-child)]:rounded-b-none");
    expect(classes).toContain("[&>*:not(:first-child)]:border-t-0");
  });

  it("foco: o botão focado vem para a frente", () => {
    const classes = split(buttonGroupVariants());
    expect(classes).toContain("[&>*]:focus-visible:relative");
    expect(classes).toContain("[&>*]:focus-visible:z-10");
  });

  it("grupo dentro de grupo: espaço do mapa", () => {
    expect(split(buttonGroupVariants())).toContain(
      `has-[>[data-slot=button-group]]:gap-${step(map.container.nestedGap)}`,
    );
  });

  it("separador: cor padrão e cor depois dos botões cheios", () => {
    const s = map.separator;
    const classes = split(buttonGroupSeparatorClass);
    expect(classes).toContain(`bg-${color(s.default)}`);
    for (const v of s.filledVariants) {
      expect(classes).toContain(
        `[[data-variant=${v}]+&]:bg-${color(s.afterFilled)}/${s.afterFilledOpacity * 100}`,
      );
    }
    expect(classes).toContain(`min-w-px`);
  });

  it("separador por variante bate com a regra do separador", () => {
    expect(map.variants.default.separator).toBe(map.separator.afterFilled);
    expect(map.variants.default.separatorOpacity).toBe(map.separator.afterFilledOpacity);
    expect(map.variants.secondary.separator).toBe(map.separator.default);
    expect(map.variants.outline.separator).toBeNull();
  });

  it("ButtonGroupText: fundo, borda, raio, padding, texto e sombra do mapa", () => {
    const p = map.parts.text;
    const classes = split(buttonGroupTextClass);
    expect(classes).toContain(`bg-${color(p.background)}`);
    expect(classes).toContain("border");
    expect(classes).toContain(`rounded-${step(p.radius)}`);
    expect(classes).toContain(`px-${step(p.paddingX)}`);
    expect(classes).toContain(`gap-${step(p.gap)}`);
    expect(classes).toContain(`text-${step(p.fontSize)}`);
    expect(classes).toContain(`font-${step(p.fontWeight)}`);
    expect(classes).toContain(`shadow-${step(p.shadow)}`);
  });

  it("toda divergência está registrada como aberta, com Figma e código", () => {
    for (const d of map.divergences) {
      expect(d.status).toBe("aberta");
      expect(d.figma).not.toBe("");
      expect(d.code).not.toBe("");
    }
  });
});
