import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-solid";
import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";
import { buttonVariants } from "./button.js";

const Pagination: Component<JSX.HTMLAttributes<HTMLElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <nav
      aria-label="pagination"
      class={cn("mx-auto flex w-full justify-center", local.class)}
      {...rest}
    />
  );
};

const PaginationContent: Component<JSX.HTMLAttributes<HTMLUListElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <ul class={cn("flex flex-row items-center gap-1", local.class)} {...rest} />;
};

const PaginationItem: Component<JSX.HTMLAttributes<HTMLLIElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <li class={cn("", local.class)} {...rest} />;
};

type PaginationLinkProps = JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
};

const PaginationLink: Component<PaginationLinkProps> = (props) => {
  const [local, rest] = splitProps(props, ["class", "isActive", "size"]);
  return (
    <a
      aria-current={local.isActive ? "page" : undefined}
      class={cn(
        buttonVariants({
          variant: local.isActive ? "outline" : "ghost",
          size: local.size ?? "icon",
        }),
        local.class,
      )}
      {...rest}
    />
  );
};

const PaginationPrevious: Component<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      class={cn("gap-1 pl-2.5", local.class)}
      {...rest}
    >
      <ChevronLeft class="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
};

const PaginationNext: Component<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      class={cn("gap-1 pr-2.5", local.class)}
      {...rest}
    >
      <span>Next</span>
      <ChevronRight class="h-4 w-4" />
    </PaginationLink>
  );
};

const PaginationEllipsis: Component<JSX.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <span
      aria-hidden="true"
      class={cn("flex h-9 w-9 items-center justify-center", local.class)}
      {...rest}
    >
      <MoreHorizontal class="h-4 w-4" />
      <span class="sr-only">More pages</span>
    </span>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
