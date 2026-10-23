import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import * as icons from "./index";
import map from "./icons.tokens.json";

// Ícones exportados = tudo que o módulo exporta em tempo de execução (os tipos somem).
const exportados = Object.keys(icons).sort();

const arquivos = (dir: string): string[] =>
  readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    if (nome === "node_modules" || nome === "dist") return [];
    return statSync(caminho).isDirectory() ? arquivos(caminho) : [caminho];
  });

describe("Icons × mapa (icons.tokens.json)", () => {
  it("o mapa lista exatamente o que o pacote exporta", () => {
    expect(map.icons.map((i) => i.name).sort()).toEqual(exportados);
  });

  it("todo ícone exportado tem componente no Figma", () => {
    for (const icon of map.icons) {
      expect(icon.figma, icon.name).toMatch(/^Icon \/ /);
      expect(icon.figmaNode, icon.name).toMatch(/^\d+:\d+$/);
    }
  });

  it("os nomes antigos do Lucide não são exportados", () => {
    for (const [antigo, atual] of Object.entries(map.removed)) {
      expect(exportados, antigo).not.toContain(antigo);
      expect(exportados, atual).toContain(atual);
    }
  });

  it("os tamanhos do mapa seguem 2 × tamanho ÷ 24 no traço", () => {
    const traco: Record<number, string> = {
      12: "stroke-width/1",
      16: "stroke-width/1-33",
      20: "stroke-width/1-67",
      24: "stroke-width/2",
    };
    for (const s of Object.values(map.sizes)) {
      expect(s.className).toBe(`size-${s.size / 4}`);
      expect(s.strokeWidth).toBe(traco[s.size]);
    }
  });
});

describe("Importação única", () => {
  // Componentes importam de ../icons; stories, de @grupoitss/prizm-ui/icons.
  const raizUi = join(__dirname, "..", "..");
  const stories = join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "apps",
    "docs",
    "stories",
  );
  const fontes = [...arquivos(raizUi), ...arquivos(stories)].filter(
    (f) => /\.(ts|tsx)$/.test(f) && !f.includes(join("components", "icons")),
  );

  it("ninguém importa lucide-react direto", () => {
    const diretos = fontes.filter((f) =>
      /^\s*import[^;]*from\s+["']lucide-react["']/m.test(
        readFileSync(f, "utf8"),
      ),
    );
    expect(diretos.map((f) => relative(raizUi, f))).toEqual([]);
  });
});

describe("Ícones próprios (FileCsv, FileDoc, FilePdf)", () => {
  const proprios = {
    FileCsv: icons.FileCsv,
    FileDoc: icons.FileDoc,
    FilePdf: icons.FilePdf,
  };

  for (const [nome, Icon] of Object.entries(proprios)) {
    it(`${nome}: decorativo por padrão, como os do Lucide`, () => {
      const { container } = render(createElement(Icon));
      const svg = container.querySelector("svg")!;
      expect(svg).toHaveAttribute("aria-hidden", "true");
      expect(svg).toHaveAttribute("width", "20");
      expect(container.querySelector("path")).toHaveAttribute(
        "fill",
        "currentColor",
      );
    });

    it(`${nome}: com aria-label, entra na leitura`, () => {
      const { container } = render(
        createElement(Icon, { "aria-label": "Arquivo" }),
      );
      const svg = container.querySelector("svg")!;
      expect(svg).not.toHaveAttribute("aria-hidden");
      expect(svg).toHaveAttribute("aria-label", "Arquivo");
    });

    it(`${nome}: aceita size e color do LucideIcon`, () => {
      const { container } = render(
        createElement(Icon, { size: 16, color: "red", className: "size-4" }),
      );
      const svg = container.querySelector("svg")!;
      expect(svg).toHaveAttribute("width", "16");
      expect(svg).toHaveClass("size-4");
      expect(svg).not.toHaveAttribute("size");
      expect(container.querySelector("path")).toHaveAttribute("fill", "red");
    });
  }

  it("os do Lucide também saem com aria-hidden quando decorativos", () => {
    const { container } = render(createElement(icons.Search));
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
