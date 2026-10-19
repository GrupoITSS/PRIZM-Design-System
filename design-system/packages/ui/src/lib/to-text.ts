/**
 * Text for a value of unknown type (table data, labels used as React keys):
 * primitives as `String()` does, dates as ISO strings, anything else (objects,
 * React elements) as "" instead of "[object Object]".
 */
export function toText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  if (value instanceof Date) return value.toISOString();
  return "";
}
