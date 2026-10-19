import { ContentFormatType } from "./table-cell-renderers.types";
import { toText } from "../../lib/to-text";

export function formatTableText(
  raw: unknown,
  format?: ContentFormatType | `${ContentFormatType}` | null,
): string {
  if (raw == null) return "";
  const text = toText(raw);
  if (!format) return text;

  switch (format) {
    case ContentFormatType.CNPJ: {
      const cleaned = text.toUpperCase().replace(/[^0-9A-Z]/g, "");
      const body = cleaned.slice(0, 12);
      const checkDigits = cleaned.slice(12).replace(/\D/g, "").slice(0, 2);
      const cnpj = `${body}${checkDigits}`;
      if (cnpj.length !== 14) return text;
      return cnpj.replace(
        /([0-9A-Z]{2})([0-9A-Z]{3})([0-9A-Z]{3})([0-9A-Z]{4})([0-9]{2})/,
        "$1.$2.$3/$4-$5",
      );
    }
    case ContentFormatType.CPF:
      return text.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    case ContentFormatType.CEP:
      return text.replace(/(\d{5})(\d{3})/, "$1-$2");
    case ContentFormatType.DATE: {
      if (!text) return "";
      // Keep behavior consistent across browsers/timezones for ISO strings.
      return new Date(text).toLocaleDateString("pt-BR", { timeZone: "UTC" });
    }
    case ContentFormatType.PHONE:
      return text.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    case ContentFormatType.DATE_TIME:
      return new Date(text).toLocaleString();
    case ContentFormatType.PERCENTAGE:
      return `${text}%`;
    case ContentFormatType.CURRENCY:
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number.parseFloat(text));
    default:
      return text;
  }
}

export function resolveLinkTemplate(link: string, rowId: string): string {
  return link.includes(":id") ? link.replace(":id", rowId) : link;
}

export function toSide(position?: string): "top" | "bottom" | "left" | "right" {
  switch (position) {
    case "top":
    case "left":
    case "right":
    case "bottom":
      return position;
    default:
      return "bottom";
  }
}
