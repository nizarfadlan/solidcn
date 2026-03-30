import { Button } from "@solidcn/core";
import { sileo } from "@solidcn/toast";
import { DocPage } from "../../../components/ui/DocPage.js";

function SileoDemo() {
  return (
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => sileo.success("Saved successfully!")}>
        Success
      </Button>
      <Button variant="outline" size="sm" onClick={() => sileo.error("Something went wrong.")}>
        Error
      </Button>
      <Button variant="outline" size="sm" onClick={() => sileo.warning("Disk space low.")}>
        Warning
      </Button>
      <Button variant="outline" size="sm" onClick={() => sileo.info("Update available.")}>
        Info
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          sileo.success("Event created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            preset: "glass",
          })
        }
      >
        Glass preset
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          sileo.success("Bounced!", { animation: "bounce" })
        }
      >
        Bounce
      </Button>
    </div>
  );
}

export default function ToastSileoPage() {
  return (
    <DocPage
      docPath="/docs/components/toast-sileo"
      title="Toast — Sileo"
      description="Physics-based toasts with spring & bounce animations, presets, and reduced-motion support. Powered by RAF spring simulation."
      phase="Toast"
      componentName="toast"
      manualInstall="npm install @solidcn/toast"
      usage={`import { sileo } from "@solidcn/toast";

// Trigger a physics-based toast:
sileo.success("Saved!");
sileo.error("Failed.");
sileo.warning("Heads up.");
sileo.info("FYI.");

// With options:
sileo.success("Event created", {
  description: "Sunday, December 03 at 9:00 AM",
  preset: "glass",
  animation: "spring",
});`}
      examples={[
        {
          title: "Variants",
          description: "Click to trigger physics-based toasts. Requires <Toaster mode=\"sileo\" /> in your layout.",
          preview: <SileoDemo />,
          code: `import { sileo } from "@solidcn/toast"
import { Button } from "~/components/ui/button"

export function ToastSileoVariants() {
  return (
    <div class="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={() => sileo.success("Saved successfully!")}>
        Success
      </Button>
      <Button variant="outline" size="sm" onClick={() => sileo.error("Something went wrong.")}>
        Error
      </Button>
      <Button variant="outline" size="sm" onClick={() => sileo.warning("Disk space low.")}>
        Warning
      </Button>
      <Button variant="outline" size="sm" onClick={() => sileo.info("Update available.")}>
        Info
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          sileo.success("Event created", {
            description: "Sunday, Dec 03 at 9:00 AM",
            preset: "glass",
          })
        }
      >
        Glass preset
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => sileo.success("Bounced!", { animation: "bounce" })}
      >
        Bounce
      </Button>
    </div>
  )
}`,
        },
      ]}
      notes={
        <div class="space-y-6">
          <div class="rounded-lg border bg-muted/30 p-5 space-y-3">
            <h3 class="font-semibold text-sm">Setup</h3>
            <p class="text-sm text-muted-foreground">
              Add{" "}
              <code class="bg-muted px-1 rounded text-xs">
                {'<Toaster mode="sileo" />'}
              </code>{" "}
              once in your app root:
            </p>
            <div class="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
              <pre class="p-4 text-sm font-mono text-zinc-300 overflow-x-auto">{`import { Toaster } from "@solidcn/toast";

// In your App component:
<Toaster position="bottom-right" mode="sileo" />`}</pre>
            </div>
          </div>

          <div class="rounded-lg border bg-muted/30 p-5 space-y-3">
            <h3 class="font-semibold text-sm">Presets</h3>
            <p class="text-sm text-muted-foreground">
              Sileo ships with 6 built-in presets:
            </p>
            <div class="grid grid-cols-2 gap-2 text-sm">
              {(["default", "flat", "outlined", "glass", "dark", "minimal"] as const).map((p) => (
                <div class="flex items-center gap-2">
                  <code class="bg-muted px-1.5 py-0.5 rounded text-xs">{p}</code>
                </div>
              ))}
            </div>
          </div>

          <div class="rounded-lg border bg-muted/30 p-5 space-y-3">
            <h3 class="font-semibold text-sm">Animations</h3>
            <div class="grid grid-cols-2 gap-2 text-sm">
              {(["spring", "bounce", "fade", "slide", "none"] as const).map((a) => (
                <div class="flex items-center gap-2">
                  <code class="bg-muted px-1.5 py-0.5 rounded text-xs">{a}</code>
                  {a === "spring" || a === "bounce" ? (
                    <span class="text-xs text-muted-foreground">physics</span>
                  ) : a === "none" ? (
                    <span class="text-xs text-muted-foreground">reduced-motion default</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      props={[
        {
          name: "preset",
          type: '"default" | "flat" | "outlined" | "glass" | "dark" | "minimal"',
          default: '"default"',
          description: "Visual style preset for the toast",
        },
        {
          name: "animation",
          type: '"spring" | "bounce" | "fade" | "slide" | "none"',
          default: '"spring"',
          description: "Entry animation — spring/bounce use RAF physics simulation",
        },
        {
          name: "description",
          type: "string",
          description: "Secondary text shown below the title",
        },
        {
          name: "duration",
          type: "number",
          default: "4000",
          description: "Auto-dismiss duration in milliseconds",
        },
        {
          name: "action",
          type: "{ label: string; onClick: () => void }",
          description: "Action button rendered in the toast",
        },
        {
          name: "styles",
          type: "Partial<SileoToastStyles>",
          description: "Per-toast style overrides (container, title, description, etc.)",
        },
      ]}
    />
  );
}
