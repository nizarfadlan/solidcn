import { DocLayout } from "../../components/layout/DocLayout.js";
import { CodeBlock } from "../../components/ui/CodeBlock.js";
import { DocsSeo } from "../../lib/docs-seo.js";

const installExample = `pnpm add @tanstack/solid-form
# peer deps: solid-js (already installed)`;

const basicExample = `import { createForm } from "@tanstack/solid-form";

export default function LoginForm() {
  const form = createForm(() => ({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      class="space-y-4"
    >
      <form.Field name="email">
        {(field) => (
          <div class="space-y-1.5">
            <label
              for={field().name}
              class="text-sm font-medium leading-none"
            >
              Email
            </label>
            <input
              id={field().name}
              name={field().name}
              type="email"
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => field().handleChange(e.currentTarget.value)}
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="you@example.com"
            />
          </div>
        )}
      </form.Field>

      <button type="submit" class="...">Submit</button>
    </form>
  );
}`;

const solidcnFieldExample = `import { createForm } from "@tanstack/solid-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function ProfileForm() {
  const form = createForm(() => ({
    defaultValues: {
      username: "",
      bio: "",
    },
    onSubmit: async ({ value }) => {
      // handle submit
    },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      class="space-y-6 max-w-md"
    >
      <form.Field name="username">
        {(field) => (
          <div class="space-y-1.5">
            <Label for={field().name}>Username</Label>
            <Input
              id={field().name}
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => field().handleChange(e.currentTarget.value)}
              placeholder="solidjs_dev"
            />
            {field().state.meta.errors.length > 0 && (
              <p class="text-sm text-destructive">
                {field().state.meta.errors.join(", ")}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <Button type="submit" disabled={form.state.isSubmitting}>
        {form.state.isSubmitting ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}`;

const zodValidationExample = `import { createForm } from "@tanstack/solid-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export default function SignupForm() {
  const form = createForm(() => ({
    defaultValues: { email: "", password: "" },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      // value is typed as z.infer<typeof schema>
    },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      class="space-y-4 max-w-sm"
    >
      <form.Field name="email">
        {(field) => (
          <div class="space-y-1.5">
            <label for={field().name} class="text-sm font-medium">Email</label>
            <input
              id={field().name}
              type="email"
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => field().handleChange(e.currentTarget.value)}
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            />
            {field().state.meta.errors.map((err) => (
              <p class="text-sm text-destructive">{err?.message}</p>
            ))}
          </div>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <div class="space-y-1.5">
            <label for={field().name} class="text-sm font-medium">Password</label>
            <input
              id={field().name}
              type="password"
              value={field().state.value}
              onBlur={field().handleBlur}
              onInput={(e) => field().handleChange(e.currentTarget.value)}
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
            />
            {field().state.meta.errors.map((err) => (
              <p class="text-sm text-destructive">{err?.message}</p>
            ))}
          </div>
        )}
      </form.Field>

      <button type="submit">Create account</button>
    </form>
  );
}`;

const valibotExample = `import { createForm } from "@tanstack/solid-form";
import { valibotValidator } from "@tanstack/valibot-form-adapter";
import * as v from "valibot";

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(2, "Name must be at least 2 characters")),
  email: v.pipe(v.string(), v.email("Invalid email address")),
});

export default function ContactForm() {
  const form = createForm(() => ({
    defaultValues: { name: "", email: "" },
    validatorAdapter: valibotValidator(),
    validators: { onChange: schema },
    onSubmit: async ({ value }) => {
      // value is typed as v.InferOutput<typeof schema>
    },
  }));

  // ... render fields
}`;

const checkboxExample = `import { createForm } from "@tanstack/solid-form";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

export default function NotificationForm() {
  const form = createForm(() => ({
    defaultValues: {
      marketing: false,
      security: true,
    },
    onSubmit: async ({ value }) => { /* ... */ },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      class="space-y-4"
    >
      <form.Field name="marketing">
        {(field) => (
          <div class="flex items-center space-x-2">
            <Checkbox
              id={field().name}
              checked={field().state.value}
              onChange={(checked) => field().handleChange(checked)}
            />
            <Label for={field().name}>
              Receive marketing emails
            </Label>
          </div>
        )}
      </form.Field>

      <form.Field name="security">
        {(field) => (
          <div class="flex items-center space-x-2">
            <Checkbox
              id={field().name}
              checked={field().state.value}
              onChange={(checked) => field().handleChange(checked)}
            />
            <Label for={field().name}>
              Security alerts
            </Label>
          </div>
        )}
      </form.Field>

      <button type="submit">Save preferences</button>
    </form>
  );
}`;

