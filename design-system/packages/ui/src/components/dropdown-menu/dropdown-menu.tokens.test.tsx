import { describe, expect, it } from "vitest";
import {
  dropdownMenuCheckboxItemStyles,
  dropdownMenuContentStyles,
  dropdownMenuItemDescriptionStyles,
  dropdownMenuItemStyles,
  dropdownMenuLabelStyles,
  dropdownMenuRadioItemStyles,
  dropdownMenuSeparatorStyles,
  dropdownMenuShortcutStyles,
  dropdownMenuSubContentStyles,
} from "./dropdown-menu.styles";
import map from "./dropdown-menu.tokens.json";

// Figma token → Tailwind: "color/popover" → "popover", "spacing/1-5" → "1.5", "radius/md" → "md",
// "text/sm" → "sm", "border-width/1" → "" (border), "height/px" → "px".
const step = (token: string) => {
  const v = token.split("/")[1];
  return /^\d+-\d+$/.test(v) ? v.replace("-", ".") : v;
};
const cls = (s: string) => s.split(/\s+/);
const p = map.parts;
const s = map.states;

describe("DropdownMenu × mapa de tokens (dropdown-menu.tokens.json)", () => {
  it("conteúdo e subconteúdo: fundo, texto, borda, raio, espaço e sombra", () => {
    for (const styles of [dropdownMenuContentStyles, dropdownMenuSubContentStyles]) {
      const c = cls(styles);
      expect(c).toContain(`bg-${step(p.content.background)}`);
      expect(c).toContain(`text-${step(p.content.text)}`);
      expect(c).toContain(`border-${step(p.content.border)}`);
      expect(c).toContain("border");
      expect(c).toContain(`rounded-${step(p.content.radius)}`);
      expect(c).toContain(`p-${step(p.content.padding)}`);
    }
    expect(cls(dropdownMenuContentStyles)).toContain(`shadow-${step(p.content.shadow)}`);
  });

  it("item: tamanho do texto, espaço, raio, ícone e destaque", () => {
    const c = cls(dropdownMenuItemStyles);
    expect(c).toContain(`text-${step(p.item.fontSize)}`);
    expect(c).toContain(`px-${step(p.item.paddingX)}`);
    expect(c).toContain(`py-${step(p.item.paddingY)}`);
    expect(c).toContain(`gap-${step(p.item.gap)}`);
    expect(c).toContain(`rounded-${step(p.item.radius)}`);
    expect(c).toContain(`[&_svg]:size-${step(p.item.iconSize)}`);
    expect(c).toContain(`[&_svg:not([class*='text-'])]:text-${step(p.item.icon)}`);
    expect(c).toContain(`focus:bg-${step(s.highlighted.background)}`);
    expect(c).toContain(`focus:text-${step(s.highlighted.text)}`);
    expect(c).toContain(`focus:[&_svg:not([class*='text-'])]:text-${step(s.highlighted.icon)}`);
    expect(c).toContain(
      `focus:[&_.text-muted-foreground]:text-${step(s.highlighted.secondaryText)}`,
    );
  });

  it("estados: desabilitado, destrutivo e destrutivo em destaque", () => {
    for (const styles of [
      dropdownMenuItemStyles,
      dropdownMenuCheckboxItemStyles,
      dropdownMenuRadioItemStyles,
    ]) {
      const c = cls(styles);
      expect(c).toContain(`data-[disabled]:opacity-${step(s.disabled.opacity)}`);
      expect(c).toContain(`data-[disabled]:pointer-events-${s.disabled.pointerEvents}`);
    }
    const c = cls(dropdownMenuItemStyles);
    expect(c).toContain(`data-[variant=destructive]:text-${step(s.destructive.text)}`);
    expect(c).toContain(
      `data-[variant=destructive]:focus:text-${step(s.destructiveHighlighted.text)}`,
    );
    expect(c).toContain("data-[variant=destructive]:[&_svg]:text-current!");
  });

  it("checkbox e radio: recuo e destaque", () => {
    for (const styles of [dropdownMenuCheckboxItemStyles, dropdownMenuRadioItemStyles]) {
      const c = cls(styles);
      expect(c).toContain(`pl-${step(p.inset.paddingLeft)}`);
      expect(c).toContain(`focus:bg-${step(s.highlighted.background)}`);
    }
  });

  it("rótulo, separador, atalho e descrição", () => {
    const l = cls(dropdownMenuLabelStyles);
    expect(l).toContain(`font-${step(p.label.fontWeight)}`);
    expect(l).toContain(`px-${step(p.label.paddingX)}`);
    expect(l).toContain(`py-${step(p.label.paddingY)}`);
    // O texto do rótulo é o do menu (popover-foreground): nenhuma cor própria.
    expect(l.some((x) => x.startsWith("text-") && x !== "text-sm")).toBe(false);
    expect(cls(dropdownMenuSeparatorStyles)).toContain(`bg-${step(p.separator.color)}`);
    expect(cls(dropdownMenuSeparatorStyles)).toContain(`h-${step(p.separator.height)}`);
    for (const [styles, part] of [
      [dropdownMenuShortcutStyles, p.shortcut],
      [dropdownMenuItemDescriptionStyles, p.description],
    ] as const) {
      expect(cls(styles)).toContain(`text-${step(part.text)}`);
      expect(cls(styles)).toContain(`text-${step(part.fontSize)}`);
    }
  });

  it("divergência aberta: submenu aberto sem destaque no código", () => {
    const aberta = map.divergences.find((d) => d.where.startsWith("submenu aberto"));
    expect(aberta?.status).toBe("aberta");
    expect(dropdownMenuItemStyles).not.toContain(
      `data-[state=open]:bg-${step(s.subTriggerOpen.background)}`,
    );
  });
});
