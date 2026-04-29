import { A, useLocation } from "@solidjs/router";
import { type Component, For, Show, createSignal, onMount } from "solid-js";
import { docsTheme, initDocsTheme, toggleDocsTheme } from "../../lib/theme.js";
import { CommandSearch } from "../ui/CommandSearch.js";

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const GitHubIcon = () => (
  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  mobileMenuOpen?: boolean;
}

export const Header: Component<HeaderProps> = (props) => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = createSignal(false);

  initDocsTheme();

  const navLinks = [
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components/button" },
    { label: "Directory", href: "/docs/registry" },
    { label: "CLI", href: "/docs/cli" },
  ];

  const isNavActive = (href: string) => {
    const p = location.pathname;
    if (href === "/docs/components/button") {
      return p.startsWith("/docs/components");
    }
    if (href === "/docs/registry") {
      return p.startsWith("/docs/registry");
    }
    if (href === "/docs/cli") {
      return p === "/docs/cli" || p.startsWith("/docs/cli/");
    }
    if (href === "/docs") {
      return (
        p === "/docs" || p === "/docs/installation" || p === "/docs/theming" || p === "/docs/mcp"
      );
    }
    return p === href || p.startsWith(`${href}/`);
  };

  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <>
      <header class="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div class="mx-auto flex h-14 max-w-screen-2xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            onClick={props.onMobileMenuToggle}
            aria-label="Toggle menu"
          >
            <Show when={props.mobileMenuOpen} fallback={<MenuIcon />}>
              <XIcon />
            </Show>
          </button>

          <A href="/" class="flex items-center gap-2 font-semibold tracking-tight text-foreground">
            <div class="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background text-xs font-black">
              s
            </div>
            <span class="hidden sm:inline-block">solidcn</span>
          </A>

          <nav class="hidden items-center gap-0.5 text-sm lg:flex">
            <For each={navLinks}>
              {(link) => (
                <A
                  href={link.href}
                  class={[
                    "rounded-md px-3 py-2 transition-colors",
                    isNavActive(link.href)
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {link.label}
                </A>
              )}
            </For>
          </nav>

          <div class="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              class="hidden h-9 w-full max-w-[220px] items-center gap-2 rounded-md border border-border bg-background px-3 text-left text-sm text-muted-foreground shadow-sm transition-colors hover:border-border hover:bg-muted/50 hover:text-foreground lg:flex xl:max-w-[260px]"
            >
              <SearchIcon />
              <span class="flex-1 truncate">Search documentation...</span>
              <kbd class="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground xl:inline-block">
                ⌘K
              </kbd>
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              class="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
              aria-label="Search"
            >
              <SearchIcon />
            </button>

            <button
              type="button"
              onClick={toggleDocsTheme}
              class="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Toggle theme"
            >
              <Show when={docsTheme() === "dark"} fallback={<MoonIcon />}>
                <SunIcon />
              </Show>
            </button>

            <a
              href="https://github.com/solidcn-ui/solidcn"
              target="_blank"
              rel="noreferrer"
              class="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <span class="sr-only">GitHub</span>
              <GitHubIcon />
            </a>
          </div>
        </div>
      </header>

      <Show when={searchOpen()}>
        <CommandSearch onClose={() => setSearchOpen(false)} />
      </Show>
    </>
  );
};
