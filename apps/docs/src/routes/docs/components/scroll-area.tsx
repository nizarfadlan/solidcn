import { ScrollArea } from "@solidcn/core";
import { For } from "solid-js";
import { DocPage } from "../../../components/ui/DocPage.js";

const tags = Array.from({ length: 50 }, (_, i) => `Tag ${i + 1}`);

export default function ScrollAreaPage() {
  return (
    <DocPage
      docPath="/docs/components/scroll-area"
      title="Scroll Area"
      description="Augments native scroll functionality for custom, cross-browser styling."
      phase="Complex & Overlay"
      componentName="scroll-area"
      manualInstall="npm install @solidcn/core"
      usage={`import { ScrollArea } from "~/components/ui/scroll-area";

<ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
  Jokull Sigurbergsson...
</ScrollArea>`}
      examples={[
        {
          title: "Vertical",
          preview: (
            <ScrollArea class="h-72 w-48 rounded-md border border-border">
              <div class="p-4">
                <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
                <For each={tags}>
                  {(tag) => (
                    <>
                      <div class="text-sm">{tag}</div>
                      <div class="my-2 h-px bg-border" />
                    </>
                  )}
                </For>
              </div>
            </ScrollArea>
          ),
          code: `import { ScrollArea } from "~/components/ui/scroll-area"
import { For } from "solid-js"

const tags = Array.from({ length: 50 }, (_, i) => \`Tag \${i + 1}\`)

export function ScrollAreaVertical() {
  return (
    <ScrollArea class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
        <For each={tags}>
          {(tag) => (
            <>
              <div class="text-sm">{tag}</div>
              <div class="my-2 h-px bg-border" />
            </>
          )}
        </For>
      </div>
    </ScrollArea>
  )
}`,
        },
        {
          title: "Horizontal",
          preview: (
            <ScrollArea class="w-96 whitespace-nowrap rounded-md border border-border" orientation="horizontal">
              <div class="flex w-max space-x-4 p-4">
                <For each={Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`)}>
                  {(item) => (
                    <figure class="shrink-0">
                      <div class="overflow-hidden rounded-md">
                        <div class="h-[100px] w-[100px] bg-muted flex items-center justify-center text-sm text-muted-foreground">
                          {item}
                        </div>
                      </div>
                    </figure>
                  )}
                </For>
              </div>
            </ScrollArea>
          ),
          code: `import { ScrollArea } from "~/components/ui/scroll-area"
import { For } from "solid-js"

const items = Array.from({ length: 20 }, (_, i) => \`Item \${i + 1}\`)

export function ScrollAreaHorizontal() {
  return (
    <ScrollArea class="w-96 whitespace-nowrap rounded-md border" orientation="horizontal">
      <div class="flex w-max space-x-4 p-4">
        <For each={items}>
          {(item) => (
            <figure class="shrink-0">
              <div class="h-[100px] w-[100px] bg-muted rounded-md" />
            </figure>
          )}
        </For>
      </div>
    </ScrollArea>
  )
}`,
        },
      ]}
      props={[
        {
          name: "orientation",
          type: '"vertical" | "horizontal" | "both"',
          default: '"vertical"',
          description: "Scroll direction(s) to enable",
        },
        {
          name: "class",
          type: "string",
          description: "Additional CSS classes (typically sets height/width)",
        },
      ]}
    />
  );
}
