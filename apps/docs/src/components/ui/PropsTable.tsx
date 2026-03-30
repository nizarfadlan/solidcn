import type { Component } from "solid-js";
import { For, Show } from "solid-js";

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
    <div class="overflow-x-auto rounded-lg border border-border">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-border bg-muted/30">
            <th class="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Prop
            </th>
            <th class="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Type
            </th>
            <th class="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Default
            </th>
            <th class="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <For each={tableProps.props}>
            {(prop) => (
              <tr class="transition-colors hover:bg-muted/20">
                <td class="px-4 py-3 align-top">
                  <code class="font-mono text-[0.8125rem] text-foreground">
                    {prop.name}
                    <Show when={prop.required}>
                      <span class="ml-0.5 text-destructive">*</span>
                    </Show>
                  </code>
                </td>
                <td class="px-4 py-3 align-top">
                  <code class="inline-flex rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.75rem] text-foreground/80 whitespace-nowrap">
                    {prop.type}
                  </code>
                </td>
                <td class="px-4 py-3 align-top font-mono text-[0.8125rem] text-muted-foreground">
                  {prop.default ?? <span class="text-border">—</span>}
                </td>
                <td class="px-4 py-3 align-top text-[0.8125rem] text-muted-foreground leading-relaxed">
                  {prop.description}
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};
