import { describe, expect, it } from "vitest";
import { tableCaption, tableFooter, tableHead, tableCell, tableRow } from "./table.styles";
import map from "./table.tokens.json";

// Figma token name -> Tailwind class suffix: "color/border" -> "border", "spacing/2" -> "2".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1].replace("-", ".");
const cls = (s: string) => s.split(" ");

describe("Table × mapa de tokens (table.tokens.json)", () => {
  it("cabeçalho: altura, padding, cor, peso e sem quebra", () => {
    const h = map.parts.head;
    const c = cls(tableHead);
    expect(c).toContain(`h-${step(h.height)}`);
    expect(c).toContain(`px-${step(h.paddingX)}`);
    expect(c).toContain(`text-${color(h.text)}`);
    expect(c).toContain("font-medium");
    expect(c).toContain("whitespace-nowrap");
  });

  it("célula: padding do mapa e quebra de linha", () => {
    const c = cls(tableCell);
    expect(c).toContain(`p-${step(map.parts.cell.padding)}`);
    expect(c).not.toContain("whitespace-nowrap");
  });

  it("linha: borda, hover e selecionada do mapa", () => {
    const c = cls(tableRow);
    const s = map.states;
    expect(c).toContain(`border-${color(map.parts.cell.border)}`);
    expect(c).toContain(`hover:bg-${color(s.hover.background)}/${String(s.hover.opacity * 100)}`);
    expect(c).toContain(`data-[state=selected]:bg-${color(s.selected.background)}`);
  });

  it("rodapé: fundo a 50% e peso medium", () => {
    const f = map.parts.footer;
    const c = cls(tableFooter);
    expect(c).toContain(`bg-${color(f.background)}/${String(f.backgroundOpacity * 100)}`);
    expect(c).toContain("font-medium");
  });

  it("legenda: cor, tamanho e espaço acima do mapa", () => {
    const l = map.parts.caption;
    const c = cls(tableCaption);
    expect(c).toContain(`text-${color(l.text)}`);
    expect(c).toContain(`text-${step(l.fontSize)}`);
    expect(c).toContain(`mt-${step(l.marginTop)}`);
  });

  it("rodapé: borda de cima no mapa e no código", () => {
    expect(map.parts.footer.border).toBe("color/border");
    expect(cls(tableFooter)).toContain("border-t");
  });

  it("a célula Dropdown do Figma corresponde ao renderizador actions", () => {
    expect(map.cellTypes.Dropdown).toBe("actions");
  });
});
