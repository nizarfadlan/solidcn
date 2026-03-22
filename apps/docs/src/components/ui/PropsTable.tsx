import type { Component } from "solid-js";
import { For } from "solid-js";

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  props: PropDef[];
}

export const PropsTable: Component<PropsTableProps> = (tableProps) => {
  return (
    <div class="overflow-x-auto rounded-lg border">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b bg-muted/50">
            <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Prop</th>
            <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Type</th>
            <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Default</th>
            <th class="px-4 py-2.5 text-left font-medium text-muted-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          <For each={tableProps.props}>
            {(prop, i) => (
              <tr class={i() % 2 === 0 ? "" : "bg-muted/20"}>
                <td class="px-4 py-2.5 font-mono text-xs">
                  {prop.name}
                  {prop.required && <span class="ml-1 text-destructive">*</span>}
                </td>
                <td class="px-4 py-2.5">
                  <code class="rounded bg-muted px-1 py-0.5 text-xs font-mono text-foreground">
                    {prop.type}
                  </code>
                </td>
                <td class="px-4 py-2.5 text-muted-foreground text-xs font-mono">
                  {prop.default ?? "—"}
                </td>
                <td class="px-4 py-2.5 text-muted-foreground">{prop.description}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};
