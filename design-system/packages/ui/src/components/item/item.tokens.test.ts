import { describe, expect, it } from "vitest";
import { itemDescriptionStyles, itemMediaVariants, itemTitleStyles, itemVariants } from "./item.styles";
import map from "./item.tokens.json";

// Figma token name -> Tailwind class suffix: "color/border" -> "border", "spacing/2-5" -> "2.5".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1].replace("-", ".");

const classesOf = (variant: string, size = "default") =>
  itemVariants({ variant: variant as never, size: size as never }).split(" ");

describe("Item × mapa de tokens (item.tokens.json)", () => {
  it("cobre as variantes e os tamanhos do código", () => {
    expect(Object.keys(map.variants)).toEqual(["default", "outline", "muted"]);
    expect(Object.keys(map.sizes)).toEqual(["default", "sm", "xs"]);
  });

  it("outline: a borda do mapa está nas classes", () => {
    expect(classesOf("outline")).toContain(`border-${color(map.variants.outline.border)}`);
  });

  it("muted: o fundo e a opacidade do mapa estão nas classes", () => {
    const m = map.variants.muted;
    expect(classesOf("muted")).toContain(`bg-${color(m.background)}/${String(m.backgroundOpacity * 100)}`);
  });

  for (const [size, s] of Object.entries(map.sizes)) {
    it(`${size}: padding e gap do mapa estão nas classes`, () => {
      const classes = classesOf("default", size);
      const px = `px-${step(s.paddingX)}`, py = `py-${step(s.paddingY)}`, gap = `gap-${step(s.gap)}`;
      const p = s.paddingX === s.paddingY ? `p-${step(s.paddingX)}` : null;
      expect(p ? classes.includes(p) : classes.includes(px) && classes.includes(py)).toBe(true);
      expect(classes).toContain(gap);
    });
  }

  it("raio do contêiner do mapa está nas classes", () => {
    expect(classesOf("default")).toContain(`rounded-${step(map.parts.container.radius)}`);
  });

  it("foco: o anel do mapa (o do Button) está nas classes, não ring/50", () => {
    const classes = classesOf("default");
    const f = map.states.focus;
    expect(classes).toContain(`focus-visible:ring-[${String(f.ringWidth)}px]`);
    expect(classes).toContain(`focus-visible:ring-${color(f.ring)}`);
    expect(classes).toContain(`focus-visible:ring-offset-${String(f.ringOffsetWidth)}`);
    expect(classes).toContain(`focus-visible:ring-offset-${color(f.ringOffset)}`);
    expect(classes.join(" ")).not.toContain("ring-ring/50");
  });

  it("título e descrição: tamanho, peso e cor do mapa; no xs, text/xs", () => {
    const t = itemTitleStyles.split(" "), d = itemDescriptionStyles.split(" ");
    expect(t).toContain(`text-${step(map.parts.title.fontSize)}`);
    expect(t).toContain("font-medium");
    expect(d).toContain(`text-${color(map.parts.description.text)}`);
    expect(t).toContain(`group-data-[size=xs]/item:text-${step(map.sizes.xs.fontSize)}`);
    expect(d).toContain(`group-data-[size=xs]/item:text-${step(map.sizes.xs.fontSize)}`);
  });

  it("mídia Icon: fundo, borda, tamanho e raio do mapa estão nas classes", () => {
    const c = itemMediaVariants({ variant: "icon" }).split(" ");
    const i = map.parts.mediaIcon;
    expect(c).toContain(`bg-${color(i.background)}`);
    expect(c).toContain("border");
    expect(c).toContain(`size-${step(i.size)}`);
    expect(c).toContain(`rounded-${step(i.radius)}`);
  });
});
