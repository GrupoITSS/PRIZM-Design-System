import { describe, expect, it } from "vitest";
import { tabsContentVariants, tabsListVariants, tabsTriggerVariants } from "./tabs.styles";
import map from "./tabs.tokens.json";

// Nome do Figma -> sufixo da classe Tailwind: "color/border" -> "border", "spacing/2-5" -> "2.5".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1].replace("-", ".");

const list = (variant: "underline" | "pills") => tabsListVariants({ variant }).split(" ");
const trigger = (variant: "underline" | "pills") => tabsTriggerVariants({ variant }).split(" ");

describe("Tabs × mapa de tokens (tabs.tokens.json)", () => {
  it("cobre as variantes do código", () => {
    expect(Object.keys(map.variants)).toEqual(["underline", "pills"]);
  });

  for (const variant of ["underline", "pills"] as const) {
    const v = map.variants[variant];

    it(`${variant}: texto da aba inativa e da ativa`, () => {
      const t = trigger(variant);
      expect(list(variant)).toContain(`text-${color(v.trigger.text)}`);
      expect(t).toContain(`data-[state=active]:text-${color(v.active.text)}`);
    });

    it(`${variant}: peso, raio e hover da aba`, () => {
      const t = trigger(variant);
      expect(t).toContain(`font-${v.trigger.fontWeight.split("/")[1]}`);
      expect(t).toContain(v.trigger.radius === "radius/none" ? "rounded-none" : `rounded-${step(v.trigger.radius)}`);
      expect(t).toContain(`hover:text-${color(v.hover.text)}`);
    });

    it(`${variant}: anel de foco do mapa (o do Button), na aba e no painel`, () => {
      const f = map.states.focus;
      for (const classes of [trigger(variant), tabsContentVariants({ variant }).split(" ")]) {
        expect(classes).toContain(`focus-visible:ring-[${String(f.ringWidth)}px]`);
        expect(classes).toContain(`focus-visible:ring-${color(f.ring)}`);
        expect(classes).toContain(`focus-visible:ring-offset-${String(f.ringOffsetWidth)}`);
        expect(classes).toContain(`focus-visible:ring-offset-${color(f.ringOffset)}`);
      }
      expect(trigger(variant)).not.toContain("focus-visible:ring-0");
    });

    it(`${variant}: disabled com a opacidade do mapa`, () => {
      expect(trigger(variant)).toContain(`disabled:opacity-${map.states.disabled.opacity.split("/")[1]}`);
    });
  }

  it("underline: padding da aba e indicador em primary", () => {
    const u = map.variants.underline, t = trigger("underline");
    expect(t).toContain(`px-${step(u.trigger.paddingX)}`);
    expect(t).toContain(`pt-${step(u.trigger.paddingTop)}`);
    expect(t).toContain(`pb-${step(u.trigger.paddingBottom)}`);
    expect(t).toContain(`data-[state=active]:after:bg-${color(u.active.indicator)}`);
    expect(t).toContain(`after:h-${step(u.active.indicatorHeight)}`);
  });

  it("pills: lista em muted com 36px e raio lg; aba ativa em primary com sombra e badge invertido", () => {
    const p = map.variants.pills, l = list("pills"), t = trigger("pills");
    expect(l).toContain(`bg-${color(p.list.background)}`);
    expect(l).toContain(`h-${step(p.list.height)}`);
    expect(l).toContain(`rounded-${step(p.list.radius)}`);
    expect(t).toContain(`px-${step(p.trigger.paddingX)}`);
    expect(t).toContain(`py-${step(p.trigger.paddingY)}`);
    expect(t).toContain(`data-[state=active]:bg-${color(p.active.background)}`);
    expect(t).toContain(`data-[state=active]:shadow-${p.active.shadow.split("/").pop() ?? ""}`);
    expect(t).toContain(`data-[state=active]:hover:text-${color(p.active.text)}`);
    expect(t).toContain(`data-[state=active]:[&_[data-slot=tabs-trigger-badge]>*]:bg-${color(p.active.badge.background)}`);
    expect(t).toContain(`data-[state=active]:[&_[data-slot=tabs-trigger-badge]>*]:text-${color(p.active.badge.text)}`);
  });
});
