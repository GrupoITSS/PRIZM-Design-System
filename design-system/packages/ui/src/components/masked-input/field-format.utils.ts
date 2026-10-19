import { FieldFormatType } from "./field-format.types";

const DIGITS_ONLY_REGEX = /\D/g;

export function extractDigits(value: string | null | undefined): string {
  if (!value) return "";
  return value.replace(DIGITS_ONLY_REGEX, "");
}

/**
 * CNPJ alfanumérico (RFB): 12 primeiros caracteres A-Z/0-9; DV finais só dígitos.
 */
export function extractCnpjChars(value: string | null | undefined): string {
  if (!value) return "";
  const cleaned = value.toUpperCase().replace(/[^0-9A-Z]/g, "");
  const body = cleaned.slice(0, 12);
  const checkDigits = cleaned.slice(12).replace(/\D/g, "").slice(0, 2);
  return `${body}${checkDigits}`.slice(0, 14);
}

export function formatCpf(value: string): string {
  const numbers = extractDigits(value).slice(0, 11);

  return numbers
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatCnpj(value: string): string {
  const chars = extractCnpjChars(value);

  if (chars.length === 14) {
    return chars.replace(
      /([0-9A-Z]{2})([0-9A-Z]{3})([0-9A-Z]{3})([0-9A-Z]{4})([0-9]{2})/,
      "$1.$2.$3/$4-$5",
    );
  }

  return chars
    .replace(/([0-9A-Z]{2})([0-9A-Z])/, "$1.$2")
    .replace(/([0-9A-Z]{3})([0-9A-Z])/, "$1.$2")
    .replace(/([0-9A-Z]{3})([0-9A-Z])/, "$1/$2")
    .replace(/([0-9A-Z]{4})([0-9]{1,2})$/, "$1-$2");
}

export function formatPhoneBr(value: string): string {
  const numbers = extractDigits(value).slice(0, 11);

  if (numbers.length <= 2) {
    return numbers.length ? `(${numbers}` : "";
  }

  if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
}

export function formatCep(value: string): string {
  const numbers = extractDigits(value).slice(0, 8);

  if (numbers.length <= 5) return numbers;

  return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
}

const formatters: Record<FieldFormatType, (value: string) => string> = {
  [FieldFormatType.CPF]: formatCpf,
  [FieldFormatType.CNPJ]: formatCnpj,
  [FieldFormatType.PHONE_BR]: formatPhoneBr,
  [FieldFormatType.CEP]: formatCep,
  [FieldFormatType.DIGITS_ONLY]: extractDigits,
};

export function resolveDocumentFormat(documentType: string | undefined): FieldFormatType | null {
  if (documentType === "cpf") return FieldFormatType.CPF;
  if (documentType === "cnpj") return FieldFormatType.CNPJ;
  return null;
}

/** Aplica máscara visual enquanto o usuário digita. */
export function formatFieldValue(type: FieldFormatType, value: string | null | undefined): string {
  const formatter = formatters[type];
  return formatter(value ?? "");
}

/**
 * Remove formatação para envio à API.
 * CPF, telefone e CEP retornam somente dígitos.
 * CNPJ preserva letras (alfanumérico RFB).
 */
export function stripFieldValue(type: FieldFormatType, value: string | null | undefined): string {
  if (type === FieldFormatType.CNPJ) {
    return extractCnpjChars(value);
  }

  if (type === FieldFormatType.DIGITS_ONLY) {
    return extractDigits(value);
  }

  return extractDigits(value);
}

export function splitPhoneBr(value: string | null | undefined): {
  phoneAreaCode: string;
  phoneNumber: string;
} {
  const digits = stripFieldValue(FieldFormatType.PHONE_BR, value);

  if (!digits) {
    return { phoneAreaCode: "", phoneNumber: "" };
  }

  return {
    phoneAreaCode: digits.slice(0, 2),
    phoneNumber: digits.slice(2),
  };
}
