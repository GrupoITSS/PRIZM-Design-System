import type useEmblaCarousel from "embla-carousel-react";

export type CarouselApi = ReturnType<typeof useEmblaCarousel>[1];

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

export type CarouselOptions = UseCarouselParameters[0];
export type CarouselPlugin = UseCarouselParameters[1];

export type CarouselOrientation = "horizontal" | "vertical";

export type CarouselItemConfig = {
  /**
   * Optional id for the item. Falls back to array index when not provided.
   */
  id?: string | number;
  /**
   * Content of the slide.
   */
  content?: React.ReactNode;
  /**
   * Extra classes applied to the slide container.
   */
  className?: string;
};

export type CarouselProps = {
  /**
   * Embla options. Axis is inferred from `orientation` when provided.
   *
   * @see https://www.embla-carousel.com/api/options/
   */
  opts?: CarouselOptions;
  /**
   * Embla plugins array.
   *
   * @see https://www.embla-carousel.com/plugins/
   */
  plugins?: CarouselPlugin;
  /**
   * Orientation of the carousel. Defaults to `"horizontal"`.
   */
  orientation?: CarouselOrientation;
  /**
   * Expose the Embla API instance for advanced usage.
   */
  setApi?: (api: CarouselApi) => void;
  /**
   * Simplified API: list of items to render as slides.
   * When provided, o componente monta automaticamente `CarouselContent`,
   * `CarouselItem` e os controles (quando habilitados).
   */
  items?: CarouselItemConfig[];
  /**
   * Show previous/next controls when using the simplified API (`items`).
   * Defaults to `true`.
   */
  showControls?: boolean;
  /**
   * Show indicators (dots) when using the simplified API (`items`).
   * Defaults to `false`.
   */
  showIndicators?: boolean;
  /**
   * Classes extras aplicadas ao container interno de conteúdo
   * quando usando a API simplificada (`items`).
   */
  contentClassName?: string;
  /**
   * Classes extras aplicadas a todos os itens quando usando a API
   * simplificada (`items`). Cada item ainda pode ter sua própria
   * `className`.
   */
  itemClassName?: string;
};

export type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;
