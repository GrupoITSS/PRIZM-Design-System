import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";
import {
  avatarBadgeVariants,
  avatarFallbackStyles,
  avatarGroupCountStyles,
  avatarGroupStyles,
  avatarImageStyles,
  avatarStatusLabels,
  avatarVariants,
  type AvatarSize,
  type AvatarStatus,
} from "./avatar.styles";
import map from "./avatar.tokens.json";

// Figma token → Tailwind: "width/2-5" → "2.5", "text/xs" → "xs", "color/muted" → "muted",
// "border-width/2" → "2", "font-weight/medium" → "medium".
const step = (token: string) => {
  const v = token.split("/")[1];
  return /^\d+-\d+$/.test(v) ? v.replace("-", ".") : v;
};
const classes = (s: string) => s.split(/\s+/);
const SIZES: AvatarSize[] = ["xs", "sm", "md", "lg", "xl"];
const STATUS: AvatarStatus[] = ["online", "away", "busy", "offline"];
const sizes = map.sizes as Record<AvatarSize, (typeof map.sizes)["md"]>;
const status = map.status as Record<AvatarStatus, (typeof map.status)["online"]>;

// Na base vale o padrão (md); nos outros tamanhos, a classe vem por group-data ou group-has-data.
const forSize = (size: AvatarSize, cls: string, group: "avatar" | "avatar-group") => {
  if (size === map.defaultSize) return cls;
  return group === "avatar"
    ? `group-data-[size=${size}]/avatar:${cls}`
    : `group-has-data-[size=${size}]/avatar-group:${cls}`;
};

describe("Avatar × mapa de tokens (avatar.tokens.json)", () => {
  it("cobre os tamanhos e os status do código", () => {
    expect(Object.keys(map.sizes)).toEqual(SIZES);
    expect(Object.keys(map.status)).toEqual(STATUS);
  });

  it("raiz: tamanho, raio e sem borda; padrão do mapa", () => {
    for (const size of SIZES) {
      expect(classes(avatarVariants({ size }))).toContain(`size-${step(sizes[size].size)}`);
    }
    const c = classes(avatarVariants());
    expect(c).toContain(`size-${step(sizes[map.defaultSize as AvatarSize].size)}`);
    expect(c).toContain(`rounded-${step(map.parts.root.radius)}`);
    expect(map.parts.root.border).toBeNull();
    expect(c.some((x) => x === "border" || x.startsWith("border-"))).toBe(false);
    // Sem recorte na raiz (P1): o raio da imagem e das iniciais faz o círculo.
    expect(map.parts.root.clip).toBeNull();
    expect(c).not.toContain("overflow-hidden");
    expect(classes(avatarImageStyles)).toContain(`rounded-${step(map.parts.image.radius)}`);
    render(<Avatar fallback="PD" />);
    expect(screen.getByText("PD").closest("[data-slot='avatar']")).toHaveAttribute(
      "data-size",
      map.defaultSize,
    );
  });

  it("iniciais: fundo, texto e tamanho do texto por tamanho", () => {
    const c = classes(avatarFallbackStyles);
    expect(c).toContain(`bg-${step(map.parts.fallback.background)}`);
    expect(c).toContain(`text-${step(map.parts.fallback.text)}`);
    for (const size of SIZES) {
      const cls = `text-${step(sizes[size].fallbackText)}`;
      // md, lg e xl usam o texto da base; xs e sm sobrepõem por group-data.
      const base = sizes[size].fallbackText === sizes.md.fallbackText;
      expect(c).toContain(base ? cls : forSize(size, cls, "avatar"));
    }
  });

  it("badge: cor e texto oculto de cada status, borda e tamanho por avatar", () => {
    for (const s of STATUS) {
      const c = classes(avatarBadgeVariants({ status: s }));
      expect(c).toContain(`bg-${step(status[s].background)}`);
      expect(avatarStatusLabels[s]).toBe(status[s].label);
    }
    const c = classes(avatarBadgeVariants());
    expect(c).toContain(`border-${step(map.parts.badge.borderWidth)}`);
    expect(c).toContain(`border-${step(map.parts.badge.border)}`);
    expect(c).toContain(`rounded-${step(map.parts.badge.radius)}`);
    for (const size of SIZES) {
      expect(c).toContain(forSize(size, `size-${step(sizes[size].badge)}`, "avatar"));
    }
  });

  it("grupo: sobreposição e anel", () => {
    const c = classes(avatarGroupStyles);
    expect(c).toContain("-space-x-2");
    expect(c).toContain(`[&>span]:ring-${step(map.parts.group.ringWidth)}`);
    expect(c).toContain(`[&>span]:ring-${step(map.parts.group.ring)}`);
  });

  it("contador: fundo, texto, peso, anel e tamanho do grupo", () => {
    const c = classes(avatarGroupCountStyles);
    expect(c).toContain(`bg-${step(map.parts.count.background)}`);
    expect(c).toContain(`text-${step(map.parts.count.text)}`);
    expect(c).toContain(`font-${step(map.parts.count.fontWeight)}`);
    expect(c).toContain(`ring-${step(map.parts.count.ringWidth)}`);
    expect(c).toContain(`ring-${step(map.parts.count.ring)}`);
    for (const size of SIZES) {
      expect(c).toContain(forSize(size, `size-${step(sizes[size].size)}`, "avatar-group"));
      const text = `text-${step(sizes[size].countText)}`;
      const base = sizes[size].countText === sizes.md.countText;
      expect(c).toContain(base ? text : forSize(size, text, "avatar-group"));
    }
  });
});
