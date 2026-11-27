import { Button } from "@grupoitss/prizm-ui/button";
import { Dialog } from "@grupoitss/prizm-ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Input } from "@grupoitss/prizm-ui/input";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Minus, Plus } from "@grupoitss/prizm-ui/icons";
import * as React from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@grupoitss/prizm-ui/drawer";

// Rastreabilidade: o component set no [PRIZM] Componentes e o frame de documentação.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=244-2831";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=28192-5562";

const meta: Meta<typeof Drawer> = {
  title: "Primários/Drawer",
  component: Drawer,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      story: { inline: false, height: "480px" },
      description: {
        component:
          "Painel que sobe da base da tela, ou entra pelo alto ou pela lateral, com alça para arrastar. Serve para uma tarefa curta sem sair da página; no celular, é a alternativa ao Dialog. Base: [Drawer — shadcn/ui](https://ui.shadcn.com/docs/components/drawer), feito com o [vaul](https://vaul.emilkowal.ski/).\n\n" +
          "API por props: `trigger`, `title`, `description`, `body`, `footer`, `side` (bottom, top, right, left) e `showHandle`. Os subcomponentes (`DrawerContent`, `DrawerHeader`…) ficam para composição avançada.\n\n" +
          "Fecha com Esc, clique no overlay, arrastando ou pelo `DrawerClose`. Com `dismissible={false}`, fecha só pelo `DrawerClose`. Ao abrir, o foco vai para dentro do painel (`autoFocus`, padrão `true` no Prizm). Painel lateral com botão fechar, cabeçalho rico e tamanhos é o Sheet.\n\n" +
          `**Rastreabilidade:** <a href="${FIGMA_URL}" target="_blank" rel="noopener noreferrer">Componente no Figma</a> · <a href="${FIGMA_DOC_URL}" target="_blank" rel="noopener noreferrer">Documentação no Figma</a> · <a href="https://ui.shadcn.com/docs/components/drawer" target="_blank" rel="noopener noreferrer">Drawer — shadcn/ui</a>`,
      },
    },
  },
  args: {
    side: "bottom",
    showHandle: true,
    dismissible: true,
    modal: true,
  },
  argTypes: {
    side: { control: "inline-radio", options: ["bottom", "top", "right", "left"] },
    showHandle: { control: "boolean" },
    dismissible: { control: "boolean" },
    modal: { control: "boolean" },
    handleOnly: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

function CamposDoPerfil({ className }: { className?: string }) {
  return (
    <FieldGroup className={className}>
      <Field>
        <FieldLabel htmlFor="drawer-nome">Nome</FieldLabel>
        <Input id="drawer-nome" name="nome" defaultValue="Pedro Duarte" />
      </Field>
      <Field>
        <FieldLabel htmlFor="drawer-usuario">Usuário</FieldLabel>
        <Input id="drawer-usuario" name="usuario" defaultValue="@peduarte" />
      </Field>
    </FieldGroup>
  );
}

const rodape = (
  <>
    <Button type="submit">Salvar</Button>
    <DrawerClose asChild>
      <Button variant="outline">Cancelar</Button>
    </DrawerClose>
  </>
);

/** Uso básico: gatilho, título, descrição, corpo e rodapé, tudo por props. Use os controles para trocar o lado. */
export const Basico: Story = {
  name: "Básico",
  render: (args) => (
    <Drawer
      {...args}
      trigger={<Button variant="outline">Abrir Drawer</Button>}
      title={args.title ?? "Editar perfil"}
      description={args.description ?? "Altere os dados e salve quando terminar."}
      body={<CamposDoPerfil className="px-4" />}
      footer={rodape}
    />
  ),
};

const dadosDaMeta = [400, 300, 200, 300, 200, 278, 189, 239, 300, 200, 278, 189, 349].map(
  (meta) => ({ meta }),
);

/** Meta diária com + e − e um gráfico de barras: conteúdo próprio no corpo, centralizado em max-w-sm. */
export const MetaDiaria: Story = {
  name: "Meta diária",
  render: function Render() {
    const [meta, setMeta] = React.useState(350);
    const ajustar = (delta: number) => setMeta((m) => Math.max(200, Math.min(400, m + delta)));
    return (
      <Drawer
        trigger={<Button variant="outline">Abrir Drawer</Button>}
        title="Meta diária"
        description="Defina sua meta de atividade por dia."
        body={
          <div className="mx-auto w-full max-w-sm p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => ajustar(-10)}
                disabled={meta <= 200}
                aria-label="Diminuir"
              >
                <Minus />
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">{meta}</div>
                <div className="text-muted-foreground text-[0.70rem] uppercase">Calorias/dia</div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => ajustar(10)}
                disabled={meta >= 400}
                aria-label="Aumentar"
              >
                <Plus />
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosDaMeta}>
                  <Bar dataKey="meta" style={{ fill: "var(--prizm-color-chart-1)" }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        }
        footer={rodape}
      />
    );
  },
};

