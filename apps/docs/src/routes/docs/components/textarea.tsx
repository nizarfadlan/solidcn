import { Label, Textarea } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function TextareaPage() {
  return (
    <DocPage
      docPath="/docs/components/textarea"
      title="Textarea"
      description="Displays a form textarea or a component that looks like a textarea. Built on Kobalte TextField."
      phase="Layout & Form"
      componentName="textarea"
      manualInstall="npm install @solidcn/core"
      usage={`import { Textarea } from "~/components/ui/textarea";

<Textarea placeholder="Type your message here." />`}
      examples={[
        {
          title: "Default",
          preview: <Textarea placeholder="Type your message here." class="w-[320px]" />,
          code: `import { Textarea } from "~/components/ui/textarea"

export function TextareaDefault() {
  return (
    <Textarea placeholder="Type your message here." />
  )
}`,
        },
        {
          title: "With label",
          preview: (
            <div class="grid w-[320px] gap-1.5">
              <Label for="message">Your message</Label>
              <Textarea placeholder="Type your message here." id="message" />
            </div>
          ),
          code: `import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"

export function TextareaWithLabel() {
  return (
    <div class="grid w-full gap-1.5">
      <Label for="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  )
}`,
        },
        {
          title: "With text",
          preview: (
            <div class="grid w-[320px] gap-1.5">
              <Label for="message-2">Your message</Label>
              <Textarea placeholder="Type your message here." id="message-2" />
              <p class="text-sm text-muted-foreground">
                Your message will be copied to the support team.
              </p>
            </div>
          ),
          code: `import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"

export function TextareaWithText() {
  return (
    <div class="grid w-full gap-1.5">
      <Label for="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
      <p class="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  )
}`,
        },
        {
          title: "Disabled",
          preview: <Textarea placeholder="Disabled textarea" disabled class="w-[320px]" />,
          code: `import { Textarea } from "~/components/ui/textarea"

export function TextareaDisabled() {
  return (
    <Textarea placeholder="Disabled textarea" disabled />
  )
}`,
        },
      ]}
      props={[
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text shown when empty",
        },
        {
          name: "value",
          type: "string",
          description: "Controlled value",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Default value (uncontrolled)",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          description: "Callback when value changes",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables interaction",
        },
        {
          name: "rows",
          type: "number",
          description: "Number of visible rows",
        },
        {
          name: "class",
          type: "string",
          description: "Additional CSS classes",
        },
      ]}
    />
  );
}
