import { describe, expect, it } from "vitest";
import {
  inputOTPCaretLine,
  inputOTPContainerVariants,
  inputOTPPlaceholder,
  inputOTPSeparatorGap,
  inputOTPSeparatorStyles,
  inputOTPSlotActive,
  inputOTPSlotVariants,
  inputOTPWrapper,
  inputOTPWrapperInvalid,
} from "./input-otp.styles";
import map from "./input-otp.tokens.json";

// Figma token name → Tailwind class suffix: "color/input" → "input",
// "control-height/md" → "control-height-md", "shadow/xs" → "shadow-xs",
// "spacing/1-5" → "1.5", "text/xs" → "xs".
const color = (token: string) => token.replace(/^color\//, "");
const scale = (token: string) => token.replace("/", "-");
const spacing = (token: string) => token.replace(/^spacing\//, "").replace("-", ".");
const suffix = (token: string) => token.split("/")[1];

const split = (styles: string) => styles.split(" ");
const slotClasses = (size = "md") => inputOTPSlotVariants({ size: size as never }).split(" ");

describe("InputOTP × mapa de tokens (input-otp.tokens.json)", () => {
  it("cobre todos os tamanhos do código", () => {
    expect(Object.keys(map.sizes).sort()).toEqual(["sm", "md", "lg"].sort());
  });

  it("default: fundo, borda e texto do mapa estão no contêiner e no slot", () => {
    const s = map.states.default;
    expect(split(inputOTPWrapper)).toEqual(
      expect.arrayContaining([`bg-${color(s.background)}`, `border-${color(s.border)}`, "border"]),
    );
    expect(slotClasses()).toEqual(
      expect.arrayContaining([`text-${color(s.text)}`, `border-${color(s.border)}`]),
    );
    expect(split(inputOTPPlaceholder)).toContain(`text-${color(s.placeholder)}`);
  });

  it("contêiner: raio e sombra do mapa estão nas classes", () => {
    const p = map.parts.container;
    expect(p.background).toBe(map.states.default.background);
    expect(split(inputOTPWrapper)).toEqual(
      expect.arrayContaining([`rounded-${suffix(p.radius)}`, scale(p.shadow)]),
    );
  });

  it("foco: o anel do mapa está no slot ativo, sem anel de outra cor", () => {
    const s = map.states.focus;
    const classes = split(inputOTPSlotActive);
    expect(classes).toEqual(expect.arrayContaining([`ring-${color(s.ring)}`, `ring-${s.ringWidth}`]));
    expect(classes.some((c) => /^ring-(destructive|ring\/)/.test(c))).toBe(false);
  });

  it("erro: só a borda do mapa, sem anel destructive", () => {
    const classes = split(inputOTPWrapperInvalid);
    expect(classes).toContain(`border-${color(map.states.error.border)}`);
    expect(classes.some((c) => c.startsWith("ring"))).toBe(false);
    expect(map.states.errorFocus.ring).toBe(map.states.focus.ring);
  });

  it("disabled: a aparência do default com a opacidade do mapa", () => {
    const s = map.states.disabled;
    expect(inputOTPContainerVariants().split(" ")).toContain(`has-[:disabled]:opacity-${suffix(s.opacity)}`);
    expect(s.background).toBe(map.states.default.background);
    expect(s.border).toBe(map.states.default.border);
  });

  it("separador: cor e espaço do mapa estão nas classes", () => {
    const p = map.parts.separator;
    expect(split(inputOTPSeparatorStyles)).toContain(`text-${color(p.color)}`);
    expect(split(inputOTPSeparatorGap)).toContain(`mx-${spacing(p.gap)}`);
  });

  it("cursor: cor do mapa está na linha do cursor", () => {
    expect(split(inputOTPCaretLine)).toContain(`bg-${color(map.parts.caret.color)}`);
  });

  for (const [size, tokens] of Object.entries(map.sizes)) {
    it(`${size}: slot quadrado em control-height e texto do mapa`, () => {
      const classes = slotClasses(size);
      expect(classes).toContain(`size-${scale(tokens.size)}`);
      // lg: text-base abaixo do breakpoint md (divergência aberta); o Figma mostra o desktop.
      const fontClass = size === "lg" ? `md:text-${suffix(tokens.fontSize)}` : `text-${suffix(tokens.fontSize)}`;
      expect(classes).toContain(fontClass);
    });
  }
});
