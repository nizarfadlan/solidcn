import { Skeleton } from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function SkeletonPage() {
  return (
    <DocPage
      docPath="/docs/components/skeleton"
      title="Skeleton"
      description="Used to show a placeholder while content is loading."
      phase="Layout & Form"
      componentName="skeleton"
      manualInstall="npm install @solidcn/core"
      examples={[
        {
          title: "Default",
          preview: (
            <div class="flex items-center gap-4 w-64">
              <Skeleton class="h-12 w-12 rounded-full" />
              <div class="space-y-2 flex-1">
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-4/5" />
              </div>
            </div>
          ),
          code: `import { Skeleton } from "~/components/ui/skeleton";

<div class="flex items-center gap-4">
  <Skeleton class="h-12 w-12 rounded-full" />
  <div class="space-y-2 flex-1">
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-4/5" />
  </div>
</div>`,
        },
        {
          title: "Card skeleton",
          preview: (
            <div class="rounded-lg border p-5 space-y-4 w-56">
              <Skeleton class="h-32 w-full rounded-md" />
              <div class="space-y-2">
                <Skeleton class="h-4 w-3/4" />
                <Skeleton class="h-3 w-full" />
                <Skeleton class="h-3 w-5/6" />
              </div>
            </div>
          ),
          code: `<div class="rounded-lg border p-5 space-y-4">
  <Skeleton class="h-32 w-full rounded-md" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-3/4" />
    <Skeleton class="h-3 w-full" />
    <Skeleton class="h-3 w-5/6" />
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: "class",
          type: "string",
          description: "CSS classes — use to set width, height, border-radius",
        },
      ]}
    />
  );
}
