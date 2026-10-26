import { describe, expect, it } from "vitest";
import { commandItemStyles } from "./command/command.styles";
import {
  contextMenuCheckboxItemStyles,
  contextMenuItemStyles,
  contextMenuRadioItemStyles,
} from "./context-menu/context-menu.styles";
import {
  dropdownMenuCheckboxItemStyles,
  dropdownMenuItemStyles,
  dropdownMenuRadioItemStyles,
} from "./dropdown-menu/dropdown-menu.styles";
import {
  menubarCheckboxItemStyles,
  menubarItemStyles,
  menubarRadioItemStyles,
  menubarSubTriggerStyles,
  menubarTriggerStyles,
} from "./menubar/menubar.styles";
import { navigationMenuListItemStyles, navigationMenuTriggerVariants } from "./navigation-menu/navigation-menu.styles";

// No escuro, accent passou a neutral 700 (26/10/2026). muted-foreground sobre ele fica em 4,06–4,13:1,
// abaixo de 4,5:1: o item em destaque troca o texto secundário para accent-foreground (9,86–10,03:1).
const sobrescrita = "[&_.text-muted-foreground]:text-accent-foreground";

describe("Itens em destaque sobre accent", () => {
  it.each([
    ["contextMenuItemStyles", contextMenuItemStyles],
    ["contextMenuCheckboxItemStyles", contextMenuCheckboxItemStyles],
    ["contextMenuRadioItemStyles", contextMenuRadioItemStyles],
    ["dropdownMenuItemStyles", dropdownMenuItemStyles],
    ["dropdownMenuCheckboxItemStyles", dropdownMenuCheckboxItemStyles],
    ["dropdownMenuRadioItemStyles", dropdownMenuRadioItemStyles],
    ["menubarTriggerStyles", menubarTriggerStyles],
    ["menubarSubTriggerStyles", menubarSubTriggerStyles],
    ["menubarItemStyles", menubarItemStyles],
    ["menubarCheckboxItemStyles", menubarCheckboxItemStyles],
    ["menubarRadioItemStyles", menubarRadioItemStyles],
    ["navigationMenuListItemStyles", navigationMenuListItemStyles],
    ["navigationMenuTriggerVariants", navigationMenuTriggerVariants()],
  ])("%s troca muted-foreground por accent-foreground no foco", (_, classes) => {
    expect(classes).toContain(`focus:${sobrescrita}`);
  });

  it("Command troca muted-foreground por accent-foreground no item selecionado", () => {
    expect(commandItemStyles).toContain(`data-[selected=true]:${sobrescrita}`);
  });
});
