import { Input, Label } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function InputPage() {
  return (
    <DocPage
      docPath="/docs/components/input"
      title="Input"
      description="A styled text input field, built on Kobalte TextField."
      phase="Layout & Form"
      componentName="input"
      manualInstall="npm install @solidcn/core"
      examples={[
        {
          title: "Default",
          preview: <Input placeholder="Enter text..." class="w-64" />,
          code: `import { Input } from "~/components/ui/input"

export function InputDefault() {
  return (
    <Input placeholder="Enter text..." />
  )
}`,
        },
        {
          title: "With label",
          preview: (
            <div class="w-64 space-y-2">
              <Label>Email address</Label>
              <Input type="email" placeholder="you@example.com" />
            </div>
          ),
          code: `import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

export function InputWithLabel() {
  return (
    <div class="space-y-2">
      <Label>Email address</Label>
      <Input type="email" placeholder="you@example.com" />
    </div>
  )
}`,
        },
        {
          title: "Disabled",
          preview: <Input placeholder="Disabled input" disabled class="w-64" />,
          code: `import { Input } from "~/components/ui/input"

export function InputDisabled() {
  return (
    <Input placeholder="Disabled input" disabled />
  )
}`,
        },
      ]}
      props={[
        {
          name: "type",
          type: "string",
          default: '"text"',
          description: "HTML input type attribute",
        },
        { name: "placeholder", type: "string", description: "Placeholder text" },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the input",
        },
        { name: "class", type: "string", description: "Additional CSS classes" },
      ]}
    />
  );
}
