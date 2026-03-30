import { Toggle } from "@solidcn/core";
import { Bold, Italic, Underline } from "lucide-solid";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function TogglePage() {
  return (
    <DocPage
      docPath="/docs/components/toggle"
      title="Toggle"
      description="A two-state button that can be either on or off. Built on Kobalte ToggleButton."
      phase="Core Primitives"
      componentName="toggle"
      manualInstall="npm install @solidcn/core"
      usage={`import { Toggle } from "~/components/ui/toggle";

<Toggle aria-label="Toggle bold">
  <Bold class="h-4 w-4" />
</Toggle>`}
      examples={[
        {
          title: "Default",
          preview: (
            <Toggle aria-label="Toggle bold">
              <Bold class="h-4 w-4" stroke-width={2} />
            </Toggle>
          ),
          code: `import { Bold } from "lucide-solid"
import { Toggle } from "~/components/ui/toggle"

export function ToggleDefault() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold class="h-4 w-4" />
    </Toggle>
  )
}`,
        },
        {
          title: "Outline",
          preview: (
            <Toggle variant="outline" aria-label="Toggle italic">
              <Italic class="h-4 w-4" stroke-width={2} />
            </Toggle>
          ),
          code: `import { Italic } from "lucide-solid"
import { Toggle } from "~/components/ui/toggle"

export function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic class="h-4 w-4" />
    </Toggle>
  )
}`,
        },
        {
          title: "With text",
          preview: (
            <Toggle aria-label="Toggle underline">
              <Underline class="h-4 w-4 mr-2" stroke-width={2} />
              Underline
            </Toggle>
          ),
          code: `import { Underline } from "lucide-solid"
import { Toggle } from "~/components/ui/toggle"

export function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle underline">
      <Underline class="h-4 w-4 mr-2" />
      Underline
    </Toggle>
  )
}`,
        },
        {
          title: "Sizes",
          preview: (
            <div class="flex items-center gap-2">
              <Toggle size="sm" aria-label="Small">
                <Bold class="h-3.5 w-3.5" stroke-width={2} />
              </Toggle>
              <Toggle size="default" aria-label="Default">
                <Bold class="h-4 w-4" stroke-width={2} />
              </Toggle>
              <Toggle size="lg" aria-label="Large">
                <Bold class="h-5 w-5" stroke-width={2} />
              </Toggle>
            </div>
          ),
          code: `import { Bold } from "lucide-solid"
import { Toggle } from "~/components/ui/toggle"

export function ToggleSizes() {
  return (
    <div class="flex items-center gap-2">
      <Toggle size="sm" aria-label="Small"><Bold class="h-3.5 w-3.5" /></Toggle>
      <Toggle size="default" aria-label="Default"><Bold class="h-4 w-4" /></Toggle>
      <Toggle size="lg" aria-label="Large"><Bold class="h-5 w-5" /></Toggle>
    </div>
  )
}`,
        },
        {
          title: "Disabled",
          preview: (
            <Toggle disabled aria-label="Disabled">
              <Bold class="h-4 w-4" stroke-width={2} />
            </Toggle>
          ),
          code: `import { Bold } from "lucide-solid"
import { Toggle } from "~/components/ui/toggle"

export function ToggleDisabled() {
  return (
    <Toggle disabled aria-label="Disabled">
      <Bold class="h-4 w-4" />
    </Toggle>
  )
}`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "outline"',
          default: '"default"',
          description: "Visual style variant",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg"',
          default: '"default"',
          description: "Size of the toggle button",
        },
        {
          name: "pressed",
          type: "boolean",
          description: "Controlled pressed state",
        },
        {
          name: "defaultPressed",
          type: "boolean",
          default: "false",
          description: "Default pressed state (uncontrolled)",
        },
        {
          name: "onPressedChange",
          type: "(pressed: boolean) => void",
          description: "Callback when pressed state changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables interaction",
        },
      ]}
    />
  );
}
