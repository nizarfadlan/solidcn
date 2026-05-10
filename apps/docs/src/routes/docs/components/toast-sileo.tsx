import { Button } from "@solidcn/core";
import { SileoToaster, sileo } from "@solidcn/toast";
import { DocPage } from "../../../components/ui/DocPage.js";

function SileoDemo() {
  return (
    <>
      <SileoToaster mode="sileo" position="top-center" />
      <div class="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => sileo.success({ title: "Changes saved", duration: 6000 })}
        >
          Success
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            sileo.error({
              title: "Something went wrong",
              description: "Please try again later.",
              duration: 6000,
            })
          }
        >
          Error
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => sileo.warning({ title: "Storage almost full", duration: 6000 })}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => sileo.info({ title: "New update available", duration: 6000 })}
        >
          Info
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            sileo.success({
              title: "Event created",
              description: "Sunday, December 03, 2023 at 9:00 AM",
              preset: "glass",
              duration: 6000,
            })
          }
        >
          Glass preset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => sileo.success({ title: "Bounced!", animation: "bounce", duration: 6000 })}
        >
          Bounce
        </Button>
      </div>
    </>
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
      usage={`import { SileoToaster, sileo } from "@solidcn/toast";

// Mount once in this page/layout
<SileoToaster mode="sileo" position="top-center" />

// Trigger a physics-based toast:
sileo.success({ title: "Changes saved" });

sileo.error({
  title: "Something went wrong",
  description: "Please try again later.",
  duration: 6000,
});

sileo.warning({ title: "Storage almost full", duration: 6000 });

sileo.info({ title: "New update available", duration: 6000 });

// With options:
sileo.success({
  title: "Event created",
  description: "Sunday, December 03 at 9:00 AM",
  preset: "glass",
  duration: 6000,
  animation: "spring",
});`}
      examples={[
        {
          title: "Variants",
          description:
            "Click any button to trigger Sileo toasts on this page, including description cards. Each toast stays open briefly before auto-closing.",
          preview: <SileoDemo />,
          code: `import { SileoToaster, sileo } from "@solidcn/toast"
import { Button } from "@solidcn/core"

export function ToastSileoVariants() {
  return (
    <>
      <SileoToaster mode="sileo" position="top-center" />
      <div class="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => sileo.success({ title: "Changes saved", duration: 6000 })}
        >
          Success
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            sileo.error({
              title: "Something went wrong",
              description: "Please try again later.",
              duration: 6000,
            })
          }
        >
          Error
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => sileo.warning({ title: "Storage almost full", duration: 6000 })}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => sileo.info({ title: "New update available", duration: 6000 })}
        >
          Info
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            sileo.success({
              title: "Event created",
              description: "Sunday, Dec 03 at 9:00 AM",
              preset: "glass",
              duration: 6000,
            })
          }
        >
          Glass preset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => sileo.success({ title: "Bounced!", animation: "bounce", duration: 6000 })}
        >
          Bounce
        </Button>
      </div>
    </>
  )
}`,
        },
      ]}
      notes={
        <div class="space-y-6">
          <div class="rounded-lg border bg-muted/30 p-5 space-y-3">
            <h3 class="font-semibold text-sm">Standalone toast item</h3>
            <p class="text-sm text-muted-foreground">
              Use <code class="bg-muted px-1 rounded text-xs">SileoToast</code> when you want to
              render a single toast card from your own state instead of the global store.
            </p>
            <div class="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
              <pre class="p-4 text-sm font-mono text-zinc-300 overflow-x-auto">{`import { SileoToast } from "@solidcn/toast";

<SileoToast
  toast={{
    id: "demo",
    type: "success",
    title: "Saved successfully!",
    createdAt: Date.now(),
  }}
  onDismiss={() => {
    // remove the toast from your own state
  }}
/>
`}</pre>
            </div>
          </div>

          <div class="rounded-lg border bg-muted/30 p-5 space-y-3">
            <h3 class="font-semibold text-sm">Setup</h3>
            <p class="text-sm text-muted-foreground">
              Add{" "}
              <code class="bg-muted px-1 rounded text-xs">{'<SileoToaster mode="sileo" />'}</code>{" "}
              where you want Sileo toasts to appear:
            </p>
            <div class="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
              <pre class="p-4 text-sm font-mono text-zinc-300 overflow-x-auto">{`import { SileoToaster } from "@solidcn/toast";

// In your page/layout:
<SileoToaster mode="sileo" position="top-center" />`}</pre>
            </div>
          </div>

          <div class="rounded-lg border bg-muted/30 p-5 space-y-3">
            <h3 class="font-semibold text-sm">Presets</h3>
            <p class="text-sm text-muted-foreground">Sileo ships with 6 built-in presets:</p>
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
