import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./sidebar";
import { sidebarMenuButtonVariants } from "./sidebar.styles";

// A seta do Radix (Tooltip.Arrow) mede o tamanho com ResizeObserver, que o jsdom não tem.
beforeAll(() => {
  if (!("ResizeObserver" in globalThis)) {
    (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }
});

afterEach(() => {
  vi.restoreAllMocks();
});

function Exemplo(props: { providerProps?: Partial<React.ComponentProps<typeof SidebarProvider>> }) {
  return (
    <SidebarProvider {...props.providerProps}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Organizações">
                  <span>Organizações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Acessos">
                  <span>Acessos</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton href="#perfis" isActive>
                      <span>Perfis</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <main>
        <SidebarTrigger />
        <input aria-label="Título do artigo" />
      </main>
    </SidebarProvider>
  );
}

const estado = () => document.querySelector("[data-slot=sidebar]")?.getAttribute("data-state");
const gatilho = () => document.querySelector("[data-slot=sidebar-trigger]") as HTMLElement;

describe("Sidebar (PRIZM / shadcn)", () => {
  it("fica num <nav> com o nome padrão em pt-BR (pendência 5)", () => {
    render(<Exemplo />);
    expect(screen.getByRole("navigation", { name: "Navegação" })).toBeInTheDocument();
  });

  it("aceita outro nome para a região de navegação", () => {
    render(
      <SidebarProvider>
        <Sidebar label="Navegação do Cockpit">
          <SidebarContent />
        </Sidebar>
      </SidebarProvider>,
    );
    expect(screen.getByRole("navigation", { name: "Navegação do Cockpit" })).toBeInTheDocument();
  });

  it("recolhe para a faixa de ícones por padrão (S4)", () => {
    render(<Exemplo />);
    const sidebar = document.querySelector("[data-slot=sidebar]") as HTMLElement;
    expect(sidebar).toHaveAttribute("data-state", "expanded");
    fireEvent.click(gatilho());
    expect(sidebar).toHaveAttribute("data-state", "collapsed");
    expect(sidebar).toHaveAttribute("data-collapsible", "icon");
  });

  it("gatilho e trilho com o texto padrão em pt-BR (pendência 9)", () => {
    render(<Exemplo />);
    const nomes = screen.getAllByRole("button", { name: "Mostrar ou ocultar a navegação" });
    expect(nomes.map((b) => b.getAttribute("data-slot"))).toEqual(["sidebar-rail", "sidebar-trigger"]);
    const rail = document.querySelector("[data-slot=sidebar-rail]") as HTMLElement;
    expect(rail).toHaveAttribute("aria-label", "Mostrar ou ocultar a navegação");
    expect(rail).toHaveAttribute("title", "Mostrar ou ocultar a navegação");
    expect(rail).toHaveAttribute("tabindex", "-1");
  });

  it("começa abaixo do header global com headerHeight (S2)", () => {
    render(<Exemplo providerProps={{ headerHeight: "3rem" }} />);
    const wrapper = document.querySelector("[data-slot=sidebar-wrapper]") as HTMLElement;
    expect(wrapper.style.getPropertyValue("--header-height")).toBe("3rem");
    const container = document.querySelector("[data-slot=sidebar-container]") as HTMLElement;
    expect(container).toHaveClass("top-(--header-height)", "h-[calc(100svh-var(--header-height))]");
  });
});

describe("SidebarMenuButton", () => {
  it("item ativo com aria-current=page e fundo sidebar-primary (pendência 4 e S5)", () => {
    render(<Exemplo />);
    const ativo = screen.getByRole("button", { name: "Organizações" });
    expect(ativo).toHaveAttribute("aria-current", "page");
    expect(ativo).toHaveAttribute("data-active", "true");
    expect(ativo.className).toContain("data-[active=true]:bg-sidebar-primary");
    expect(ativo.className).toContain("data-[active=true]:text-sidebar-primary-foreground");
    expect(screen.getByRole("button", { name: "Acessos" })).not.toHaveAttribute("aria-current");
  });

  it("quem usa pode trocar o aria-current", () => {
    render(
      <SidebarProvider>
        <SidebarMenuButton isActive aria-current="location">
          Mapa
        </SidebarMenuButton>
      </SidebarProvider>,
    );
    expect(screen.getByRole("button", { name: "Mapa" })).toHaveAttribute("aria-current", "location");
  });

  it("anel em sidebar-foreground com espaço em sidebar (pendência 1)", () => {
    render(<Exemplo />);
    const item = screen.getByRole("button", { name: "Acessos" });
    expect(item).toHaveClass(
      "focus-visible:ring-[3px]",
      "focus-visible:ring-sidebar-foreground",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-sidebar",
    );
    expect(item.className).not.toContain("ring-sidebar-ring");
  });

  it("é type=button, para não enviar formulário", () => {
    render(<Exemplo />);
    expect(screen.getByRole("button", { name: "Acessos" })).toHaveAttribute("type", "button");
  });

  it("só tem os tamanhos default e lg, sem variant outline (S7)", () => {
    expect(sidebarMenuButtonVariants({ size: "default" })).toContain("h-8");
    expect(sidebarMenuButtonVariants({ size: "lg" })).toContain("h-12");
    // @ts-expect-error: sm saiu (S7)
    expect(sidebarMenuButtonVariants({ size: "sm" })).not.toContain("h-7");
  });

  it("mostra o nome no Tooltip só com a Sidebar recolhida", async () => {
    render(<Exemplo />);
    const item = screen.getByRole("button", { name: "Acessos" });
    fireEvent.focus(item);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    fireEvent.click(gatilho());
    fireEvent.blur(item);
    fireEvent.focus(item);
    expect(await screen.findByRole("tooltip", { name: "Acessos" })).toBeInTheDocument();
  });

  it("recolher não remonta o item focado", () => {
    render(<Exemplo />);
    const item = screen.getByRole("button", { name: "Acessos" });
    item.focus();
    fireEvent.keyDown(item, { key: "b", ctrlKey: true });
    expect(estado()).toBe("collapsed");
    expect(screen.getByRole("button", { name: "Acessos" })).toBe(item);
    expect(document.activeElement).toBe(item);
  });
});

describe("SidebarMenuSubButton", () => {
  it("subitem ativo com aria-current=page e fundo sidebar-accent (P2)", () => {
    render(<Exemplo />);
    const sub = screen.getByRole("link", { name: "Perfis" });
    expect(sub).toHaveAttribute("aria-current", "page");
    expect(sub.className).toContain("data-[active=true]:bg-sidebar-accent");
    expect(sub.className).not.toContain("bg-sidebar-primary");
  });
});

describe("SidebarGroup", () => {
  it("com rótulo, vira role=group ligado ao rótulo (pendência 6)", () => {
    render(<Exemplo />);
    const grupo = screen.getByRole("group", { name: "Plataforma" });
    const rotulo = screen.getByText("Plataforma");
    expect(grupo).toHaveAttribute("aria-labelledby", rotulo.id);
  });

  it("sem rótulo, não tem role", () => {
    render(
      <SidebarProvider>
        <SidebarGroup data-testid="grupo" />
      </SidebarProvider>,
    );
    expect(screen.getByTestId("grupo")).not.toHaveAttribute("role");
  });

  it("rótulo em text-xs com o texto a 70% (P1)", () => {
    render(<Exemplo />);
    expect(screen.getByText("Plataforma")).toHaveClass("text-xs", "text-sidebar-foreground/70");
  });
});

describe("Atalho Ctrl ou Cmd + B (pendência 10)", () => {
  it("abre e recolhe fora de campo editável", () => {
    render(<Exemplo />);
    fireEvent.keyDown(document.body, { key: "b", ctrlKey: true });
    expect(estado()).toBe("collapsed");
    fireEvent.keyDown(document.body, { key: "b", metaKey: true });
    expect(estado()).toBe("expanded");
  });

  it("é ignorado num campo editável, e o negrito do editor continua", () => {
    render(<Exemplo />);
    const campo = screen.getByRole("textbox", { name: "Título do artigo" });
    const evento = new KeyboardEvent("keydown", { key: "b", ctrlKey: true, bubbles: true, cancelable: true });
    campo.dispatchEvent(evento);
    expect(estado()).toBe("expanded");
    expect(evento.defaultPrevented).toBe(false);
  });

  it("é ignorado em contenteditable", () => {
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent />
        </Sidebar>
        <div contentEditable data-testid="editor" suppressContentEditableWarning>
          texto
        </div>
      </SidebarProvider>,
    );
    fireEvent.keyDown(screen.getByTestId("editor"), { key: "b", ctrlKey: true });
    expect(estado()).toBe("expanded");
  });

  it("pode ser desligado", () => {
    render(<Exemplo providerProps={{ keyboardShortcut: false }} />);
    fireEvent.keyDown(document.body, { key: "b", ctrlKey: true });
    expect(estado()).toBe("expanded");
  });
});

