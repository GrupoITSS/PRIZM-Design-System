import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

describe("Drawer (PRIZM / Vaul)", () => {
  it("renderiza conteúdo quando aberto via defaultOpen (props API)", () => {
    render(
      <Drawer
        defaultOpen
        trigger={<Button>Open</Button>}
        title="Drawer title"
        description="Drawer description"
        body={<p>Body content</p>}
        footer={<Button>Submit</Button>}
      />,
    );

    expect(screen.getByText("Drawer title")).toBeInTheDocument();
    expect(screen.getByText("Drawer description")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("renderiza conteúdo quando aberto via defaultOpen (composition)", () => {
    render(
      <Drawer defaultOpen>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Composition title</DrawerTitle>
            <DrawerDescription>Composition description</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Done</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>,
    );

    expect(screen.getByText("Composition title")).toBeInTheDocument();
    expect(screen.getByText("Composition description")).toBeInTheDocument();
  });

  it("renderiza título com data-slot para acessibilidade", () => {
    render(
      <Drawer defaultOpen trigger={<Button>Open</Button>} title="Title with slot" body={null} />,
    );

    const title = screen.getByText("Title with slot");
    expect(title).toHaveAttribute("data-slot", "drawer-title");
  });

  it("renderiza com showHandle=false", () => {
    render(
      <Drawer
        defaultOpen
        trigger={<Button>Open</Button>}
        title="No handle"
        showHandle={false}
        body={<p>Content without handle</p>}
      />,
    );

    expect(screen.getByText("No handle")).toBeInTheDocument();
    expect(screen.getByText("Content without handle")).toBeInTheDocument();
  });
});