const paragrafo = (
  <p className="mb-4 leading-normal">
    Texto de exemplo para mostrar a rolagem. O conteúdo longo rola dentro do painel, até 85% da
    altura da tela, e as ações continuam no rodapé.
  </p>
);

/** Os quatro lados: bottom (padrão), top, right e left. Nas laterais, o painel ocupa 3/4 da tela até 384px. */
export const Lados: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["bottom", "top", "right", "left"] as const).map((side) => (
        <Drawer
          key={side}
          side={side}
          trigger={<Button variant="outline">{side}</Button>}
          title="Editar perfil"
          description="Altere os dados e salve quando terminar."
          body={<CamposDoPerfil className="px-4" />}
          footer={rodape}
        />
      ))}
    </div>
  ),
};

/** Conteúdo longo: o painel rola por dentro. Com rolagem própria no corpo, `handleOnly` evita fechar ao rolar. */
export const ConteudoLongo: Story = {
  name: "Conteúdo longo",
  render: () => (
    <Drawer
      trigger={<Button variant="outline">Conteúdo longo</Button>}
      title="Termos de uso"
      description="Leia antes de continuar."
      body={
        <div className="px-4">
          {Array.from({ length: 12 }, (_, i) => (
            <React.Fragment key={`p-${String(i)}`}>{paragrafo}</React.Fragment>
          ))}
        </div>
      }
      footer={rodape}
    />
  ),
};

/** Sem alça: `showHandle={false}`. Arrastar o painel continua fechando. */
export const SemAlca: Story = {
  name: "Sem alça",
  render: () => (
    <Drawer
      showHandle={false}
      trigger={<Button variant="outline">Sem alça</Button>}
      title="Sem alça"
      description="Este Drawer não mostra a alça."
      body={<p className="px-4 py-2 text-sm text-muted-foreground">Só o conteúdo.</p>}
      footer={rodape}
    />
  ),
};

/** `dismissible={false}`: Esc, clique fora e arrasto não fecham; só o `DrawerClose`. */
export const SoPeloBotao: Story = {
  name: "Fecha só pelo botão",
  render: () => (
    <Drawer
      dismissible={false}
      trigger={<Button variant="outline">Abrir (fecha só pelo botão)</Button>}
      title="Fecha só pelo botão"
      description="Clique fora, Esc e arrasto não fecham este Drawer."
      body={<p className="px-4 py-2 text-sm">Use o botão abaixo para fechar.</p>}
      footer={
        <DrawerClose asChild>
          <Button variant="outline">Fechar</Button>
        </DrawerClose>
      }
    />
  ),
};

/** `modal={false}`: a página atrás continua interativa. */
export const NaoModal: Story = {
  name: "Não modal",
  render: () => (
    <Drawer
      modal={false}
      trigger={<Button variant="outline">Abrir (não modal)</Button>}
      title="Drawer não modal"
      description="Dá para usar a página atrás."
      body={<p className="px-4 py-2 text-sm">Feche pelo botão ou arrastando.</p>}
      footer={
        <DrawerClose asChild>
          <Button>Fechar</Button>
        </DrawerClose>
      }
    />
  ),
};

/** Dialog no desktop e Drawer no celular, com o mesmo conteúdo. No app, use `useMediaQuery("(min-width: 768px)")`. */
export const DialogOuDrawer: Story = {
  name: "Dialog no desktop, Drawer no celular",
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const [desktop, setDesktop] = React.useState(true);
    const gatilho = <Button variant="outline">Editar perfil</Button>;
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Simular:</span>
          <Button variant={desktop ? "default" : "outline"} size="sm" onClick={() => setDesktop(true)}>
            Desktop (Dialog)
          </Button>
          <Button variant={desktop ? "outline" : "default"} size="sm" onClick={() => setDesktop(false)}>
            Celular (Drawer)
          </Button>
        </div>
        {desktop ? (
          <Dialog
            open={open}
            onOpenChange={setOpen}
            trigger={gatilho}
            title="Editar perfil"
            description="Altere os dados e salve quando terminar."
            body={<CamposDoPerfil />}
            contentClassName="sm:max-w-[425px]"
          />
        ) : (
          <Drawer
            open={open}
            onOpenChange={setOpen}
            trigger={gatilho}
            title="Editar perfil"
            description="Altere os dados e salve quando terminar."
            body={<CamposDoPerfil className="px-4" />}
            footer={rodape}
          />
        )}
      </div>
    );
  },
};

/** Composição com subcomponentes, para quando a estrutura precisa de controle total. */
export const Composicao: Story = {
  name: "Composição",
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir (composição)</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Exemplo de composição</DrawerTitle>
          <DrawerDescription>Quando a estrutura precisa de controle total.</DrawerDescription>
        </DrawerHeader>
        <p className="px-4 py-2 text-sm">Conteúdo próprio.</p>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Concluir</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
