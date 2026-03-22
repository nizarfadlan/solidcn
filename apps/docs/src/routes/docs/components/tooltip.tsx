import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function TooltipPage() {
  return (
    <DocPage
        docPath="/docs/components/tooltip"
        title="Tooltip"
        description="A popup that displays information related to an element when it receives keyboard focus or the mouse hovers over it."
        phase="Core Primitives"
        componentName="tooltip"
        manualInstall="npm install @solidcn/core"
        examples={[
          {
            title: "Default",
            preview: (
              <Tooltip>
                <TooltipTrigger as={Button} variant="outline">
                  Hover me
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is the tooltip content</p>
                </TooltipContent>
              </Tooltip>
            ),
            code: `import {
  Tooltip, TooltipContent, TooltipTrigger
} from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";

<Tooltip>
  <TooltipTrigger as={Button} variant="outline">
    Hover me
  </TooltipTrigger>
  <TooltipContent>
    <p>This is the tooltip content</p>
  </TooltipContent>
</Tooltip>`,
          },
          {
            title: "Placement variants",
            preview: (
              <div class="flex flex-wrap gap-3">
                {(["top", "bottom", "left", "right"] as const).map((placement) => (
                  <Tooltip placement={placement}>
                    <TooltipTrigger as={Button} size="sm" variant="outline">
                      {placement}
                    </TooltipTrigger>
                    <TooltipContent>Tooltip on {placement}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ),
            code: `<Tooltip placement="top">
  <TooltipTrigger as={Button}>Top</TooltipTrigger>
  <TooltipContent>Tooltip on top</TooltipContent>
</Tooltip>

<Tooltip placement="bottom">
  <TooltipTrigger as={Button}>Bottom</TooltipTrigger>
  <TooltipContent>Tooltip on bottom</TooltipContent>
</Tooltip>`,
          },
        ]}
        props={[
          {
            name: "placement",
            type: '"top" | "bottom" | "left" | "right"',
            default: '"top"',
            description: "Tooltip placement",
          },
          {
            name: "openDelay",
            type: "number",
            default: "700",
            description: "Delay before showing (ms)",
          },
          {
            name: "closeDelay",
            type: "number",
            default: "300",
            description: "Delay before hiding (ms)",
          },
        ]}
      />
  );
}
