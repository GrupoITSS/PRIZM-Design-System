import { describe, expect, it } from "vitest";
import {
  cardActionStyles,
  cardContentStyles,
  cardDescriptionStyles,
  cardFooterStyles,
  cardHeaderStyles,
  cardTitleStyles,
  cardVariants,
} from "./card.styles";
import map from "./card.tokens.json";

// Figma token → Tailwind: "color/card" → "card"; "radius/xl" → "xl"; "spacing/1-5" → "1.5".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1].replace("-", ".");
const cls = (s: string) => s.split(/\s+/);

describe("Card × mapa de tokens (card.tokens.json)", () => {
  it("cobre as partes do mapa", () => {
    expect(Object.keys(map.parts)).toEqual([
      "container",
      "header",
      "title",
      "description",
      "action",
      "content",
      "footer",
    ]);
  });

  it("contêiner: fundo, borda, texto, raio e sombra do mapa estão nas classes", () => {
    const c = cls(cardVariants());
    const p = map.parts.container;
    expect(c).toContain(`bg-${color(p.background)}`);
    expect(c).toContain(`text-${color(p.text)}`);
    expect(c).toContain("border");
    expect(c).toContain(`border-${color(p.border)}`);
    expect(c).toContain(`rounded-${step(p.radius)}`);
    expect(c).toContain("shadow-sm");
    expect(p.shadow).toBe("style/shadow/sm");
    expect(p.borderWidth).toBe("border-width/1");
  });

  it("cabeçalho: padding e gap do mapa (código) estão nas classes", () => {
    const c = cls(cardHeaderStyles);
    const h = map.parts.header;
    expect(c).toContain(`p-${step(h.padding)}`);
    expect(c).toContain(`gap-${step(h.gap)}`);
    expect(c.some((x) => x.includes("has-data-[slot=card-action]"))).toBe(true);
  });

  it("título: tamanho, peso e cor do mapa estão nas classes", () => {
    const c = cls(cardTitleStyles);
    const t = map.parts.title;
    expect(c).toContain(`text-${step(t.fontSize)}`);
    expect(c).toContain("font-semibold");
    expect(t.text).toBe("color/card-foreground");
    expect(t.fontWeight).toBe("font-weight/semibold");
  });

  it("descrição: tamanho e cor do mapa estão nas classes", () => {
    const c = cls(cardDescriptionStyles);
    const d = map.parts.description;
    expect(c).toContain(`text-${step(d.fontSize)}`);
    expect(c).toContain(`text-${color(d.text)}`);
  });

  it("conteúdo e rodapé: padding do mapa (p-6 pt-0) está nas classes", () => {
    for (const styles of [cardContentStyles, cardFooterStyles]) {
      const c = cls(styles);
      expect(c).toContain(`p-${step(map.parts.content.padding)}`);
      expect(c).toContain("pt-0");
    }
  });

  it("CardAction: grade no canto superior direito", () => {
    const c = cls(cardActionStyles);
    expect(c).toContain("col-start-2");
    expect(c).toContain("row-span-2");
    expect(c).toContain("row-start-1");
    expect(c).toContain(`gap-${step(map.parts.action.gap)}`);
  });

  it("sem eixo de tamanho nem estados interativos no mapa", () => {
    expect(map.sizes.note).toMatch(/Densidade única/);
    expect(map.states.note).toMatch(/Sem hover/);
  });
});
