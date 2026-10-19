import { Button } from "@grupoitss/prizm-ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FileItem, FileList } from "@grupoitss/prizm-ui/item";
import type { FileItemData } from "@grupoitss/prizm-ui/item";

const meta: Meta<typeof FileItem> = {
  title: "Primários/FileItem",
  component: FileItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "FileItem — variante de Item voltada para arquivos, com ícone, tipo e tamanho automáticos.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileItem>;

const sampleFiles: FileItemData[] = [
  {
    id: "1",
    name: "Relatório Financeiro Q4 2025.pdf",
    size: 2_400_000,
    mimeType: "application/pdf",
    status: "PROCESSED",
  },
  {
    id: "2",
    name: "Contrato de Prestação de Serviços.docx",
    size: 540_000,
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    status: "PROCESSED",
  },
  {
    id: "3",
    name: "Planilha de Custos.xlsx",
    size: 1_100_000,
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    status: "PROCESSED",
  },
  {
    id: "4",
    name: "Apresentação Trimestral.pptx",
    size: 8_750_000,
    mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    status: "PROCESSING",
  },
  {
    id: "5",
    name: "photo-banner.png",
    size: 320_000,
    mimeType: "image/png",
    status: "PROCESSED",
  },
  {
    id: "6",
    name: "notas.txt",
    size: 4_200,
    mimeType: "text/plain",
    status: "WAITING",
  },
];

export const FileItemDemo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "FileItem — a file-specific variant of Item with auto-detected icon, color and type label.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <FileItem file={sampleFiles[0]} removable onRemove={(id) => console.log("Remove", id)} />
      <FileItem file={sampleFiles[1]} removable />
      <FileItem file={sampleFiles[2]} />
    </div>
  ),
};

export const FileItemTypes: Story = {
  parameters: {
    docs: {
      description: {
        story: "FileItem showing all detectable file types with their respective icon colors.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-2">
      {sampleFiles.map((file) => (
        <FileItem key={file.id} file={file} removable />
      ))}
    </div>
  ),
};

export const FileItemWithStatus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "FileItem with processing status label (derived from the `status` field) next to the actions.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <FileItem
        file={{
          id: "extra-1",
          name: "test-test-test-test-test-test-test-test-test-test.pdf",
          size: 1_500_000,
          mimeType: "application/pdf",
          status: "WAITING",
        }}
        removable
      />
      <FileItem
        file={{
          id: "extra-2",
          name: "pending-review.docx",
          size: 890_000,
          status: "PROCESSING",
        }}
        removable
      />
      <FileItem
        file={{
          id: "extra-2",
          name: "pending-review.docx",
          size: 890_000,
          status: "PROCESSED",
        }}
        removable
      />
      <FileItem
        file={{
          id: "extra-2",
          name: "pending-review.docx",
          size: 890_000,
          status: "ERROR",
        }}
        removable
      />
      <FileItem
        file={{
          id: "extra-2",
          name: "pending-review.docx",
          size: 890_000,
          status: "UNKNOWN",
        }}
        removable
      />
    </div>
  ),
};

function FileListInteractive() {
  const [files, setFiles] = useState<FileItemData[]>(sampleFiles);

  const handleRemove = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <FileList files={files} removable onRemove={handleRemove} />
      <div className="text-muted-foreground text-xs">
        {files.length} file{files.length !== 1 ? "s" : ""} remaining
      </div>
      <Button size="sm" variant="outline" className="w-fit" onClick={() => setFiles(sampleFiles)}>
        Reset files
      </Button>
    </div>
  );
}

export const FileListDemo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "FileList — renders a list of FileItem components. Supports removal and scrollable mode.",
      },
    },
  },
  render: () => <FileListInteractive />,
};

export const FileListScrollable: Story = {
  parameters: {
    docs: {
      description: {
        story: "FileList in scrollable mode — constrains the list height and adds a scrollbar.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4 custom-scroll">
      <FileList
        files={sampleFiles}
        removable
        scrollable
        onRemove={(id) => console.log("Remove", id)}
      />
    </div>
  ),
};

export const FileItemInteractive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "FileItem interativo com hover habilitado via prop `interactive`, ideal para listas clicáveis de arquivos.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <FileItem
        file={sampleFiles[0]}
        removable
        interactive
        onClick={() => {
          // noop — apenas demonstração
        }}
      />
      <FileItem file={sampleFiles[1]} interactive />
    </div>
  ),
};
