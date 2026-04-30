import Resizable from "corvu/resizable";
import { GripVertical } from "lucide-solid";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/cn.js";

const ResizablePanelGroup: Component<ComponentProps<typeof Resizable>> = (props) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Resizable
      class={cn("flex h-full w-full data-[orientation=vertical]:flex-col", local.class)}
      {...rest}
    />
  );
};

const ResizablePanel = Resizable.Panel;

const ResizableHandle: Component<
  ComponentProps<typeof Resizable.Handle> & { withHandle?: boolean }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "withHandle"]);
  return (
    <Resizable.Handle
      class={cn(
        "relative flex w-px items-center justify-center bg-border",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        "data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
        "data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1",
        "data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2",
        "data-[orientation=vertical]:after:translate-x-0",
        "[&[data-orientation=vertical]>div]:rotate-90",
        local.class,
      )}
      {...rest}
    >
      {local.withHandle && (
        <div class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <GripVertical class="h-2.5 w-2.5" />
        </div>
      )}
    </Resizable.Handle>
  );
};

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
