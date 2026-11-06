import { describe, expect, it } from "vitest";
import { badgeDotPulse, badgeDotVariants, badgeVariants } from "./badge.styles";
import map from "./badge.tokens.json";

// Figma token name → Tailwind class suffix: "color/primary" → "primary",
// "spacing/0-5" → "0.5", "radius/md" → "md", "text/xs" → "xs".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1].replace("-", ".");

const classesOf = (variant: string, shape = "default", size = "sm") =>
  badgeVariants({
    variant: variant as never,
    shape: shape as never,
    size: size as never,
  }).split(" ");

describe("Badge × mapa de tokens (badge.tokens.json)", () => {
  it("cobre todas as variantes, tamanhos e formas do código", () => {
    expect(Object.keys(map.variants).sort()).toEqual(
      [
        "default",
        "secondary",
        "outline",
        "destructive",
        "success",
        "verified",
        "warning",
      ].sort(),
    );
    expect(Object.keys(map.sizes)).toEqual(["sm", "md", "lg"]);
    expect(Object.keys(map.shapes)).toEqual(["number", "dot"]);
  });

  for (const [variant, tokens] of Object.entries(map.variants)) {
    it(`${variant}: fundo, texto e borda do mapa estão nas classes`, () => {
      const classes = classesOf(variant);
      expect(classes).toContain(`bg-${color(tokens.background)}`);
      expect(classes).toContain(`text-${color(tokens.text)}`);
      if (tokens.border)
        expect(classes).toContain(`border-${color(tokens.border)}`);
    });
  }

  for (const [size, s] of Object.entries(map.sizes)) {
    it(`${size}: altura, padding, gap, ícone, raio e texto do mapa estão nas classes`, () => {
      const classes = classesOf("default", "default", size);
      expect(classes).toContain(`h-${step(s.height)}`);
      expect(classes).toContain(`px-${step(s.paddingX)}`);
      expect(classes).toContain(`py-${step(s.paddingY)}`);
      expect(classes).toContain(`gap-${step(s.gap)}`);
      expect(classes.some((c) => c.endsWith(`]:size-${step(s.icon)}`))).toBe(
        true,
      );
      expect(classes).toContain(`rounded-${step(s.radius)}`);
      expect(classes).toContain(`text-${step(s.fontSize)}`);
      expect(classes).toContain(`font-${step(s.fontWeight)}`);
    });
  }

  it("forma number: largura mínima, padding e raio do mapa estão nas classes", () => {
    const classes = classesOf("default", "number");
    const n = map.shapes.number;
    expect(classes).toContain(`min-w-${step(n.minWidth)}`);
    expect(classes).toContain(`px-${step(n.paddingX)}`);
    expect(classes).toContain(`rounded-${step(n.radius)}`);
  });

  it("estados: o Badge estático não tem hover nem foco fora do link", () => {
    expect(map.states.hover).toBeNull();
    expect(map.states.focus).toBeNull();
    for (const variant of Object.keys(map.variants)) {
      const classes = classesOf(variant);
      expect(classes.some((c) => /^(hover|focus|focus-visible):/.test(c))).toBe(
        false,
      );
    }
  });

  // Badge link (DS-63): hover and focus only under the [a&]: prefix.
  for (const [variant, hover] of Object.entries(map.linkStates.hover)) {
    it(`${variant}: o hover do Badge link no mapa está nas classes [a&]:`, () => {
      const classes = classesOf(variant);
      const h = hover as {
        background?: string;
        text?: string;
        overlay?: string;
        opacity?: number;
      };
      if (h.overlay) {
        expect(
          classes.some(
            (c) =>
              c.startsWith("[a&]:hover:bg-[color-mix(") &&
              c.includes(
                `--prizm-${h.overlay!.replace("/", "-")})_${String((h.opacity ?? 0) * 100)}%`,
              ),
          ),
        ).toBe(true);
      } else if (h.opacity) {
        expect(classes).toContain(
          `[a&]:hover:bg-${color(h.background!)}/${String(h.opacity * 100)}`,
        );
      } else {
        expect(classes).toContain(`[a&]:hover:bg-${color(h.background!)}`);
        expect(classes).toContain(`[a&]:hover:text-${color(h.text!)}`);
      }
    });
  }

  it("foco do Badge link: o anel do Button, só com o prefixo [a&]:", () => {
    const classes = classesOf("default");
    const f = map.linkStates.focus;
    expect(classes).toContain(
      `[a&]:focus-visible:ring-[${String(f.ringWidth)}px]`,
    );
    expect(classes).toContain(`[a&]:focus-visible:ring-${color(f.ring)}`);
    expect(classes).toContain(
      `[a&]:focus-visible:ring-offset-${String(f.ringOffsetWidth)}`,
    );
    expect(classes).toContain(
      `[a&]:focus-visible:ring-offset-${color(f.ringOffset)}`,
    );
  });

  for (const [ctx, c] of Object.entries(map.contexts)) {
    if (ctx === "note") continue;
    it(`${ctx}: a inversão dentro do Button usa os tokens do mapa`, () => {
      const t = c as { background: string; text: string; button: string };
      const classes = classesOf("default");
      const prefix = `[[data-slot=button][data-variant=${t.button}]_&]:`;
      expect(classes).toContain(`${prefix}bg-${color(t.background)}`);
      expect(classes).toContain(`${prefix}text-${color(t.text)}`);
    });
  }

  // Badge dot (DS-66): its own classes, checked against the map.
  describe("forma dot", () => {
    const dot = map.shapes.dot;
    it("tamanho, raio e anel do mapa estão nas classes", () => {
      const classes = badgeDotVariants({ variant: "default" }).split(" ");
      expect(classes).toContain(`size-${step(dot.size)}`);
      expect(classes).toContain(`rounded-${step(dot.radius)}`);
      expect(classes).toContain(`ring-${String(dot.ringWidth)}`);
      expect(classes).toContain(`ring-${color(dot.ring)}`);
    });

    for (const [variant, token] of Object.entries(dot.variants)) {
      it(`${variant}: a cor do dot no mapa está nas classes`, () => {
        expect(
          badgeDotVariants({ variant: variant as never }).split(" "),
        ).toContain(`bg-${color(token)}`);
      });
    }

    it("não há dot em secondary nem outline", () => {
      expect(Object.keys(dot.variants)).not.toContain("secondary");
      expect(Object.keys(dot.variants)).not.toContain("outline");
    });

    it("o pulse só anima com motion-safe", () => {
      const classes = badgeDotPulse.split(" ");
      expect(classes).toContain("motion-safe:animate-ping");
      expect(classes).not.toContain("animate-ping");
    });
  });
});
