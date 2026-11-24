import { describe, expect, it } from "vitest";
import { progressIndicatorVariants, progressRootVariants, progressStatuses } from "./progress.styles";
import map from "./progress.tokens.json";

// Figma token → Tailwind: "color/primary" → "primary", "height/2" → "2".
const color = (token: string) => token.replace(/^color\//, "");
const step = (token: string) => token.split("/")[1];
const cls = (s: string) => s.split(/\s+/);

type Status = keyof typeof map.statuses;
type Size = keyof typeof map.sizes;

describe("Progress × mapa de tokens (progress.tokens.json)", () => {
  it("cobre os status do código, na ordem do Figma", () => {
    expect(Object.keys(map.statuses)).toEqual([...progressStatuses]);
  });

  for (const [status, s] of Object.entries(map.statuses) as [Status, (typeof map.statuses)[Status]][]) {
    it(`${status}: trilho no tom a ${s.trackOpacity * 100}% e indicador em ${s.indicator}`, () => {
      expect(cls(progressRootVariants({ status }))).toContain(
        `bg-${color(s.track)}/${Math.round(s.trackOpacity * 100)}`,
      );
      expect(cls(progressIndicatorVariants({ status }))).toContain(`bg-${color(s.indicator)}`);
    });
  }

  for (const [size, s] of Object.entries(map.sizes) as [Size, (typeof map.sizes)[Size]][]) {
    it(`${size}: altura ${s.height} no trilho e no indicador`, () => {
      expect(cls(progressRootVariants({ size }))).toContain(`h-${step(s.height)}`);
      expect(cls(progressIndicatorVariants({ size }))).toContain(`h-${step(s.height)}`);
    });
  }

  it("raio radius/full e largura toda", () => {
    expect(map.layout.radius).toBe("radius/full");
    expect(cls(progressRootVariants())).toEqual(expect.arrayContaining(["rounded-full", "w-full"]));
  });
});
