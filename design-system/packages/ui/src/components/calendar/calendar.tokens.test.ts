import { describe, expect, it } from "vitest";
import { calendarClassNames, calendarDayButtonStyles, calendarRootStyles } from "./calendar.styles";
import map from "./calendar.tokens.json";

// Figma token name → Tailwind class suffix: "color/accent" → "accent",
// "spacing/3" → "3", "opacity/50" → "50".
const color = (token: string) => token.replace(/^color\//, "").split(" ")[0];
const suffix = (token: string) => token.split("/")[1].split(" ")[0];
const cls = (s: string) => s.split(" ");

describe("Calendar × mapa de tokens (calendar.tokens.json)", () => {
  it("contêiner: fundo, padding e célula do mapa, sem sombra", () => {
    const c = map.parts.container;
    expect(cls(calendarRootStyles)).toContain(`bg-${color(c.background)}`);
    expect(cls(calendarRootStyles)).toContain(`p-${suffix(c.padding)}`);
    expect(cls(calendarRootStyles)).toContain("[--cell-size:--spacing(8)]");
    expect(calendarRootStyles).not.toMatch(/shadow/);
  });

  it("dia: tamanho da célula e raio do mapa", () => {
    expect(cls(calendarDayButtonStyles)).toContain("size-(--cell-size)");
    expect(cls(calendarDayButtonStyles)).toContain(`rounded-${suffix(map.parts.day.radius)}`);
  });

  it("dias da semana e número da semana em text-xs e muted-foreground", () => {
    for (const [part, classes] of [
      [map.parts.weekday, calendarClassNames.weekday],
      [map.parts.weekNumber, calendarClassNames.weekNumber],
    ] as const) {
      expect(cls(classes)).toContain(`text-${suffix(part.fontSize)}`);
      expect(cls(classes)).toContain(`text-${color(part.color)}`);
    }
  });

  it("hoje, intervalo e escolhido nos tokens do mapa", () => {
    const s = map.states;
    expect(cls(calendarClassNames.today)).toContain(`bg-${color(s.today.background)}`);
    expect(cls(calendarClassNames.rangeMiddleBase)).toContain(`bg-${color(s.rangeMiddle.background)}`);
    expect(cls(calendarClassNames.rangeStart)).toContain(`bg-${color(s.rangeEnds.band)}`);
    expect(cls(calendarDayButtonStyles)).toContain(
      `data-[selected-single=true]:bg-${color(s.selected.background)}!`,
    );
    expect(cls(calendarDayButtonStyles)).toContain(
      `data-[range-start=true]:bg-${color(s.rangeEnds.background)}!`,
    );
  });

  it("fora do mês sem opacidade e desabilitado a 50%", () => {
    expect(calendarClassNames.outside).not.toMatch(/opacity/);
    expect(cls(calendarClassNames.outside)).toContain(`text-${color(map.states.outside.text)}`);
    expect(cls(calendarClassNames.disabled)).toContain(
      `opacity-${suffix(map.states.disabled.opacity)}`,
    );
  });

  it("foco vem do Button: o dia não zera o anel", () => {
    expect(calendarDayButtonStyles).not.toMatch(/(^|\s)(aria-selected:)?ring-0!/);
    expect(calendarDayButtonStyles).not.toMatch(/ring-offset-0/);
  });
});
