import { describe, expect, it } from "vitest";
import {
  sheetBodyStyles,
  sheetCloseStyles,
  sheetContentVariants,
  sheetDefaultSize,
  sheetDescriptionStyles,
  sheetEyebrowStyles,
  sheetFooterActionsStyles,
  sheetFooterStyles,
  sheetHeaderStyles,
  sheetOverlayStyles,
  sheetSizes,
  sheetTitleRowStyles,
  sheetTitleStyles,
} from "./sheet.styles";
import map from "./sheet.tokens.json";

// Figma token → Tailwind: "color/background" → "background", "spacing/1-5" → "1.5",
// "text/lg" → "lg", "shadow/lg" → "lg", "max-width/lg" → "lg".
const step = (token: string) => {
  const v = token.split("/").slice(1).join("/");
  return /^\d+-\d+$/.test(v) ? v.replace("-", ".") : v;
};
const cls = (s: string) => s.split(/\s+/);
const p = map.parts;
const sides = ["left", "right", "top", "bottom"] as const;

describe("Sheet × mapa de tokens (sheet.tokens.json)", () => {
  it("o mapa cobre todos os tamanhos do código", () => {
    expect(Object.keys(map.sizes)).toEqual([...sheetSizes]);
  });

  it("overlay: color/overlay, sem desfoque", () => {
    const c = cls(sheetOverlayStyles);
    expect(c).toContain(`bg-${step(p.overlay.background)}`);
    expect(c.some((x) => x.includes("backdrop-blur"))).toBe(false);
  });

  it("conteúdo: fundo, texto, borda e sombra; sem padding próprio", () => {
    const c = cls(sheetContentVariants());
    expect(c).toContain(`bg-${step(p.content.background)}`);
    expect(c).toContain(`text-${step(p.content.text)}`);
    expect(c).toContain(`border-${step(p.content.border)}`);
    expect(c).toContain(`shadow-${step(p.content.shadow)}`);
    expect(c.some((x) => /^p-\d/.test(x))).toBe(false);
  });

  it("borda do conteúdo: border-width/1 só no lado oposto ao de onde abre", () => {
    const border = {
      left: "border-r",
      right: "border-l",
      top: "border-b",
      bottom: "border-t",
    };
    for (const side of sides) {
      expect(cls(sheetContentVariants({ side }))).toContain(border[side]);
    }
  });

  it("tamanhos: cada size limita com o max-width/* do mapa, em todos os lados; sm é o padrão", () => {
    for (const [size, def] of Object.entries(map.sizes)) {
      for (const side of sides) {
        const c = cls(
          sheetContentVariants({ side, size: size as keyof typeof map.sizes }),
        );
        if (def.maxWidth === null) {
          // full: só em top e bottom; nas laterais vale como 2xl.
          expect(c).toContain(
            side === "top" || side === "bottom" ? "max-w-none" : "sm:max-w-2xl",
          );
        } else {
          expect(c).toContain(`sm:max-w-${step(def.maxWidth)}`);
        }
      }
    }
    expect(sheetDefaultSize.right).toBe("sm");
    expect(sheetDefaultSize.top).toBe("full");
    expect(map.sizes.sm.default).toBe(true);
  });

  it("largura: 75% da tela nas laterais; centralizado com size em top e bottom", () => {
    expect(cls(sheetContentVariants({ side: "left" }))).toContain("w-3/4");
    expect(cls(sheetContentVariants({ side: "right" }))).toContain("w-3/4");
    expect(cls(sheetContentVariants({ side: "top", size: "md" }))).toContain(
      "sm:mx-auto",
    );
  });

  it("cabeçalho: padding, espaço entre as linhas e alinhamento", () => {
    const c = cls(sheetHeaderStyles);
    expect(c).toContain(`pt-${step(p.header.paddingTop)}`);
    expect(c).toContain(`pl-${step(p.header.paddingLeft)}`);
    expect(c).toContain(`pr-${step(p.header.paddingRight)}`);
    expect(c).toContain(`pb-${step(p.header.paddingBottom)}`);
    expect(c).toContain(`gap-${step(p.header.gap)}`);
    expect(c).toEqual(expect.arrayContaining(["text-center", "sm:text-left"]));
  });

  it("eyebrow: cor, tamanho e peso", () => {
    const c = cls(sheetEyebrowStyles);
    expect(c).toContain(`text-${step(p.eyebrow.color)}`);
    expect(c).toContain(`text-${step(p.eyebrow.fontSize)}`);
    expect(c).toContain(`font-${step(p.eyebrow.fontWeight)}`);
  });

  it("linha do título: spacing/3 ao lado do título", () => {
    expect(cls(sheetTitleRowStyles)).toContain(`gap-x-${step(p.titleRow.gap)}`);
  });

  it("título: tamanho e peso; a cor vem do conteúdo", () => {
    const c = cls(sheetTitleStyles);
    expect(c).toContain(`text-${step(p.title.fontSize)}`);
    expect(c).toContain(`font-${step(p.title.fontWeight)}`);
    expect(cls(sheetContentVariants())).toContain(
      `text-${step(p.title.color)}`,
    );
  });

  it("descrição: cor e tamanho", () => {
    const c = cls(sheetDescriptionStyles);
    expect(c).toContain(`text-${step(p.description.color)}`);
    expect(c).toContain(`text-${step(p.description.fontSize)}`);
  });

  it("corpo: padding lateral e embaixo; é a parte que rola", () => {
    const c = cls(sheetBodyStyles);
    expect(c).toContain(`px-${step(p.body.paddingX)}`);
    expect(c).toContain(`pb-${step(p.body.paddingBottom)}`);
    expect(c).toEqual(
      expect.arrayContaining(["overflow-y-auto", "min-h-0", "flex-1"]),
    );
  });

  it("rodapé: linha em cima, padding, espaço entre Leading e ações, coluna no celular", () => {
    const c = cls(sheetFooterStyles);
    expect(c).toContain("border-t");
    expect(c).toContain(`border-${step(p.footer.border)}`);
    expect(c).toContain(`px-${step(p.footer.paddingX)}`);
    expect(c).toContain(`pt-${step(p.footer.paddingTop)}`);
    expect(c).toContain(`pb-${step(p.footer.paddingBottom)}`);
    expect(c).toContain(`gap-${step(p.footer.gap)}`);
    expect(c).toEqual(
      expect.arrayContaining([
        "flex-col-reverse",
        "sm:flex-row",
        "sm:justify-end",
      ]),
    );
    expect(cls(sheetFooterActionsStyles)).toContain(
      `gap-${step(p.footer.actionsGap)}`,
    );
  });

  it("botão fechar: a spacing/2 do canto", () => {
    expect(cls(sheetCloseStyles)).toEqual(
      expect.arrayContaining([
        "absolute",
        `right-${step(p.close.offset)}`,
        `top-${step(p.close.offset)}`,
      ]),
    );
  });
});
