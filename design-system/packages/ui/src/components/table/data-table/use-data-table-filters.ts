import { useCallback, useEffect, useRef, useState } from "react";

type FilterPatch<T extends Record<string, unknown>> = Partial<T>;

export function useDataTableFilters<T extends Record<string, unknown>>(
  initial: T,
  onChange?: (filters: T) => void,
  options?: { debounceMs?: number },
) {
  const [filters, setFilters] = useState<T>(initial);
  const debounceMs = options?.debounceMs ?? 0;
  // Latest onChange, without restarting the debounce when it changes.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const updateFilters = useCallback((patch: FilterPatch<T>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  useEffect(() => {
    if (!onChangeRef.current) return;
    if (debounceMs <= 0) {
      onChangeRef.current(filters);
      return;
    }
    const timer = window.setTimeout(() => {
      onChangeRef.current?.(filters);
    }, debounceMs);
    return () => window.clearTimeout(timer);
  }, [debounceMs, filters]);

  return { filters, updateFilters, setFilters };
}
