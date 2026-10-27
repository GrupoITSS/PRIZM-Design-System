import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DatePicker } from "./date-picker";
import { datePickerTriggerVariants } from "./date-picker.styles";
import map from "./date-picker.tokens.json";

// Figma token name → Tailwind class suffix: "color/input" → "input",
// "control-height/md" → "control-height-md", "shadow/xs" → "shadow-xs",
// "spacing/3" → "3", "text/xs" → "xs".
const color = (token: string) => token.replace(/^color\//, "");
const scale = (token: string) => token.replace("/", "-");
const spacing = (token: string) => token.replace(/^spacing\//, "").replace("-", ".");
const suffix = (token: string) => token.split("/")[1];

const triggerClasses = (size = "md") => datePickerTriggerVariants({ size: size as never }).split(" ");

describe("DatePicker × mapa de tokens (date-picker.tokens.json)", () => {
  it("cobre todos os tamanhos do código", () => {
    expect(Object.keys(map.sizes).sort()).toEqual(["sm", "md", "lg"].sort());
  });

  it("default: fundo, texto, placeholder, borda e sombra do mapa estão nas classes", () => {
    const classes = triggerClasses();
    const s = map.states.default;
    expect(classes).toContain(`bg-${color(s.background)}`);
    expect(classes).toContain(`text-${color(s.text)}`);
    expect(classes).toContain(`data-[empty=true]:text-${color(s.placeholder)}`);
    expect(classes).toContain(`border-${color(s.border)}`);
    expect(classes).toContain("border");
    expect(classes).toContain(scale(s.shadow));
  });

  it("sem hover: o hover repete o fundo e o texto do default", () => {
    const classes = triggerClasses();
    const s = map.states.hover;
    expect(s.background).toBe(map.states.default.background);
    expect(classes).toContain(`hover:bg-${color(s.background)}`);
    expect(classes).toContain(`hover:text-${color(s.text)}`);
    expect(classes).toContain(`data-[empty=true]:hover:text-${color(map.states.default.placeholder)}`);
  });

  it("foco e calendário aberto: anel e borda do mapa estão nas classes, sem offset", () => {
    const classes = triggerClasses();
    const s = map.states.focus;
    for (const prefix of ["focus-visible:", "data-[state=open]:"]) {
      expect(classes).toContain(`${prefix}ring-${color(s.ring)}`);
      expect(classes).toContain(`${prefix}ring-${s.ringWidth}`);
      expect(classes).toContain(`${prefix}border-${color(s.border)}`);
    }
    expect(classes).toContain(`focus-visible:ring-offset-${s.ringOffsetWidth}`);
  });

  it("erro: borda do mapa está nas classes, também com foco e com o calendário aberto", () => {
    const classes = triggerClasses();
    expect(classes).toContain(`aria-invalid:border-${color(map.states.error.border)}`);
    expect(classes).toContain(`aria-invalid:focus-visible:border-${color(map.states.errorFocus.border)}`);
    expect(classes).toContain(`aria-invalid:data-[state=open]:border-${color(map.states.errorFocus.border)}`);
  });

  it("disabled: a aparência do default com a opacidade do mapa", () => {
    const classes = triggerClasses();
    const s = map.states.disabled;
    expect(classes).toContain(`disabled:opacity-${suffix(s.opacity)}`);
    expect(s.background).toBe(map.states.default.background);
    expect(s.border).toBe(map.states.default.border);
    expect(classes.some((c) => /^disabled:(bg|border|shadow)-/.test(c))).toBe(false);
  });

  it("ícone de calendário: tamanho e cor do mapa estão no elemento", () => {
    render(<DatePicker aria-label="Data" />);
    const svg = screen.getByRole("button", { name: "Data" }).querySelector("svg");
    const p = map.parts.icon;
    expect(svg).toHaveClass(`size-${suffix(p.size)}`);
    expect(svg?.parentElement).toHaveClass(`text-${color(p.color)}`);
  });

  for (const [size, tokens] of Object.entries(map.sizes)) {
    it(`${size}: altura, padding, gap, raio e texto do mapa estão nas classes`, () => {
      const classes = triggerClasses(size);
      expect(classes).toContain(`h-${scale(tokens.height)}`);
      expect(classes).toContain(`px-${spacing(tokens.paddingX)}`);
      expect(classes).toContain(`py-${spacing(tokens.paddingY)}`);
      expect(classes).toContain(`gap-${spacing(tokens.gap)}`);
      expect(classes).toContain(`rounded-${suffix(tokens.radius)}`);
      // lg: text-base abaixo do breakpoint md (divergência aberta); o Figma mostra o desktop.
      const fontClass = size === "lg" ? `md:text-${suffix(tokens.fontSize)}` : `text-${suffix(tokens.fontSize)}`;
      expect(classes).toContain(fontClass);
    });
  }
});