describe("Ações (pendências 7 e 8)", () => {
  it("área de toque de 24px no desktop, sem mudar o visual", () => {
    render(
      <SidebarProvider>
        <SidebarMenuAction aria-label="Mais opções" />
        <SidebarGroupAction aria-label="Adicionar" />
      </SidebarProvider>,
    );
    for (const nome of ["Mais opções", "Adicionar"]) {
      const acao = screen.getByRole("button", { name: nome });
      expect(acao).toHaveClass("w-5", "after:absolute", "after:-inset-2", "md:after:-inset-0.5");
      expect(acao.className).not.toContain("md:after:hidden");
    }
  });

  it("avisa no console quando a ação só de ícone não tem nome", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <SidebarProvider>
        <SidebarMenuAction>
          <svg aria-hidden="true" />
        </SidebarMenuAction>
        <SidebarGroupAction>
          <svg aria-hidden="true" />
        </SidebarGroupAction>
      </SidebarProvider>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("SidebarMenuAction: ação só de ícone sem nome"));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("SidebarGroupAction: ação só de ícone sem nome"));
  });

  it("não avisa com aria-label ou texto sr-only", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <SidebarProvider>
        <SidebarMenuAction aria-label="Mais opções" />
        <SidebarGroupAction>
          <span className="sr-only">Adicionar projeto</span>
        </SidebarGroupAction>
      </SidebarProvider>,
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it("passa o ref de quem usa", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <SidebarProvider>
        <SidebarMenuAction ref={ref} aria-label="Mais opções" />
      </SidebarProvider>,
    );
    expect(ref.current).toBe(screen.getByRole("button", { name: "Mais opções" }));
  });
});

