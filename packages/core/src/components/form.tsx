import type { Component, JSX } from "solid-js";
import { createContext, splitProps, useContext } from "solid-js";
import { cn } from "~/lib/cn.js";

// ---------------------------------------------------------------------------
// Form — thin wrappers that compose with @modular-forms/solid
//
// Usage (with @modular-forms/solid):
//   const [form, { Form, Field }] = createForm<LoginForm>();
//   <Form onSubmit={handleSubmit}>
//     <Field name="email">
//       {(field, props) => (
//         <FormField>
//           <FormLabel for={field.name}>Email</FormLabel>
//           <Input {...props} type="email" />
//           <Show when={field.error}>
//             <FormMessage>{field.error}</FormMessage>
//           </Show>
//         </FormField>
//       )}
//     </Field>
//   </Form>
// ---------------------------------------------------------------------------

const FormFieldContext = createContext<{ name?: string }>({});

export const FormField: Component<JSX.HTMLAttributes<HTMLDivElement> & { name?: string }> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "name"]);
  return (
    <FormFieldContext.Provider value={local.name !== undefined ? { name: local.name } : {}}>
      <div class={cn("space-y-2", local.class)} {...rest} />
    </FormFieldContext.Provider>
  );
};

export const useFormField = () => useContext(FormFieldContext);

export type FormLabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement> & {
  error?: boolean;
};

export const FormLabel: Component<FormLabelProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "error"]);
  return (
    <label
      class={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        local.error && "text-destructive",
        local.class,
      )}
      {...rest}
    />
  );
};

export const FormControl: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <div class={cn("", local.class)} {...rest} />;
};

export const FormDescription: Component<JSX.HTMLAttributes<HTMLParagraphElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <p class={cn("text-sm text-muted-foreground", local.class)} {...rest} />;
};

export const FormMessage: Component<JSX.HTMLAttributes<HTMLParagraphElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  if (!local.children) return null;
  return (
    <p class={cn("text-sm font-medium text-destructive", local.class)} {...rest}>
      {local.children}
    </p>
  );
};

// FormItem is an alias for FormField
export const FormItem = FormField;
