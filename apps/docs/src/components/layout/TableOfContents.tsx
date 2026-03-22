import { type Component, For, createSignal, onCleanup, onMount } from "solid-js";
import type { TocItem } from "../../lib/toc.js";

interface TableOfContentsProps {
  items: TocItem[];
}

/** Sticky header + breathing room — aligns with scroll-mt on headings */
function scrollOffsetPx(): number {
  const header = document.querySelector("header");
  const h = header?.getBoundingClientRect().height ?? 56;
  return h + 24;
}

export const TableOfContents: Component<TableOfContentsProps> = (props) => {
  const [activeId, setActiveId] = createSignal<string>("");

  onMount(() => {
    const items = () => props.items;

    const updateActive = () => {
      const list = items();
      if (list.length === 0) return;

      const line = scrollOffsetPx();
      const docBottom = document.documentElement.scrollHeight - window.innerHeight;
      const nearBottom = window.scrollY >= docBottom - 48;

      if (nearBottom) {
        const last = list[list.length - 1];
        if (last) {
          setActiveId(last.id);
        }
        return;
      }

      let current = list[0]?.id ?? "";
      let anyPass = false;
      for (const item of list) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) {
          current = item.id;
          anyPass = true;
        }
      }
      if (!anyPass && list[0]) {
        current = list[0].id;
      }
      setActiveId(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          updateActive();
        });
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const t = window.setTimeout(updateActive, 100);

    onCleanup(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(t);
    });
  });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div class="hidden w-52 shrink-0 xl:block">
      <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pl-2">
        <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          On this page
        </p>
        <nav class="border-l border-border">
          <For each={props.items}>
            {(item) => (
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                class={[
                  "block w-full border-l-2 py-1 pl-3 text-left text-xs transition-colors -ml-px",
                  item.level === 3 ? "pl-5" : "",
                  activeId() === item.id
                    ? "border-foreground font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                ].join(" ")}
              >
                {item.title}
              </button>
            )}
          </For>
        </nav>
      </div>
    </div>
  );
};
