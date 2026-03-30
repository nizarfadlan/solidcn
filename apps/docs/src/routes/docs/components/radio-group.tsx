import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
  RadioGroupLabel,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function RadioGroupPage() {
  return (
    <DocPage
      docPath="/docs/components/radio-group"
      title="Radio Group"
      description="A set of checkable buttons where only one can be checked at a time. Built on Kobalte RadioGroup."
      phase="Core Primitives"
      componentName="radio-group"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
  RadioGroupLabel,
} from "~/components/ui/radio-group";

export default function App() {
  return (
    <RadioGroup defaultValue="option-1">
      <RadioGroupLabel>Options</RadioGroupLabel>
      <RadioGroupItem value="option-1">
        <RadioGroupItemLabel>Option 1</RadioGroupItemLabel>
      </RadioGroupItem>
      <RadioGroupItem value="option-2">
        <RadioGroupItemLabel>Option 2</RadioGroupItemLabel>
      </RadioGroupItem>
    </RadioGroup>
  );
}`}
      examples={[
        {
          title: "Default",
          preview: (
            <RadioGroup defaultValue="comfortable" class="gap-3">
              <RadioGroupLabel class="text-sm font-medium">Density</RadioGroupLabel>
              <RadioGroupItem value="compact">
                <RadioGroupItemLabel>Compact</RadioGroupItemLabel>
              </RadioGroupItem>
              <RadioGroupItem value="comfortable">
                <RadioGroupItemLabel>Comfortable</RadioGroupItemLabel>
              </RadioGroupItem>
              <RadioGroupItem value="spacious">
                <RadioGroupItemLabel>Spacious</RadioGroupItemLabel>
              </RadioGroupItem>
            </RadioGroup>
          ),
          code: `import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
  RadioGroupLabel,
} from "~/components/ui/radio-group"

export function RadioGroupDefault() {
  return (
    <RadioGroup defaultValue="comfortable">
      <RadioGroupLabel>Density</RadioGroupLabel>
      <RadioGroupItem value="compact">
        <RadioGroupItemLabel>Compact</RadioGroupItemLabel>
      </RadioGroupItem>
      <RadioGroupItem value="comfortable">
        <RadioGroupItemLabel>Comfortable</RadioGroupItemLabel>
      </RadioGroupItem>
      <RadioGroupItem value="spacious">
        <RadioGroupItemLabel>Spacious</RadioGroupItemLabel>
      </RadioGroupItem>
    </RadioGroup>
  )
}`,
        },
        {
          title: "Disabled",
          preview: (
            <RadioGroup defaultValue="b" disabled class="gap-3">
              <RadioGroupItem value="a">
                <RadioGroupItemLabel>Option A</RadioGroupItemLabel>
              </RadioGroupItem>
              <RadioGroupItem value="b">
                <RadioGroupItemLabel>Option B</RadioGroupItemLabel>
              </RadioGroupItem>
            </RadioGroup>
          ),
          code: `import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from "~/components/ui/radio-group"

export function RadioGroupDisabled() {
  return (
    <RadioGroup defaultValue="b" disabled>
      <RadioGroupItem value="a">
        <RadioGroupItemLabel>Option A</RadioGroupItemLabel>
      </RadioGroupItem>
      <RadioGroupItem value="b">
        <RadioGroupItemLabel>Option B</RadioGroupItemLabel>
      </RadioGroupItem>
    </RadioGroup>
  )
}`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "string",
          description: "Controlled value of the selected item",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Default value (uncontrolled)",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Callback fired when selection changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables all items in the group",
        },
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"vertical"',
          description: "Layout orientation",
        },
      ]}
    />
  );
}
