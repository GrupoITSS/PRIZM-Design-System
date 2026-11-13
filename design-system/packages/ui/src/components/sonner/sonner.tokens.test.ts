import { describe, expect, it } from "vitest";
import {
  toastActionButtonClassName,
  toastBaseClassName,
  toastCloseButtonClassName,
  toastErrorClassName,
  toastInfoClassName,
  toastNeutralClassName,
  toastSuccessClassName,
  toastTitleClassName,
  toastWarningClassName,
  toasterStyle,
} from "./sonner.styles";
import map from "./sonner.tokens.json";

// Figma token → variável CSS do Prizm: "color/success-weak" → "var(--prizm-color-success-weak)".
const cssVar = (token: string) => `var(--prizm-${token.replace("/", "-")})`;
// Figma token → Tailwind: "color/success" → "success", "spacing/2" → "2".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1];
const cls = (s: string) => s.split(/\s+/);
const style = toasterStyle as Record<string, string>;

type Type = keyof typeof map.types;
const iconClass: Partial<Record<Type, string>> = {
  success: toastSuccessClassName,
  info: toastInfoClassName,
  warning: toastWarningClassName,
  error: toastErrorClassName,
};

describe("Sonner × mapa de tokens (sonner.tokens.json)", () => {
  it("cobre os tipos do toast()", () => {
    expect(Object.keys(map.types).sort()).toEqual(
      ["default", "success", "info", "warning", "error", "loading"].sort(),
    );
  });

  for (const [type, t] of Object.entries(map.types) as [Type, (typeof map.types)[Type]][]) {
    it(`${type}: fundo, borda e texto pelas variáveis do Sonner`, () => {
      expect(style[`--${t.sonnerVar}-bg`]).toBe(cssVar(t.background));
      expect(style[`--${t.sonnerVar}-border`]).toBe(cssVar(t.border));
      expect(style[`--${t.sonnerVar}-text`]).toBe(cssVar(t.title));
    });

    it(`${type}: ícone e descrição na cor do mapa`, () => {
      const icon = iconClass[type];
      if (icon) expect(cls(icon)).toContain(`[&_[data-icon]]:text-${color(t.icon)}`);
      if (t.description === "color/muted-foreground")
        expect(cls(toastNeutralClassName)).toContain(
          `[&_[data-description]]:!text-${color(t.description)}`,
        );
      else expect(t.description).toBe(t.title);
    });
  }

  it("raio, gap, texto e sombra", () => {
    expect(style["--border-radius"]).toBe(cssVar(map.layout.radius));
    const c = cls(toastBaseClassName);
    expect(c).toContain(`!gap-${step(map.layout.gap)}`);
    expect(c).toContain("!text-sm");
    expect(c).toContain(`!shadow-${step(map.layout.shadow)}`);
    expect(cls(toastTitleClassName)).toContain("!leading-5");
  });

  it("foco: anel do Button", () => {
    const f = map.states.focus;
    const c = cls(toastBaseClassName);
    expect(c).toContain(`focus-visible:!ring-[${f.ringWidth}px]`);
    expect(c).toContain(`focus-visible:!ring-${color(f.ring)}`);
    expect(c).toContain(`focus-visible:!ring-offset-${f.ringOffsetWidth}`);
    expect(c).toContain(`focus-visible:!ring-offset-${color(f.ringOffset)}`);
  });

  it("ação: Button outline sm, na altura control-height/sm", () => {
    expect(cls(toastActionButtonClassName)).toContain(
      `!h-${map.layout.action.height.replace("/", "-")}`,
    );
  });

  it("botão fechar: 24px", () => {
    expect(map.layout.closeButton.size).toBe("24px");
    expect(cls(toastCloseButtonClassName)).toContain("!size-6");
  });
});
