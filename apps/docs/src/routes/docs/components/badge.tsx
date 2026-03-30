import { Badge } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function BadgePage() {
  return (
    <DocPage
      docPath="/docs/components/badge"
      title="Badge"
      description="A small label used to highlight status, category, or count."
      phase="Core Primitives"
      componentName="badge"
      manualInstall="npm install @solidcn/core"
      examples={[
        {
          title: "Default",
          preview: <Badge>Badge</Badge>,
          code: `import { Badge } from "~/components/ui/badge"

export function BadgeDefault() {
  return (
    <Badge>Badge</Badge>
  )
}`,
        },
        {
          title: "Variants",
          preview: (
            <div class="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          ),
          code: `import { Badge } from "~/components/ui/badge"

export function BadgeVariants() {
  return (
    <div class="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "secondary" | "destructive" | "outline"',
          default: '"default"',
          description: "Visual style",
        },
        { name: "class", type: "string", description: "Additional CSS classes" },
      ]}
    />
  );
}
