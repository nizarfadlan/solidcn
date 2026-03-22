import type { Component, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const Table: Component<JSX.HTMLAttributes<HTMLTableElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class="relative w-full overflow-auto">
      <table class={cn("w-full caption-bottom text-sm", local.class)} {...rest} />
    </div>
  );
};

const TableHeader: Component<JSX.HTMLAttributes<HTMLTableSectionElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <thead class={cn("[&_tr]:border-b", local.class)} {...rest} />;
};

const TableBody: Component<JSX.HTMLAttributes<HTMLTableSectionElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <tbody class={cn("[&_tr:last-child]:border-0", local.class)} {...rest} />;
};

const TableFooter: Component<JSX.HTMLAttributes<HTMLTableSectionElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <tfoot
      class={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", local.class)}
      {...rest}
    />
  );
};

const TableRow: Component<JSX.HTMLAttributes<HTMLTableRowElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <tr
      class={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        local.class,
      )}
      {...rest}
    />
  );
};

const TableHead: Component<JSX.ThHTMLAttributes<HTMLTableCellElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <th
      class={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground",
        "[&:has([role=checkbox])]:pr-0",
        local.class,
      )}
      {...rest}
    />
  );
};

const TableCell: Component<JSX.TdHTMLAttributes<HTMLTableCellElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <td class={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", local.class)} {...rest} />;
};

const TableCaption: Component<JSX.HTMLAttributes<HTMLTableCaptionElement>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <caption
      class={cn("mt-4 text-sm text-muted-foreground", local.class)}
      {...(rest as JSX.HTMLAttributes<HTMLTableCaptionElement>)}
    />
  );
};

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption };
