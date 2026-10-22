import { cleanup, fireEvent, render } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { InputGroup } from "./input-group";
import { INPUT_GROUP_BASE_CLASSES, inputGroupButtonVariants } from "./input-group.styles";
import map from "./input-group.tokens.json";

// Figma token name → Tailwind class suffix: "color/input" → "input",
// "control-height/md" → "control-height-md", "shadow/xs" → "shadow-xs".
const color = (token: string) => token.replace(/^color\//, "");
const scale = (token: string) => token.replace("/", "-");

const base = INPUT_GROUP_BASE_CLASSES.split(" ");

// Classes do contêiner depois de renderizar o grupo (o foco e o erro vêm do hook).
const classesDoGrupo = (props: Record<string, unknown>, focar = false) => {
  const r = render(
    createElement(InputGroup, {
      placeholder: "c",
      addonInlineEnd: createElement("span", null, "x"),
      ...props,
    }),
  );
  const grupo = r.container.querySelector("[data-slot=input-group]")!;
  if (focar) fireEvent.focus(r.container.querySelector("input")!);
  const classes = [...grupo.classList];
  cleanup();
  return classes;
};

describe("InputGroup × mapa de tokens (input-group.tokens.json)", () => {
  it("cobre todos os tamanhos do código", () => {
    expect(Object.keys(map.sizes).sort()).toEqual(["sm", "md", "lg"].sort());
  });

  it("default: fundo, borda, sombra e raio do mapa estão nas classes do contêiner", () => {
    const s = map.states.default;
    expect(base).toContain(`bg-${color(s.background)}`);
    expect(base).toContain(`border-${color(s.border)}`);
    expect(base).toContain(scale(s.shadow));
    expect(base).toContain(`rounded-${map.sizes.md.radius.replace(/^radius\//, "")}`);
  });

  it("erro: a borda do mapa está nas classes quando o campo é inválido", () => {
    expect(base).toContain(
      `has-[[data-slot][aria-invalid=true]]:border-${color(map.states.error.border)}`,
    );
  });

  for (const [size, tokens] of Object.entries(map.sizes)) {
    it(`${size}: a altura do mapa está nas classes do contêiner`, () => {
      expect(base).toContain(`has-[[data-size=${size}]]:h-${scale(tokens.height)}`);
    });
  }

  it("foco: anel e borda do mapa, sem translucidez", () => {
    const classes = classesDoGrupo({}, true);
    const s = map.states.focus;
    expect(classes).toContain(`ring-${s.ringWidth}`);
    expect(classes).toContain(`ring-${color(s.ring)}`);
    expect(classes).toContain(`border-${color(s.border)}`);
    expect(classes.some((c) => c.startsWith("ring-ring/"))).toBe(false);
  });

  it("erro com foco: anel do mapa e borda destructive (sem border-transparent)", () => {
    const classes = classesDoGrupo({ "aria-invalid": true }, true);
    const s = map.states.errorFocus;
    expect(classes).toContain(`ring-${s.ringWidth}`);
    expect(classes).toContain(`ring-${color(s.ring)}`);
    expect(classes).toContain(`has-[[data-slot][aria-invalid=true]]:border-${color(s.border)}`);
    expect(classes).not.toContain("border-transparent");
  });

  it("disabled: fundo e borda do mapa, sem sombra e sem opacidade na caixa", () => {
    const classes = classesDoGrupo({ disabled: true });
    const s = map.states.disabled;
    expect(classes).toContain(`bg-${color(s.background)}`);
    expect(classes).toContain(`border-${color(s.border)}`);
    expect(classes).toContain("shadow-none");
    expect(classes.some((c) => c.startsWith("opacity-"))).toBe(false);
  });

  describe("botão do complemento", () => {
    const classesOf = (size: "xs" | "sm" | "icon-xs" | "icon-sm") =>
      inputGroupButtonVariants({ size }).split(" ");

    it("sm e icon-sm usam o token de altura do mapa", () => {
      expect(classesOf("sm")).toContain(`h-${scale(map.parts.button.sm.height)}`);
      expect(classesOf("icon-sm")).toContain(`size-${scale(map.parts.button["icon-sm"].height)}`);
    });

    it("xs e icon-xs medem 24px (control-height/xs) com h-6 e size-6 fixos: divergência registrada", () => {
      expect(classesOf("xs")).toContain("h-6");
      expect(classesOf("icon-xs")).toContain("size-6");
      expect(map.divergences.some((d) => d.where.includes("botão xs"))).toBe(true);
    });
  });
});
