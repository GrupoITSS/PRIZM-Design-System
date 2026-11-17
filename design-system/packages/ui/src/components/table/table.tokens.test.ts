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

describe("Table × mapa de tokens: linhas que expandem", () => {
  it("coluna de 48px e recuo de 40px na sub-linha", async () => {
    const { tableExpandHead, tableExpandCell, tableSubRowIndent } = await import("./table.styles");
    expect(map.parts.expand.column).toMatch(/^48px \(w-12\)/);
    expect(tableExpandHead.split(" ")).toContain("w-12");
    expect(tableExpandCell.split(" ")).toContain("w-12");
    expect(map.parts.expand.subRowIndent).toContain("pl-10");
    expect(tableSubRowIndent.split(" ")).toContain("pl-10");
  });
});

describe("Table × mapa de tokens: altura da linha e texto (17/11/2026)", () => {
  it("padrão com 52px (h-13); texto cortado e números tabulares", async () => {
    const s = await import("./table.styles");
    expect(map.parts.rowHeight).toMatch(/^52px \(h-13\)/);
    expect(cls(s.tableCellMinHeight)).toContain("h-13");
    expect(map.parts.text.truncate).toContain("max-w-0");
    expect(cls(s.tableCellTruncate)).toContain("max-w-0");
    expect(cls(s.tableCellText)).toEqual(expect.arrayContaining(["block", "truncate"]));
    expect(cls(s.tableCellNumeric)).toContain("tabular-nums");
  });
});

describe("Table × mapa de tokens: ordenação, destaque e vazio (17/11/2026)", () => {
  it("botão de ordenar: altura, espaço, hover e anel do mapa", async () => {
    const { tableSortButton } = await import("./table.styles");
    const s = map.parts.head.sort;
    const c = cls(tableSortButton);
    expect(s.button).toMatch(/^height\/8/);
    expect(c).toContain("h-8");
    expect(c).toContain(`gap-${step(s.gap)}`);
    expect(c).toContain(`text-${color(map.parts.head.text)}`);
    expect(c).toContain(`hover:bg-${color(s.hoverBackground)}`);
    expect(c).toContain(`hover:text-${color(s.hoverText)}`);
    expect(c).toContain(`focus-visible:ring-${color(s.focusRing)}`);
    expect(c).toContain(`focus-visible:ring-[${s.focusRingWidth}]`);
    expect(c).toContain("[&_svg]:size-4");
    expect(s.icon).toBe("16px");
    // Ícone na cor do texto do cabeçalho, com ou sem ordem (decisão de 17/11/2026).
    expect(s.iconColor).toMatch(/^color\/foreground/);
  });

  it("linha em destaque: fundo do mapa, também no hover", async () => {
    const { tableRowHighlighted } = await import("./table.styles");
    const h = map.states.highlighted;
    expect(cls(tableRowHighlighted)).toEqual(
      expect.arrayContaining([`bg-${color(h.background)}`, `hover:bg-${color(h.background)}`]),
    );
    expect(h.attribute).toBe("data-highlighted");
  });

  it("células do Figma Number, Center, Wrap e Badges têm par no código", () => {
    expect(map.cellTypes.Number).toContain("align right");
    expect(map.cellTypes.Center).toContain("align center");
    expect(map.cellTypes.Wrap).toContain("wrap: true");
    expect(map.cellTypes.Badges).toContain("badge");
  });
});
