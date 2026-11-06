import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Item } from "./item";
import type { ItemBadge } from "./item.types";
import {
  formatFileSize,
  getFileTypeColor,
  getFileTypeKey,
  getFileTypeLabel,
  mergeRelForBlankTarget,
} from "./item.utils";

// ===========================================================================
// Item
// ===========================================================================

describe("Item (PRIZM / shadcn)", () => {
  it("renderiza title e description", () => {
    render(<Item title="Title" description="Description" />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renderiza como link quando href é informado", () => {
    render(<Item title="Go" href="https://example.com" />);
    const el = screen.getByText("Go").closest("[data-slot='item']");
    expect(el?.tagName.toLowerCase()).toBe("a");
    expect(el).toHaveAttribute("href", "https://example.com");
  });

  it("adiciona noopener noreferrer quando target=_blank sem rel", () => {
    render(<Item title="External" href="https://example.com" target="_blank" />);
    const el = screen.getByText("External").closest("[data-slot='item']");
    expect(el).toHaveAttribute("rel");
    expect(el?.getAttribute("rel") ?? "").toContain("noopener");
    expect(el?.getAttribute("rel") ?? "").toContain("noreferrer");
  });

  it("renderiza actions e media quando fornecidos", () => {
    render(
      <Item
        title="With"
        media={<span>Media</span>}
        actions={<button type="button">Action</button>}
      />,
    );
    expect(screen.getByText("Media")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("aplica classes de variant e size via data-attrs", () => {
    render(<Item title="X" variant="outline" size="xs" />);
    const el = screen.getByText("X").closest("[data-slot='item']");
    expect(el).toHaveAttribute("data-variant", "outline");
    expect(el).toHaveAttribute("data-size", "xs");
  });

  it("não é interativo por padrão (sem hover extra)", () => {
    render(<Item title="Static" />);
    const el = screen.getByText("Static").closest("[data-slot='item']");
    expect(el).not.toHaveAttribute("data-interactive");
    expect(el?.className ?? "").not.toContain("hover:bg-accent");
  });

  it("aplica classes de hover quando interactive=true", () => {
    render(<Item title="Interactive" interactive />);
    const el = screen.getByText("Interactive").closest("[data-slot='item']");
    expect(el).toHaveAttribute("data-interactive", "");
    expect(el?.className ?? "").toContain("hover:bg-accent/80");
  });

  it("sem actions, não aparece botão nenhum (o \"Manage\" padrão saiu em 06/11)", () => {
    render(<Item title="Badges Item" variant="outline" badges={[]} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("interactive sem href vira <button type=\"button\">, focável pelo teclado", () => {
    const onClick = vi.fn();
    render(<Item title="Abrir" description="Detalhes" interactive onClick={onClick} />);
    const btn = screen.getByRole("button", { name: /Abrir/ });
    expect(btn).toHaveAttribute("type", "button");
    expect(btn).toHaveAttribute("data-slot", "item");
    btn.focus();
    expect(btn).toHaveFocus();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
    // Dentro do botão, só conteúdo de frase: as partes viram span.
    expect(btn.querySelector("div, p")).toBeNull();
  });

  it("sem interactive nem href continua um div fora da ordem de Tab", () => {
    render(<Item title="Parado" />);
    const el = screen.getByText("Parado").closest("[data-slot='item']")!;
    expect(el.tagName).toBe("DIV");
    expect((el as HTMLElement).tabIndex).toBe(-1);
  });

  it("usa o anel de foco do Button, não ring/50", () => {
    render(<Item title="Link" href="#" />);
    const el = screen.getByText("Link").closest("[data-slot='item']")!;
    expect(el).toHaveClass(
      "focus-visible:ring-[3px]",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-ring-offset",
    );
    expect(el.className).not.toContain("ring-ring/50");
  });

  it("avisa no console quando há um controle em actions num Item clicável", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Item title="Ruim" href="#" actions={<button type="button">Editar</button>} />);
    expect(warn.mock.calls.some((c) => String(c[0]).includes("controle em actions"))).toBe(true);
    warn.mockRestore();
  });

  it("não avisa quando actions só tem um ícone decorativo", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Item title="Ok" href="#" actions={<svg aria-hidden="true" />} />);
    expect(warn.mock.calls.some((c) => String(c[0]).includes("controle em actions"))).toBe(false);
    warn.mockRestore();
  });
});

// ===========================================================================
// Item Badges
// ===========================================================================

describe("Item Badges", () => {
  const badges: ItemBadge[] = [
    { id: "react", label: "React", variant: "verified" },
    { id: "ts", label: "TypeScript", variant: "default" },
  ];

  it("renderiza badges quando fornecidos", () => {
    render(<Item title="With Badges" badges={badges} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("não renderiza slot de badges quando array é vazio", () => {
    render(<Item title="No Badges" badges={[]} />);
    expect(document.querySelector("[data-slot='item-badges']")).not.toBeInTheDocument();
  });

  it("renderiza botão de remoção quando badgesRemovable=true (default)", () => {
    render(<Item title="Removable" badges={badges} />);
    expect(screen.getByLabelText("Remover React")).toBeInTheDocument();
    expect(screen.getByLabelText("Remover TypeScript")).toBeInTheDocument();
  });

  it("não renderiza botão de remoção quando badgesRemovable=false", () => {
    render(<Item title="Readonly" badges={badges} badgesRemovable={false} />);
    expect(screen.queryByLabelText("Remover React")).not.toBeInTheDocument();
  });

  it("chama onBadgesChange e onBadgeRemove ao remover badge", () => {
    const onBadgesChange = vi.fn();
    const onBadgeRemove = vi.fn();

    render(
      <Item
        title="Remove Test"
        badges={badges}
        onBadgesChange={onBadgesChange}
        onBadgeRemove={onBadgeRemove}
      />,
    );

    fireEvent.click(screen.getByLabelText("Remover React"));

    expect(onBadgesChange).toHaveBeenCalledWith([
      { id: "ts", label: "TypeScript", variant: "default" },
    ]);
    expect(onBadgeRemove).toHaveBeenCalledWith({ id: "react", label: "React", variant: "verified" }, [
      { id: "ts", label: "TypeScript", variant: "default" },
    ]);
  });

  it("usa variant secondary como padrão quando badge não especifica variant", () => {
    render(<Item title="Default variant" badges={[{ id: "1", label: "Tag" }]} />);
    const badge = screen.getByText("Tag").closest("[data-slot='badge']");
    expect(badge).toHaveAttribute("data-variant", "secondary");
  });
});

// ===========================================================================
// item.utils
// ===========================================================================

describe("item.utils", () => {
  describe("mergeRelForBlankTarget", () => {
    it("returns original rel when target is not _blank", () => {
      expect(mergeRelForBlankTarget("_self", "author")).toBe("author");
    });

    it("adds noopener noreferrer for _blank target", () => {
      const result = mergeRelForBlankTarget("_blank", undefined);
      expect(result).toContain("noopener");
      expect(result).toContain("noreferrer");
    });
  });

  describe("getFileTypeKey", () => {
    it("detects pdf", () => {
      expect(getFileTypeKey(undefined, "report.pdf")).toBe("pdf");
    });
    it("detects docx", () => {
      expect(getFileTypeKey(undefined, "doc.docx")).toBe("docx");
    });
    it("detects xlsx from mimeType", () => {
      expect(
        getFileTypeKey("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
      ).toBe("xlsx");
    });
    it("returns file for unknown", () => {
      expect(getFileTypeKey(undefined, "data.bin")).toBe("file");
    });
  });

  describe("getFileTypeLabel", () => {
    it("returns PDF for pdf files", () => {
      expect(getFileTypeLabel(undefined, "report.pdf")).toBe("PDF");
    });
    it("returns File for unknown", () => {
      expect(getFileTypeLabel()).toBe("File");
    });
  });

  describe("getFileTypeColor", () => {
    it("returns red for PDF", () => {
      expect(getFileTypeColor(undefined, "a.pdf")).toBe("red");
    });
    it("returns blue for DOCX", () => {
      expect(getFileTypeColor(undefined, "a.docx")).toBe("blue");
    });
    it("returns green for XLSX", () => {
      expect(getFileTypeColor(undefined, "a.xlsx")).toBe("green");
    });
    it("returns orange for PPTX", () => {
      expect(getFileTypeColor(undefined, "a.pptx")).toBe("orange");
    });
    it("returns neutral for unknown", () => {
      expect(getFileTypeColor(undefined, "a.xyz")).toBe("neutral");
    });
  });

  describe("formatFileSize", () => {
    it("formats bytes", () => {
      expect(formatFileSize(500)).toBe("500 B");
    });
    it("formats kilobytes", () => {
      expect(formatFileSize(1024)).toBe("1 KB");
    });
    it("formats megabytes", () => {
      expect(formatFileSize(2_400_000)).toBe("2.3 MB");
    });
    it("handles zero", () => {
      expect(formatFileSize(0)).toBe("0 B");
    });
  });
});

describe("Item Badges · alvo do remover (2.5.8)", () => {
  it("o botão de remover tem área de toque de 24px pelo ::after", () => {
    render(<Item title="Tags" badges={[{ id: "a", label: "A" }]} />);
    expect(screen.getByLabelText("Remover A")).toHaveClass("relative", "after:absolute", "after:-inset-1.5");
  });
});
