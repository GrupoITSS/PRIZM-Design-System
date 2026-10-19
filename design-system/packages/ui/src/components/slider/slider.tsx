import { cn } from "../../lib/cn";
import { Slider as SliderPrimitive } from "radix-ui";
import * as React from "react";
import {
  sliderRootVariants,
  sliderThumbVariants,
  sliderTrackVariants,
  type SliderSize,
} from "./slider.styles";
import type { SliderProps } from "./slider.types";

/**
 * Slider — controle de valor contínuo com API simplificada por props.
 *
 * Mostra uma tooltip acima do thumb com o valor atual enquanto ele estiver
 * sendo pressionado/arrastado (estado "active"). O número de casas decimais
 * é derivado de `step` por padrão e pode ser sobrescrito via `formatValue`.
 *
 * Uso recomendado (valor único):
 *
 * @example
 * <Slider defaultValue={20} onValueChange={(value) => console.log(value)} />
 *
 * Uso avançado (range):
 *
 * @example
 * <Slider
 *   values={[20, 80]}
 *   onValuesChange={(values) => console.log(values)}
 * />
 *
 * @see https://ui.shadcn.com/docs/components/slider
 */
export const Slider = function Slider({
  className,
  trackClassName,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  "aria-label": ariaLabel,
  values,
  onValuesChange,
  showLabels = true,
  minLabel,
  maxLabel,
  helperText,
  formatValue,
  showActiveValueTooltip = true,
  ref,
  ...props
}: SliderProps & { ref?: React.Ref<React.ComponentRef<typeof SliderPrimitive.Root>> }) {
  const size: SliderSize = "default";

  const isAdvancedMode = Array.isArray(values) && values.length > 0;

  const rootClasses = cn(
    sliderRootVariants({ size }),
    disabled && "cursor-not-allowed",
    trackClassName,
  );

  const initialValues = React.useMemo<number[]>(() => {
    if (isAdvancedMode) return values ?? [];
    if (value !== undefined) return [value];
    if (defaultValue !== undefined) return [defaultValue];
    return [min];
  }, [isAdvancedMode, values, value, defaultValue, min]);

  const [internalValues, setInternalValues] = React.useState<number[]>(initialValues);

  // Follow the controlled value when it changes, during render
  // (https://react.dev/learn/you-might-not-need-an-effect).
  const controlled = isAdvancedMode ? values : value;
  const [prevControlled, setPrevControlled] = React.useState(controlled);
  if (controlled !== prevControlled) {
    setPrevControlled(controlled);
    if (isAdvancedMode && values) {
      setInternalValues(values);
    } else if (!isAdvancedMode && value !== undefined) {
      setInternalValues([value]);
    }
  }

  const handleValueChange = (vals: number[]) => {
    setInternalValues(vals);
    if (isAdvancedMode) {
      onValuesChange?.(vals);
      return;
    }
    onValueChange?.(vals[0]);
  };

  const radixValue = isAdvancedMode ? values : value !== undefined ? [value] : undefined;

  const radixDefaultValue =
    !isAdvancedMode && defaultValue !== undefined ? [defaultValue] : undefined;

  const resolvedMinLabel = minLabel ?? min;
  const resolvedMaxLabel = maxLabel ?? max;

  const thumbsCount = isAdvancedMode
    ? values?.length && values.length > 0
      ? values.length
      : 2
    : 1;

  const decimals = React.useMemo(() => decimalsFromStep(step), [step]);
  const defaultFormat = React.useCallback((v: number) => v.toFixed(decimals), [decimals]);
  const format = formatValue ?? defaultFormat;

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (activeIndex === null) return;
    const clear = () => setActiveIndex(null);
    window.addEventListener("pointerup", clear);
    window.addEventListener("pointercancel", clear);
    return () => {
      window.removeEventListener("pointerup", clear);
      window.removeEventListener("pointercancel", clear);
    };
  }, [activeIndex]);

  return (
    <div className={cn("flex w-full flex-col gap-1", disabled && "cursor-not-allowed", className)}>
      <div className={cn("flex w-full items-center gap-2", disabled && "cursor-not-allowed")}>
        {showLabels && (
          <span className="text-sm font-medium text-foreground">{resolvedMinLabel}</span>
        )}

        <SliderPrimitive.Root
          ref={ref}
          className={rootClasses}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={radixValue}
          defaultValue={radixDefaultValue}
          onValueChange={handleValueChange}
          aria-label={ariaLabel}
          data-slot="slider"
          {...(props as React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>)}
        >
          <SliderPrimitive.Track className={sliderTrackVariants({ size })}>
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>
          {Array.from({ length: thumbsCount }).map((_, index) => {
            const isActive = activeIndex === index;
            const thumbValue = internalValues[index] ?? min;
            return (
              <SliderPrimitive.Thumb
                // index-based key é aceitável aqui porque o número de thumbs
                // é completamente derivado do comprimento de `values`.
                // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
                key={index}
                className={cn(sliderThumbVariants({ size }), "relative")}
                aria-label={ariaLabel}
                data-active={isActive ? "true" : undefined}
                onPointerDown={() => setActiveIndex(index)}
                onPointerUp={() => setActiveIndex((cur) => (cur === index ? null : cur))}
                onLostPointerCapture={() => setActiveIndex((cur) => (cur === index ? null : cur))}
              >
                {showActiveValueTooltip && (
                  <span
                    role="tooltip"
                    aria-hidden={!isActive}
                    data-slot="slider-thumb-tooltip"
                    data-state={isActive ? "open" : "closed"}
                    className={cn(
                      "pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2",
                      "rounded-md border border-sidebar-border bg-popover px-2 py-1 text-xs font-medium text-popover-foreground shadow-md",
                      "whitespace-nowrap tabular-nums",
                      "opacity-0 scale-95 transition-[opacity,transform] duration-100 ease-out",
                      "data-[state=open]:opacity-100 data-[state=open]:scale-100",
                    )}
                  >
                    {format(thumbValue)}
                  </span>
                )}
              </SliderPrimitive.Thumb>
            );
          })}
        </SliderPrimitive.Root>

        {showLabels && (
          <span className="ml-auto text-sm font-medium text-foreground">{resolvedMaxLabel}</span>
        )}
      </div>

      {Boolean(helperText) && <p className="text-sm text-destructive text-right">{helperText}</p>}
    </div>
  );
};

/**
 * Deriva o número de casas decimais de `step` para formatar o valor exibido
 * na tooltip. Ex.: `0.01` → 2, `1` → 0, `0.5` → 1.
 */
function decimalsFromStep(step: number): number {
  if (!Number.isFinite(step) || step <= 0) return 0;
  const str = String(step);
  if (str.includes("e-")) {
    return Number.parseInt(str.split("e-")[1] ?? "0", 10) || 0;
  }
  const dot = str.indexOf(".");
  return dot === -1 ? 0 : str.length - dot - 1;
}
