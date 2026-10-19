import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Dropzone } from "@grupoitss/prizm-ui/dropzone";

const meta: Meta<typeof Dropzone> = {
  title: "Primários/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Componente de upload de arquivos (drag-and-drop + clique) do design system PRIZM. Suporta filtro por tipos (`accept`), estados visuais de hover/drag ativo e texto descritivo.\n\nO layout segue o design do Figma (bordas tracejadas, cantos arredondados, ícone superior e área central clicável).\n",
      },
    },
  },
  args: {
    accept: [".pdf", ".png", ".jpg"],
  },
  argTypes: {
    accept: {
      control: "text",
      description:
        "Tipos/ extensões permitidas (CSV ou array). Também aplicado no atributo `accept` do input.",
    },
    multiple: {
      control: "boolean",
      description: "Permite seleção de múltiplos arquivos.",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita interações de clique e drag-and-drop.",
    },
    label: {
      control: "text",
      description: "Texto principal dentro da área clicável.",
    },
    secondaryLabel: {
      control: "text",
      description: "Texto secundário ao lado do texto principal.",
    },
    description: {
      control: "text",
      description:
        "Descrição/ajuda abaixo da dropzone. Se omitida, é gerada automaticamente a partir de `accept`.",
    },
    onFileSelect: {
      action: "fileSelected",
      description: "Chamado com o primeiro arquivo aceito (uso simples).",
    },
    onFilesChange: {
      action: "filesChanged",
      description: "Chamado com todos os arquivos aceitos.",
    },
    onInvalidFiles: {
      action: "invalidFiles",
      description: "Chamado quando um ou mais arquivos são rejeitados pelo filtro `accept`.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropzone>;

export const Default: Story = {
  render: function Render(args) {
    const [lastFileName, setLastFileName] = useState<string | null>(null);

    return (
      <div className="flex flex-col items-start gap-2">
        <Dropzone
          {...args}
          onFileSelect={(file) => {
            setLastFileName(file.name);
            args.onFileSelect?.(file);
          }}
        />
        {lastFileName && (
          <p className="text-xs text-muted-foreground">
            Último arquivo selecionado: <strong>{lastFileName}</strong>
          </p>
        )}
      </div>
    );
  },
  args: {
    accept: [".pdf", ".png", ".jpg"],
  },
};

export const WithCustomDescription: Story = {
  args: {
    accept: ["image/*"],
    description: "Envie imagens no formato PNG ou JPG com até 5 MB.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    description: "Este campo está desabilitado para upload.",
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
    description: "Simulação de upload em andamento — ícone de upload substituído por Spinner.",
  },
};

export const InvalidState: Story = {
  args: {
    invalid: true,
  },
};
