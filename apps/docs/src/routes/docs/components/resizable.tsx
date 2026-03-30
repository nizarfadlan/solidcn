import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function ResizablePage() {
  return (
    <DocPage
      docPath="/docs/components/resizable"
      title="Resizable"
      description="Accessible resizable panel groups and layouts with keyboard support. Built on Corvu Resizable."
      phase="Complex & Overlay"
      componentName="resizable"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>Two</ResizablePanel>
</ResizablePanelGroup>`}
      examples={[
        {
          title: "Horizontal",
          preview: (
            <ResizablePanelGroup
              direction="horizontal"
              class="max-w-md rounded-lg border border-border"
            >
              <ResizablePanel defaultSize={50}>
                <div class="flex h-[200px] items-center justify-center p-6">
                  <span class="font-semibold">One</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div class="flex h-[200px] items-center justify-center p-6">
                  <span class="font-semibold">Two</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          ),
          code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable"

export function ResizableHorizontal() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      class="max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div class="flex h-[200px] items-center justify-center p-6">
          <span class="font-semibold">Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`,
        },
        {
          title: "Vertical",
          preview: (
            <ResizablePanelGroup
              direction="vertical"
              class="min-h-[200px] max-w-md rounded-lg border border-border"
            >
              <ResizablePanel defaultSize={25}>
                <div class="flex h-full items-center justify-center p-6">
                  <span class="font-semibold">Header</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75}>
                <div class="flex h-full items-center justify-center p-6">
                  <span class="font-semibold">Content</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          ),
          code: `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable"

export function ResizableVertical() {
  return (
    <ResizablePanelGroup direction="vertical" class="min-h-[200px] rounded-lg border">
      <ResizablePanel defaultSize={25}>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`,
        },
      ]}
      props={[
        {
          name: "direction",
          type: '"horizontal" | "vertical"',
          required: true,
          description: "Direction of resizable panels (on ResizablePanelGroup)",
        },
        {
          name: "defaultSize",
          type: "number",
          description: "Initial size as a percentage (on ResizablePanel)",
        },
        {
          name: "minSize",
          type: "number",
          description: "Minimum size as a percentage (on ResizablePanel)",
        },
        {
          name: "maxSize",
          type: "number",
          description: "Maximum size as a percentage (on ResizablePanel)",
        },
        {
          name: "withHandle",
          type: "boolean",
          default: "false",
          description: "Show grip icon on the handle (on ResizableHandle)",
        },
      ]}
    />
  );
}
