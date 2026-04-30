import { ChevronRight, MoreHorizontal } from "lucide-solid";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Breadcrumb: Component<JSX.HTMLAttributes<HTMLElement> & { separator?: JSX.Element }> = (
  props,
) => {
  const [local, rest] = splitProps(props, ["class", "separator"]);
  return <nav aria-label="breadcrumb" class={local.class} {...rest} />;
};

const BreadcrumbList: Component<JSX.HTMLAttributes<HTMLOListElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ol
      class={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        local.class,
      )}
      {...rest}
    />
  );
};

const BreadcrumbItem: Component<JSX.HTMLAttributes<HTMLLIElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <li class={cn("inline-flex items-center gap-1.5", local.class)} {...rest} />;
};

const BreadcrumbLink: Component<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }
> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <a class={cn("transition-colors hover:text-foreground", local.class)} {...rest} />;
};

const BreadcrumbPage: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      aria-disabled="true"
      aria-current="page"
      class={cn("font-normal text-foreground", local.class)}
      {...rest}
    />
  );
};

const BreadcrumbSeparator: Component<JSX.HTMLAttributes<HTMLLIElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <li
      role="presentation"
      aria-hidden="true"
      class={cn("[&>svg]:size-3.5", local.class)}
      {...rest}
    >
      {local.children ?? <ChevronRight />}
    </li>
  );
};

const BreadcrumbEllipsis: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      role="presentation"
      aria-hidden="true"
      class={cn("flex h-9 w-9 items-center justify-center", local.class)}
      {...rest}
    >
      <MoreHorizontal class="h-4 w-4" />
      <span class="sr-only">More</span>
    </span>
  );
};

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
