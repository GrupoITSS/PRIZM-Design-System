import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Mock do embla-carousel-react para evitar dependência de APIs de browser
vi.mock("embla-carousel-react", () => {
  const api = {
    canScrollPrev: () => false,
    canScrollNext: () => true,
    scrollSnapList: () => [0, 1, 2],
    selectedScrollSnap: () => 0,
    on: vi.fn(),
    off: vi.fn(),
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    scrollTo: vi.fn(),
  };

  const carouselRef = vi.fn();

  const useEmblaCarousel = () => [carouselRef, api] as const;

  return {
    default: useEmblaCarousel,
  };
});

import { Carousel } from "./carousel";

describe("Carousel (PRIZM / shadcn) - API por props", () => {
  it("renderiza a estrutura básica do carrossel com items (props based)", () => {
    render(
      <Carousel
        items={[
          { id: 1, content: <div>Slide 1</div> },
          { id: 2, content: <div>Slide 2</div> },
        ]}
      />,
    );

    const region = screen.getByRole("region", { name: "" });
    expect(region).toBeInTheDocument();
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
  });

  it("renderiza os slides como grupos (role='group') via items", () => {
    render(
      <Carousel
        items={[
          { id: 1, content: <div>Slide 1</div> },
          { id: 2, content: <div>Slide 2</div> },
        ]}
      />,
    );

    const slides = screen.getAllByRole("group");
    expect(slides).toHaveLength(2);
  });

  it("permite esconder os controles quando showControls=false", () => {
    const { container } = render(
      <Carousel
        showControls={false}
        items={[
          { id: 1, content: <div>Slide 1</div> },
          { id: 2, content: <div>Slide 2</div> },
        ]}
      />,
    );

    const buttons = container.querySelectorAll("button");
    // Nenhum botão de controle deve ser renderizado quando showControls=false
    expect(buttons.length).toBe(0);
  });
});
