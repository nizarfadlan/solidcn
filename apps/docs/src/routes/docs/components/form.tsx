import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  Input,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

export default function FormPage() {
  return (
    <DocPage
      docPath="/docs/components/form"
      title="Form"
      description="Building forms with @modular-forms/solid. Accessible form field wrappers with label, description, and error message support."
      phase="Layout & Form"
      componentName="form"
      manualInstall="npm install @solidcn/core @modular-forms/solid"
      usage={`import {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

// With @modular-forms/solid:
// import { createForm } from "@modular-forms/solid";
// const [form, { Form, Field }] = createForm<{ email: string }>();

<FormField name="email">
  <FormLabel for="email">Email</FormLabel>
  <FormControl>
    <Input id="email" type="email" placeholder="m@example.com" />
  </FormControl>
  <FormDescription>
    This is your public display email.
  </FormDescription>
</FormField>`}
      examples={[
        {
          title: "Simple form",
          preview: (
            <form class="w-[400px] space-y-6">
              <FormField name="username">
                <FormLabel for="username">Username</FormLabel>
                <FormControl>
                  <Input id="username" placeholder="solidcn" />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
              </FormField>
              <FormField name="email">
                <FormLabel for="email">Email</FormLabel>
                <FormControl>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </FormControl>
                <FormDescription>
                  We&apos;ll never share your email.
                </FormDescription>
              </FormField>
              <Button type="submit">Submit</Button>
            </form>
          ),
          code: `import {
  FormControl, FormDescription, FormField, FormLabel,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"

export function FormSimpleForm() {
  return (
    <form class="space-y-6">
      <FormField name="username">
        <FormLabel for="username">Username</FormLabel>
        <FormControl>
          <Input id="username" placeholder="solidcn" />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
      </FormField>
      <FormField name="email">
        <FormLabel for="email">Email</FormLabel>
        <FormControl>
          <Input id="email" type="email" placeholder="m@example.com" />
        </FormControl>
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  )
}`,
        },
        {
          title: "With error",
          preview: (
            <div class="w-[400px]">
              <FormField name="username">
                <FormLabel for="username-err" error>
                  Username
                </FormLabel>
                <FormControl>
                  <Input id="username-err" placeholder="solidcn" class="border-destructive" />
                </FormControl>
                <FormMessage>Username must be at least 2 characters.</FormMessage>
              </FormField>
            </div>
          ),
          code: `import {
  FormControl, FormField, FormLabel, FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

export function FormWithError() {
  return (
    <FormField name="username">
      <FormLabel for="username" error>Username</FormLabel>
      <FormControl>
        <Input id="username" placeholder="solidcn" class="border-destructive" />
      </FormControl>
      <FormMessage>Username must be at least 2 characters.</FormMessage>
    </FormField>
  )
}`,
        },
        {
          title: "With @modular-forms/solid",
          preview: (
            <div class="w-[400px] rounded-lg border border-border p-4 bg-muted/30">
              <p class="text-sm text-muted-foreground">
                For full form validation, combine Form components with{" "}
                <code class="text-xs bg-muted px-1 py-0.5 rounded">@modular-forms/solid</code>.
                See the{" "}
                <a href="/docs/forms" class="underline underline-offset-4 text-foreground">
                  Forms guide
                </a>{" "}
                for detailed examples.
              </p>
            </div>
          ),
          code: `import { createForm } from "@modular-forms/solid";
import { Show } from "solid-js";
import {
  FormControl, FormField, FormLabel, FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

type LoginForm = { email: string; password: string };

export default function LoginForm() {
  const [form, { Form, Field }] = createForm<LoginForm>();

  return (
    <Form onSubmit={(values) => console.log(values)}>
      <Field name="email">
        {(field, fieldProps) => (
          <FormField name="email">
            <FormLabel for="email" error={!!field.error}>
              Email
            </FormLabel>
            <FormControl>
              <Input
                {...fieldProps}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
            </FormControl>
            <Show when={field.error}>
              <FormMessage>{field.error}</FormMessage>
            </Show>
          </FormField>
        )}
      </Field>
      <Button type="submit">Login</Button>
    </Form>
  );
}`,
        },
      ]}
      props={[
        {
          name: "FormField.name",
          type: "string",
          description: "Field name, used for context and aria associations",
        },
        {
          name: "FormLabel.error",
          type: "boolean",
          default: "false",
          description: "Applies destructive color to indicate an error state",
        },
        {
          name: "FormMessage.children",
          type: "JSX.Element",
          description: "Error message — rendered only when children are non-empty",
        },
        {
          name: "FormDescription.children",
          type: "JSX.Element",
          description: "Helper text shown below the input",
        },
      ]}
    />
  );
}
