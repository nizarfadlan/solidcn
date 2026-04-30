import { Accordion as KobalteAccordion } from "@kobalte/core/accordion";
import { ChevronDown } from "lucide-solid";
import type { Component, ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Accordion = KobalteAccordion;

const AccordionItem: Component<ComponentProps<typeof KobalteAccordion.Item>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <KobalteAccordion.Item class={cn("border-b", local.class)} {...rest} />;
};

const AccordionTrigger: Component<
  ComponentProps<typeof KobalteAccordion.Trigger> & { children?: JSX.Element }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteAccordion.Header class="flex">
      <KobalteAccordion.Trigger
        class={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all",
          "hover:underline [&[data-expanded]>svg]:rotate-180",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" />
      </KobalteAccordion.Trigger>
    </KobalteAccordion.Header>
  );
};

const AccordionContent: Component<ComponentProps<typeof KobalteAccordion.Content>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <KobalteAccordion.Content
      class={cn(
        "overflow-hidden text-sm transition-all",
        "data-[expanded]:animate-accordion-down data-[closed]:animate-accordion-up",
        local.class,
      )}
      {...rest}
    >
      <div class="pb-4 pt-0">{local.children}</div>
    </KobalteAccordion.Content>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
