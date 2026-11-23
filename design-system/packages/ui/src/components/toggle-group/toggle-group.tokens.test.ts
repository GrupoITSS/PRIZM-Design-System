import { describe, expect, it } from "vitest";
import { getToggleGroupItemClasses, getToggleGroupRootClasses } from "./toggle-group.styles";
import map from "./toggle-group.tokens.json";

const split = (classes: string) => classes.split(" ");
const step = (token: string) => token.split("/").pop() ?? token;

describe("ToggleGroup × mapa de tokens (toggle-group.tokens.json)", () => {
  it("grupo colado por padrão: sem gap e do tamanho dos itens (TG2)", () => {
    const classes = split(getToggleGroupRootClasses("horizontal"));
    expect(map.defaults.spacing).toBe(map.joined.gap);
    expect(classes).toContain(`gap-${map.joined.gap}`);
    expect(classes).toContain("w-fit");
  });

  it("cantos só nas pontas e uma borda entre dois itens, no outline", () => {
    const classes = split(getToggleGroupItemClasses({ variant: "outline" }));
    expect(classes).toContain("rounded-none");
    expect(classes).toContain(`first:rounded-l-${step(map.joined.radius)}`);
    expect(classes).toContain(`last:rounded-r-${step(map.joined.radius)}`);
    expect(classes).toContain("border-l-0");
    expect(classes).toContain("first:border-l");
  });

  it("na vertical, os cantos ficam em cima e embaixo", () => {
    const classes = split(getToggleGroupItemClasses({ orientation: "vertical", variant: "outline" }));
    expect(classes).toContain(`first:rounded-t-${step(map.joined.radius)}`);
    expect(classes).toContain(`last:rounded-b-${step(map.joined.radius)}`);
    expect(classes).toContain("border-t-0");
  });

  it("o item focado vem para a frente", () => {
    expect(split(getToggleGroupItemClasses({}))).toContain("focus-visible:z-10");
  });

  it("Width=Fill: o grupo ocupa a largura e os itens dividem o espaço (TG9)", () => {
    expect(split(getToggleGroupRootClasses("horizontal", 0, true))).toContain("w-full");
    expect(split(getToggleGroupItemClasses({ fullWidth: true }))).toContain("flex-1");
  });

  it("com spacing maior, os itens não se colam", () => {
    const classes = split(getToggleGroupItemClasses({ spacing: 2, variant: "outline" }));
    expect(classes).not.toContain("rounded-none");
    expect(classes).not.toContain("border-l-0");
  });

  it("toda divergência tem Figma, código e status", () => {
    for (const d of map.divergences) {
      expect(d.status).not.toBe("");
      expect(d.figma).not.toBe("");
      expect(d.code).not.toBe("");
    }
  });
});
