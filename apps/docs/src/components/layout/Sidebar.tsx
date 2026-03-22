import { A, useLocation } from "@solidjs/router";
import { type Component, For, Show } from "solid-js";
import { navigation } from "../../lib/nav.js";

interface SidebarProps {
  onNavigate?: () => void;
}

export const SidebarContent: Component<SidebarProps> = (props) => {
  const location = useLocation();

  return (
    <div class="px-3 py-5 lg:py-6">
      <For each={navigation}>
        {(group) => (
          <div class="mb-7 last:mb-0">
            <h4 class="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/90">
              {group.title}
            </h4>
            <nav class="flex flex-col gap-px">
              <For each={group.items}>
                {(item) => (
                  <A
                    href={item.href}
                    onClick={props.onNavigate}
                    class={[
                      "flex items-center justify-between rounded-md px-2.5 py-1.5 text-[13px] leading-snug transition-colors",
                      location.pathname === item.href
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    ].join(" ")}
                  >
                    <span>{item.title}</span>
                    <Show when={item.badge}>
                      <span class="rounded-md border border-border bg-background px-1.5 py-px text-[10px] font-medium text-muted-foreground">
                        {item.badge}
                      </span>
                    </Show>
                  </A>
                )}
              </For>
            </nav>
          </div>
        )}
      </For>
    </div>
  );
};

export const Sidebar: Component = () => {
  return (
    <aside class="hidden w-[220px] shrink-0 lg:block xl:w-[240px]">
      <div class="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto overscroll-contain border-r border-border">
        <SidebarContent />
      </div>
    </aside>
  );
};

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const MobileSidebar: Component<MobileSidebarProps> = (props) => {
  return (
    <Show when={props.open}>
      <div
        class="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
        onClick={props.onClose}
        onKeyDown={(e) => e.key === "Escape" && props.onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close navigation"
      />
      <div class="fixed top-14 bottom-0 left-0 z-40 w-[min(280px,85vw)] overflow-y-auto border-r border-border bg-background shadow-lg lg:hidden">
        <SidebarContent onNavigate={props.onClose} />
      </div>
    </Show>
  );
};
