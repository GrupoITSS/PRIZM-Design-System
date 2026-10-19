import { FieldFormatType } from "./field-format.types";

export enum MaskTypeEnum {
  CNPJ = FieldFormatType.CNPJ,
  CPF = FieldFormatType.CPF,
  PHONE_BR = FieldFormatType.PHONE_BR,
  CEP = FieldFormatType.CEP,
  JUST_NUMBER = FieldFormatType.DIGITS_ONLY,
}
