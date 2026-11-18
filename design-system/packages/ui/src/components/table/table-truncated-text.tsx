import * as React from "react";
import { Tooltip } from "../tooltip";
import { tableCellText } from "./table.styles";

/**
 * Texto cortado com reticências. O Tooltip com o texto inteiro só entra se o texto não coube:
 * a medida é feita quando o ponteiro entra na célula, sem observar o tamanho de cada uma.
 */
export function TruncatedText({ children }: { children: React.ReactNode }) {
  const [isCut, setIsCut] = React.useState(false);
  const text = (
    <span
      data-slot="table-cell-text"
      className={tableCellText}
      onPointerEnter={(e) => {
        const el = e.currentTarget;
        setIsCut(el.scrollWidth > el.clientWidth);
      }}
    >
      {children}
    </span>
  );
  return isCut ? <Tooltip content={children}>{text}</Tooltip> : text;
}
