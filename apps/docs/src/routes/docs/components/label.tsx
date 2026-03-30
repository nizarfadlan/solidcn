import { Checkbox, Label } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function LabelPage() {
  return (
    <DocPage
      docPath="/docs/components/label"
      title="Label"
      description="Renders an accessible label associated with controls. Built on Kobalte TextField.Label."
      phase="Layout & Form"
      componentName="label"
      manualInstall="npm install @solidcn/core"
      usage={`import { Label } from "~/components/ui/label";

<Label for="email">Your email address</Label>`}
      examples={[
        {
          title: "Default",
          preview: (
            <div class="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label for="terms">Accept terms and conditions</Label>
            </div>
          ),
          code: `import { Label } from "~/components/ui/label"
import { Checkbox } from "~/components/ui/checkbox"

export function LabelDefault() {
  return (
    <div class="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label for="terms">Accept terms and conditions</Label>
    </div>
  )
}`,
        },
      ]}
      props={[
        {
          name: "for",
          type: "string",
          description: "ID of the associated form control",
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
