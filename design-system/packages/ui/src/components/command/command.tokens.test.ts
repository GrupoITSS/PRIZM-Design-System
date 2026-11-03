import { describe, expect, it } from "vitest";
import {
  commandGroupStyles,
  commandInputIconStyles,
  commandInputStyles,
  commandInputWrapperStyles,
  commandItemStyles,
  commandRootStyles,
  commandShortcutStyles,
} from "./command.styles";
import map from "./command.tokens.json";

// Figma token name → Tailwind class suffix: "color/popover" → "popover",
// "radius/lg" → "lg", "spacing/1-5" → "1.5", "height/12" → "12".
const color = (token: string) => token.replace(/^color\//, "");
const suffix = (token: string) => token.split("/")[1];
const size = (token: string) => suffix(token).replace("-", ".");
const cls = (s: string) => s.split(" ");

describe("Command × mapa de tokens (command.tokens.json)", () => {
  it("contêiner: fundo, texto e raio do mapa", () => {
    const c = map.parts.container;
    expect(cls(commandRootStyles)).toContain(`bg-${color(c.background)}`);
    expect(cls(commandRootStyles)).toContain(`text-${color(c.text)}`);
    expect(cls(commandRootStyles)).toContain(`rounded-${suffix(c.radius)}`);
    expect(commandRootStyles).not.toMatch(/shadow/);
  });

  it("busca: altura, padding, placeholder e ícone do mapa", () => {
    const i = map.parts.input;
    expect(cls(commandInputStyles)).toContain(`h-${suffix(i.height)}`);
    expect(cls(commandInputWrapperStyles)).toContain(`px-${size(i.paddingX)}`);
    expect(cls(commandInputStyles)).toContain(`placeholder:text-${color(i.placeholder)}`);
    expect(cls(commandInputIconStyles)).toContain(`text-${color(i.icon)}`);
  });

  it("título do grupo alinhado ao item", () => {
    const h = map.parts.heading;
    expect(cls(commandGroupStyles)).toContain(`[&_[cmdk-group-heading]]:px-${size(h.paddingX)}`);
    expect(cls(commandGroupStyles)).toContain(`[&_[cmdk-group-heading]]:py-${size(h.paddingY)}`);
    expect(cls(commandGroupStyles)).toContain(`[&_[cmdk-group-heading]]:text-${color(h.color)}`);
    expect(h.paddingX).toBe(map.parts.item.paddingX);
  });

  it("item: raio, padding e espaço do mapa", () => {
    const it = map.parts.item;
    expect(cls(commandItemStyles)).toContain(`rounded-${suffix(it.radius)}`);
    expect(cls(commandItemStyles)).toContain(`px-${size(it.paddingX)}`);
    expect(cls(commandItemStyles)).toContain(`py-${size(it.paddingY)}`);
    expect(cls(commandItemStyles)).toContain(`gap-${size(it.gap)}`);
  });

  it("destacado e desabilitado do mapa", () => {
    const h = map.states.highlighted;
    expect(cls(commandItemStyles)).toContain(`data-[selected=true]:text-${color(h.text)}`);
    expect(commandItemStyles).toContain(`bg-${color(h.background)}`);
    expect(commandItemStyles).toContain(`[&_.text-muted-foreground]:text-${color(h.shortcut)}`);
    expect(cls(commandItemStyles)).toContain(`data-[disabled=true]:opacity-${suffix(map.states.disabled.opacity)}`);
  });

  it("atalho do mapa", () => {
    expect(cls(commandShortcutStyles)).toContain(`text-${color(map.parts.shortcut.color)}`);
    expect(cls(commandShortcutStyles)).toContain(`text-${suffix(map.parts.shortcut.fontSize)}`);
  });
});
