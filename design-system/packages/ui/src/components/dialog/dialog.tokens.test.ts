import { describe, expect, it } from "vitest";
import {
  dialogCloseStyles,
  dialogContentStyles,
  dialogContentVariants,
  dialogDescriptionStyles,
  dialogFooterStyles,
  dialogHeaderStyles,
  dialogOverlayStyles,
  dialogTitleRowStyles,
  dialogTitleStyles,
} from "./dialog.styles";
import map from "./dialog.tokens.json";

// Figma token → Tailwind: "color/background" → "background", "spacing/1-5" → "1.5",
// "radius/lg" → "lg", "text/lg" → "lg", "shadow/lg" → "lg", "max-width/lg" → "lg".
const step = (token: string) => {
  const v = token.split("/").slice(1).join("/");
  return /^\d+-\d+$/.test(v) ? v.replace("-", ".") : v;
};
const cls = (s: string) => s.split(/\s+/);
const p = map.parts;

describe("Dialog × mapa de tokens (dialog.tokens.json)", () => {
  it("conteúdo: fundo, texto, borda, raio, espaço, sombra e largura", () => {
    const c = cls(dialogContentStyles);
    expect(c).toContain(`bg-${step(p.content.background)}`);
    expect(c).toContain(`text-${step(p.content.text)}`);
    expect(c).toContain("border");
    expect(c).toContain(`border-${step(p.content.border)}`);
    expect(c).toContain(`rounded-${step(p.content.radius)}`);
    expect(c).toContain(`p-${step(p.content.padding)}`);
    expect(c).toContain(`gap-${step(p.content.gap)}`);
    expect(c).toContain(`shadow-${step(p.content.shadow)}`);
  });

  it("tamanhos: cada size limita com o max-width/* do mapa; lg é o padrão", () => {
    for (const [size, def] of Object.entries(map.sizes)) {
      const c = cls(dialogContentVariants({ size: size as keyof typeof map.sizes }));
      expect(c).toContain(def.maxWidth === null ? "max-w-none" : `max-w-${step(def.maxWidth)}`);
      expect(c).toContain("w-[calc(100%-2rem)]");
    }
    expect(cls(dialogContentVariants())).toContain(`max-w-${step(p.content.maxWidth)}`);
  });

  it("overlay: color/overlay", () => {
    expect(cls(dialogOverlayStyles)).toContain(`bg-${step(p.overlay.background)}`);
  });

  it("cabeçalho: espaço entre título e descrição, centro no celular e esquerda a partir de 640px", () => {
    const c = cls(dialogHeaderStyles);
    expect(c).toContain(`space-y-${step(p.header.gap)}`);
    expect(c).toEqual(expect.arrayContaining(["text-center", "sm:text-left"]));
  });

  it("linha do título: spacing/3 ao lado, spacing/2 ao quebrar, centro no celular", () => {
    const c = cls(dialogTitleRowStyles);
    expect(c).toContain(`gap-x-${step(p.titleRow.gap)}`);
    expect(c).toContain(`gap-y-${step(p.titleRow.wrapGap)}`);
    expect(c).toEqual(
      expect.arrayContaining([
        "flex",
        "flex-wrap",
        "items-center",
        "justify-center",
        "sm:justify-start",
      ]),
    );
  });

  it("título: cor, tamanho, peso e altura de linha 100%", () => {
    const c = cls(dialogTitleStyles);
    expect(c).toContain(`text-${step(p.title.fontSize)}`);
    expect(c).toContain(`font-${step(p.title.fontWeight)}`);
    expect(c).toContain("leading-none");
    // A cor do título vem do conteúdo (text-foreground), sem classe própria.
    expect(cls(dialogContentStyles)).toContain(`text-${step(p.title.color)}`);
  });

  it("descrição: cor e tamanho", () => {
    const c = cls(dialogDescriptionStyles);
    expect(c).toContain(`text-${step(p.description.color)}`);
    expect(c).toContain(`text-${step(p.description.fontSize)}`);
  });

  it("rodapé: espaço entre os botões, coluna no celular com a principal em cima, linha à direita", () => {
    const c = cls(dialogFooterStyles);
    expect(c).toContain(`gap-${step(p.footer.gap)}`);
    expect(c).toEqual(
      expect.arrayContaining(["flex-col-reverse", "sm:flex-row", "sm:justify-end"]),
    );
  });

  it("botão fechar: a spacing/2 do canto", () => {
    const c = cls(dialogCloseStyles);
    expect(c).toEqual(
      expect.arrayContaining([
        "absolute",
        `right-${step(p.close.offset)}`,
        `top-${step(p.close.offset)}`,
      ]),
    );
  });
});
