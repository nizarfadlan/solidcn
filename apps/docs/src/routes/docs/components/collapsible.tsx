import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from "@solidcn/core";
import { ChevronsUpDown } from "lucide-solid";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function CollapsiblePage() {
  return (
    <DocPage
      docPath="/docs/components/collapsible"
      title="Collapsible"
      description="An interactive component which expands/collapses a panel. Built on Kobalte Collapsible."
      phase="Core Primitives"
      componentName="collapsible"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    <p>Expandable content here.</p>
  </CollapsibleContent>
</Collapsible>`}
      examples={[
        {
          title: "Default",
          preview: (
            <Collapsible class="w-[350px] space-y-2">
              <div class="flex items-center justify-between space-x-4 px-4">
                <h4 class="text-sm font-semibold">@solidcn starred repos</h4>
                <CollapsibleTrigger as={Button} variant="ghost" size="sm" class="w-9 p-0">
                  <ChevronsUpDown class="h-4 w-4" stroke-width={2} />
                  <span class="sr-only">Toggle</span>
                </CollapsibleTrigger>
              </div>
              <div class="rounded-md border border-border px-4 py-3 font-mono text-sm">
                @solidcn/core
              </div>
              <CollapsibleContent class="space-y-2">
                <div class="rounded-md border border-border px-4 py-3 font-mono text-sm">
                  @solidcn/toast
                </div>
                <div class="rounded-md border border-border px-4 py-3 font-mono text-sm">
                  @solidcn/themes
                </div>
              </CollapsibleContent>
            </Collapsible>
          ),
          code: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible"
import { Button } from "~/components/ui/button"
import { ChevronsUpDown } from "lucide-solid"

export function CollapsibleDefault() {
  return (
    <Collapsible class="w-[350px] space-y-2">
      <div class="flex items-center justify-between space-x-4 px-4">
        <h4 class="text-sm font-semibold">@solidcn starred repos</h4>
        <CollapsibleTrigger as={Button} variant="ghost" size="sm" class="w-9 p-0">
          <ChevronsUpDown class="h-4 w-4" />
        </CollapsibleTrigger>
      </div>
      <div class="rounded-md border px-4 py-3 font-mono text-sm">
        @solidcn/core
      </div>
      <CollapsibleContent class="space-y-2">
        <div class="rounded-md border px-4 py-3 font-mono text-sm">
          @solidcn/toast
        </div>
        <div class="rounded-md border px-4 py-3 font-mono text-sm">
          @solidcn/themes
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}`,
        },
      ]}
      props={[
        {
          name: "open",
          type: "boolean",
          description: "Controlled open state",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "Default open state (uncontrolled)",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: "Callback when open state changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Prevents toggling",
        },
      ]}
    />
  );
}
