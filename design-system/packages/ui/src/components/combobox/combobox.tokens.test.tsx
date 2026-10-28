import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Combobox } from "./combobox";
import {
  comboboxChipStyles,
  comboboxChipsSizeStyles,
  comboboxChipsStyles,
  comboboxContentStyles,
  comboboxItemStyles,
} from "./combobox.styles";
import map from "./combobox.tokens.json";
import { INPUT_GROUP_BASE_CLASSES } from "../input-group/input-group.styles";
import { inputVariants } from "../input/input.styles";

// Figma token name → Tailwind class suffix: "color/input" → "input",
// "control-height/md" → "control-height-md", "shadow/xs" → "shadow-xs",
// "spacing/3" → "3", "text/xs" → "xs".
const color = (token: string) => token.replace(/^color\//, "");
const scale = (token: string) => token.replace("/", "-");
const spacing = (token: string) => token.replace(/^spacing\//, "").replace("-", ".");
const suffix = (token: string) => token.split("/")[1];

const items = ["Next.js", "SvelteKit", "Nuxt.js"];
const groupBase = INPUT_GROUP_BASE_CLASSES.split(" ");
const inputClasses = (size = "md") => inputVariants({ size: size as never }).split(" ");
const split = (styles: string) => styles.split(" ");

const classesDoGrupo = (props: Record<string, unknown> = {}, focar = false) => {
  const r = render(<Combobox items={items} placeholder="c" {...props} />);
  if (focar) fireEvent.focus(screen.getByPlaceholderText("c"));
  const grupo = r.container.querySelector("[data-slot=input-group]")!;
  const classes = [...grupo.classList];
  cleanup();
  return classes;
};

describe("Combobox × mapa de tokens (combobox.tokens.json)", () => {
  it("cobre todos os tamanhos do código", () => {
    expect(Object.keys(map.sizes).sort()).toEqual(["sm", "md", "lg"].sort());
  });

  it("default: fundo, texto, placeholder, borda e sombra do mapa estão nas classes", () => {
    const s = map.states.default;
    expect(groupBase).toContain(`bg-${color(s.background)}`);
    expect(groupBase).toContain(`border-${color(s.border)}`);
    expect(groupBase).toContain(scale(s.shadow));
    const input = inputClasses();
    expect(input).toContain(`text-${color(s.text)}`);
    expect(input).toContain(`placeholder:text-${color(s.placeholder)}`);
  });

  it("sem hover: o fundo do mapa não muda, e o código não tem classe de hover", () => {
    expect(map.states.hover.background).toBe(map.states.default.background);
    expect(groupBase.some((c) => c.startsWith("hover:"))).toBe(false);
    expect(split(comboboxChipsStyles).some((c) => c.startsWith("hover:"))).toBe(false);
    expect(map.divergences.some((d) => d.where.includes("Hover"))).toBe(false);
  });

  it("foco: anel e borda do mapa, sem offset e sem translucidez", () => {
    const classes = classesDoGrupo({}, true);
    const s = map.states.focus;
    expect(classes).toContain(`ring-${s.ringWidth}`);
    expect(classes).toContain(`ring-${color(s.ring)}`);
    expect(classes).toContain(`border-${color(s.border)}`);
    expect(classes.some((c) => c.startsWith("ring-offset-") || c.startsWith("ring-ring/"))).toBe(
      false,
    );
  });

  it("erro: borda do mapa está nas classes, também com foco", () => {
    expect(groupBase).toContain(
      `has-[[data-slot][aria-invalid=true]]:border-${color(map.states.error.border)}`,
    );
    const classes = classesDoGrupo({ "aria-invalid": true }, true);
    expect(classes).toContain(`ring-${map.states.errorFocus.ringWidth}`);
    expect(classes).toContain(`ring-${color(map.states.errorFocus.ring)}`);
    expect(classes).not.toContain("border-transparent");
  });

  it("disabled: a aparência do default com a opacidade do mapa", () => {
    const classes = classesDoGrupo({ disabled: true });
    const s = map.states.disabled;
    expect(classes).toContain(`opacity-${suffix(s.opacity)}`);
    expect(s.background).toBe(map.states.default.background);
    expect(s.border).toBe(map.states.default.border);
    expect(classes.some((c) => /^disabled:(bg|border|shadow)-/.test(c))).toBe(false);
  });

  it("trigger: tamanho e cor do mapa estão nas classes", () => {
    render(<Combobox items={items} placeholder="c" />);
    const svg = screen.getByRole("button", { name: "Abrir opções" }).querySelector("svg");
    const p = map.parts.trigger;
    expect(svg).toHaveClass(`size-${suffix(p.size)}`);
    expect(svg).toHaveClass(`text-${color(p.color)}`);
    cleanup();
  });

  it("chip: fundo, texto, tamanho e raio do mapa estão nas classes", () => {
    const classes = split(comboboxChipStyles);
    const p = map.parts.chip;
    expect(classes).toContain(`bg-${color(p.background)}`);
    expect(classes).toContain(`text-${color(p.text)}`);
    expect(classes).toContain(`text-${suffix(p.fontSize)}`);
    expect(classes).toContain(`rounded-${suffix(p.radius)}`);
  });

  it("lista: fundo, texto, raio e sombra do mapa estão nas classes", () => {
    const classes = split(comboboxContentStyles);
    const p = map.parts.content;
    expect(classes).toContain(`bg-${color(p.background)}`);
    expect(classes).toContain(`text-${color(p.text)}`);
    expect(classes).toContain(`rounded-${suffix(p.radius)}`);
    expect(classes).toContain(scale(p.shadow));
  });

  it("item: texto, raio, tamanho e destaque do mapa estão nas classes", () => {
    const classes = split(comboboxItemStyles);
    const p = map.parts.item;
    expect(classes).toContain(`text-${color(p.text)}`);
    expect(classes).toContain(`rounded-${suffix(p.radius)}`);
    expect(classes).toContain(`text-${suffix(p.fontSize)}`);
    expect(classes).toContain(`data-highlighted:bg-${color(p.highlighted.background)}`);
    expect(classes).toContain(`data-highlighted:text-${color(p.highlighted.text)}`);
  });

  it("group label e avatar: só no Figma, registrados como divergência", () => {
    expect(map.parts.groupLabel.fontSize).toBe("text/xs");
    expect(map.parts.avatar.size).toBe(20);
    expect(map.divergences.some((d) => d.where.includes("Show Avatar"))).toBe(true);
  });

  for (const [size, tokens] of Object.entries(map.sizes)) {
    it(`${size}: altura e raio do mapa estão no grupo; padding e texto no input`, () => {
      expect(groupBase).toContain(`has-[[data-size=${size}]]:h-${scale(tokens.height)}`);
      expect(groupBase).toContain(`rounded-${suffix(tokens.radius)}`);
      const classes = inputClasses(size);
      expect(classes).toContain(`h-${scale(tokens.height)}`);
      expect(classes).toContain(`px-${spacing(tokens.paddingX)}`);
      expect(classes).toContain(`py-${spacing(tokens.paddingY)}`);
      // lg: text-base abaixo do breakpoint md (divergência aberta); o Figma mostra o desktop.
      const fontClass =
        size === "lg" ? `md:text-${suffix(tokens.fontSize)}` : `text-${suffix(tokens.fontSize)}`;
      expect(classes).toContain(fontClass);
    });

    it(`${size}: Multiple usa a altura mínima do mapa`, () => {
      const r = render(
        <Combobox
          items={items}
          multiple
          value={["Next.js"]}
          onValueChange={() => undefined}
          placeholder="c"
          size={size as "sm" | "md" | "lg"}
        />,
      );
      const chips = r.container.querySelector("[data-slot=combobox-chips]")!;
      expect(chips).toHaveClass(`min-h-${scale(tokens.height)}`);
      // lg: text-base abaixo do breakpoint md, como o Default (divergência aberta).
      expect(chips).toHaveClass(
        size === "lg" ? `md:text-${suffix(tokens.fontSize)}` : `text-${suffix(tokens.fontSize)}`,
      );
      cleanup();
    });
  }

  // A caixa do Multiple segue o Default (InputGroup): mesmo fundo, borda, raio e sombra (28/10/2026).
  it("Multiple: fundo, borda, raio e sombra do mapa estão na caixa, como no Default", () => {
    const classes = split(comboboxChipsStyles);
    const s = map.states.default;
    expect(classes).toEqual(
      expect.arrayContaining([
        `bg-${color(s.background)}`,
        `border-${color(s.border)}`,
        scale(s.shadow),
        `rounded-${suffix(map.sizes.md.radius)}`,
      ]),
    );
    expect(classes).not.toContain("bg-transparent");
    // O texto vem de comboboxChipsSizeStyles, não da base.
    expect(classes.some((c) => /^text-(xs|sm|base)$/.test(c))).toBe(false);
    expect(Object.keys(comboboxChipsSizeStyles).sort()).toEqual(Object.keys(map.sizes).sort());
  });
});
