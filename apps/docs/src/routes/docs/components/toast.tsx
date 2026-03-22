import { Button } from "@solidcn/core";
import { toast } from "@solidcn/toast";
import { DocPage } from "../../../components/ui/DocPage.js";

function ToastDemo() {
  return (
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => toast.success("Saved successfully!")}>
        Success
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.error("Something went wrong.")}>
        Error
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.warning("Disk space low.")}>
        Warning
      </Button>
      <Button variant="outline" size="sm" onClick={() => toast.info("Update available.")}>
        Info
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.success("Event created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: { label: "Undo", onClick: () => {} },
          })
        }
      >
        With action
      </Button>
    </div>
  );
}

export default function ToastPage() {
  return (
    <DocPage
        docPath="/docs/components/toast"
        title="Toast — Standard"
        description="A succinct message that appears temporarily. Requires <Toaster> in your app root."
        phase="Toast"
        componentName="toast"
        manualInstall="npm install @solidcn/toast"
        examples={[
          {
            title: "Variants",
            description: "Click to trigger toasts. Requires <Toaster /> in your layout.",
            preview: <ToastDemo />,
            code: `import { toast } from "@solidcn/toast";

toast.success("Saved successfully!");
toast.error("Something went wrong.");
toast.warning("Disk space low.");
toast.info("Update available.");

toast.success("Event created", {
  description: "Sunday, Dec 03 at 9:00 AM",
  action: {
    label: "Undo",
    onClick: () => {},
  },
});`,
          },
        ]}
        notes={
          <div class="rounded-lg border bg-muted/30 p-5 space-y-3">
            <h3 class="font-semibold text-sm">Setup</h3>
            <p class="text-sm text-muted-foreground">
              Add <code class="bg-muted px-1 rounded text-xs">{"<Toaster />"}</code> once in your
              app root:
            </p>
            <div class="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
              <pre class="p-4 text-sm font-mono text-zinc-300 overflow-x-auto">{`import { Toaster } from "@solidcn/toast";

// In your App component:
<Toaster position="top-right" />
<Toaster position="top-right" mode="sileo" /> // physics mode`}</pre>
            </div>
          </div>
        }
      />
  );
}
