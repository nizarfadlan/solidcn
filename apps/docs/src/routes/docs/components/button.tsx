import { Button } from "@solidcn/core";
import { Plus } from "lucide-solid";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function ButtonPage() {
  return (
    <DocPage
      docPath="/docs/components/button"
      title="Button"
      description="A clickable button element with variant, size, and loading state support."
      phase="Core Primitives"
      componentName="button"
      manualInstall="npm install @solidcn/core"
      usage={`import { Button } from "~/components/ui/button";

export default function App() {
  return <Button>Click me</Button>;
}`}
      storybookPath="/?path=/story/button--default"
      playground={{
        embedSrc:
          "https://stackblitz.com/github/solidjs/templates/tree/main/ts?embed=1&file=src%2Findex.tsx",
      }}
      examples={[
        {
          title: "Default",
          preview: <Button>Click me</Button>,
          code: `import { Button } from "~/components/ui/button"

export function ButtonDefault() {
  return (
    <Button>Click me</Button>
  )
}`,
        },
        {
          title: "Variants",
          preview: (
            <div class="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          ),
          code: `import { Button } from "~/components/ui/button"

export function ButtonVariants() {
  return (
    <div class="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`,
        },
        {
          title: "Sizes",
          preview: (
            <div class="flex items-center flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Add">
                <Plus class="h-4 w-4" stroke-width={2} />
              </Button>
            </div>
          ),
          code: `import { Plus } from "lucide-solid"
import { Button } from "~/components/ui/button"

export function ButtonSizes() {
  return (
    <div class="flex items-center flex-wrap gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        <Plus class="h-4 w-4" stroke-width={2} />
      </Button>
    </div>
  )
}`,
        },
        {
          title: "Disabled",
          preview: <Button disabled>Disabled</Button>,
          code: `import { Button } from "~/components/ui/button"

export function ButtonDisabled() {
  return (
    <Button disabled>Disabled</Button>
  )
}`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
          default: '"default"',
          description: "Visual style variant",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg" | "icon"',
          default: '"default"',
          description: "Size of the button",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Prevents interaction when true",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "Render as child element (polymorphic)",
        },
        { name: "class", type: "string", description: "Additional CSS classes" },
      ]}
    />
  );
}
