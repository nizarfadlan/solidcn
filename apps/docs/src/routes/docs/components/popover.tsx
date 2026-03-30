import { Button, Input, Popover, PopoverContent, PopoverHeader, PopoverTitle } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function PopoverPage() {
  return (
    <DocPage
      docPath="/docs/components/popover"
      title="Popover"
      description="Displays rich content in a portal, triggered by a button. Built on Kobalte Popover."
      phase="Core Primitives"
      componentName="popover"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";

<Popover>
  <Popover.Trigger as={Button}>Open</Popover.Trigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
    </PopoverHeader>
  </PopoverContent>
</Popover>`}
      examples={[
        {
          title: "Default",
          preview: (
            <Popover>
              <Popover.Trigger as={Button} variant="outline">
                Open popover
              </Popover.Trigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                </PopoverHeader>
                <div class="grid gap-4 pt-2">
                  <div class="grid grid-cols-3 items-center gap-4">
                    <label for="popover-width" class="text-sm font-medium">
                      Width
                    </label>
                    <Input id="popover-width" class="col-span-2 h-8" value="100%" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <label for="popover-max-width" class="text-sm font-medium">
                      Max. width
                    </label>
                    <Input id="popover-max-width" class="col-span-2 h-8" value="300px" />
                  </div>
                  <div class="grid grid-cols-3 items-center gap-4">
                    <label for="popover-height" class="text-sm font-medium">
                      Height
                    </label>
                    <Input id="popover-height" class="col-span-2 h-8" value="25px" />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ),
          code: `import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "~/components/ui/popover"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

export function PopoverDefault() {
  return (
    <Popover>
      <Popover.Trigger as={Button} variant="outline">
        Open popover
      </Popover.Trigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
        </PopoverHeader>
        <div class="grid gap-4 pt-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Width</Label>
            <Input class="col-span-2 h-8" value="100%" />
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <Label>Max. width</Label>
            <Input class="col-span-2 h-8" value="300px" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
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
          name: "placement",
          type: '"top" | "bottom" | "left" | "right"',
          default: '"bottom"',
          description: "Preferred placement of the popover",
        },
        {
          name: "showClose",
          type: "boolean",
          default: "true",
          description: "Show or hide the close button in PopoverContent",
        },
      ]}
    />
  );
}
