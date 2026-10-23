import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "../icons";

import { cn } from "../../lib/cn";
import { Button } from "../button";
import {
  carouselContentStyles,
  carouselItemStyles,
  carouselNextButtonStyles,
  carouselPreviousButtonStyles,
  carouselRootStyles,
  carouselViewportStyles,
} from "./carousel.styles";
import type { CarouselContextValue, CarouselItemConfig, CarouselProps } from "./carousel.types";

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel(): CarouselContextValue {
  const context = React.use(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

/**
 * Carousel — componente de carrossel do design system PRIZM.
 *
 * Construído em cima de `embla-carousel-react`, espelhando o componente
 * Carousel oficial do shadcn/ui.
 *
 * **Uso recomendado (API por props):**
 *
 * ```tsx
 * <Carousel
 *   items={[
 *     { content: "Slide 1" },
 *     { content: "Slide 2" },
 *   ]}
 * />
 * ```
 *
 * **API por composição (escape hatch):**
 *
 * ```tsx
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 *
 * Para casos avançados, use `opts`, `plugins` e `setApi` para acessar a API do Embla.
 *
 * @see https://ui.shadcn.com/docs/components/carousel
 * @see https://www.embla-carousel.com/
 */
const Carousel = ({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  items,
  showControls = true,
  showIndicators = false,
  contentClassName,
  itemClassName,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & CarouselProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [scrollSnapsCount, setScrollSnapsCount] = React.useState(0);

  // Copies the Embla instance's state (an external system) into React state.
  // It runs from Embla's events and once when the instance is ready.
  const onSelect = React.useCallback((emblaApi: CarouselContextValue["api"]) => {
    if (!emblaApi) return;

    /* eslint-disable @eslint-react/set-state-in-effect */
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setScrollSnapsCount(emblaApi.scrollSnapList().length);
    setCurrentIndex(emblaApi.selectedScrollSnap());
    /* eslint-enable @eslint-react/set-state-in-effect */
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- see onSelect
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  const resolvedOrientation = orientation || (opts?.axis === "y" ? "vertical" : "horizontal");

  const useSimplifiedAPI = Array.isArray(items) && items.length > 0;

  return (
    <CarouselContext
      value={{
        carouselRef,
        api,
        opts,
        orientation: resolvedOrientation,
        items,
        showControls,
        showIndicators,
        contentClassName,
        itemClassName,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn(carouselRootStyles, className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {useSimplifiedAPI ? (
          <>
            <CarouselContent className={contentClassName}>
              {items?.map((item: CarouselItemConfig, index) => (
                <CarouselItem
                  // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
                  key={item.id ?? index}
                  className={cn(itemClassName, item.className)}
                >
                  {item.content}
                </CarouselItem>
              ))}
            </CarouselContent>

            {showControls && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}

            {showIndicators && scrollSnapsCount > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {Array.from({ length: scrollSnapsCount }).map((_, index) => (
                  <button
                    // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
                    key={index}
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "h-2 w-2 rounded-full border border-border",
                      index === currentIndex ? "bg-primary" : "bg-muted",
                    )}
                    aria-label={`Ir para slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          children
        )}
      </div>
    </CarouselContext>
  );
};
Carousel.displayName = "Carousel";

const CarouselContent = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className={carouselViewportStyles}>
      <div
        ref={ref}
        className={cn(carouselContentStyles(orientation ?? "horizontal"), className)}
        {...props}
      />
    </div>
  );
};
CarouselContent.displayName = "CarouselContent";

const CarouselItem = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(carouselItemStyles(orientation ?? "horizontal"), className)}
      {...props}
    />
  );
};
CarouselItem.displayName = "CarouselItem";

type CarouselButtonProps = Omit<React.ComponentProps<typeof Button>, "children"> & {
  children?: React.ReactNode;
};

const CarouselPrevious = ({
  className,
  variant = "outline",
  size = "icon",
  ref,
  ...props
}: CarouselButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(carouselPreviousButtonStyles(orientation ?? "horizontal"), className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
};
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = ({
  className,
  variant = "outline",
  size = "icon",
  ref,
  ...props
}: CarouselButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(carouselNextButtonStyles(orientation ?? "horizontal"), className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
};
CarouselNext.displayName = "CarouselNext";

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, useCarousel };