export default function FormsPage() {
  return (
    <DocLayout>
      <DocsSeo
        title="Forms — solidcn"
        description="Building forms with TanStack Solid Form and solidcn UI components. Validation with Zod or Valibot."
        path="/docs/forms"
      />
      <div class="max-w-3xl space-y-10">
        <div>
          <p class="text-sm font-medium text-primary">Getting Started</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight">Forms</h1>
          <p class="mt-3 text-muted-foreground">
            Building forms in SolidJS with{" "}
            <a
              href="https://tanstack.com/form/latest/docs/framework/solid/quick-start"
              target="_blank"
              rel="noreferrer"
              class="underline hover:text-foreground"
            >
              TanStack Form
            </a>{" "}
            and solidcn UI components. Pair with{" "}
            <a
              href="https://zod.dev"
              target="_blank"
              rel="noreferrer"
              class="underline hover:text-foreground"
            >
              Zod
            </a>{" "}
            or{" "}
            <a
              href="https://valibot.dev"
              target="_blank"
              rel="noreferrer"
              class="underline hover:text-foreground"
            >
              Valibot
            </a>{" "}
            for validation.
          </p>
        </div>

        <hr class="border-border" />

        {/* Why TanStack Form */}
        <section class="space-y-3">
          <h2 class="text-xl font-semibold">Why TanStack Form?</h2>
          <p class="text-sm text-muted-foreground">
            React Hook Form is React-specific and cannot be used in SolidJS.{" "}
            <strong class="text-foreground">TanStack Form</strong> is the recommended form library
            for Solid — it is framework-agnostic, fully reactive, and ships a first-class Solid
            adapter. It follows the same mental model (field-level validation, submission state,
            error handling) so the patterns below map directly to the shadcn forms docs.
          </p>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 text-sm">
            {[
              ["Reactive by design", "Fine-grained reactivity with no unnecessary re-renders."],
              [
                "Schema-agnostic validation",
                "Works with Zod, Valibot, ArkType, Standard Schema, or custom functions.",
              ],
              [
                "TypeScript-first",
                "Full inference on field values, errors, and submission payload.",
              ],
            ].map(([title, desc]) => (
              <div class="rounded-lg border bg-card p-4 space-y-1">
                <p class="font-medium text-sm">{title}</p>
                <p class="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <hr class="border-border" />

        {/* Installation */}
        <section class="space-y-4" id="installation">
          <h2 class="text-xl font-semibold">Installation</h2>
          <CodeBlock code={installExample} lang="bash" />
          <p class="text-sm text-muted-foreground">
            For schema validation, install the adapter for your preferred library:
          </p>
          <CodeBlock
            code={`# Zod adapter
pnpm add zod @tanstack/zod-form-adapter

# Valibot adapter
pnpm add valibot @tanstack/valibot-form-adapter`}
            lang="bash"
          />
        </section>

        <hr class="border-border" />

        {/* Basic example */}
        <section class="space-y-4" id="basic-example">
          <h2 class="text-xl font-semibold">Basic example</h2>
          <p class="text-sm text-muted-foreground">
            Use <code class="text-xs bg-muted px-1 rounded">createForm</code> to create a form
            instance, then render fields with{" "}
            <code class="text-xs bg-muted px-1 rounded">form.Field</code>. Each field exposes its
            value, handlers, and validation state via the child render function.
          </p>
          <CodeBlock code={basicExample} lang="tsx" filename="login-form.tsx" />
        </section>

        <hr class="border-border" />

        {/* Using solidcn components */}
        <section class="space-y-4" id="with-solidcn">
          <h2 class="text-xl font-semibold">Using solidcn components</h2>
          <p class="text-sm text-muted-foreground">
            Drop in <code class="text-xs bg-muted px-1 rounded">Input</code>,{" "}
            <code class="text-xs bg-muted px-1 rounded">Label</code>, and{" "}
            <code class="text-xs bg-muted px-1 rounded">Button</code> from{" "}
            <code class="text-xs bg-muted px-1 rounded">@solidcn/core</code>. Wire{" "}
            <code class="text-xs bg-muted px-1 rounded">value</code>,{" "}
            <code class="text-xs bg-muted px-1 rounded">onInput</code>, and{" "}
            <code class="text-xs bg-muted px-1 rounded">onBlur</code> directly to the field
            handlers.
          </p>
          <CodeBlock code={solidcnFieldExample} lang="tsx" filename="profile-form.tsx" />
        </section>

        <hr class="border-border" />

        {/* Zod validation */}
        <section class="space-y-4" id="zod-validation">
          <h2 class="text-xl font-semibold">Validation with Zod</h2>
          <p class="text-sm text-muted-foreground">
            Pass <code class="text-xs bg-muted px-1 rounded">validatorAdapter: zodValidator()</code>{" "}
            and a <code class="text-xs bg-muted px-1 rounded">validators.onChange</code> schema.
            Errors surface in{" "}
            <code class="text-xs bg-muted px-1 rounded">
              field().state.meta.errors
            </code>
            .
          </p>
          <CodeBlock code={zodValidationExample} lang="tsx" filename="signup-form.tsx" />
        </section>

        <hr class="border-border" />

        {/* Valibot validation */}
        <section class="space-y-4" id="valibot-validation">
          <h2 class="text-xl font-semibold">Validation with Valibot</h2>
          <p class="text-sm text-muted-foreground">
            Valibot ships a smaller bundle than Zod. The API is nearly identical — swap{" "}
            <code class="text-xs bg-muted px-1 rounded">zodValidator</code> for{" "}
            <code class="text-xs bg-muted px-1 rounded">valibotValidator</code>.
          </p>
          <CodeBlock code={valibotExample} lang="tsx" filename="contact-form.tsx" />
        </section>

        <hr class="border-border" />

        {/* Checkbox / boolean fields */}
        <section class="space-y-4" id="checkbox-fields">
          <h2 class="text-xl font-semibold">Checkbox fields</h2>
          <p class="text-sm text-muted-foreground">
            Use the solidcn{" "}
            <code class="text-xs bg-muted px-1 rounded">Checkbox</code> component. The{" "}
            <code class="text-xs bg-muted px-1 rounded">onChange</code> callback receives the new{" "}
            boolean value — pass it directly to{" "}
            <code class="text-xs bg-muted px-1 rounded">field().handleChange</code>.
          </p>
          <CodeBlock code={checkboxExample} lang="tsx" filename="notification-form.tsx" />
        </section>

        <hr class="border-border" />

        {/* Form state reference */}
        <section class="space-y-4" id="api-reference">
          <h2 class="text-xl font-semibold">API reference</h2>

          <h3 class="text-base font-semibold mt-6">createForm options</h3>
          <div class="overflow-x-auto rounded-lg border text-sm">
            <table class="w-full">
              <thead>
                <tr class="border-b bg-muted/50">
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">Option</th>
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">Type</th>
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                {[
                  [
                    "defaultValues",
                    "TFormData",
                    "Initial values for all fields. Drives TypeScript inference.",
                  ],
                  [
                    "onSubmit",
                    "({ value }) => Promise<void>",
                    "Called when form is submitted and validation passes.",
                  ],
                  [
                    "validatorAdapter",
                    "zodValidator() | valibotValidator()",
                    "Adapter for schema-based validation.",
                  ],
                  [
                    "validators.onChange",
                    "ZodSchema | ValibotSchema",
                    "Schema validated on every change.",
                  ],
                  [
                    "validators.onBlur",
                    "ZodSchema | ValibotSchema",
                    "Schema validated on blur.",
                  ],
                  [
                    "validators.onSubmit",
                    "ZodSchema | ValibotSchema",
                    "Schema validated on submit.",
                  ],
                ].map(([opt, type, desc]) => (
                  <tr>
                    <td class="px-4 py-2.5 font-mono text-xs text-foreground">{opt}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{type}</td>
                    <td class="px-4 py-2.5 text-xs text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 class="text-base font-semibold mt-6">form.Field render props</h3>
          <div class="overflow-x-auto rounded-lg border text-sm">
            <table class="w-full">
              <thead>
                <tr class="border-b bg-muted/50">
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">Property</th>
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">Type</th>
                  <th class="px-4 py-2 text-left font-medium text-muted-foreground">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border">
                {[
                  ["field().name", "string", "Field name — use as HTML id / name."],
                  ["field().state.value", "TFieldValue", "Current field value."],
                  ["field().state.meta.errors", "ValidationError[]", "Array of validation errors."],
                  [
                    "field().state.meta.isTouched",
                    "boolean",
                    "True after first blur.",
                  ],
                  [
                    "field().state.meta.isDirty",
                    "boolean",
                    "True when value differs from defaultValue.",
                  ],
                  [
                    "field().handleChange(value)",
                    "(value: TFieldValue) => void",
                    "Update field value.",
                  ],
                  ["field().handleBlur()", "() => void", "Mark field as touched."],
                ].map(([prop, type, desc]) => (
                  <tr>
                    <td class="px-4 py-2.5 font-mono text-xs text-foreground">{prop}</td>
                    <td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{type}</td>
                    <td class="px-4 py-2.5 text-xs text-muted-foreground">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DocLayout>
  );
}
