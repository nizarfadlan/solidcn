import { Separator } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function SeparatorPage() {
  return (
    <DocPage
        docPath="/docs/components/separator"
        title="Separator"
        description="Visually or semantically separates content. Built on Kobalte Separator."
        phase="Core Primitives"
        componentName="separator"
        manualInstall="npm install @solidcn/core"
        examples={[
          {
            title: "Horizontal",
            preview: (
              <div class="w-full max-w-sm space-y-3">
                <p class="text-sm">Above the line</p>
                <Separator />
                <p class="text-sm">Below the line</p>
              </div>
            ),
            code: `import { Separator } from "~/components/ui/separator";

<div class="space-y-3">
  <p>Above the line</p>
  <Separator />
  <p>Below the line</p>
</div>`,
          },
          {
            title: "Vertical",
            preview: (
              <div class="flex h-8 items-center gap-3 text-sm">
                <span>Blog</span>
                <Separator orientation="vertical" />
                <span>Docs</span>
                <Separator orientation="vertical" />
                <span>Source</span>
              </div>
            ),
            code: `<div class="flex h-8 items-center gap-3">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
  <Separator orientation="vertical" />
  <span>Source</span>
</div>`,
          },
        ]}
        props={[
          {
            name: "orientation",
            type: '"horizontal" | "vertical"',
            default: '"horizontal"',
            description: "Direction of the separator",
          },
          {
            name: "decorative",
            type: "boolean",
            default: "false",
            description: "If true, hidden from accessibility tree",
          },
          { name: "class", type: "string", description: "Additional CSS classes" },
        ]}
      />
  );
}
