import { FieldFormatType } from "./field-format.types";
import { formatFieldValue } from "./field-format.utils";
import { MaskTypeEnum } from "./mask.constants";

/** Lookup by enum value (e.g. MaskTypeEnum.JUST_NUMBER === "DIGITS_ONLY"). */
export const maskMappings: Record<MaskTypeEnum, (value: string) => string> = {
  [MaskTypeEnum.CPF]: (value) => formatFieldValue(FieldFormatType.CPF, value),
  [MaskTypeEnum.CNPJ]: (value) => formatFieldValue(FieldFormatType.CNPJ, value),
  [MaskTypeEnum.PHONE_BR]: (value) => formatFieldValue(FieldFormatType.PHONE_BR, value),
  [MaskTypeEnum.CEP]: (value) => formatFieldValue(FieldFormatType.CEP, value),
  [MaskTypeEnum.JUST_NUMBER]: (value) => formatFieldValue(FieldFormatType.DIGITS_ONLY, value),
};

export {
  formatCep,
  formatCnpj,
  formatCpf,
  formatPhoneBr,
  extractDigits as maskJustNumber,
} from "./field-format.utils";
