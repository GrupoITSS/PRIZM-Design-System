import { describe, expect, it } from "vitest";
import {
  alertDialogContentStyles,
  alertDialogDescriptionStyles,
  alertDialogFooterStyles,
  alertDialogHeaderStyles,
  alertDialogMediaStyles,
  alertDialogOverlayStyles,
  alertDialogTitleStyles,
} from "./alert-dialog.styles";
import map from "./alert-dialog.tokens.json";

// Figma token → Tailwind: "color/muted" → "muted", "spacing/6" → "6", "max-width/lg" → "lg".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1];
const classes = (s: string) => s.split(/\s+/);

const p = map.parts;

describe("AlertDialog × mapa de tokens (alert-dialog.tokens.json)", () => {
  it("cobre as partes do código", () => {
    expect(Object.keys(p).sort()).toEqual(
      ["overlay", "content", "header", "media", "title", "description", "footer"].sort(),
    );
  });

  it("contêiner: fundo, borda, raio, sombra, espaço e largura", () => {
    const c = classes(alertDialogContentStyles);
    expect(c).toContain(`bg-${color(p.content.background)}`);
    expect(c).toContain(`border-${color(p.content.border)}`);
    expect(c).toContain("border");
    expect(c).toContain(`rounded-${step(p.content.radius)}`);
    expect(c).toContain(`shadow-${step(p.content.shadow)}`);
    expect(c).toContain(`p-${step(p.content.padding)}`);
    expect(c).toContain(`gap-${step(p.content.gap)}`);
    expect(c).toContain(`sm:max-w-${step(p.content.maxWidth)}`);
    expect(c).toContain("max-w-[calc(100%-2rem)]");
  });

  it("cabeçalho: título → descrição e mídia → texto", () => {
    const c = classes(alertDialogHeaderStyles);
    expect(c).toContain(`gap-${step(p.header.gap)}`);
    expect(c).toContain(`has-data-[slot=alert-dialog-media]:gap-x-${step(p.header.mediaGap)}`);
  });

  it("mídia: fundo, ícone, tamanho e raio", () => {
    const c = classes(alertDialogMediaStyles);
    expect(c).toContain(`bg-${color(p.media.background)}`);
    expect(c).toContain(`text-${color(p.media.icon)}`);
    expect(c).toContain(`size-${step(p.media.width)}`);
    expect(step(p.media.width)).toBe(step(p.media.height));
    expect(c).toContain(`rounded-${step(p.media.radius)}`);
    expect(c).toContain("*:[svg:not([class*='size-'])]:size-8");
  });

  it("título e descrição: cor, tamanho e peso", () => {
    const t = classes(alertDialogTitleStyles);
    expect(t).toContain(`text-${color(p.title.text)}`);
    expect(t).toContain(`text-${step(p.title.fontSize)}`);
    expect(t).toContain(`font-${step(p.title.fontWeight)}`);
    const d = classes(alertDialogDescriptionStyles);
    expect(d).toContain(`text-${color(p.description.text)}`);
    expect(d).toContain(`text-${step(p.description.fontSize)}`);
  });

  it("rodapé: espaço entre os botões também no celular", () => {
    const c = classes(alertDialogFooterStyles);
    expect(c).toContain(`gap-${step(p.footer.gap)}`);
    expect(c).toContain("flex-col-reverse");
  });

  it("fundo escuro: sem token, como registrado nas divergências", () => {
    expect(p.overlay.background).toBeNull();
    for (const k of classes(p.overlay.code)) expect(classes(alertDialogOverlayStyles)).toContain(k);
    expect(map.divergences.some((d) => d.where === "fundo escuro" && d.status === "aberta")).toBe(
      true,
    );
  });

  it("mídia → título no mobile: divergência registrada enquanto o código usar mb-2", () => {
    const aberta = map.divergences.some((d) => d.where === "mídia → título no mobile");
    expect(classes(alertDialogMediaStyles).includes("mb-2")).toBe(aberta);
  });
});