describe("Gaveta no celular", () => {
  function comoCelular() {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true, addEventListener: () => {}, removeEventListener: () => {} })),
    );
  }
  afterEach(() => vi.unstubAllGlobals());

  it("abre numa gaveta com nome e <nav> em pt-BR", async () => {
    comoCelular();
    render(<Exemplo />);
    fireEvent.click(gatilho());
    const gaveta = await screen.findByRole("dialog", { name: "Navegação" });
    expect(gaveta).toHaveAccessibleDescription("Navegação da solução.");
    expect(gaveta.querySelector("nav")).toHaveAttribute("aria-label", "Navegação");
  });

  // A volta do foco ao gatilho (2.4.3) foi conferida no navegador, no Storybook: no jsdom, o
  // FocusScope do Radix não devolve o foco ao fechar.
  it("fecha com Esc", async () => {
    comoCelular();
    render(<Exemplo />);
    gatilho().focus();
    fireEvent.click(gatilho());
    const gaveta = await screen.findByRole("dialog", { name: "Navegação" });
    fireEvent.keyDown(gaveta, { key: "Escape" });
    await vi.waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});

describe("useSidebar", () => {
  it("fora do SidebarProvider, avisa em pt-BR", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<SidebarTrigger />)).toThrow("useSidebar precisa estar dentro de um SidebarProvider.");
  });
});
