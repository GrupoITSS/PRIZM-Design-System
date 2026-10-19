import type { InputProps } from "../input";
import type { MaskTypeEnum } from "./mask.constants";

export type MaskedInputProps = Omit<InputProps, "size"> & {
  mask: MaskTypeEnum;
  size?: InputProps["size"];
  /** Optional inline validation message shown below the field. */
  error?: string;
};
